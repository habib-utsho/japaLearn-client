const convertTwentyFourHourToTwelveHourFormat = (time: string): string => {
  if (!time) return "";
  const [hour, minute] = time?.split(":");
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? "PM" : "AM";
  const hour12 = hourInt % 12 || 12; // Convert '0' or '12' to '12'
  return `${hour12}:${minute} ${ampm}`;
};

export default convertTwentyFourHourToTwelveHourFormat;
