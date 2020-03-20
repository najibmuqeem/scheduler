import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
} from "helpers/selectors.js";

import { useApplicationData } from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
  const interviewersForDay = getInterviewersForDay(state, state.day);
  const appointmentList = getAppointmentsForDay(state, state.day).map(
    appointment => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          interview={interview}
          allInterviewers={state.interviewers}
          interviewers={interviewersForDay}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
          {...appointment}
        >
          <h4 className="interviewers__header text--light">interviewer</h4>
          <ul className="interviewers__list"></ul>
        </Appointment>
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <ul>
            <DayList days={state.days} day={state.day} setDay={setDay} />
          </ul>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
