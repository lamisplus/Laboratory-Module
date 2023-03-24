import React, {useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col, Card,  Tab, Tabs, } from "react-bootstrap";
import LabTestOrderSearch from './Laboratory/Testorders/LabTestOrderSearch';
import LabTestResultSearch from './Laboratory/TestResult/LabTestResultSearch';
import LabTestVerifySampleSearch from './Laboratory/Sampleverifications/LabTestVerifySampleSearch';
import Config from './Laboratory/Configuration/Config';
import CheckInPatients from './CheckInPatients/Index';
import {labObj} from './LabObj'
import axios from "axios";
import {token, url } from "../../api";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const Home = (props) => {
    const [key, setKey] = useState('collection');
    const [permissions, setPermissions] = useState([]);
    //const urlIndex = getQueryParams("tab", props.location.search); 
    const urlTabs = props.location && props.location.state ? props.location.state : null ;

    const userPermission =()=>{
        axios
            .get(`${url}account`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                //console.log("permission", response.data.permissions)
                setPermissions(response.data.permissions);
            })
            .catch((error) => {
            });
    }

  useEffect ( () => {
  userPermission()
    switch(urlTabs){  
      case "collect-sample": return setKey('collection')
      case "verification": return setKey('verification')
      case "result": return setKey('result')
      
      default: return setKey('collection')
    }
  }, [urlTabs]);

  return (
    <Fragment>
     
      <Row>
       
        <Col xl={12}>
          <Card style={divStyle}>
            
            <Card.Body>
              {/* <!-- Nav tabs --> */}
              <div className="custom-tab-1">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    >
                    {/* <Tab eventKey="home" title="Checked In Patients">                   
                      <CheckInPatients labObj={labObj} />
                    </Tab> */}

                    <Tab eventKey="collection" title="Test Orders">                   
                      <LabTestOrderSearch />
                    </Tab>

                    { permissions.includes('Verify_samples') || permissions.includes("all_permission") &&
                    <Tab eventKey="verification" title="Sample Verification">
                      <LabTestVerifySampleSearch/>
                    </Tab>
                    }
                    { permissions.includes('View_sample_results') || permissions.includes("all_permission") &&
                    <Tab eventKey="result" title="Result Reporting">
                      <LabTestResultSearch />
                    </Tab>
                    }
                    { permissions.includes('lab_configurations') || permissions.includes("all_permission") &&
                    <Tab eventKey="config" title="Configurations">
                      <Config />
                    </Tab>
                    }
                    </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Fragment>
  );
};

export default Home;
