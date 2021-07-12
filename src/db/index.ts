import type { ILabelsStore } from "../store/labels.state";
import type { IDayPomodro } from "../store/timer.state";

export interface DBAPI {
    getUserSessionDataForDate(date: string): IDayPomodro;
    saveUserSessionDataForDate(date: string, data: IDayPomodro): void;
    saveLabelData(data: ILabelsStore[]): void;
    getLabelData(): ILabelsStore[];
}