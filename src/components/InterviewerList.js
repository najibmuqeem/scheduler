import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
const classNames = require("classnames");

export default function InterviewerList(props) {
  const interviewerClass = classNames("", props.className, {
    interviewers__header: props.header,
    interviewers__list: props.list
  });
  const interviewer = props.interviewers.map((interviewer, index) => (
    <InterviewerListItem
      className={interviewerClass}
      key={index}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.value === interviewer.id}
      setInterviewer={props.onChange}
    >
      <h4 className="interviewers__header text--light">interviewer</h4>
      <ul className="interviewers__list"></ul>
    </InterviewerListItem>
  ));
  return <ul>{interviewer}</ul>;
}
