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

  const grandChild: React.ReactElement[] = child?.props?.children;

  const timerExists = Array.isArray(grandChild) && grandChild?.some((c) => c.props.key === "timer");

  if (!grandChild || timerExists) return res;

  child.props.children = Array.isArray(grandChild)
    ? [...Array.from(grandChild), <Timer key="timer" />]
    : [grandChild, <Timer key="timer" />];

  res.props.className = classNames(
    res.props.className as string,
    "VCDuration_rtcConnectionStatusWrapper",
  );

  return res;
});
