import {AvailableEnvironment, AvailableEnvironmentSection} from "@interfaces/main";

export interface ResponseEnvironmentRead {
  co2: number;
  temperature: number;
  humidity: number;
}

export interface EnvironmentHistoryReadDto {
  section : string,
  environmentName : AvailableEnvironment,
}

export interface EnvironmentHistoryUnit {
  [key: string]: string;
  environmentSection: string;
  created: string;
}

export interface ResponseEnvironmentHistoryRead {
  histories: EnvironmentHistoryUnit[];
}

export interface EnvironmentChart {
  labels: string[],
  datasets: Record<string,any>[];
}

export type EnvironmentsHistory = Record<AvailableEnvironmentSection, EnvironmentHistoryUnit[]>