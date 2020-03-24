import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export function useApplicationData() {
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
      console.log("deleting... ", appointments);
      return axios.delete(`api/appointments/${id}`).then(() => {
        console.log("deleting complete");
        dispatch({ type: SET_INTERVIEW, value: appointments });
      });
    },
    [state.appointments]
  );

  useEffect(() => {
    socket.addEventListener("open", e => {
      socket.send("ping");
    });
    socket.addEventListener("message", e => {
      const message = JSON.parse(e.data);
      const appointment = {
        ...state.appointments[message.id],
        interview: { ...message.interview }
      };
      const appointments = {
        ...state.appointments,
        [message.id]: appointment
      };
      if (message.type === "SET_INTERVIEW") {
        dispatch({ type: SET_INTERVIEW, value: appointments });
      }
    });
  });

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
