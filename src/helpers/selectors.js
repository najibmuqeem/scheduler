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
