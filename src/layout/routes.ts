import TimerApp from "../components/timerApp/Home.svelte";
import Settings from "../components/settings/Settings.svelte";
import LabelEditor from "../components/labels/LabelEditor.svelte";
import FirstRun from "./FirstTimeRun.svelte";
import { dbObj } from "../db/localStorage";

import { wrap } from 'svelte-spa-router/wrap';

function isFirstRunDone(): boolean {
  return !!dbObj.getUserSettings()?.firstRun;
}

const routes = {
  '/': wrap({
    component: TimerApp,
    userData: {
      firstRunCheckFailed: false
    },
    conditions: [(detail) => {
      detail.userData['firstRunCheckFailed'] = true
      return isFirstRunDone()
    }]
  }),
  '/settings': Settings,
  '/labels': LabelEditor,
  '/first-run': wrap({
    component: FirstRun,
    userData: {
      firstRunCheckFailed: false
    },
    conditions: [
      detail => {
        detail.userData['firstRunCheckFailed'] = true
        return !isFirstRunDone()
      }
    ]
  }),
}

export { routes }