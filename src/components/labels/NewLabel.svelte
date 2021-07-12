<script lang="ts">
  import { labelStore, ColorOptions } from "../../store/labels.state";
  let newLabelSelectedColorCss;
  let newLabelText: string = "";

  //#region Declarations
  function addNewLabel(labelText: string, colorCss: string) {
    labelStore.addLabel({ text: labelText, colorCss });
  }
  //#endregion Declarations
</script>

<section class="flex gap-2">
  <input
    type="text"
    class="w-full p-4 border-2 rounded-md text-gray-600 font-semibold"
    placeholder="New Label"
    bind:value={newLabelText}
  />
  <select
    class="w-1/5 p-4 border-2 rounded-md text-gray-600 font-semibold"
    bind:value={newLabelSelectedColorCss}
  >
    <option value={null}>Color</option>
    {#each ColorOptions as color}
      <option class="p-2 {color.colorCss}" value={color.colorCss}>
        {color.displayVal}
      </option>
    {/each}
  </select>
  <button
    id="add-label-btn"
    type="button"
    class="p-2 rounded-md bg-green-400 border-green-400 font-semibold text-4xl flex items-center justify-center"
    disabled={newLabelText.length === 0 || !newLabelSelectedColorCss}
    on:click={() => addNewLabel(newLabelText, newLabelSelectedColorCss)}
  >
    <span class="add-icon w-8 h-8" />
  </button>
</section>

<style>
  .add-icon {
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNMjgsMTRIMThWNGMwLTEuMTA0LTAuODk2LTItMi0ycy0yLDAuODk2LTIsMnYxMEg0Yy0xLjEwNCwwLTIsMC44OTYtMiwyczAuODk2LDIsMiwyaDEwdjEwYzAsMS4xMDQsMC44OTYsMiwyLDIgIHMyLTAuODk2LDItMlYxOGgxMGMxLjEwNCwwLDItMC44OTYsMi0yUzI5LjEwNCwxNCwyOCwxNHoiLz48L3N2Zz4=");
    background-repeat: no-repeat;
    background-position: center;
  }
  #add-label-btn:disabled {
    opacity: 0.2;
  }
</style>
