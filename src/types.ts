import { types } from "replugged";
import { Store } from "replugged/dist/renderer/modules/common/flux";
import { Tree } from "replugged/dist/renderer/util";

export namespace Types {
  export import DefaultTypes = types;
  export type ReactTree = Tree & React.ReactElement;
  export interface SelectedChannelStore extends Store {
    getChannelId: DefaultTypes.AnyFunction;
    getCurrentlySelectedChannelId: DefaultTypes.AnyFunction;
    getLastChannelFollowingDestination: DefaultTypes.AnyFunction;
    getLastSelectedChannelId: DefaultTypes.AnyFunction;
    getLastSelectedChannels: DefaultTypes.AnyFunction;
    getMostRecentSelectedTextChannelId: DefaultTypes.AnyFunction;
    getVoiceChannelId: () => string;
  }
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
  export interface Modules {
    loadModules?: () => Promise<void>;
    SelectedChannelStore?: SelectedChannelStore;
    RTCPanel?: DefaultTypes.AnyFunction;
    RTCPanelClasses?: RTCPanelClasses;
  }
  export interface Settings {
    format: string;
  }
}
export default Types;
