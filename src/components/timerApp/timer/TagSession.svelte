<script lang="ts">
  import { createEventDispatcher } from "svelte";

  //#region Initialisations
  export let labels: string[];
  let selectedLabel: string;
  let dispatch = createEventDispatcher();
  //#endregion Initialisations

  //#region  Declarations
  function selectLabel(label: string) {
    selectedLabel = label;
    dispatch("labelChange", label);
  }
  //#endregion Declarations
</script>

<main class="border border-green-400 flex flex-col gap-4 rounded p-6 pt-4">
  <h4 class="font-semibold text-xl text-green-500">Tag this session</h4>
  <section class="flex gap-4 flex-wrap">
    {#each labels as label}
      <span
        class="rounded-xl border py-1 px-4 cursor-pointer hover:bg-green-500 hover:border-green-500 hover:text-black
      {label === selectedLabel
          ? ' bg-green-500 border-green-500  text-black'
          : 'bg-transparent'}"
        on:click={() => selectLabel(label)}
      >
        {label}
      </span>
    {/each}
  </section>
</main>
