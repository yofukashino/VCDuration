import { fluxHooks as FluxHooks, React } from "replugged/common";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";

export default () => {
  const [format, setFormat] = React.useState(SettingValues.get("format", defaultSettings.format));
  const { currentChannelId } = FluxHooks.useStateFromStores([Modules.SelectedChannelStore], () => ({
    currentChannelId: Modules.SelectedChannelStore.getVoiceChannelId(),
  }));
  const [delta, setDelta] = React.useState(0);
  const startTime = React.useMemo(() => Date.now(), [currentChannelId]);
  React.useEffect(() => {
    const intervalId = setInterval(
      () => setDelta(Math.round((Date.now() - startTime) / 1000) * 1000),
      1000,
    );
    return () => {
      setDelta(0);
      clearInterval(intervalId);
    };
  }, [currentChannelId]);
  React.useEffect(() => {
    setFormat(SettingValues.get("format", defaultSettings.format));
  }, [SettingValues.get("format", defaultSettings.format)]);
  return (
    <div
      key="timer"
      className="vc-duration-timer"
      style={{
        paddingTop: "2.5px",
        color: "var(--text-secondary)",
        fontFamily: "var(--font-primary)",
        fontSize: "14px",
        lineHeight: "1.2857142857142858",
        fontWeight: "500",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        minWidth: "0",
      }}>
      Time elapsed -{" "}
      {format === "timestamp"
        ? Utils.convertToTimestamp(delta)
        : format === "human"
        ? Utils.convertToHumanReadable(delta)
        : Utils.convertToStopwatch(delta)}
    </div>
  );
};
