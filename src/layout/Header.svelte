<script lang="ts">
  import { onDestroy } from "svelte";
  import { IsTimerActive } from "../store/timer.state";
  import { link } from "svelte-spa-router";
  let isTimerActive = false;

  const timerActiveUnSub = IsTimerActive.subscribe(
    (val) => (isTimerActive = val)
  );

  onDestroy(() => {
    timerActiveUnSub();
  });
</script>

<header class="text-gray-400 bg-gray-900 body-font">
  <div
    class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
  >
    <a
      use:link
      href="/"
      class="flex title-font font-medium items-center text-white mb-4 md:mb-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span class="ml-3 text-xl">Pomodoro</span>
    </a>
    <nav
      class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"
    >
      {#if !isTimerActive}
        <a
          class="text-gray-400 mr-5 hover:text-white hover:no-underline no-underline "
          use:link
          href="/">App</a
        >
        <a
          class="text-gray-400 mr-5 hover:text-white hover:no-underline no-underline "
          use:link
          href="/labels">Labels</a
        >
        <a
          class="mr-5 hover:text-white hover:no-underline no-underline text-gray-400"
          use:link
          href="/settings">Timer Settings</a
        >
      {/if}
    </nav>
    {#if !isTimerActive}
      <button
        class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
      >
        Log In
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    {/if}
  </div>
</header>
