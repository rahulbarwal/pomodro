import type { DBAPI } from ".";
import type { IDayPomodro } from "../store/timer.state";

class localStorageDBAPI implements DBAPI {
    getDataForDate(date: string): IDayPomodro {
        return JSON.parse(localStorage.getItem(date)) as IDayPomodro;
    };
    saveDataForDate(date: string, data: IDayPomodro) {
        localStorage.setItem(date, JSON.stringify(data));
    };
}

export const dbObj = new localStorageDBAPI();