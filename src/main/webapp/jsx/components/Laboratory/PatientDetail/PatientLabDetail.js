import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useLocation } from "react-router-dom";
import PatientCardDetail from "../../Patient/PatientCard";
import PatientTestOrders from "./PatientTestOrders";
import PatientSampleVerification from "./PatientSampleVerification";
import PatientResultReporting from "./PatientResultReporting";
import { useLaboratory } from "../../../context/LaboratoryContext";

const PatientLabDetail = () => {
  const location = useLocation();
  const { 
    activeTab, 
    setActiveTab, 
    loading, 
    setLoading,
    error,
    clearError,
    refreshTestOrders,
    refreshSampleVerification,
    refreshResultReporting,
    refreshAll,
    clearSelectedOrder
  } = useLaboratory();

  const [permissions, setPermissions] = useState([]);
  const [patient, setPatient] = useState(null);
  const [patientForCard, setPatientForCard] = useState({});

  // Initialize patient data from location state
  useEffect(() => {
    if (location.state && !patient) {
      const patientData = location.state;
      console.log("Setting patient data:", patientData);
      setPatient(patientData);
      
      // Transform patient data for PatientCard component
      const transformedPatient = {
        patientFirstName: patientData.firstName || patientData.fullname?.split(" ")[0] || "",
        patientLastName: patientData.surname || patientData.fullname?.split(" ").slice(1).join(" ") || "",
        patientHospitalNumber: patientData.hospitalNumber || "",
        patientDob: patientData.dateOfBirth || "",
        patientSex: patientData.sex || "",
        patientPhoneNumber: patientData.phoneNumber || "",
        patientAddress: patientData.address || "",
      };
      
      setPatientForCard(transformedPatient);
    }
  }, [location.state, patient]);

  // Fetch user permissions
  useEffect(() => {
    const userPermission = async () => {
      try {
        const response = await fetch('/api/v1/account', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPermissions(data.permissions || []);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    userPermission();
  }, []);



  // Handle tab change
  const handleTabChange = (tab) => {
    console.log("Tab changed to:", tab);
    setActiveTab(tab);
    clearSelectedOrder(); // Clear selected order when switching tabs
    
    
    setTimeout(() => {
      switch (tab) {
        case 'test-orders':
          console.log("Refreshing test orders...");
          refreshTestOrders();
          break;
        case 'sample-verification':
          console.log("Refreshing sample verification...");
          refreshSampleVerification();
          break;
        case 'result-reporting':
          console.log("Refreshing result reporting...");
          refreshResultReporting();
          break;
        default:
          break;
      }
    }, 100); // Small delay to ensure tab change is complete
  };

  // Function to refresh all tabs when data changes
  const refreshAllTabs = useCallback(() => {
    console.log("Refreshing all tabs...");
    refreshAll();
  }, [refreshAll]);


  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2">Loading patient data...</p>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        <hr />
        <button className="btn btn-outline-danger" onClick={clearError}>
          Try Again
        </button>
      </div>
    );
  }

  // Show no patient data state
  // if (!patient) {
  //   return (
  //     <div className="alert alert-warning m-3" role="alert">
      
  //     </div>
  //   );
  // }

  return (
    <div className="container-fluid">
      {/* Patient Card */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              <PatientCardDetail patientObj={patientForCard} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Laboratory Tabs */}
      <Row className="mt-3">
        <Col>
          <Card>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === 'test-orders' ? 'active' : ''}
                    onClick={() => handleTabChange('test-orders')}
                    style={{ cursor: 'pointer' }}
                  >
                    Test Orders
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === 'sample-verification' ? 'active' : ''}
                    onClick={() => handleTabChange('sample-verification')}
                    style={{ cursor: 'pointer' }}
                  >
                    Sample Verification
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === 'result-reporting' ? 'active' : ''}
                    onClick={() => handleTabChange('result-reporting')}
                    style={{ cursor: 'pointer' }}
                  >
                    Result Reporting
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="mt-3">
                <TabPane tabId="test-orders">
                  <PatientTestOrders patient={patient} permissions={permissions} />
                </TabPane>
                <TabPane tabId="sample-verification">
                  <PatientSampleVerification patient={patient} permissions={permissions} />
                </TabPane>
                <TabPane tabId="result-reporting">
                  <PatientResultReporting patient={patient} permissions={permissions} />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientLabDetail; 