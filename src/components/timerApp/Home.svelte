<script>
  import Timer from "./timer/SessionBreakTimer.svelte";
  import CompletedSessions from "./SessionsHistory.svelte";
  import { IsTimerActive } from "../../store/timer.state";
  import { onDestroy } from "svelte";
  let isTimerActive = false;

  const timerActive$ = IsTimerActive.subscribe((val) => (isTimerActive = val));
  onDestroy(() => {
    timerActive$();
  });
</script>

<div
  class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10 flex flex-col gap-16 justify-center"
>
  <Timer minutes={25} />
</div>

<div
  class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center {isTimerActive
    ? 'opacity-10'
    : 'opacity-100'}"
>
  <CompletedSessions />
</div>
