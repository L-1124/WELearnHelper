import { proxy, subscribe, useSnapshot } from "valtio";
import { devtools } from "valtio/utils";

import logger, { IRecord } from "../../utils/logger";
import { IQuestionContent } from "../../features/welearn/services/answerHub";
import { setValue } from "../../utils/polyfill";
import { IWELearnSettings, SectionSetting } from "../../utils/setting";
import { ICommonSettings } from "../../utils/setting/common";

class Store {
    visibility = {
        panel: true,
        floating: false,
    };
    courseContext = {
        courseInfo: "",
        identifier: "",
        type: "" as "MANIFEST" | "ET" | "DATA_SOLUTION" | "READING" | "APP" | "UNSOLVED" | "",
    };
    msg = "";
    private messageQueue: Array<{ message: string; duration: number }> = [];
    private isDisplayingMessage = false;

    showMsg(message: string, duration: number = 1500) {
        this.messageQueue.push({ message, duration });
        if (!this.isDisplayingMessage) {
            this.processMessageQueue();
        }
    }

    private async processMessageQueue() {
        if (this.messageQueue.length === 0) {
            this.isDisplayingMessage = false;
            return;
        }
        this.isDisplayingMessage = true;
        const { message, duration } = this.messageQueue.shift()!;
        this.msg = message;
        logger.debug("showMsg", message, duration);
        await new Promise(resolve => setTimeout(resolve, duration));
        this.msg = "";
        await new Promise(resolve => setTimeout(resolve, 200));
        this.processMessageQueue();
    }
    setVisibility(key: keyof typeof this.visibility, value: boolean) {
        this.visibility[key] = value;
    }
    panelSize = {
        width: 400,
        height: 360,
        autoHeight: true,
    };
    setPanelSize(size: Partial<{ width: number, height: number, autoHeight: boolean }>) {
        this.panelSize = { ...this.panelSize, ...size };
    }

    globalPosition = {
        x: 100,
        y: 100,
    };

    setGlobalPosition(position: { x: number, y: number }) {
        this.globalPosition = position;
    }

    tabIndex: number = 0;
    setTabIndex(index: number) {
        this.tabIndex = index;
    }

    userSettings = {} as IWELearnSettings & ICommonSettings;
    sectionSettings: SectionSetting<IWELearnSettings & ICommonSettings>[] = [];

    /** 因为subscribe了这个key，如果直接替换(=)，会导致subscribe失效 */
    setUserSettings(userSettings: Partial<IWELearnSettings & ICommonSettings>) {
        for (const [key, value] of Object.entries(userSettings || {})) {
            // @ts-ignore
            this.userSettings[key] = value;
        }
    }

    /**
     * 通过集成了所有插件设置的设置中心，设置USER_SETTINGS的默认值
     */
    setDefaultValues() {
        for (const section of this.sectionSettings) {
            for (const generic of section.settings) {
                if (this.userSettings[generic.id] === undefined) {
                    // @ts-ignore
                    this.userSettings[generic.id] = generic.default;
                }
            }
        }
    }

    /** 恢复默认值 */
    resetDefaultValues() {
        for (const section of this.sectionSettings) {
            for (const generic of section.settings) {
                // @ts-ignore
                this.userSettings[generic.id] = generic.default;
            }
        }
    }

    answers: IQuestionContent[] = [];

    addAnswer(answer: IQuestionContent) {
        this.answers.push(answer);
    }

    clearAnswers() {
        this.answers = [];
    }

    logs: IRecord[] = [];
    clearLogs(remain?: number) {
        if (remain) {
            this.logs = this.logs.slice(0, remain);
        } else {
            this.logs = [];
        }
    }
    getRecordById(id: string) {
        return this.logs.find((record) => record.id === id);
    }
    // 不知道是不是因为是proxy，所以这个方法不起作用
    // updateRecord(record: Pick<IRecord, "id"> & Partial<IRecord>) {
    //     const index = this.logs.findIndex((log) => log.id === record.id);
    //     if (index !== -1) {
    //         logger.debug("in updateRecord", record)
    //
    //         this.logs[index] = { ...this.logs[index], ...record };
    //     }
    // }
}

export const store = proxy(new Store());

export const useStore = () => useSnapshot(store);

devtools(store, {
    name: "store",
});

subscribe(store.userSettings, async () => {
    await setValue("userSettings", store.userSettings);
    logger.debug("userSettings已持久化");
});

export const CONSTANT = {
    QUERY_INTERVAL: 2000,
    DEBUG_MODE: false,
} as const;
