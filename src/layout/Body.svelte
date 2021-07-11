<script>
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
</script>

<section class="text-gray-400 bg-gray-900 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col ">
    <Router {routes} />
  </div>
</section>
