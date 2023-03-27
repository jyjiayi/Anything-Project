import "./App.css";
import React, { useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import MainHeader from "./components/navbar/MainHeader";
import NewDilemmaForm from "./pages/NewDilemmaForm";
import SingleDilemma from "./pages/SingleDilemma";
import ViewDilemma from "./pages/ViewDilemma";

function App() {
  const [inputData, setInputData] = useState({});

  const submitFormHandler = (data) => {
    // console.log(data);
    setInputData(data);
  };

  return (
    <div>
      <header>
        <MainHeader />
      </header>

      <main className="App">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/newDilemma" />
          </Route>
          <Route path="/newDilemma">
            <NewDilemmaForm onSubmitFormHander={submitFormHandler} />
          </Route>
          <Route path="/viewDilemma">
            <ViewDilemma inputData={inputData} />
          </Route>
          <Route path="/singleDilemma/:qns_id">
            <SingleDilemma />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
