import { useTheme } from "@emotion/react";

import { GenericSetting } from "../../utils/setting";
import { ConfigControl } from "./ConfigControl";
import { SettingDesc, SettingItem, SettingLabel, SettingName } from "./styles";

export function ConfigSection({ settings }: { settings: readonly GenericSetting[] }) {
    return (

        <div className="flex flex-col gap-2">
            {settings.map((setting) => (
                <SettingItem key={`${String(setting.id)}-${setting.name}`}>
                    <SettingLabel>
                        <SettingName>{setting.name}</SettingName>
                        <SettingDesc>{setting.description}</SettingDesc>
                    </SettingLabel>
                    <ConfigControl genericSetting={setting} />
                </SettingItem>
            ))}
        </div>
    );

}
