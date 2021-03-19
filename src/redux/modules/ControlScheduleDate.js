const SAVE_DATE = "SAVE_DATE";

export function saveDate(date) {
  return { type: SAVE_DATE, date }
}

const today = new Date();
const initialState = { "year": today.getFullYear(), "month": today.getMonth() + 1  }

function ControlScheduleDate(state =initialState, action) {
  switch(action.type){
    case SAVE_DATE:
      return action.date;
    default:
      return state
  }
}

export default ControlScheduleDate;