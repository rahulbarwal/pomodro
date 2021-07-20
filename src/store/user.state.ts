import { writable as SvelteWritable } from 'svelte/store';
import { dbObj } from "../db/localStorage";
interface IUserSettings {
    firstRun: boolean;
}

const initVal: IUserSettings = {
    firstRun: false
}

function createSettings() {
    const { subscribe, set, update } = SvelteWritable<IUserSettings>(initVal);
    const existing = dbObj.getUserSettings();
    if (existing) {
        try {
            set({
                firstRun: existing.firstRun
            })
        } catch (error) {
            set(initVal);
        }
    }
    return {
        subscribe,
        markFirstRunDone: () => {
            update((val: IUserSettings) => {
                const newVal: IUserSettings = { ...val, firstRun: true };
                dbObj.saveUserSettings(newVal);
                return newVal;
            })
        },
        reset: () => set(initVal)
    };
}

export const UserSettings = createSettings();
export type { IUserSettings };