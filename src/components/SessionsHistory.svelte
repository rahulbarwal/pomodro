<script lang="ts">
  import { onDestroy } from "svelte";

  import type { IDayPomodro } from "../store/timer.state";
  import { pomodroState } from "../store/timer.state";
  export let session: IDayPomodro;

  const sessions$ = pomodroState
    .getSessions()
    .subscribe((val) => (session = val));
  onDestroy(() => {
    sessions$();
  });
</script>

<h3 class="mb-8 text-2xl font-semibold">Session history</h3>

<div class="w-full flex justify-center bg-gray-900">
  <div class="w-full col-span-12">
    <div class="w-full overflow-auto lg:overflow-visible ">
      {#if session && session.pomodros.length}
        <table
          class="table w-full text-gray-400 border-collapse space-y-6 text-sm"
        >
          <thead class="bg-gray-800 text-gray-500">
            <tr>
              <th class="p-3 text-left">S.No.</th>
              <th class="p-3 text-left">Start</th>
              <th class="p-3 text-left">End</th>
              <th class="p-3 text-left flex justify-center">Label</th>
            </tr>
          </thead>
          <tbody>
            {#each session.pomodros as pomodro, idx}
              <tr class="bg-gray-800">
                <td class="p-3 text-green-400 font-semibold"> {idx+1} </td>
                <td class="p-3 font-bold"> {pomodro.timeStart} </td>
                <td class="p-3 font-bold"> {pomodro.timeEnd} </td>
                <td class="p-3 flex justify-center">
                  <span class="bg-green-500  text-gray-50 rounded-md px-2">
                    {pomodro.label}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <section class="flex justify-center text-xl text-gray-500">
          Nothing to show
        </section>
      {/if}
    </div>
  </div>
</div>

<style>
</style>
