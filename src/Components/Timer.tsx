import { fluxHooks, React } from "replugged/common";
import { SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { SelectedChannelStore } from "@lib/RequiredModules";
import Utils from "@Utils";

import "./Timer.css";

export default () => {
  const format = SettingValues.useValue("format", DefaultSettings.format);

  const { currentChannelId } = fluxHooks.useStateFromStores([SelectedChannelStore], () => ({
    currentChannelId: SelectedChannelStore.getVoiceChannelId(),
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

  const getTimestamp = React.useCallback(() => {
    switch (format) {
      case "timestamp":
        return Utils.convertToTimestamp(delta);
      case "human":
        return Utils.convertToHumanReadable(delta);
      case "stopwatch":
      default:
        return Utils.convertToStopwatch(delta);
    }
  }, [format, delta]);

  return (
    <div key={format} className="vc-duration-timer">
      {`Time elapsed - ${getTimestamp()}`}
    </div>
  );
};
