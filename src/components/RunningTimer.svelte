<script lang="ts">
  export let minutes: number = 25;
  export let size: "sm" | "md" | "lg" = "md";

  let spanClass = "font-semibold ";
  switch (size) {
    case "sm":
      spanClass += " text-5xl";
      break;
    case "md":
      spanClass += " text-7xl";
      break;
    case "lg":
      spanClass += " text-9xl";
      break;
  }

  let seconds = 60;
  const interval = setInterval(() => {
    seconds -= 1;
    if (seconds === 0) {
      minutes -= 1;
      seconds = 60;
    }
    if (minutes === 0 && seconds === 0) {
      seconds = 0;
      clearInterval(interval);
    }
  }, 1000);

  function padWithChar(
    valToModify: string | number,
    paddingChar = "0",
    maxlength = 2
  ) {
    const valLength = valToModify.toString().length;
    if (valLength === maxlength) {
      return valToModify;
    }
    let paddingStr = "";
    for (let i = 0; i < maxlength - valLength; i++) {
      paddingStr += paddingChar;
    }
    return `${paddingStr}${valToModify}`;
  }
</script>

<span class={spanClass}> {padWithChar(minutes)} : {padWithChar(seconds)} </span>
