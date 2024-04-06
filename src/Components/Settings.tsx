import { util } from "replugged";
import { SelectItem } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${defaultSettings[key]}.`);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};

export const Settings = () => {
  return (
    <div>
      <SelectItem
        note="Format for the duration."
        options={[
          { label: "1 Day 03:53:25", value: "timestamp" },
          { label: "27:53:25", value: "stopwatch" },
          {
            label: "1 Day 3 Hrs 53 Mins 25 Secs",
            value: "human",
          },
        ]}
        {...util.useSetting(SettingValues, "format", defaultSettings.format)}>
        Duration Format
      </SelectItem>
    </div>
  );
};

export default { registerSettings, Settings };
