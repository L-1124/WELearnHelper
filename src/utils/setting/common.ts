import { SectionSetting } from ".";

export interface ICommonSettings {
    themeColor: string;
    autoScrollDown: boolean;
    autoSwitchAnswer: boolean;
}

export const commonSettings: SectionSetting<ICommonSettings>[] = [
    {
        title: "外观",
        settings: [
            {
                id: "autoScrollDown",
                name: "自动下滑",
                default: true,
                valueType: "boolean",
                description: "有新消息时，窗口是否自动下滑到新消息处",
            },
            {
                id: "autoSwitchAnswer",
                name: "自动切换答案",
                default: true,
                valueType: "boolean",
                description: "捕获到新题目时，是否自动切换到最新答案",
            },
        ],
    },
];
