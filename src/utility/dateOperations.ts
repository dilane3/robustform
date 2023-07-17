export const formatDate = (date: Date) => {
  // Get relative date
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const time = Math.floor(date.getTime() / 1000);
  const now = Math.floor(Date.now() / 1000);
  let diff = now - time;

  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  while (diff > 60) {
    if (diff > 3600) {
      hours++;
      diff -= 3600;
    } else {
      minutes++;
      diff -= 60;
    }
  }

  seconds = diff;

  if (hours < 1 && minutes < 1) {
    return `Just now`;
  }
  if (hours < 1) {
    return `${minutes}min ago`;
  } else if (hours >= 1 && hours < 24) {
    return `${hours}h ago`;
  } else if (hours >= 24 && hours < 48) {
    return `Yesterday`;
  }

  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  return `${months[month]} ${day}, ${year}`;
};