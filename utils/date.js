const dayjs = require("dayjs");

function isDateValid(date) {
  const isValid = dayjs(date).isValid() && (date instanceof Date)
  return isValid;
}

function isBetweenDates({
  date,
  upperLimit,
  lowerLimit
}) {
  const areDatesValid = isDateValid(date)

  if (!areDatesValid) {
    return false
  }

  const isBeforeUpperLimit = dayjs(date).isBefore(dayjs(upperLimit))
  const isAfterLowerLimit = dayjs(date).isAfter(dayjs(lowerLimit))
  return isBeforeUpperLimit && isAfterLowerLimit;
}


module.exports = {
  isBetweenDates,
  isDateValid
}