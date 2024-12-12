const convertMinutesToHour = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minute${
    minutes !== 1 ? "s" : ""
  }`;
};

export default convertMinutesToHour;
