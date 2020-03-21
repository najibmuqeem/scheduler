import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";

export function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    let value = action.value;
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          value
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
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });
  const bookInterview = useCallback(
    (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios
        .put(`api/appointments/${id}`, appointment)
        .then(() => dispatch({ type: SET_INTERVIEW, value: appointments }));
    },
    [state.appointments]
  );
  const deleteInterview = useCallback(
    id => {
      const appointment = {
        ...state.appointments[id]
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios
        .delete(`api/appointments/${id}`)
        .then(() => dispatch({ type: SET_INTERVIEW, value: appointments }));
    },
    [state.appointments]
  );
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        value: { days, appointments, interviewers }
      });
    });
  }, [deleteInterview, bookInterview]);

  return { state, setDay, bookInterview, deleteInterview };
}
