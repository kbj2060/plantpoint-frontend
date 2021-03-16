export interface ResponseEnvironmentRead {
  co2: number;
  temperature: number;
  humidity: number;
}

export interface EnvironmentHistoryReadDto {
  section : string,
  name : string,
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

export type EnvironmentsHistory = Record<string, EnvironmentHistoryUnit[]>