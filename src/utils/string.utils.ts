export function padWithChar(
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
