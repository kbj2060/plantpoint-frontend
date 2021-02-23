import { combineReducers } from "redux";
import ControlSwitch from "./ControlSwitch";
import ControlAutomation from "./ControlAutomation";
import Authentication from "./Authentication";
import ControlScheduleDate from "./ControlScheduleDate";

const allReducers = combineReducers({
	switches: ControlSwitch,
	auto: ControlAutomation,
	authentication: Authentication,
	date : ControlScheduleDate
});

export type RootState = ReturnType<typeof allReducers>

export default allReducers;



