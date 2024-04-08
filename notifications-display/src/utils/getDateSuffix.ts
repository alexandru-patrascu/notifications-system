// Function to get the date suffix (e.g., "st", "nd", "rd", "th")
const getDateSuffix = (date: number): string => {
  if (date >= 11 && date <= 13) {
    return "th";
  }
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export default getDateSuffix;
