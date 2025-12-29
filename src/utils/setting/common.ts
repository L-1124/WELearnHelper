import { SectionSetting } from ".";

export interface ICommonSettings {
    themeColor: string;
    autoScrollDown: boolean;
    enableTyping: boolean;
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

            {
                id: "enableTyping",
                name: "打字效果",
                default: true,
                valueType: "boolean",
                description:
                    "如果电脑配置比较低，启用打字效果时，可能会出现打字动画自身的卡顿" +
                    "或者打字动画导致的整个页面的卡顿；这种情况下，建议关闭",
            },
        ],
    },
];
