export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  let value = action.value;
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: value
      };
    case SET_APPLICATION_DATA:
      let { days, appointments, interviewers } = value;
      return {
        ...state,
        days,
        appointments,
        interviewers
      };
    case SET_INTERVIEW: {
      return {
        ...state,
        value
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
