import Modules from "../lib/requiredModules";
import injectRTCPanel from "./RTCPanel";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectRTCPanel();
};

export default { applyInjections };
