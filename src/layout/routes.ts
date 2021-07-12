import TimerApp from "../components/timerApp/Home.svelte";
import Settings from "../components/settings/Settings.svelte";
import LabelEditor from "../components/labels/LabelEditor.svelte";

const routes = [
  { name: '/', component: TimerApp },
  { name: 'settings', component: Settings },
  { name: 'labels', component: LabelEditor },
]

export { routes }