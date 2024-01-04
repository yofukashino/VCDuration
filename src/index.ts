import { Injector, Logger } from "replugged";

export const PluginLogger = Logger.plugin("VCDuration");

export const PluginInjector = new Injector();

import Injections from "./patches/index";

export const start = (): void => {
  Injections.applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};
