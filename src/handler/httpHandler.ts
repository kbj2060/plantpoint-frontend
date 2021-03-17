import axios from "axios";
import {HttpUrls} from "../reference/constants";


export async function getAvailableMachines <T extends string> (machineSection: T) {
  return await axios.get(`${HttpUrls.MACHINES_READ}/${machineSection}`)
}

export async function getAvailableSections <T extends string> (machineSection: T) {
  return await axios.get(`${HttpUrls.ENV_SECTION_READ}/${machineSection}`)
}

export async function getSwitches <T extends string> (machineSection: T) {
  return await axios.get(`${HttpUrls.SWITCHES_READ_LAST}/${machineSection}`)
}

export async function getAutomation <T extends string> (machineSection: T) {
  return await axios.get(`${HttpUrls.AUTOMATION_READ}/${machineSection}`)
}

export async function getSchedules <T extends string> (date: T) {
  return await axios.get(`${HttpUrls.SCHEDULES_READ}/${date}`)
}

export async function getLastEnvironment <T extends string> (environmentSection: T) {
  return await axios.get(`${HttpUrls.ENVIRONMENTS_READ_LAST}/${environmentSection}`)
}

export async function getLastAllEnvironments <T extends string> (machineSection: T) {
  return await axios.get(`${HttpUrls.ENVIRONMENTS_READ_LASTALL}/${machineSection}`)
}

export async function getHistoryEnvironment <T extends string> (section: T, name: T) {
  return await axios.get( `${HttpUrls.ENVIRONMENT_READ_HISTORY}/${section}/${name}` )
}

export async function getHistorySwitches <T extends string> (machineSection: T) {
  return await axios.get(`${HttpUrls.SWITCHES_READ}/${machineSection}`)
}

export async function getMachineCurrents <T extends string> (section: T, machine: T) {
  return await axios.get(`${HttpUrls.CURRENT_READ}/${section}/${machine}`)
}