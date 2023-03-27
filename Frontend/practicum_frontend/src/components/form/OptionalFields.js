import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import classes from "./OptionalFields.module.css";

const OptionalFields = (props) => {
  return (
    <div className={classes.all}>
      <Row className={classes.title}>Optional</Row>
      <Row>
        <Col className={classes.text}>Username</Col>
        <Col sm={9}>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            ref={props.usernameRef}
            placeholder="Input here if you want to save this..."
          ></input>
        </Col>
      </Row>

      <Row>
        <Col className={classes.text}>Bookmark</Col>
        <Col>
          <Form.Select
            aria-label="Default select example"
            ref={props.bookmarkRef}
            className={classes.itemDropdown}
          >
            <option value="Y" className={classes.itemDropdown}>
              Y
            </option>
            <option value="N" className={classes.itemDropdown}>
              N
            </option>
          </Form.Select>
        </Col>
        <Col xs={6}></Col>
      </Row>
    </div>
  );
};

export default OptionalFields;
