import { useDebounceFn } from "ahooks";
import { useEffect, useState } from "react";

import { animated, config, useSpring } from "@react-spring/web";

import { store, useStore } from "@core";
import { GenericSetting } from "@utils/setting";
import Switch from "./Switch";
import { StyledInput, StyledTextArea, StyledSelect } from "./styles";

export function ConfigControl({
    genericSetting: { id, valueType, readonly, type, options },
}: {
    genericSetting: GenericSetting;
}) {
    const [statusText, setStatusText] = useState("");

    const [spring, api] = useSpring<{ right: string; opacity: number }>(() => ({
        config: {
            ...config.wobbly,
        },
    }));

    const { userSettings } = useStore();

    const value = userSettings[id as keyof typeof userSettings];

    const [localValue, setLocalValue] = useState(value);

    const { run: onChangeDebounced } = useDebounceFn(
        (newValue: unknown) => {
            if (newValue === value) return;

            // Use setUserSettings to properly trigger valtio reactivity
            store.setUserSettings({ [id]: newValue });
            setStatusText("已保存");

            setTimeout(() => {
                setStatusText("");
            }, 1000);
        },
        {
            wait: 500, // Reduced debounce for faster feedback
        },
    );

    useEffect(() => {
        api.start({
            right: statusText ? "0%" : "-100%",
            opacity: statusText ? 1 : 0,
        });
    }, [statusText]);

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
                    style={{ height: 38 }}
                />
            );
            break;
        case "number":
            element = (
                <StyledInput
                    type={"number"}
                    value={localValue as number}
                    onBlur={(e) => setLocalValue(e.target.value)}
                    onChange={(e) => setLocalValue(e.target.value)}
                    style={{ width: 80, textAlign: "center" }}
                    disabled={readonly}
                />
            );
            break;
        case "boolean":
            element = (
                <Switch
                    height={24}
                    checked={localValue as boolean}
                    onChange={setLocalValue}
                    disabled={readonly}
                />
            );
            break;
    }

    // Override with selection dropdown if type is 'selection' and options exist
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
            {/* @ts-ignore */}
            <animated.div
                style={{
                    position: "relative",
                    fontSize: 12,
                    color: "green",
                    ...spring,
                }}
            >
                {statusText}
            </animated.div>
            {element}
        </div>
    );
}
