import {
  fluxDispatcher as FluxDispatcher,
  React,
  channels as UltimateChannelStore,
} from "replugged/common";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";

export default class Timer extends React.Component<{}, Types.TimerState> {
  public constructor(props) {
    super(props);
    this.handleRTCDispatch = this.handleRTCDispatch.bind(this);
    this.state = {
      startTime: 0,
      delta: 0,
    };
  }

  public interval;

  public previousTimeout;

  public handleRTCDispatch(RTCConnectionState) {
    if (
      RTCConnectionState.state &&
      RTCConnectionState.state === "RTC_DISCONNECTED" &&
      !Object.hasOwnProperty.call(RTCConnectionState, "streamKey")
    )
      this.setState((prevState) => ({
        startTime: Date.now(),
        delta: prevState.delta,
        voiceId: UltimateChannelStore.getVoiceChannelId(),
      }));
  }

  public componentDidMount() {
    if (this.state.voiceId) {
      clearTimeout(this.previousTimeout);
      this.setState((prevState) => prevState.previousState);
    } else {
      this.setState((prevState) => ({
        startTime: Date.now(),
        delta: prevState.delta,
        voiceId: UltimateChannelStore.getVoiceChannelId(),
      }));
    }

    FluxDispatcher.subscribe("RTC_CONNECTION_STATE", this.handleRTCDispatch);

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        startTime: prevState.startTime,
        delta: Math.round((Date.now() - prevState.startTime) / 1000) * 1000,
        voiceId: UltimateChannelStore.getVoiceChannelId(),
      }));
    }, 1000);
  }

  public componentWillUnmount() {
    FluxDispatcher.unsubscribe("RTC_CONNECTION_STATE", this.handleRTCDispatch);

    clearInterval(this.interval);

    this.setState((prevState) => ({
      startTime: prevState.startTime,
      delta: prevState.delta,
      voiceId: prevState.voiceId,
      previousState: {
        startTime: prevState.startTime,
        delta: prevState.delta,
        voiceId: prevState.voiceId,
      },
    }));

    this.previousTimeout = setTimeout(() => {
      this.setState(() => ({
        startTime: 0,
        delta: 0,
      }));
    }, 5000);
  }

  public render() {
    return (
      <div
        key="timer"
        className="vc-duration-timer"
        style={{
          paddingTop: "2.5px",
        }}>
        Time elapsed: {this.renderTimestamp()}
      </div>
    );
  }
  public renderTimestamp() {
    switch (SettingValues.get("format", defaultSettings.format)) {
      case "timestamp":
        return Utils.convertToTimestamp(this.state.delta);
      case "human":
        return Utils.convertToHumanReadable(this.state.delta);
      case "stopwatch":
      default:
        return Utils.convertToStopwatch(this.state.delta);
    }
  }
}
