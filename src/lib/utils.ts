export const convertToTimestamp = (milliseconds): string => {
  const addToHrs = Math.floor(milliseconds / 1000 / 86400) * 24;
  const timePassedArray = new Date(milliseconds).toISOString().slice(11, 19).split(":");
  return `${addToHrs + parseInt(timePassedArray[0], 10)}:${timePassedArray.slice(1).join(":")}`;
};

export default { convertToTimestamp };
