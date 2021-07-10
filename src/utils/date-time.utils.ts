import { padWithChar } from "./string.utils";
export const getNowTime = () => {
    const date = new Date();
    return `${padWithChar(date.getHours())}:${padWithChar(date.getMinutes())}`;
}