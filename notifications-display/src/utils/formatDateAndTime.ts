import getDateSuffix from "./getDateSuffix";

const formatDateAndTime = (
  dateString: string
): { date: string; time: string } => {
  const dateObj = new Date(dateString);

  // Format date
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[dateObj.getMonth()];
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  const formattedDate = `${month} ${date}${getDateSuffix(date)}, ${year}`;

  // Format time
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  return { date: formattedDate, time: formattedTime };
};

export default formatDateAndTime;
