import { store } from "@store";

function scrollDown() {
    //等待message渲染完成，不然不会拉到最底
    setTimeout(() => {
        document
            .querySelector("#log-panel-log-container .simplebar-content-wrapper")
            ?.scrollBy(0, 1000);
    }, 10);
}

export const RECORD_TYPES = ["info", "error", "hr"] as const;

export type RecordType = typeof RECORD_TYPES[number];

export interface IRecord<T = RecordType, C = any> {
    id: string;
    timestamp: string;
    type: T;
    content: C;
    extra?: string;
}

export type IInfoRecord = IRecord<"info", string>;

export interface IErrorContent {
    message: string;
}

export type IErrorRecord = IRecord<"error", IErrorContent>;

interface ILoggerRecordParams<C = any> {
    id?: string;
    content: C;
    extra?: string;
}

export class Logger {
    maxSize: number;
    shiftOffset: number;

    constructor(maxSize = 100, shiftOffset = 10) {
        this.maxSize = maxSize;
        this.shiftOffset = shiftOffset;
    }

    get logs() {
        return store.logs;
    }

    private addLog(log: IRecord) {

        store.logs.push(log);

        if (store.userSettings.autoScrollDown) {
            scrollDown();
        }
    }

    log(option: Pick<IRecord, "type" | "content" | "extra"> & Partial<IRecord>) {
        this.addLog({
            ...option,
            timestamp: new Date().toISOString(),
            id: option.id ?? `${Math.random()}`,
        });
    }

    info({ id, content, extra }: ILoggerRecordParams<string>) {
        return this.log({ type: "info", id, content, extra });
    }
    error({ id, content, extra }: ILoggerRecordParams<IErrorContent>) {
        return this.log({ type: "error", id, content, extra });
    }

    debug(...content: any) {
        if (import.meta.env.DEV) {
            console.log(`[WeLearnHelper]`, ...content);
        }
    }
}

const logger = new Logger();
export default logger;
