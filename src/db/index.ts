import type { IDayPomodro } from "../store/timer.state";

export interface DBAPI {
    getDataForDate(date: string): IDayPomodro;
    saveDataForDate(date: string, data: IDayPomodro):void;
}