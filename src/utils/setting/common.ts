import { SectionSetting } from ".";

export interface ICommonSettings {
    themeColor: string;
    autoScrollDown: boolean;
}

export const commonSettings: SectionSetting<ICommonSettings>[] = [
    {
        title: "外观",
        settings: [
            {
                id: "themeColor",
                name: "主题颜色",
                type: "selection",
                default: "teal",
                valueType: "string",
                description: "选择您喜欢的主题配色方案",
                options: [
                    { label: "青绿 (Teal)", value: "teal" },
                    { label: "紫罗兰 (Violet)", value: "violet" },
                    { label: "蓝色 (Blue)", value: "blue" },
                    { label: "品红 (Magenta)", value: "magenta" },
                    { label: "橙色 (Orange)", value: "orange" },
                ],
            },
            {
                id: "autoScrollDown",
                name: "自动下滑",
                default: true,
                valueType: "boolean",
                description: "有新消息时，窗口是否自动下滑到新消息处",
            },
        ],
    },
];
