import { webpack } from "replugged";

export type RTCPanelClasses = Record<
  | "container"
  | "inner"
  | "channel"
  | "noiseCancellationPopout"
  | "noiseCancellationTooltip"
  | "krispLogo"
  | "krispLink"
  | "connection"
  | "voiceUsers"
  | "actionButtons"
  | "button"
  | "buttonColor"
  | "greyButtonActive"
  | "fauxDisabled"
  | "buttonActive"
  | "buttonContents"
  | "buttonIcon"
  | "withText"
  | "voicePanelIntroductionHeader"
  | "voicePanelIntroductionText"
  | "voicePanelIntroductionWrapper"
  | "wrapper"
  | "viewAsRolesWarning"
  | "viewAsRolesWarningText"
  | "disabled"
  | "voiceButtonsContainer",
  string
>;

export default await webpack
  .waitForProps<RTCPanelClasses>(["channel", "voiceButtonsContainer", "voiceUsers"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find RTCPanelClasses Module");
  });
