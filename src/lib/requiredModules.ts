import { webpack } from "replugged";
import * as Types from "../types";
export const RTCPanel = webpack.getBySource(".createHref(") as unknown as Types.RTCPanel;
export const RTCPanelClasses = webpack.getByProps([
  "channel",
  "micTestButton",
  "voiceUsers",
]) as unknown as Types.RTCPanelClasses;
