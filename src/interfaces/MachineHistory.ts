

export interface SingleSwitchHistory {
  machine: string;
  status: number;
  controlledBy: string;
  created: string;
}

export interface ResponseSwitchHistoryRead {
  switchHistory: SingleSwitchHistory[];
}