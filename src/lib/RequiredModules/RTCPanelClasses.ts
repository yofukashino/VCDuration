import { webpack } from "replugged";

export interface RTCPanelClasses {
  actionButtons: string;
  active: string;
  beta: string;
  button: string;
  buttonActive: string;
  buttonColor: string;
  buttonContents: string;
  buttonDeveloperActivityShelf: string;
  buttonIcon: string;
  channel: string;
  connection: string;
  container: string;
  customStatusContainer: string;
  disabled: string;
  fauxDisabled: string;
  hotspot: string;
  inner: string;
  krispLink: string;
  krispLogo: string;
  micTestButton: string;
  noiseCancellationPopout: string;
  noiseCancellationTooltip: string;
  statusWithPopout: string;
  viewAsRolesWarning: string;
  viewAsRolesWarningButton: string;
  viewAsRolesWarningText: string;
  voicePanelIntroductionButton: string;
  voicePanelIntroductionHeader: string;
  voicePanelIntroductionText: string;
  voicePanelIntroductionWrapper: string;
  voiceUsers: string;
  withText: string;
  wrapper: string;
}

export default await webpack
  .waitForProps<RTCPanelClasses>(["channel", "micTestButton", "voiceUsers"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find RTCPanelClasses Module");
  });
