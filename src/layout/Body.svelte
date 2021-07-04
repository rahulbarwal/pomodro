<script>
  import Timer from "../components/RunningTimer.svelte";
  import TagSession from "../components/TagSession.svelte";
  import CompletedSessions from "../components/CompletedSessions.svelte";

  let isTimerActive = false;
  let showHistory = false;

  const sessionLabels = ["Office", "Study", "Personal Project", "Learning"];
</script>

<section class="text-gray-400 bg-gray-900 body-font">
  <div
    class="container mx-auto flex px-5 py-24 md:flex-row flex-col "
  >
    <div
      class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10 flex flex-col gap-16 justify-center"
    >
      <Timer
        minutes={1}
        size={"lg"}
        on:timerStarted={() => (isTimerActive = true)}
        on:timerEnded={() => (isTimerActive = false)}
        on:timerPaused={() => (isTimerActive = false)}
      />
      <TagSession labels={sessionLabels} />
    </div>

    <div
      class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center {isTimerActive
        ? 'opacity-10'
        : 'opacity-100'}"
    >
      {#if showHistory}
        <CompletedSessions />
      {:else}
        <button
          type="button"
          on:click={() => (showHistory = true)}
          class="px-4 py-2 rounded-md"
        >
          Show history
        </button>
      {/if}
    </div>
  </div>
</section>
