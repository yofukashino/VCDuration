import { webpack } from "replugged";
import Types from "../types";
export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.RTCPanel ??= await webpack
    .waitForModule<Types.DefaultTypes.RawModule<Record<string, Types.DefaultTypes.AnyFunction>>>(
      webpack.filters.bySource(".rtcConnectionStatusConnecting"),
      { timeout: 10000, raw: true },
    )
    .then(({ exports }) => exports)
    .catch(() => {
      throw new Error("Failed To Find RTCPanel Module");
    });

  Modules.RTCPanelClasses ??= await webpack
    .waitForProps<Types.RTCPanelClasses>(["channel", "micTestButton", "voiceUsers"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find RTCPanelClasses Module");
    });
  Modules.SelectedChannelStore ??=
    webpack.getByStoreName<Types.SelectedChannelStore>("SelectedChannelStore");
};

export default Modules;
