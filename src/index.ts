import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";

export const SettingValues = await settings.init("dev.tharki.VCDuration", defaultSettings);
export const PluginLogger = Logger.plugin("VCDuration");

export const PluginInjector = new Injector();

import Injections from "./injections/index";
import Settings from "./Components/Settings";

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";
