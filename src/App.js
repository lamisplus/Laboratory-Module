import React from "react";
import {
  MemoryRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./main/webapp/vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./../src/main/webapp/css/style.css";

import Home from './main/webapp/jsx/components/Home'
import SampleCollection from './main/webapp/jsx/components/Laboratory/SampleCollection/Index';
import Sampleverifications from './main/webapp/jsx/components/Laboratory/Sampleverifications/Index'
import TestResult from './main/webapp/jsx/components/Laboratory/TestResult/Index';
import PatientTestOrderHistory from './main/webapp/jsx/components/Laboratory/LabTestOrder/PatientTestOrderHistory'

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
          <Route path="/">
            <Home />
          </Route>
        
          
        </Switch>
      </div>
 
  );
}




