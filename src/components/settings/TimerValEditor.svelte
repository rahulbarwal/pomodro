<script lang="ts">
  import { createEventDispatcher } from "svelte";

  //#region Props
  export let title: string;
  export let val: number;
  export let incrementBy: number = 5;

  //#endregion Props
  //#region Initialisations
  const dispatcher = createEventDispatcher();

  //#endregion Initialisations
  //#region Method Declarations
  function increment() {
    dispatcher("increment");
  }

  function decrement() {
    dispatcher("decrement");
  }
  //#endregion Method Declarations
  //#region Main Execution

  //#endregion Main Execution
</script>

<section class="text-xl font-semibold flex justify-between items-center">
  <span>{title}</span>
  <section class="flex items-end">
    <article class="opacity-20 cursor-pointer" on:click={decrement}>
      -{incrementBy}
    </article>
    <span class="mx-8 text-4xl">{val}</span>
    <article class="opacity-20 cursor-pointer" on:click={increment}>
      +{incrementBy}
    </article>
  </section>
</section>
