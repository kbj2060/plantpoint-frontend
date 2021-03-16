import {loadState, saveState} from "@components/LocalStorage";
import {StorageKeys} from "../../constants";
import {ResponseEnvSectionRead} from "@interfaces/Machine";

const SAVE_SECTIONS = "SAVE_SECTIONS";

export function saveSections(sections: ResponseEnvSectionRead[]) {
  return { type: SAVE_SECTIONS, sections }
}

export type ActionTypes = {
  type: "SAVE_SECTIONS";
  sections: ResponseEnvSectionRead[];
}

const initialState = loadState(StorageKeys.SECTION) || []

function ControlSections(
  state =initialState, action: ActionTypes
): string[] {
  switch(action.type){
    case SAVE_SECTIONS:
      const eSections = action.sections.map((m: ResponseEnvSectionRead) => {
        return m.e_section
      })
      saveState(StorageKeys.SECTION, eSections)
      return eSections;
    default:
      return initialState
  }
}

export default ControlSections;
