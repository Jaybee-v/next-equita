export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function startOfWeek(date: Date, weekStartsOn: number = 0): Date {
  const dayOfWeek = date.getDay();
  const diff = (dayOfWeek < weekStartsOn ? 7 : 0) + dayOfWeek - weekStartsOn;
  const result = new Date(date);
  result.setDate(date.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function addHours(date: Date, hours: number): Date {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

export function formatDate(date: Date): string {
  // Réinitialise les heures, minutes, secondes et millisecondes à zéro
  date.setHours(0, 0, 0, 0);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function parseTime(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function generateWeekDays(date: Date) {
  const startDate = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
}

export function generateTimeSlots(date: Date, start: number, end: number) {
  const HOURS = Array.from({ length: end - start + 1 }, (_, i) => i + start);
  return HOURS.map((hour) => ({
    time: `${hour.toString().padStart(2, "0")}:00`,
    date: addHours(date, hour),
  }));
}
