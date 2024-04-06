import patchRTCPanel from "./RTCPanel";
export const applyInjections = (): void => {
  patchRTCPanel();
};

export default { applyInjections };
