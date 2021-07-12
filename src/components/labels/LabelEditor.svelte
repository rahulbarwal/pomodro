<script lang="ts">
  import { onDestroy } from "svelte";

  import type { ILabelsStore } from "../../store/labels.state";
  import { labelStore } from "../../store/labels.state";
  import NewLabel from "./NewLabel.svelte";
  //#region Props

  //#endregion Props
  //#region Initialisations
  let labels: ILabelsStore[] = [];
  const labelUnsub = labelStore.subscribe((val) => (labels = val));

  $: labelsLength = labels.length;
  onDestroy(() => {
    labelUnsub();
  });
  //#endregion Initialisations
</script>

<main class="container w-1/2 mx-auto">
  {#if labelsLength <= 4}
    <NewLabel />
  {/if}
  <section class="mt-8">
    <h1 class="font-semibold text-3xl text-green-500">Existing labels</h1>

    {#if labelsLength >= 5}
      <span class="mt-2 inline-block text-gray-500">
        No one can work on more than 5 tasks at once 😋. Remove some lables to
        add more
      </span>
    {/if}
    <article class=" py-8 flex gap-4 flex-wrap">
      {#each labels as label}
        <span
          class="flex items-center rounded-xl border py-1 px-4 cursor-pointer font-semibold {label.colorCss}"
        >
          {label.text}
          <span
            class=" ml-2 cursor-pointer inline-block trash-icon w-6 h-6"
            on:click={() => labelStore.removeLabel(label.text)}
          />
        </span>
      {/each}
    </article>
  </section>
</main>

<style>
  .trash-icon {
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNCIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMyA2IDUgNiAyMSA2Ii8+PHBhdGggZD0iTTE5IDZ2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNm0zIDBWNGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYyIi8+PC9zdmc+");
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
