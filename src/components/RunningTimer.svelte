<script lang="ts">
  export let minutes: number = 25;
  export let size: "sm" | "md" | "lg" = "md";

  let seconds = 60;

//#region Declarations
  function getSpanClass() {
    let css = "font-semibold ";
    switch (size) {
      case "sm":
        css += " text-5xl";
        break;
      case "md":
        css += " text-7xl";
        break;
      case "lg":
        css += " text-9xl";
        break;
    }
    return css;
  }

  function startTimer() {
    minutes -= 1;
    const interval = setInterval(() => {
      seconds -= 1;
      if (seconds === 0) {
        if (minutes === 0) {
          seconds = 0;
          clearInterval(interval);
        } else {
          minutes -= 1;
          seconds = 60;
        }
      }
    }, 1000);
  }

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
  //#endregion Declarations

  //#region Main Execution
  const spanClass = getSpanClass();
  startTimer();
  //#endregion Main Execution
</script>

<span class={spanClass}> {padWithChar(minutes)} : {padWithChar(seconds)} </span>
