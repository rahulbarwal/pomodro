import { writable as SvelteWritable } from 'svelte/store';
import { dbObj } from '../db/localStorage';
interface IIndividualPomodro {
    timerMinutes?: number;
    timeStart: string;
    timeEnd: string;
    label: string
}
interface IDayPomodro {
    pomodros: IIndividualPomodro[];
}

const pomodrosInDB = dbObj.getDataForDate((new Date()).toLocaleDateString());
const DayPomodrosState = SvelteWritable<IDayPomodro>(pomodrosInDB || { pomodros: [] });
const IsTimerActive = SvelteWritable<boolean>(false);

const pomodroState = {
    addSession: (pomodro: IIndividualPomodro) => {
        DayPomodrosState.update(val => {
            const newVal = { pomodros: [...val.pomodros, {...pomodro}] };
            dbObj.saveDataForDate((new Date()).toLocaleDateString(), newVal);
            return newVal;
        })
    },
    getSessions: () => DayPomodrosState
}


export type { IIndividualPomodro, IDayPomodro };

export {
    pomodroState,
    IsTimerActive
}