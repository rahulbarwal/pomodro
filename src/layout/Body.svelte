<script>
  import Timer from "../components/RunningTimer.svelte";
  import TagSession from "../components/TagSession.svelte";
  import CompletedSessions from "../components/CompletedSessions.svelte";

  const sessionLabels = ["Office", "Study", "Personal Project", "Learning"];
</script>

<section class="text-gray-400 bg-gray-900 body-font">
  <div
    class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
  >
    <div
      class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10 flex flex-col gap-16 justify-center"
    >
      <Timer minutes={1} size={"lg"} />
      <TagSession labels={sessionLabels} />
    </div>
    <div
      class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
    >
      <CompletedSessions />
    </div>
  </div>
</section>
