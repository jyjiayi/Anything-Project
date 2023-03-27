import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";

import Question from "../components/form/Question";
import OptionalFields from "../components/form/OptionalFields";
import Option from "../components/form/Option";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

import classes from "./NewDilemmaForm.module.css";

const NewDilemmaForm = (props) => {
  let [question, setQuestion] = useState("");
  let [qnsIsValid, setQnsIsValid] = useState(false);
  let [allOptIsValid, setAllOptIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorState, setErrorState] = useState(null);

  // for storing option list dynamically
  let [optValues, setOptValues] = useState([
    { option: "", weight: 1 },
    { option: "", weight: 1 },
  ]);

  const history = useHistory();

  // for handling of weight change
  const handleWeightChange = (i, e) => {
    optValues[i][e.target.id] = parseInt(e.target.value);
    setOptValues(optValues);
  };

  // for handling of option change
  const handleOptChange = (i, e) => {
    // console.log(optValues);

    //store the option into respective array items
    optValues[i][e.target.id] = e.target.value;
    setOptValues(optValues);

    //check if all opt is valid
    for (let i = 0; i < optValues.length; i++) {
      if (optValues[i].option == "") {
        allOptIsValid = false;
        break;
      } else {
        allOptIsValid = true;
      }
    }
    setAllOptIsValid(allOptIsValid);

    // console.log("Length: " + questionRef.current.value.length);

    // check if qns is empty
    if (questionRef.current.value.length === 0) {
      qnsIsValid = false;
      setQnsIsValid(false);
    } else {
      qnsIsValid = true;
      setQnsIsValid(true);
    }

    // console.log("From opt change");
    // console.log("qns is valid: " + qnsIsValid);
    // console.log("all opt is valid: " + allOptIsValid);

    // check if all inputs are valid
    if (qnsIsValid && allOptIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };

  // handling of qns input change
  const onQnsChangeHandler = (enteredOpt) => {
    question = enteredOpt;
    setQuestion(question);
    // console.log(question);
  };

  // for checking the question input field
  useEffect(() => {
    if (question !== "") {
      qnsIsValid = true;
      setQnsIsValid(qnsIsValid);
    } else {
      qnsIsValid = false;
      setQnsIsValid(qnsIsValid);
    }
  }, [question]);

  // handling of qnsIsValid change
  const saveQnsIsValidHandler = (enteredQnsIsValid) => {
    // console.log(enteredQnsIsValid);
    // console.log(optValues);

    // check if all qns input is valid
    if (enteredQnsIsValid) {
      qnsIsValid = true;
      setQnsIsValid(qnsIsValid);
    } else {
      qnsIsValid = false;
      setQnsIsValid(qnsIsValid);
    }

    //check if all opt is valid
    for (let i = 0; i < optValues.length; i++) {
      if (optValues[i].option == "") {
        allOptIsValid = false;
        break;
      } else {
        allOptIsValid = true;
      }
    }

    setAllOptIsValid(allOptIsValid);

    // check if both qns and opt inputs are valid
    if (qnsIsValid && allOptIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }

    // console.log("From Qns change");
    // console.log("qns is valid: " + qnsIsValid);
    // console.log("all opt is valid: " + allOptIsValid);
  };

  // handling of optIsValid change
  const saveOptIsValidHandler = (enteredAllOptIsValid) => {
    // check if all opt are valid
    if (enteredAllOptIsValid) {
      setAllOptIsValid(true);
    } else {
      setAllOptIsValid(false);
    }

    // check if both qns and all opt are valid
    if (qnsIsValid && allOptIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }

    // console.log("All opt values: " + optValues);
    // console.log("From opt change");
    // console.log("qns is valid: " + qnsIsValid);
    // console.log("all opt is valid: " + allOptIsValid);
  };

  // set ref for all inputs to obtain them dynamically
  const questionRef = useRef("");
  const usernameRef = useRef("");
  const bookmarkRef = useRef("");

  // set into the customized object to pass to backend
  const fullFormInputs = {
    question: questionRef.current.value,
    optList: [...optValues],
    username: usernameRef.current.value,
    bookmark: bookmarkRef.current.value,
  };

  // handling of form submit
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // reset the errorState
    setErrorState(null);

    // try to fetch post from backend
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullFormInputs),
      };

      // console.log(fullFormInputs);

      const response = await fetch(
        `http://localhost:8080/newDilemma`,
        requestOptions
      );

      const data = await response.json();

      // set error msg if response is not ok
      if (!response.ok) {
        // console.log(data.message);
        throw new Error(data.message);
      }
      // console.log(data);

      // redirect to singleDilemma page
      history.push({
        pathname: `/singleDilemma/${data.qns_id}`,
        state: data,
      });
    } catch (error) {
      // console.log(error.message);
      setErrorState(error.message);
    }
  };

  // set the option list to start from 2 options at first
  const [numInputDiv, setNumInputDiv] = useState([
    <Option
      key={0}
      index={0}
      onHandleOptChange={handleOptChange}
      onSaveOptIsValid={saveOptIsValidHandler}
      onHandleWeightChange={handleWeightChange}
      // enteredOption={optValues[0].option}
    ></Option>,
    <Option
      key={1}
      index={1}
      onHandleOptChange={handleOptChange}
      onSaveOptIsValid={saveOptIsValidHandler}
      onHandleWeightChange={handleWeightChange}
      // enteredOption={optValues[1].option}
    ></Option>,
  ]);

  // if the option list changes, check for validation
  useEffect(() => {
    // console.log(optValues);

    // check if any of the opt is not valid
    for (let i = 0; i < optValues.length; i++) {
      if (optValues[i].option == "") {
        allOptIsValid = false;
        break;
      } else {
        allOptIsValid = true;
      }
    }

    // check if both qns and all inputs are valid
    if (qnsIsValid && allOptIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [numInputDiv]);

  // for adding of new option input
  const addNewInput = () => {
    optValues.push({ option: "", weight: 1 });
    setOptValues(optValues);
    setNumInputDiv([
      ...numInputDiv,
      <Option
        key={optValues.length - 1}
        index={optValues.length - 1}
        onHandleOptChange={handleOptChange}
        onSaveOptIsValid={saveOptIsValidHandler}
        onHandleWeightChange={handleWeightChange}
      ></Option>,
    ]);
    // console.log(optValues);
  };

  // for removing of new option input
  const removeInput = () => {
    // restrict to minimum 2 options
    if (optValues.length > 2) {
      let newNumInputDiv = [...numInputDiv];
      newNumInputDiv.pop();
      setNumInputDiv(newNumInputDiv);
      let newOptValues = [...optValues];
      newOptValues.pop();
      setOptValues(newOptValues);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Row>
        <Col className={classes.qnsOptionalSect}>
          <section>
            <Question
              question={question}
              setQuestion={setQuestion}
              onSaveQnsIsValid={saveQnsIsValidHandler}
              onQnsChange={onQnsChangeHandler}
              questionRef={questionRef}
            ></Question>
            <OptionalFields
              usernameRef={usernameRef}
              bookmarkRef={bookmarkRef}
            ></OptionalFields>
          </section>
        </Col>
        <Col md={6}>
          <section className={classes.choices}>
            <Row className={classes.title}>Choices</Row>
            <Row className={classes.header}>
              <Col xs={1}></Col>
              <Col xs={8}>Choice</Col>
              <Col xs={3}>Weight</Col>
            </Row>
            <ol>{numInputDiv}</ol>
            <Row className={classes.buttonRow}>
              <button type="button" onClick={addNewInput}>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className={classes.buttonIcons}
                />
              </button>
              <button type="button" onClick={removeInput}>
                <FontAwesomeIcon
                  icon={faCircleMinus}
                  className={classes.buttonIcons}
                />
              </button>
            </Row>
          </section>
        </Col>
      </Row>

      {errorState && <p className={classes.errorText}>{errorState}</p>}
      <Row className={classes.submitBtn}>
        <button disabled={!formIsValid}>Submit</button>
      </Row>
    </form>
  );
};

export default NewDilemmaForm;
