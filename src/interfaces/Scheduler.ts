import {currentUser} from "@funcUtils/currentUser";

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

export interface UpdateScheduleDto {
  id : number;
  date : string[];
  title : string;
  content: string;
}

export interface CreateScheduleDto {
  date: string[];
  title: string;
  content : string;
  createdBy : string;
}