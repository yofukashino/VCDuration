import { PluginInjector } from "../index";
import { RTCPanel, RTCPanelClasses } from "../lib/requiredModules";
import Timer from "../Components/Timer";
import * as Types from "../types";

export const patchPanelSubtext = (): void => {
  const PanelSubtext = Object.values(RTCPanel).find((mod: Types.PanelSubtext) =>
    mod?.render?.toString()?.includes(".createHref("),
  ) as Types.PanelSubtext;
  PluginInjector.before(PanelSubtext, "render", (args) => {
    const [{ children }] = args;
    if (
      children?.props?.className !== RTCPanelClasses?.channel ||
      (Array.isArray(children?.props?.children) &&
        children?.props?.children?.some((child) => child.props.key === "timer"))
    )
      return args;

    children.props.children = Array.isArray(children?.props?.children)
      ? [...Array.from(children?.props?.children), <Timer />]
      : [children?.props?.children, <Timer />];
    return args;
  });
};
