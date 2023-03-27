import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";

import classes from "./QnsView.module.css";
import React from "react";

const QnsView = (props) => {
  const history = useHistory();

  // for clicking of button to view single dilemma
  const viewDilemmaHandler = () => {
    history.push({
      pathname: `/singleDilemma/${props.qns.qns_id}`,
    });
  };

  return (
    <div className={classes.all}>
      <Row>
        <Col className={classes.firstCol}>Question</Col>
        <Col className={classes.question}>{props.qns.question}</Col>
        <Col className={[`${classes.weight}`, "d-none d-sm-block"]}>Weight</Col>
        <Col className={classes.icon}>
          {props.qns.bookmark == "Y" && <FontAwesomeIcon icon={faBookmark} />}
        </Col>
      </Row>
      <Row>
        <Col className={classes.firstColChoice}>Choices</Col>
        <Col>
          {props.qns.optList.map((opt, j) => (
            <Row key={j}>
              <Col className={classes.singleOpt}>{opt.option}</Col>
              <Col className={[`${classes.singleWeight}`, "d-none d-sm-block"]}>
                {opt.weight}
              </Col>
            </Row>
          ))}
        </Col>
        <Col className={classes.icon}></Col>
      </Row>
      <Row>
        <Col className={classes.firstCol}>Last Selected</Col>
        <Col className={classes.singleOpt}> {props.qns.selected_opt}</Col>
        <Col className={classes.icon}></Col>
      </Row>
      <Row className={classes.buttonRow}>
        <button type="button" onClick={viewDilemmaHandler}>
          {" "}
          View
          <FontAwesomeIcon className={classes.buttonIcon} icon={faEye} />
        </button>
      </Row>
    </div>
  );
};

export default QnsView;
