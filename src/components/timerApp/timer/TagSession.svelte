<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import type { ILabelsStore } from "../../../store/labels.state";
  import { labelStore } from "../../../store/labels.state";

  //#region Initialisations
  let labels: ILabelsStore[];
  let selectedLabel: ILabelsStore;
  let dispatch = createEventDispatcher();

  const labelUnsub = labelStore.subscribe((val) => (labels = val));

  $: labelsLength = labels.length;
  onDestroy(() => {
    labelUnsub();
  });
  //#endregion Initialisations

  //#region  Declarations
  function selectLabel(label: ILabelsStore) {
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
      {selectedLabel && label.text === selectedLabel.text
          ? label.colorCss
          : 'bg-transparent'}"
        on:click={() => selectLabel(label)}
      >
        {label.text}
      </span>
    {/each}
  </section>
</main>
