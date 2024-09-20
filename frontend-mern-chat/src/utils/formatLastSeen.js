import { format, isThisWeek, isToday, isYesterday } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatLastSeen(dateString) {
  console.log(`Date String: ${dateString}`);
  const date = new Date(dateString);
  
  if (isToday(date)) {
    console.log(`${typeof format(date, "p")}`);
    return `last seen today at ${format(date, "p")}`
  } else if (isYesterday(date)) {
    console.log("is yesterday");
    return `last seen yesterday at ${format(date, "p")}`
  } if (isThisWeek(date)) {
    return `last seen ${format(date, 'EEEE p', { locale: enUS })}`;
  } else {
    return `last seen ${format(date, 'dd  MMM yyyy, p')}`;
  }
}