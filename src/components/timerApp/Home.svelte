<script>
  import Timer from "./timer/SessionBreakTimer.svelte";
  import CompletedSessions from "./SessionsHistory.svelte";
  import { IsTimerActive } from "../../store/timer.state";
  import {
    SessionSetting,
    ShortBreakSetting,
    LongBreakSetting,
  } from "../../store/timerSettings.state";
  import { onDestroy } from "svelte";
  import { UserSettings } from "../../store/user.state";

  let isTimerActive = false;
  let sessionTimerVal = 25;
  let shortBreakTimerVal = 5;
  let longBreakTimerVal = 15;

  const timerActiveUnSub = IsTimerActive.subscribe(
    (val) => (isTimerActive = val)
  );
  const sessionTimerUnSub = SessionSetting.subscribe(
    (val) => (sessionTimerVal = val.val)
  );
  const shortBreakTimerUnSub = ShortBreakSetting.subscribe(
    (val) => (shortBreakTimerVal = val.val)
  );
  const longBreakTimerUnSub = LongBreakSetting.subscribe(
    (val) => (longBreakTimerVal = val.val)
  );

  onDestroy(() => {
    timerActiveUnSub();
    sessionTimerUnSub();
    shortBreakTimerUnSub();
    longBreakTimerUnSub();
  });
</script>

<div
  class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10 flex flex-col gap-16 justify-center"
>
  <Timer
    minutes={sessionTimerVal}
    shortBreakMins={shortBreakTimerVal}
    longBreakMins={longBreakTimerVal}
  />
</div>

<div
  class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center {isTimerActive
    ? 'opacity-10'
    : 'opacity-100'}"
>
  <CompletedSessions />
</div>
