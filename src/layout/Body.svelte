<script>
  import Router, { replace } from "svelte-spa-router";
  import { routes } from "./routes";

  import Header from "./Header.svelte";
  import { UserSettings } from "../store/user.state";
  import { onDestroy } from "svelte";

  let firstRunDone = true;
  const userUnSub = UserSettings.subscribe(
    (val) => (firstRunDone = val.firstRun)
  );

  onDestroy(() => {
    userUnSub();
  });

  //#region RouterEvents
  function conditionsFailed(event) {
    if (event.detail.userData["firstRunCheckFailed"]) {
      if (event.detail.route === "/first-run") {
        replace("/");
      } else if (event.detail.route === "/") {
        replace("/first-run");
      }
    }
  }
  //#endregion RouterEvents
</script>

{#if firstRunDone}
  <Header />
{/if}
<section class="text-gray-400 bg-gray-900 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col ">
    <Router {routes} on:conditionsFailed={conditionsFailed} />
  </div>
</section>
