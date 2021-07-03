<script>
  import Header from "./layout/Header.svelte";
  import Body from "./layout/Body.svelte";
</script>

<main class="text-gray-400 bg-gray-900 body-font h-screen">
  <Header />
  <Body />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
