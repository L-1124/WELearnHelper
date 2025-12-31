import { useDebounceFn } from "ahooks";
import { useEffect, useState } from "react";

import { store, useStore } from "@core";
import { GenericSetting } from "@utils/setting";
import Switch from "./Switch";
import { StyledInput, StyledTextArea, StyledSelect, NumberInput } from "./styles";

export function ConfigControl({
    genericSetting: { id, valueType, readonly, type, options, default: defaultValue },
}: {
    genericSetting: GenericSetting;
}) {
    const { userSettings } = useStore();

    const value = userSettings[id as keyof typeof userSettings] ?? defaultValue;

    const [localValue, setLocalValue] = useState(value);

    const { run: onChangeDebounced } = useDebounceFn(
        (newValue: unknown) => {
            if (newValue === value) return;

            store.setUserSettings({ [id]: newValue });
            store.showMsg("设置已生效");
        },
        {
            wait: 800,
        },
    );

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        onChangeDebounced(localValue);
    }, [localValue]);

    let element: React.ReactNode = null;

    switch (valueType) {
        case "string":
            element = (
                <StyledTextArea
                    value={localValue as string}
                    onBlur={(e) => setLocalValue(e.target.value)}
                    onChange={(e) => setLocalValue(e.target.value)}
                    disabled={readonly}
                />
            );
            break;
        case "number":
            element = (
                <NumberInput
                    value={localValue as number}
                    onValueChange={(val) => setLocalValue(val)}
                    onBlur={(e) => setLocalValue(Number(e.target.value))}
                    disabled={readonly}
                />
            );
            break;
        case "boolean":
            element = (
                <Switch
                    checked={localValue as boolean}
                    onChange={setLocalValue}
                    disabled={readonly}
                />
            );
            break;
    }

    if (type === 'selection' && options && options.length > 0) {
        element = (
            <StyledSelect
                value={localValue as string}
                onChange={(e) => setLocalValue(e.target.value)}
                disabled={readonly}
            >
                {options.map((opt) => (
                    <option key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                    </option>
                ))}
            </StyledSelect>
        );
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {element}
        </div>
    );
}
