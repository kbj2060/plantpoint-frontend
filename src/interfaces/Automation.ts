import {AvailableAutomationType, AvailableMachines, AvailableMachineSection} from "./main";

export interface CycleAutomation {
    type: string;
    start: string[];
    end: string[];
    term: number;
    enable: boolean;
}

export interface RangeAutomation {
    type: string;
    start: string[];
    end: string[];
    enable: boolean;
}

export interface ResponseAutomationRead {
    lastAutomations: Automation[];
}

export interface Automation {
    start: string[];
    end: string[];
    term: number;
    enable: boolean;
    machine: AvailableMachines;
    automationType: AvailableAutomationType;
    machineSection: AvailableMachineSection;
}