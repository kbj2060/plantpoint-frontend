import { combineReducers } from "redux";
import ControlSwitch from "./ControlSwitch";
import ControlAutomation from "./ControlAutomation";
import Authentication from "./Authentication";
import ControlScheduleDate from "./ControlScheduleDate";
import ControlMachine from "./ControlMachine";
import ControlEnvironment from "@redux/modules/ControlEnvironment";

const allReducers = combineReducers({
	switches: ControlSwitch,
	automation: ControlAutomation,
	authentication: Authentication,
	date : ControlScheduleDate,
	machine: ControlMachine,
	environments: ControlEnvironment
});

export type RootState = ReturnType<typeof allReducers>

export default allReducers;



