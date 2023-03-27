import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import OptionUpdate from "../components/form/OptionUpdate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./SingleDilemma.module.css";

const SingleDilemma = (props) => {
  const params = useParams();
  const [qnsFullData, setQnsFullData] = useState({ optionList: [] });
  let qnsOptList = useRef([]);
  const [numInputDiv, setNumInputDiv] = useState([]);

  // for form validation
  let [allOptIsValid, setAllOptIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  // for fetching from backend
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const history = useHistory();

  // fetch the data from backend
  useEffect(() => {
    async function fetchDilemma() {
      try {
        const response = await fetch(
          `http://localhost:8080/singleDilemma/${params.qns_id}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        const dbdata = await response.json();
        if (!response.ok) {
          // console.log(dbdata.message);
          throw new Error(dbdata.message);
        }

        setQnsFullData(dbdata);

        // console.log(qnsFullData);

        // map the database data to the variable
        qnsOptList.current.value = dbdata.optionList.map((element, i) => ({
          option: element.option,
          weight: element.weight,
        }));

        // console.log(qnsOptList.current.value);

        setNumInputDiv(qnsOptList.current.value);

        // console.log(dbdata);
        // console.log(qnsOptList.current.value);
      } catch (error) {
        // console.log(error.message);
        setErrorState(error.message);
      }
    }
    fetchDilemma();
    return;
  }, []);

  // for handling of weight change
  const handleWeightChange = (i, e) => {
    numInputDiv[i][e.target.id] = parseInt(e.target.value);
    setNumInputDiv(numInputDiv);
  };

  // for handling of optIsValid change
  const saveOptIsValidHandler = (enteredAllOptIsValid) => {
    if (enteredAllOptIsValid) {
      setAllOptIsValid(true);
    } else {
      setAllOptIsValid(false);
    }

    // console.log("enteredAllOptIsValid: " + enteredAllOptIsValid);
    // console.log("allOptIsValid" + allOptIsValid);
    // console.log("formIsValid: " + formIsValid);
  };

  // for handling of form submit
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const optListPOJO = {
      optList: [...numInputDiv],
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(optListPOJO),
    };

    // console.log(numInputDiv);

    // for fetching of dilemma data from backend
    try {
      const response = await fetch(
        `http://localhost:8080/rerunDilemma/${params.qns_id}`,
        requestOptions
      );

      const data = await response.json();
      if (!response.ok) {
        // console.log(data.message);
        throw new Error(data.message);
      }
      // console.log(data);

      // rerender the page
      history.go(0);
    } catch (error) {
      // console.log(error.message);
      setErrorState(error.message);
    }
  };

  // for adding of option input
  const addNewInput = () => {
    setNumInputDiv([...numInputDiv, { option: "", weight: 1 }]);
    setAllOptIsValid(false);
    // console.log(optValues);
  };

  // for removing of option input
  const removeInput = () => {
    if (numInputDiv.length > 2) {
      let newNumInputDiv = [...numInputDiv];
      newNumInputDiv.pop();
      setNumInputDiv(newNumInputDiv);

      // console.log(numInputDiv);
    }
  };

  // check for allOptIsValid on change of number of option inputs
  useEffect(() => {
    // console.log(numInputDiv);

    // for checking if all opt values are  valid
    for (let i = 0; i < numInputDiv.length; i++) {
      if (numInputDiv[i].option.trim() == "") {
        // console.log(i);
        setAllOptIsValid(false);
        break;
      }
      setAllOptIsValid(true);
    }
  }, [numInputDiv]);

  // check for form validation on change of allOptIsValid
  useEffect(() => {
    if (allOptIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }

    // console.log("allOptIsValid" + allOptIsValid);
    // console.log("formIsValid: " + formIsValid);
  }, [allOptIsValid, formIsValid]);

  // for handing option input change
  const handleOptChange = (i, e) => {
    // console.log("From handleOptChange:");
    // console.log(numInputDiv);
    // const newOptValues = [...optValues];
    numInputDiv[i][e.target.id] = e.target.value;
    setNumInputDiv(numInputDiv);

    // check all opt values are valid
    for (let i = 0; i < numInputDiv.length; i++) {
      if (numInputDiv[i].option.trim() == "") {
        // console.log(i);
        setAllOptIsValid(false);
        break;
      }
      setAllOptIsValid(true);
    }
  };

  return (
    <Row>
      <Col md={2}></Col>
      <Col className={classes.singleDil}>
        <form onSubmit={formSubmitHandler}>
          <div>
            {!isLoading && (
              <div>
                <Row className={classes.nameIcon}>
                  {qnsFullData.username}
                  {qnsFullData.bookmark == "Y" && (
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={classes.bookmarkIcon}
                    />
                  )}
                </Row>
                <div className={classes.questionHeader}>
                  {qnsFullData.question}
                </div>
                <Row className={classes.choiceSect}>
                  <Col xs={1}></Col>
                  <Col>Choice</Col>
                  <Col xs={3}>Weight</Col>
                </Row>
                <ol>
                  {numInputDiv.map((element, i) => (
                    <OptionUpdate
                      opt={element}
                      key={i}
                      index={i}
                      onHandleOptChange={handleOptChange}
                      onSaveOptIsValid={saveOptIsValidHandler}
                      onHandleWeightChange={handleWeightChange}
                    />
                  ))}
                </ol>
                <Row className={classes.addMinusBtn}>
                  <button type="button" onClick={addNewInput}>
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className={classes.addMinusIcon}
                    />
                  </button>
                  <button type="button" onClick={removeInput}>
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      className={classes.addMinusIcon}
                    />
                  </button>
                </Row>

                {errorState && (
                  <p className={classes.errorText}>{errorState}</p>
                )}

                <Row>
                  <Col></Col>
                  <Col xs={9} className={classes.selAnsSect}>
                    <div className={classes.selectedAns}>Selected Answer:</div>
                    <div>{qnsFullData.selected_opt}</div>
                  </Col>
                  <Col></Col>
                </Row>
              </div>
            )}
          </div>
          <Row className={classes.rerunBtnRow}>
            <button disabled={!formIsValid} className={classes.rerunBtn}>
              Rerun
            </button>
          </Row>
        </form>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default SingleDilemma;
