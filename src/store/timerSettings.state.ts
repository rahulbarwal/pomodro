import { writable as SvelteWritable, derived } from 'svelte/store';

interface ITimerSettings {
    title: string;
    val: number;
    incrementBy: number;
    max: number;
    min: number;

}
const SESSION_TITLE = "Session";
const SBREAK_TITLE = "Short break";
const LBREAK_TITLE = "Long break";

const initVal = [
    { title: SESSION_TITLE, val: 25, incrementBy: 5, max: 120, min: 15 },
    { title: SBREAK_TITLE, val: 5, incrementBy: 5, max: 15, min: 5 },
    { title: LBREAK_TITLE, val: 15, incrementBy: 5, max: 30, min: 15 },
]
const timerSettings = SvelteWritable<ITimerSettings[]>(initVal);

function createSettings() {
    const { subscribe, set, update } = timerSettings;
    return {
        subscribe,
        incrementTimerVal: (title: string) => {
            update((val: ITimerSettings[]) => {
                const newSettings = [...val];
                const settingToUpdate = newSettings.find(setting => setting.title === title);

                if (settingToUpdate.val < settingToUpdate.max) {
                    settingToUpdate.val += settingToUpdate.incrementBy;
                    return newSettings;
                } else {
                    return val;
                }
            })
        },
        decrementTimerVal: (title: string) => {
            update((val: ITimerSettings[]) => {
                const newSettings = [...val];
                const settingToUpdate = newSettings.find(setting => setting.title === title);

                if (settingToUpdate.val > settingToUpdate.min) {
                    settingToUpdate.val -= settingToUpdate.incrementBy;
                    return newSettings;
                } else {
                    return val;
                }
            })
        },
        reset: () => set(initVal)
    };
}

export const settingsStore = createSettings();
const SessionSetting = derived(timerSettings, $settings => $settings.find(val => val.title === SESSION_TITLE))
const ShortBreakSetting = derived(timerSettings, $settings => $settings.find(val => val.title === SBREAK_TITLE))
const LongBreakSetting = derived(timerSettings, $settings => $settings.find(val => val.title === LBREAK_TITLE))

export type { ITimerSettings };
export { SessionSetting, ShortBreakSetting, LongBreakSetting }
