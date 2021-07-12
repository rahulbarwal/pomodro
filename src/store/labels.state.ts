
import { writable as SvelteWritable } from 'svelte/store';
import { dbObj } from '../db/localStorage';

interface ILabelsStore {
    text: string;
    colorCss: string;
}

const ColorOptions = [
    {
        displayVal: "Blue",
        colorCss: "bg-blue-500 hover:bg-blue-500 border-blue-500 text-gray-800",
    },
    {
        displayVal: "Green",
        colorCss: "bg-green-400 hover:bg-green-400 border-green-400 text-gray-800",
    },
    {
        displayVal: "Red",
        colorCss: "bg-red-400 hover:bg-red-400 border-red-400 text-gray-800",
    },
    {
        displayVal: "Purple",
        colorCss: "bg-purple-500 hover:bg-purple-500 border-purple-500 text-gray-800",
    },
    {
        displayVal: "Yellow",
        colorCss: "bg-yellow-400 hover:bg-yellow-400 border-yellow-400 text-gray-800",
    },
];

const initVal: ILabelsStore[] = [
    { text: "Personal", colorCss: "bg-blue-500 border-blue-500 text-gray-800" },
    { text: "Office", colorCss: "bg-green-400 border-green-400 text-gray-800" },
    { text: "Study", colorCss: "bg-red-400 border-red-400 text-gray-800" },
    {
        text: "Learning",
        colorCss: "bg-purple-500 border-purple-500 text-gray-800",
    },
    {
        text: "Project",
        colorCss: "bg-yellow-400 border-yellow-400 text-gray-800",
    },
];

function createLabelStore() {

    const { subscribe, set, update } = SvelteWritable<ILabelsStore[]>(initVal);

    const labelsInDB = dbObj.getLabelData();
    labelsInDB && labelsInDB.length && set(labelsInDB);

    return {
        subscribe,
        addLabel: (val: ILabelsStore) => {
            update((store: ILabelsStore[]) => {
                const newStore = [...store, { ...val }];
                dbObj.saveLabelData(newStore);
                return newStore;
            })
        },
        removeLabel: (labelText: string) => {
            update((store: ILabelsStore[]) => {
                const idx = store.findIndex(val => val.text === labelText);
                if (idx > -1) {
                    const newStore = [...store.slice(0, idx), ...store.slice(idx + 1)];
                    dbObj.saveLabelData(newStore);
                    return newStore;
                }
                return store;
            })
        },
        reset: () => set(initVal)
    };
}

const labelStore = createLabelStore();

export type { ILabelsStore };
export { ColorOptions, labelStore }