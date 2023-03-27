import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import useInput from "../../hooks/use-input-state";

import classes from "./Option.module.css";

const Option = (props) => {
  // for creation of weight dropdown
  let dropdownItems = [];
  for (var i = 1; i <= 10; i++) {
    dropdownItems.push(
      <option value={i} key={i} className={classes.itemDropdown}>
        {i}
      </option>
    );
  }

  // for storing of the entered option
  const [enteredOpt, setEnteredOpt] = useState("");

  // for input field validation
  const {
    isValid: enteredOptionIsValid,
    hasError: optionInputHasError,
    valueChangeHandler: optionChangedHandler,
    inputBlurHandler: optionBlurHandler,
    reset: resetOptionInput,
  } = useInput((value) => value.trim() !== "", enteredOpt);

  // for setting of css for input field validation
  const optionInputFormCSS = optionInputHasError ? classes.invalid : "";

  // for handling of option value change
  const onOptChangehandler = (event) => {
    optionChangedHandler(event);
    props.onSaveOptIsValid(event.target.value.trim() !== "");
    setEnteredOpt(event.target.value);
    props.onHandleOptChange(props.index, event);
  };

  // for handling of weight change
  const weightHandler = (event) => {
    props.onHandleWeightChange(props.index, event);
  };

  return (
    <li className={optionInputFormCSS}>
      <Row className={classes.optionInput}>
        <Col xs={1}></Col>
        <Col xs={8} className={classes.opt}>
          <label htmlFor="option"></label>
          <input
            type="text"
            id="option"
            placeholder="Input choice here..."
            value={enteredOpt}
            onChange={onOptChangehandler}
            onBlur={optionBlurHandler}
          ></input>
          {optionInputHasError && (
            <p className={classes.errorText}>Option must not be empty</p>
          )}
        </Col>
        <Col xs={3}>
          <Form.Select
            aria-label="Default select example"
            id="weight"
            onChange={weightHandler}
            className={classes.itemDropdown}
          >
            {dropdownItems}
          </Form.Select>
        </Col>
      </Row>
    </li>
  );
};

export default Option;
