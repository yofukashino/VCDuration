import { types } from "replugged";
import type * as flux from "replugged/dist/renderer/modules/common/flux";
import type util from "replugged/dist/renderer/util";

import type { RTCPanel } from "@lib/RequiredModules/RTCPanel";
import type { RTCPanelClasses } from "@lib/RequiredModules/RTCPanelClasses";
import type { SelectedChannelStore } from "@lib/RequiredModules/SelectedChannelStore";

export namespace Types {
  export import DefaultTypes = types;
  export type Store = flux.Store;
  export type ReactTree = util.Tree & React.ReactElement;

  export interface Modules {
    Proxy: Exclude<Modules, "Proxy" | "loadModules">;
    loadModules?: () => Promise<void>;
    RTCPanel?: RTCPanel["exports"];
    RTCPanelClasses?: RTCPanelClasses;
    SelectedChannelStore?: SelectedChannelStore;
  }
}
export default Types;
