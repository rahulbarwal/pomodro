<script lang="ts">
  export let labels: string[];
  export let selectedLabel: string;

  //#region  Declarations
  function selectLabel(label: string) {
    selectedLabel = label;
  }
  //#endregion Declarations
</script>

<main class="border border-gray-400 flex flex-col gap-4 rounded p-6 pt-4">
  <h4 class="font-semibold text-xl text-indigo-500">Tag this session</h4>
  <section class="flex gap-4">
    {#each labels as label}
      <span
        class="rounded-xl border py-1 px-4 cursor-pointer hover:bg-indigo-400 hover:border-indigo-400 hover:text-black
      {label === selectedLabel
          ? 'bg-indigo-400 border-indigo-400 text-black'
          : 'bg-transparent'}"
        on:click={() => selectLabel(label)}
      >
        {label}
      </span>
    {/each}
  </section>
</main>
