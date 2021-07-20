import type { ILabelsStore } from "../store/labels.state";
import type { IDayPomodro } from "../store/timer.state";
import type { IUserSettings } from "../store/user.state";

export interface DBAPI {
    getUserSessionDataForDate(date: string): IDayPomodro;
    saveUserSessionDataForDate(date: string, data: IDayPomodro): void;

    saveLabelData(data: ILabelsStore[]): void;
    getLabelData(): ILabelsStore[];

    saveUserSettings(data: IUserSettings): void;
    getUserSettings(): IUserSettings;
}