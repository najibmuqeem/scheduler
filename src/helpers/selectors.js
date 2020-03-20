export function getAppointmentsForDay(state, day) {
  let filteredDays = state.days.filter(newDay => day === newDay.name);

  if (!(filteredDays !== [] && day && filteredDays[0])) {
    return [];
  }

  const appointments = filteredDays[0].appointments;

  const result = [];

  for (let key in state.appointments) {
    if (appointments.includes(state.appointments[key].id)) {
      result.push(state.appointments[key]);
    }
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  let filteredDays = state.days.filter(stateDay => day === stateDay.name);

  if (!(filteredDays !== [] && day && filteredDays[0])) {
    return [];
  }

  const { appointments } = filteredDays[0];

  const interviewers = [];
  for (let appt of Object.values(state.appointments)) {
    if (!appointments.includes(appt.id) && appt.interview) {
      let interviewer = appt.interview.interviewer.toString();
      if (!interviewers.includes(state.interviewers[interviewer])) {
        interviewers.push(state.interviewers[interviewer]);
      }
    }
  }

  return interviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const { student, interviewer } = interview;
  let name = "";
  let avatar = "";
  for (const key in state.interviewers) {
    if (state.interviewers[key].id === interviewer) {
      name = state.interviewers[key].name;
      avatar = state.interviewers[key].avatar;
    }
  }
  return {
    student,
    interviewer: { id: interviewer, name, avatar }
  };
}
