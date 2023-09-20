import { format } from "date-fns";
import { convertToLocalTime } from "date-fns-timezone";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

const formatDate = (date) => {
  if (!date) return new Date().toLocaleString();

  // Get the timezone from browser using native methods
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateTmp = Date.parse(date.toLocaleString());

  const localDate = convertToLocalTime(dateTmp, {
    timeZone: timezone,
  });

  return format(localDate, DEFAULT_DATE_FORMAT);
};

export default formatDate;
