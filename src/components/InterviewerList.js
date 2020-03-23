import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

const classNames = require("classnames");

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewer: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };
  const interviewerClass = classNames("", props.className, {
    interviewers__header: props.header,
    interviewers__list: props.list
  });
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        className={interviewerClass}
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.interviewer === interviewer.id}
        id={interviewer.id}
        setInterviewer={props.setInterviewer}
      ></InterviewerListItem>
    );
  });
  return (
    <div className={interviewerClass}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </div>
  );
}
