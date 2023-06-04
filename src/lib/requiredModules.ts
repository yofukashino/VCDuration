import { webpack } from "replugged";
import * as Types from "../types";
export const RTCPanel = webpack.getBySource<Types.RTCPanel>(".createHref(");
export const RTCPanelClasses = webpack.getByProps<Types.RTCPanelClasses>([
  "channel",
  "micTestButton",
  "voiceUsers",
]);
