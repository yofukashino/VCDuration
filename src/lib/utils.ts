import { util } from "replugged";

export const convertToTimestamp = (milliseconds: number): string => {
  const days = Math.floor(milliseconds / 1000 / 86400);
  const [passedHrs, ...passedMinSecs] = new Date(milliseconds)
    .toISOString()
    .slice(11, 19)
    .split(":");
  return `${days ? (days > 1 ? `${days} Days ` : `${days} Day `) : ""}${
    Number(passedHrs) ? `${passedHrs}:` : ""
  }${passedMinSecs.join(":")}`;
};

export const convertToStopwatch = (milliseconds: number): string => {
  const addToHrs = Math.floor(milliseconds / 1000 / 86400) * 24;
  const [passedHrs, ...passedMinSecs] = new Date(milliseconds)
    .toISOString()
    .slice(11, 19)
    .split(":");
  const hrs = addToHrs + Number(passedHrs);
  return `${hrs ? (hrs < 10 ? `0${hrs}:` : `${hrs}:`) : ""}${passedMinSecs.join(":")}`;
};

export const convertToHumanReadable = (milliseconds: number): string => {
  const days = Math.floor(milliseconds / 1000 / 86400);
  const [passedHrs, passedMins, passedSecs] = new Date(milliseconds)
    .toISOString()
    .slice(11, 19)
    .split(":")
    .map((n) => Number(n));

  const printableDays = days ? (days > 1 ? `${days} Days ` : `${days} Day `) : "";
  const printableHrs = passedHrs ? (passedHrs > 1 ? `${passedHrs} Hrs ` : `${passedHrs} Hr `) : "";
  const printableMins = passedMins
    ? passedMins > 1
      ? `${passedMins} Mins `
      : `${passedMins} Min `
    : "";
  const printableSecs = passedSecs > 1 ? `${passedSecs} Secs` : `${passedMins} Sec`;

  return `${printableDays}${printableHrs}${printableMins}${printableSecs}`;
};

export default { ...util, convertToTimestamp, convertToStopwatch, convertToHumanReadable };
