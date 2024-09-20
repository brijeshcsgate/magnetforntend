import moment from "moment";

/**
 * Generates an array of years from fromYear to toYear.
 * @param {number} fromYear - The start year.
 * @param {number} toYear - The end year. Defaults to the current year.
 * @returns {number[]} An array of years.
 */
export const getYears = (fromYear = 1900, toYear = moment().year()) => {
  return Array.from({ length: toYear - fromYear + 1 }, (_, i) => fromYear + i);
};

/**
 * Gets today's date in the format YYYY-MM-DD.
 * @returns {string} Today's date.
 */
export const getTodaysDate = () => moment().format("YYYY-MM-DD");

/**
 * Calculates the duration in days between two dates.
 * @param {string} startDate - The start date in the format YYYY-MM-DD.
 * @param {string} endDate - The end date in the format YYYY-MM-DD.
 * @returns {number} The number of days between the two dates.
 */
export const getDateDuration = (startDate, endDate) => {

  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");
  return end.diff(start, "days");
};
export const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Formats a given time string to HH:mm format.
 * @param {string} time - The time string.
 * @returns {string} The formatted time string.
 */
export const formattedTime = (time) => {
  if (!time) return "";
  if (time.length === 1) return `0${time}:00`;
  if (time.length === 2 && !time.includes(":")) return `00:${time}`;
  if (time.length === 3 && !time.includes(":"))
    return `0${time[0]}:${time.slice(1)}`;
  if (time.length === 3 && time.includes(":")) return `${time}00`;
  if (time.length === 4 && !time.includes(":"))
    return `${time.slice(0, 2)}:${time.slice(2)}`;
  if (time.length === 4 && time.indexOf(":") === 1) return `0${time}`;
  if (time.length === 4 && time.indexOf(":") === 2) return `${time}0`;
  if (time.length === 5 && time.indexOf(":") === 2) return time;
  return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
};

/**
 * Formats a given date according to the specified format type.
 *
 * @param {Date|string|number} date - The date to be formatted.
 * @param {string} [formatType="default"] - The format type. Can be "date", "time", or "default".
 * @return {string} The formatted date.
 */
export const formatDate = (date, formatType = "default") => {
  switch (formatType) {
    case "date":
      return moment(date).format("DD MMM YYYY");
    case "day":
      return moment(date).format("ddd");
    case "time":
      return moment(date).format("HH:mm");
    default:
      return moment(date).format("DD MMM YYYY HH:mm");
  }
};
