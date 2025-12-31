import { store } from "@store";

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
        console.log(`[WeLearnHelper]`, ...content);
    }
}

const logger = new Logger();
export default logger;
