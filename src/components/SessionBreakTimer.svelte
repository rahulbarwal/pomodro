<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import RunningTimer from "./RunningTimer.svelte";
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

  function incrementSessions() {
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

  function startSession() {
    incrementSessions();
    updateTimerMins(null);
  }

  function onTimerEnded() {
    isSessionFinishing ? startBreak() : startSession();
    isSessionFinishing = !isSessionFinishing;
    dispatch("timerEnded");
  }
  //#endregion Method Declarations
  //#region Main Execution

  //#endregion Main Execution
</script>

{#key sessionMins}
  <h3 class="text-xl  font-semibold">Session #{workSessionsCompleted + 1}</h3>
  <RunningTimer
    minutes={sessionMins}
    size={"lg"}
    on:timerStarted
    on:timerPaused
    on:timerEnded={() => onTimerEnded()}
  />
{/key}
