import { webpack } from "replugged";
import Types from "../types";
export const RTCPanel = webpack.getBySource<Types.DefaultTypes.AnyFunction>(
  ".rtcConnectionStatusConnecting",
);
export const RTCPanelClasses = webpack.getByProps<Types.RTCPanelClasses>([
  "channel",
  "micTestButton",
  "voiceUsers",
]);
