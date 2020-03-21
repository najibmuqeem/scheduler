import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
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
        .then(() => setState(prev => ({ ...prev, appointments })));
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
        .then(() => setState(prev => ({ ...prev, appointments })));
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
      setState(prev => ({
        ...prev,
        days,
        appointments,
        interviewers
      }));
    });
  }, [deleteInterview, bookInterview]);

  return { state, setDay, bookInterview, deleteInterview };
}
