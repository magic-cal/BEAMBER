declare global {
  interface Date {
    addDays(days: number, useThis?: boolean): Date
    isToday(): boolean
    clone(): Date
    isAnotherMonth(date: Date): boolean
    isWeekend(): boolean
    isSameDate(date: Date): boolean
    getStringDate(): string
  }
}
export {}
