import TimerApp from "../components/timerApp/Home.svelte";
import Settings from "../components/Settings.svelte";

const routes = [
  { name: '/', component: TimerApp },
  { name: 'settings', component: Settings },
]

export { routes }