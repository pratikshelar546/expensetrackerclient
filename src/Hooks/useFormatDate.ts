const useFormatDate = (date: Date) => {
  const departureDate = date;
  const dateObject = new Date(departureDate);
  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();

  // Define an array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format the date
  const formattedDate = `${day} ${months[monthIndex]} ${year}`;
  return formattedDate;
};

export default useFormatDate;
