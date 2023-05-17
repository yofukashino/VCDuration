import { common } from "replugged";
import * as Utils from "../lib/utils";
import * as Types from "../types";

const { fluxDispatcher: FluxDispatcher, React, channels: UltimateChannelStore } = common;

export default class Timer extends React.Component<{}, Types.TimerState> {
  constructor(props) {
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
        {...{
          key: "timer",
          className: "vc-duration-timer",
          style: {
            paddingTop: "2.5px",
          },
        }}>
        Time elapsed: {Utils.convertToTimestamp(this.state.delta)}
      </div>
    );
  }
}
