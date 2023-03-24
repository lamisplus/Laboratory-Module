import React from "react";
import {
  MemoryRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

import Home from './jsx/components/Home'
import SampleCollection from './jsx/components/Laboratory/SampleCollection/Index';
import Sampleverifications from './jsx/components/Laboratory/Sampleverifications/Index'
import TestResult from './jsx/components/Laboratory/TestResult/Index';
import PreviousResult from './jsx/components/Laboratory/TestResult/PreviousResult';
import PatientTestOrderHistory from './jsx/components/Laboratory/LabTestOrder/PatientTestOrderHistory'

export default function App() {
  return (

      <div>
      <ToastContainer />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/test-order">
            <PatientTestOrderHistory />
          </Route>
          <Route path="/samples-collection">
            <SampleCollection />
          </Route>
          <Route path="/samples-verification">
            <Sampleverifications />
          </Route>
          <Route path="/result-reporting">
            <TestResult />
          </Route>
          <Route exact path="/previous-result">
              <PreviousResult />
            </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
 
  );
}




