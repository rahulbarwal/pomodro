import type { DBAPI } from ".";
import type { ILabelsStore } from "../store/labels.state";
import type { IDayPomodro } from "../store/timer.state";

class localStorageDBAPI implements DBAPI {
    getUserSessionDataForDate(date: string): IDayPomodro {
        return JSON.parse(localStorage.getItem(date)) as IDayPomodro;
    };
    saveUserSessionDataForDate(date: string, data: IDayPomodro) {
        localStorage.setItem(date, JSON.stringify(data));
    };
    getLabelData(): ILabelsStore[] {
        return JSON.parse(localStorage.getItem('LABELS')) as ILabelsStore[];
    };
    saveLabelData(data: ILabelsStore[]) {
        localStorage.setItem('LABELS', JSON.stringify(data));
    };
}

export const dbObj = new localStorageDBAPI();