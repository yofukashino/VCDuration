import { util } from "replugged";
import { Select } from "replugged/components";
import { PluginLogger, SettingValues } from "@this";
import { DefaultSettings } from "@consts";

export const registerSettings = (): void => {
  type DefaultSettings = typeof DefaultSettings;
  type key = keyof DefaultSettings;
  type value = DefaultSettings[key];

  for (const key in DefaultSettings) {
    if (SettingValues.has(key as key)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${DefaultSettings[key]}.`);
    SettingValues.set(key as key, DefaultSettings[key] as value);
  }
};

export const Settings = (): React.ReactElement => {
  return (
    <>
      <Select
        label="Duration Format"
        description="Format for the duration."
        options={[
          { label: "1 Day 03:53:25", value: "timestamp" },
          { label: "27:53:25", value: "stopwatch" },
          {
            label: "1 Day 3 Hrs 53 Mins 25 Secs",
            value: "human",
          },
        ]}
        {...util.useSetting(SettingValues, "format", DefaultSettings.format)}
      />
    </>
  );
};

export default { registerSettings, Settings };
