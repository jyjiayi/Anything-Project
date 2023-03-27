import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import useInput from "../../hooks/use-input-state";

import classes from "./Question.module.css";

const Question = (props) => {
  // const { question, setQuestion } = props;

  // for storing of entered question
  const [question, setQuestion] = useState("");

  // for input field validation
  const {
    isValid: enteredQnsIsValid,
    hasError: qnsInputHasError,
    valueChangeHandler: qnsChangedHandler,
    inputBlurHandler: qnsBlurHandler,
    reset: resetQnsInput,
  } = useInput((value) => value.trim() !== "", question);

  // for changing of css for input field validation
  const qnsInputFormCSS = qnsInputHasError ? classes.invalid : "";

  // for handling of qns change
  const onQnsChangeHandler = (event) => {
    qnsChangedHandler(event);
    props.onSaveQnsIsValid(event.target.value.trim() !== "");
    setQuestion(event.target.value);
    props.onQnsChange(event.target.value);
  };

  return (
    <div className={classes.all}>
      <Row className={qnsInputFormCSS}>
        <Col sm={3} className={classes.qnsTitle}>
          Question
        </Col>
        <Col sm={9}>
          <label htmlFor="question"></label>
          <input
            type="text"
            id="question"
            placeholder="Input your question here..."
            value={question}
            ref={props.questionRef}
            onChange={onQnsChangeHandler}
            onBlur={qnsBlurHandler}
          ></input>
        </Col>
      </Row>
      <Row>
        <Col sm={3}></Col>
        <Col sm={9}>
          {qnsInputHasError && (
            <p className={classes.errorText}>Question must not be empty</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Question;
