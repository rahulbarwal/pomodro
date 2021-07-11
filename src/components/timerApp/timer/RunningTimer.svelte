<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { padWithChar } from "../../../utils/string.utils";

  //#region Props
  export let minutes: number = 25;
  export let size: "sm" | "md" | "lg" = "md";
  //#endregion Props

  //#region Initialisations
  let timeVal;
  let isTimerRunning = false;
  let timerIntervalRef;
  const dispatch = createEventDispatcher();
  let speedUp = false;
  //#endregion Initialisations

  //#region Declarations
  function intializeTimer() {
    timeVal = { mins: minutes, secs: 0 };
  }

  function getSpanClass() {
    let css = "font-semibold ";
    switch (size) {
      case "sm":
        css += " text-5xl";
        break;
      case "md":
        css += " text-7xl";
        break;
      case "lg":
        css += " text-9xl";
        break;
    }
    return css;
  }

  function startTimer() {
    const deductTime = ({ mins, secs }) => {
      if (secs === 0) {
        if (mins === 0) {
          return { mins, secs };
        }
        return { mins: mins - 1, secs: 59 };
      }
      return { mins, secs: secs - 1 };
    };
    if (speedUp) {
      timeVal = { mins: 0, secs: 2 };
    }
    isTimerRunning = true;
    dispatchStartSession();
    timerIntervalRef = setInterval(() => {
      timeVal = deductTime(timeVal);
      const timerFinished = timeVal.mins === 0 && timeVal.secs === 0;
      if (timerFinished) {
        clearInterval(timerIntervalRef);
        finishSession();
      }
    }, 1000);
  }

  function dispatchStartSession() {
    const isFreshSession = isTimerRunning && timeVal.mins === minutes;
    dispatch("timerStarted", { isFreshSession });
  }

  function finishSession() {
    dispatch("timerEnded");
    isTimerRunning = false;
  }

  function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timerIntervalRef);
    dispatch("timerPaused");
  }

  //#endregion Declarations

  //#region Main Execution
  const spanClass = getSpanClass();
  intializeTimer();
  //#endregion Main Execution
</script>

<section class="flex justify-center">
  <span class={spanClass}>
    {padWithChar(timeVal.mins)} : {padWithChar(timeVal.secs)}
  </span>
</section>
<button
  class="p-2 rounded-md border-indigo-400 hover:bg-indigo-200 hover:text-black"
  type="button"
  on:click={isTimerRunning ? pauseTimer : startTimer}
>
  {isTimerRunning ? "Pause" : "Start"}
</button>
