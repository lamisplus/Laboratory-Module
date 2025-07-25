import React, {useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import CheckInPatients from "./CheckInPatients/Index";
import { labObj } from "./LabObj";

import {token, url } from "../../api";
import axios from "axios";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const Home = (props) => {
  const [permissions, setPermissions] = useState([]);
  const [activeTab, setActiveTab] = useState("checked-in-patients");

  const userPermission = () => {
    axios
      .get(`${url}account`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setPermissions(response.data.permissions);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    userPermission();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Fragment>
      <Row>
        <Col xl={12}>
          <Card style={divStyle}>
            <CardBody>
              {/* Laboratory Tabs */}
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={
                      activeTab === "checked-in-patients" ? "active" : ""
                    }
                    onClick={() => handleTabChange("checked-in-patients")}
                    style={{ cursor: "pointer" }}
                  >
                    Patient Test Orders
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      activeTab === "laboratory-history" ? "active" : ""
                    }
                    onClick={() => handleTabChange("laboratory-history")}
                    style={{ cursor: "pointer" }}
                  >
                    Laboratory History
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="mt-3">
                <TabPane tabId="checked-in-patients">
                  <CheckInPatients labObj={labObj} permissions={permissions} />
                </TabPane>
                <TabPane tabId="laboratory-history">
                  <div className="text-center p-5">
                    <h4>Laboratory History</h4>
                  </div>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
