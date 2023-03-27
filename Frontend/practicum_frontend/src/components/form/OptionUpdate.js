import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import useInput from "../../hooks/use-input-state";

import classes from "./OptionUpdate.module.css";

const OptionUpdate = (props) => {
  // for creation of dropdown list of weights
  let dropdownItems = [];
  for (var i = 1; i <= 10; i++) {
    dropdownItems.push(
      <option className={classes.weightDropdown} value={i} key={i}>
        {i}
      </option>
    );
  }

  // for storing the value of entered option
  const [enteredOpt, setEnteredOpt] = useState(props.opt.option);

  // for input field validation
  const {
    isValid: enteredOptionIsValid,
    hasError: optionInputHasError,
    valueChangeHandler: optionChangedHandler,
    inputBlurHandler: optionBlurHandler,
    reset: resetOptionInput,
  } = useInput((value) => value.trim() !== "", enteredOpt);

  // for setting the css for the input field validation
  const optionInputFormCSS = optionInputHasError ? classes.invalid : "";

  // for handling of option change
  const onOptChangehandler = (event) => {
    optionChangedHandler(event);
    props.onSaveOptIsValid(event.target.value.trim() !== "");
    setEnteredOpt(event.target.value);
    //console.log(event.target.value);
    //console.log(props.index);
    props.onHandleOptChange(props.index, event);
  };

  // for handling of weight change
  const onWeightChangeHandler = (event) => {
    props.onHandleWeightChange(props.index, event);
  };

  return (
    <div className={optionInputFormCSS}>
      <li className={classes.optionUpdate}>
        <Row>
          <Col xs={1}></Col>
          <Col>
            <label htmlFor="option"></label>
            <input
              type="text"
              id="option"
              placeholder={enteredOpt}
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
              onChange={onWeightChangeHandler}
              defaultValue={props.opt.weight}
              className={classes.weightDropdown}
            >
              {dropdownItems}
            </Form.Select>
          </Col>
        </Row>
      </li>
    </div>
  );
};

export default OptionUpdate;
