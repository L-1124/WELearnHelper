import { SectionSetting } from "@utils/setting";

export interface IWELearnExamSettings {
    infiniteListening: boolean;
    cloudCrowdsourcing: boolean;
}

export const WELearnExamSettings: SectionSetting<IWELearnExamSettings>[] = [
    {
        title: "考试",
        settings: [
            {
                id: "infiniteListening",
                name: "无限听力",
                default: true,
                valueType: "boolean",
                description: "允许无限次播放听力音频",
            },
            // {
            //     id: "cloudCrowdsourcing",
            //     name: "云端众筹",
            //     default: false,
            //     valueType: "boolean",
            //     description: "允许通过助手后端查询和收录测试答案（众筹互助），关闭后将停止所有后端请求",
            // },
        ],
    },
];
