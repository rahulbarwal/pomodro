<script lang="ts">
  import TimerValEditor from "./settings/TimerValEditor.svelte";

  //#region Props

  //#endregion Props
  //#region Initialisations
  const properties = [
    { title: "Session", val: 25, incrementBy: 5, max: 120, min: 15 },
    { title: "Short break", val: 5, incrementBy: 5, max: 15, min: 5 },
    { title: "Long break", val: 15, incrementBy: 5, max: 30, min: 15 },
  ];

  //#endregion Initialisations
  //#region Method Declarations
  function modifyValue(index: number, increment: boolean) {
    const shouldModify =
      (increment && properties[index].val < properties[index].max) ||
      (!increment && properties[index].val > properties[index].min);
    if (!shouldModify) {
      return;
    }
    if (increment) {
      properties[index].val += properties[index].incrementBy;
    } else {
      properties[index].val -= properties[index].incrementBy;
    }
  }
  //#endregion Method Declarations
  //#region Main Execution

  //#endregion Main Execution
</script>

<main class="container mx-auto max-w-lg border-2 rounded-md p-8 shadow-2xl">
  {#each properties as property, idx}
    <section class="my-6">
      <TimerValEditor
        bind:val={property.val}
        {...property}
        on:increment={() => modifyValue(idx, true)}
        on:decrement={() => modifyValue(idx, false)}
      />
    </section>
  {/each}
</main>
