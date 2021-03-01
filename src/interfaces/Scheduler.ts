export interface SchedulerDate {
  year : number,
  month: number,
  day: number,
}

export interface Row {
  id: number;
  date: string[];
  title: string;
  content: string;
  binding: number;
}