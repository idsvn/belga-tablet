export enum QuickSelectOptions {
  Last24Hours = 'Calendar.last24Hours',
  Today = 'Calendar.todayText',
  Tomorrow = 'Calendar.tomorrowText',
  Last7Days = 'Calendar.last7DaysText',
  ThisMonth = 'Calendar.thisMonthText',
  ThisYear = 'Calendar.thisYearText',
  Yesterday = 'Calendar.yesterday',
  ThisWeek = 'Calendar.thisWeek',
  Whenever = 'Calendar.Whenever',
}

export interface DateObject {
  dateString: string; // "YYYY-MM-DD"
  day: number; // Day of the month (1–31)
  month: number; // Month (1–12)
  timestamp: number; // Timestamp in milliseconds
  year: number; // Full year (e.g., 2025)
}
