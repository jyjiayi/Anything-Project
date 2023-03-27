import { useState, useCallback, useRef } from "react";

import { Row, Col, Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./ViewDilemma.module.css";

import QnsView from "../components/view/QnsView";
import useInput from "../hooks/use-input-state";

const ViewDilemma = () => {
  const [username, setUsername] = useState();
  const [qnsList, setQnsList] = useState([]);

  // for fetching data from backend
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [isFilterOn, setIsFilterOn] = useState(false);

  // for obtain username dynamically
  const usernameRef = useRef("");

  // for custom hook of checking input validation
  const {
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(
    (value) => value.trim() !== "",
    String(usernameRef.current.value)
  );

  let formIsValid = false;

  // prevent formIsValid to be enabled on first render
  const firstUpdate = useRef(true);

  if (firstUpdate.current) {
    firstUpdate.current = false;
  } else {
    if (enteredNameIsValid) {
      formIsValid = true;
    }
  }

  // for setting the CSS for input field validation
  const nameInputFormCSS = nameInputHasError ? classes.invalid : "";

  // for handling of form submit
  const submitHandler = (event) => {
    event.preventDefault();

    // check if name entered is valid
    if (!enteredNameIsValid) {
      return;
    }
    resetNameInput();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { username: usernameRef.current.value },
    };

    // console.log(usernameRef.current.value);
    fetchUserDilemmaHandler(usernameRef.current.value);
  };

  // for fetching of data from backend
  const fetchUserDilemmaHandler = useCallback(async (username) => {
    // reset of fields upon submit
    setIsDataFetched(true);
    setIsLoading(true);
    setErrorState(null);

    try {
      const response = await fetch(
        `http://localhost:8080/viewDilemma?username=${username}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const data = await response.json();

      // show error msg if there is error in fetching
      if (!response.ok) {
        // console.log(data.message);
        throw new Error(data.message);
      }
      // console.log(data);

      setUsername(data.username);

      // customize the response data
      const tempQnsList = data.qnsList.map((qns) => {
        return {
          qns_id: qns.qns_id,
          question: qns.question,
          bookmark: qns.bookmark,
          optList: qns.optionList.map((opt) => {
            return {
              option: opt.option,
              weight: opt.weight,
            };
          }),
          selected_opt: qns.selected_opt,
        };
      });
      // console.log(tempQnsList);
      setQnsList(tempQnsList);
    } catch (error) {
      // console.log(error.message);
      setErrorState(error.message);
    }
    setIsLoading(false);
  }, []);

  // for handling change of filter dropdown
  const onFilterBookmarkChange = (event) => {
    // console.log(event.target.value);
    switch (event.target.value) {
      case "View bookmarked":
        // console.log(true);
        setIsFilterOn(true);
        break;
      case "View All":
        // console.log(false);
        setIsFilterOn(false);
        break;
      default:
        setIsFilterOn(false);
    }
  };

  return (
    <Row>
      <Col></Col>
      <Col sm={9} className={classes.all}>
        <form onSubmit={submitHandler}>
          <Row className={nameInputFormCSS}>
            <Col className={classes.userCol}>
              <FontAwesomeIcon icon={faCircleUser} className={classes.icon} />
              <label htmlFor="username" className={classes.titleFont}>
                Username:
              </label>
              <div>
                <input
                  type="text"
                  id="username"
                  // value={usernameRef}
                  onChange={nameChangedHandler}
                  onBlur={nameBlurHandler}
                  ref={usernameRef}
                  placeholder="Input your username here..."
                ></input>

                {nameInputHasError && (
                  <p className={classes.errorText}>
                    Username must not be empty
                  </p>
                )}
              </div>

              <button disabled={!formIsValid}>Fetch User Dilemma</button>
            </Col>
          </Row>
          {errorState && <p className={classes.errorText}>{errorState}</p>}
          {!errorState && isDataFetched && !isLoading && (
            <div>
              <Row className={classes.header}>
                <div className={classes.displayName}>{username}</div>
                <div>
                  <Form.Select
                    id="filter-bookmark"
                    onChange={onFilterBookmarkChange}
                    className={classes.bkList}
                  >
                    <option>View All</option>
                    <option>View bookmarked</option>
                  </Form.Select>
                </div>
              </Row>
              {!isFilterOn &&
                qnsList.map((qns, i) => <QnsView qns={qns} key={i} />)}
              {isFilterOn &&
                qnsList
                  .filter((qns) => qns.bookmark == "Y")
                  .map((filteredQns, i) => (
                    <QnsView qns={filteredQns} key={i} />
                  ))}
            </div>
          )}
        </form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default ViewDilemma;
