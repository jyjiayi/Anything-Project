import { useState } from "react";

const useInput = (validateValue, enteredInput) => {
  // console.log(enteredInput);

  // for storing enteredInput
  const [enteredValue, setEnteredValue] = useState(enteredInput);

  // for storing if the input field is touched
  const [isTouched, setIsTouched] = useState(false);

  // for setting error upon validating input
  const valueIsValid = validateValue(enteredInput);
  const hasError = !valueIsValid && isTouched;

  // for handling of value changed
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  // for handling when input field is touched
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  // reset the states
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
