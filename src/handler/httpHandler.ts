import axios from "axios";
import {HttpUrls} from "../constants";


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
export async function getEnvironments <T extends string> (environmentSection: T) {
  return await axios.get(`${HttpUrls.ENVIRONMENTS_READ_LAST}/${environmentSection}`)
}