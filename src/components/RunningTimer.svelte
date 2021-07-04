<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let minutes: number = 25;
  export let size: "sm" | "md" | "lg" = "md";
  const dispatch = createEventDispatcher();

  let seconds = 10;
  let isTimerRunning = false;
  let intervalRef;
  minutes -= 1;

  //#region Declarations
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
    isTimerRunning = true;
    intervalRef = setInterval(() => {
      dispatch("timerStarted");
      seconds -= 1;
      if (seconds === 0) {
        if (minutes === 0) {
          seconds = 0;
          clearInterval(intervalRef);
          dispatch("timerEnded");
          isTimerRunning = false;
        } else {
          minutes -= 1;
          seconds = 60;
        }
      }
    }, 1000);
  }

  function pauseTimer() {
    isTimerRunning = false;
    clearInterval(intervalRef);
    dispatch("timerPaused");
  }

  function padWithChar(
    valToModify: string | number,
    paddingChar = "0",
    maxlength = 2
  ) {
    const valLength = valToModify.toString().length;
    if (valLength === maxlength) {
      return valToModify;
    }
    let paddingStr = "";
    for (let i = 0; i < maxlength - valLength; i++) {
      paddingStr += paddingChar;
    }
    return `${paddingStr}${valToModify}`;
  }
  //#endregion Declarations

  //#region Main Execution
  const spanClass = getSpanClass();
  //#endregion Main Execution
</script>

<section class="flex justify-center">
  <span class={spanClass}>
    {padWithChar(minutes)} : {padWithChar(seconds)}
  </span>
</section>
<button
  class="p-2 rounded-md border-indigo-400 hover:bg-indigo-200 hover:text-black"
  type="button"
  on:click={isTimerRunning ? pauseTimer : startTimer}
  >{isTimerRunning ? "Pause" : "Start"}</button
>
