<script lang="ts">
  import TimerValEditor from "./settings/TimerValEditor.svelte";
  import { settingsStore } from "../store/timerSettings.state";
  import type { ITimerSettings } from "../store/timerSettings.state";

  let properties: ITimerSettings[];
  settingsStore.subscribe((val) => (properties = val));
</script>

<main class="container mx-auto max-w-lg border-2 rounded-md p-8 shadow-2xl">
  {#each properties as property, idx}
    <section class="my-6">
      <TimerValEditor
        bind:val={property.val}
        {...property}
        on:increment={() =>
          settingsStore.incrementTimerVal(property.title)}
        on:decrement={() =>
          settingsStore.decrementTimerVal(property.title)}
      />
    </section>
  {/each}
</main>
