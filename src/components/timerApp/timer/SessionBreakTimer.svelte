<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import RunningTimer from "./RunningTimer.svelte";
  import TagSession from "./TagSession.svelte";
  import { pomodroState, IsTimerActive } from "../../../store/timer.state";
  import type { IIndividualPomodro } from "../../../store/timer.state";
  import { getNowTime } from "../../../utils/date-time.utils";
  //#region Props
  export let minutes: number = 25;
  export let shortBreakMins: number = 5;
  export let longBreakMins: number = 15;
  //#endregion Props

  //#region Initialisations
  let sessionMins = minutes;
  let breakType: "short" | "long" = "short";
  let isSessionFinishing: boolean = true;
  let workSessionsCompleted = 0;
  let maxSessionsAtOnce = 4;
  let currentPomodroSession: IIndividualPomodro = {
    timeEnd: "",
    timeStart: "",
    label: null,
    timerMinutes: minutes,
  };
  const dispatch = createEventDispatcher();

  //#endregion Initialisations
  //#region Method Declarations
  function updateTimerMins(breakType: "short" | "long" | null) {
    if (breakType === "short") {
      sessionMins = shortBreakMins;
    } else if (breakType === "long") {
      sessionMins = longBreakMins;
    } else {
      sessionMins = minutes;
    }
  }

  function incrementSessionsCount() {
    if (workSessionsCompleted === maxSessionsAtOnce - 1) {
      workSessionsCompleted = 0;
    } else {
      workSessionsCompleted++;
    }
  }

  function startBreak() {
    breakType =
      workSessionsCompleted === maxSessionsAtOnce - 1 ? "long" : "short";
    updateTimerMins(breakType);
  }

  function startSession(event) {
    IsTimerActive.set(true);
    if (event.detail.isFreshSession) {
      currentPomodroSession.timeStart = getNowTime();
    }
  }

  function updateTimerTypeToSession() {
    incrementSessionsCount();
    updateTimerMins(null);
  }

  function onTimerEnded() {
    IsTimerActive.set(false);
    if (isSessionFinishing) {
      startBreak();
      updatePomodroEndSessionTimer();
    } else {
      updateTimerTypeToSession();
    }
    isSessionFinishing = !isSessionFinishing;
    dispatch("timerEnded");
  }

  function updatePomodroEndSessionTimer() {
    currentPomodroSession.timeEnd = getNowTime();
    pomodroState.addSession(currentPomodroSession);
  }
  //#endregion Method Declarations
  //#region Main Execution

  //#endregion Main Execution
</script>

<h3 class="text-xl  font-semibold">
  Session #{workSessionsCompleted + 1}
</h3>
{#key sessionMins}
  <RunningTimer
    minutes={sessionMins}
    size={"lg"}
    on:timerStarted={(event) => startSession(event)}
    on:timerEnded={() => onTimerEnded()}
  />
{/key}
<TagSession
  on:labelChange={(event) => (currentPomodroSession.label = event.detail)}
/>
