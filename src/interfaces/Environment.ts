import {AvailableEnvironmentSection} from "@interfaces/main";

export interface ResponseEnvironmentRead {
  co2: number;
  temperature: number;
  humidity: number;
}

export interface EnvironmentStatus extends ResponseEnvironmentRead {}
