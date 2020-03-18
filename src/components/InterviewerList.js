import React from "react";
import "components/InterviewerListItem.scss";
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
      selected={props.interviewer === interviewer.id}
      id={interviewer.id}
      setInterviewer={props.setInterviewer}
    >
      <h4 className="interviewers__header text--light">interviewer</h4>
      <ul className="interviewers__list"></ul>
    </InterviewerListItem>
  ));
  return <ul>{interviewer}</ul>;
}
