import { webpack } from "replugged";
import Types from "../types";
export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.SelectedChannelStore ??=
    webpack.getByStoreName<Types.SelectedChannelStore>("SelectedChannelStore");
  Modules.RTCPanel ??= await webpack.waitForModule<Types.DefaultTypes.AnyFunction>(
    webpack.filters.bySource(".rtcConnectionStatusConnecting"),
  );
  Modules.RTCPanelClasses ??= await webpack.waitForProps<Types.RTCPanelClasses>([
    "channel",
    "micTestButton",
    "voiceUsers",
  ]);
};

export default Modules;
