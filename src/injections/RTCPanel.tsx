import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import Timer from "../Components/Timer";
import Utils from "../lib/utils";
import Types from "../types";
import { webpack } from "replugged";

export default (): void => {
  const PanelRender = webpack.getFunctionKeyBySource(Modules.RTCPanel, "RTC_CONNECTED");
  PluginInjector.after(Modules.RTCPanel, PanelRender, (_args, res: Types.ReactTree) => {
    const child = Utils.findInReactTree(res, (c: Types.ReactTree) =>
      c?.props?.className?.includes(Modules.RTCPanelClasses?.channel),
    ) as Types.ReactTree;

    if (
      !child?.props?.children ||
      (Array.isArray(child?.props?.children) &&
        child?.props?.children?.some((c) => c.props.key === "timer"))
    )
      return res;

    child.props.children = Array.isArray(child?.props?.children)
      ? [...Array.from(child?.props?.children), <Timer />]
      : [child?.props?.children, <Timer />];
    return res;
  });
};
