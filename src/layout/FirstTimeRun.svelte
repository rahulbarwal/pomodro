<script lang="ts">
  import { onDestroy } from "svelte";
  import Settings from "../components/settings/Settings.svelte";
  import { UserSettings } from "../store/user.state";
  import { navigateTo } from "svelte-router-spa";

  const userUnSub = UserSettings.subscribe(
    (val) => val.firstRun && navigateTo("/")
  );

  onDestroy(() => {
    userUnSub();
  });
</script>

<section class="w-full text-gray-400 bg-gray-900 body-font">
  <div class="container mx-auto flex flex-col gap-10 px-5 items-center">
    <h1 class="font-semibold text-2xl text-green-400">
      You can ignore these and
      <a href="/" class="underline italic"> move </a>
      to timer with default settings.
    </h1>
    <Settings />

    <button
      class="mt-10 rounded-lg px-4 py-2 text-green-400 font-semibold text-2xl hover:bg-white hover:text-green-600"
      on:click={() => UserSettings.markFirstRunDone()}
    >
      <a href="/" class="no-underline hover:no-underline">Go to app</a></button
    >
  </div>
</section>
