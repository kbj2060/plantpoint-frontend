import { combineReducers } from "redux";
import ControlSwitch from "./ControlSwitch";
import ControlAutomation from "./ControlAutomation";
import Authentication from "./Authentication";
import ControlScheduleDate from "./ControlScheduleDate";
import ControlMachine from "./ControlMachine";

const allReducers = combineReducers({
	switches: ControlSwitch,
	automation: ControlAutomation,
	authentication: Authentication,
	date : ControlScheduleDate,
	machine: ControlMachine,
});

export type RootState = ReturnType<typeof allReducers>

export default allReducers;



