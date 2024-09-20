import { format, isThisWeek, isToday, isYesterday } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatMEssageTime(dateString) {
  console.log(`Date String: ${dateString}`);
  const date = new Date(dateString);
  
  if (isToday(date)) {
    console.log(`${typeof format(date, "p")}`);
    return `Today - ${format(date, "p")}`
  } else if (isYesterday(date)) {
    return `Yesterday - ${format(date, "p")}`
  } if (isThisWeek(date)) {
    return `${format(date, 'EEEE p', { locale: enUS })}`;
  } else {
    return `${format(date, 'dd  MMM yyyy, p')}`;
  }
}