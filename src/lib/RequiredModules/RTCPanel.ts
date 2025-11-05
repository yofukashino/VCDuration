import { webpack } from "replugged";
import type Types from "@Types";

export type RTCPanel = Types.DefaultTypes.RawModule<
  Record<string, (...args: unknown[]) => Types.ReactTree & { props: { className: string } }>
>;

export default await webpack
  .waitForModule<RTCPanel>(webpack.filters.bySource(".rtcConnectionStatusConnecting"), {
    timeout: 10000,
    raw: true,
  })
  .then(({ exports }) => exports)
  .catch(() => {
    throw new Error("Failed To Find RTCPanel Module");
  });
