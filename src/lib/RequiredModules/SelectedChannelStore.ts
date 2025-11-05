import { webpack } from "replugged";
import Types from "@Types";

export interface SelectedChannelStore extends Types.Store {
  getVoiceChannelId: () => string;
}

export default await webpack
  .waitForStore<SelectedChannelStore>("SelectedChannelStore", {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find SelectedChannelStore");
  });
