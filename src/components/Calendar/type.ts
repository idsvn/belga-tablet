export enum QuickSelectOptions {
  Today = 'Calendar.todayText',
  Tomorrow = 'Calendar.tomorrowText',
  Next7Days = 'Calendar.next7DaysText',
  ThisMonth = 'Calendar.thisMonthText',
  ThisYear = 'Calendar.thisYearText',
}

export interface DateObject {
  dateString: string; // "YYYY-MM-DD"
  day: number; // Day of the month (1–31)
  month: number; // Month (1–12)
  timestamp: number; // Timestamp in milliseconds
  year: number; // Full year (e.g., 2025)
}
