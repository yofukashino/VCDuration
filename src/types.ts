import { types } from "replugged";
export namespace Types {
  export import DefaultTypes = types;
  export interface PanelSubtext {
    $$typeof: symbol;
    render: DefaultTypes.AnyFunction;
  }
  export type RTCPanel = Record<string, DefaultTypes.AnyFunction | PanelSubtext>;
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
  export interface TimerState {
    startTime: number;
    delta: number;
    voiceId?: null | string;
    previousState?: TimerState;
  }
}
export default Types;
