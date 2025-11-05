import { util, webpack } from "replugged";
import { PluginInjector } from "@this";
import { RTCPanel, RTCPanelClasses } from "@lib/RequiredModules";
import Timer from "@components/Timer";

import type Types from "@Types";
import { classNames } from "replugged/common";

const render = webpack.getFunctionKeyBySource(RTCPanel, "RTC_CONNECTED");
PluginInjector.after(RTCPanel, render, (_args, res) => {
  const child = util.findInReactTree(res, (c: Types.ReactTree) =>
    c?.props?.className?.includes(RTCPanelClasses?.channel),
  ) as Types.ReactTree;

  const timerExists =
    Array.isArray(child?.props?.children) &&
    child?.props?.children?.some((c) => c.props.key === "timer");

  if (!child?.props?.children || timerExists) return res;

  child.props.children = Array.isArray(child?.props?.children)
    ? [...Array.from(child?.props?.children), <Timer />]
    : [child?.props?.children, <Timer />];

  res.props.className = classNames(res.props.className, "VCDuration_rtcConnectionStatusWrapper");

  return res;
});
