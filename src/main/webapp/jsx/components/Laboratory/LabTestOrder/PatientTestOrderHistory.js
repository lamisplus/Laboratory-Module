
import React, { useEffect, useState, useCallback } from "react";
import MaterialTable from "material-table";
import { Link, useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MatButton from "@material-ui/core/Button";
import { forwardRef } from "react";
import axios from "axios";
import { url as baseUrl, token } from "./../../../../api";
import CreateTestorder from "./CreateTestorder";
import RecentActivities from "./RecentActivities";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { Breadcrumbs, Typography } from "@material-ui/core";
import PatientCardDetail from "./../../Patient/PatientCard";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const PatientTestOrderHistory = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [labOrders, setLabOrders] = useState([]);
  const [rdeOrders, setRdeOrders] = useState([]);
  const [historicalResults, setHistoricalResults] = useState([]);
  const [patient, setPatient] = useState(null);
  const [dataFetchStatus, setDataFetchStatus] = useState({
    standardOrders: "loading",
    rdeOrders: "loading",
    historicalResults: "loading",
  });

  const patientData =
    history.location && history.location.state ? history.location.state : null;

  const toggleModal = () => setModal(!modal);

  const handleSample = () => {
    setModal(!modal);
  };

  const getPatientObjForCard = () => {
    if (!patientData) return {};

    return {
      patientFirstName:
        patientData.firstName || patientData.fullname?.split(" ")[0] || "",
      patientLastName:
        patientData.surname ||
        patientData.fullname?.split(" ").slice(1).join(" ") ||
        "",
      patientHospitalNumber: patientData.hospitalNumber || "",
      patientDob: patientData.dateOfBirth || "",
      patientSex: patientData.sex || "",
      patientPhoneNumber: patientData.phoneNumber || "",
      patientAddress: patientData.address || "",
    };
  };

  const fetchAllLabData = useCallback(async () => {
    if (!patientData) {
      console.error("No patient data available");
      setLoading(false);
      return;
    }

    console.log("🔍 Fetching all lab data for patient:", patientData);
    setLoading(true);

    const patientId = patientData.id;
    const visitId = patientData.visitId;

    const apiCalls = [];

    if (patientId) {
      apiCalls.push(
        axios
          .get(`${baseUrl}laboratory/orders/patients/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => ({
            type: "standardOrdersByPatient",
            data: response.data,
            success: true,
          }))
          .catch((error) => ({
            type: "standardOrdersByPatient",
            error: error.response?.data?.message || error.message,
            success: false,
          }))
      );
    }

    if (visitId) {
      apiCalls.push(
        axios
          .get(`${baseUrl}laboratory/orders/visits/${visitId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => ({
            type: "standardOrdersByVisit",
            data: response.data,
            success: true,
          }))
          .catch((error) => ({
            type: "standardOrdersByVisit",
            error: error.response?.data?.message || error.message,
            success: false,
          }))
      );
    }

    if (patientId) {
      apiCalls.push(
        axios
          .get(`${baseUrl}laboratory/rde-orders/patients/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => ({
            type: "rdeOrders",
            data: response.data,
            success: true,
          }))
          .catch((error) => ({
            type: "rdeOrders",
            error: error.response?.data?.message || error.message,
            success: false,
          }))
      );
    }

    if (patientId) {
      apiCalls.push(
        axios
          .get(`${baseUrl}laboratory/rde-all-orders/patients/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => ({
            type: "allRdeOrders",
            data: response.data,
            success: true,
          }))
          .catch((error) => ({
            type: "allRdeOrders",
            error: error.response?.data?.message || error.message,
            success: false,
          }))
      );
    }

    if (patientId) {
      apiCalls.push(
        axios
          .get(`${baseUrl}laboratory/results/patients/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => ({
            type: "historicalResults",
            data: response.data,
            success: true,
          }))
          .catch((error) => ({
            type: "historicalResults",
            error: error.response?.data?.message || error.message,
            success: false,
          }))
      );
    }

    try {
      const results = await Promise.allSettled(apiCalls);

      let standardOrders = [];
      let rdeOrdersData = [];
      let historicalData = [];
      const fetchStatus = { ...dataFetchStatus };

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { type, data, success, error } = result.value;

          console.log(`📊 ${type}:`, {
            success,
            data: data || "No data",
            error,
          });

          switch (type) {
            case "standardOrdersByPatient":
            case "standardOrdersByVisit":
              if (success && data && data.length > 0) {
                standardOrders = [...standardOrders, ...data];
                fetchStatus.standardOrders = "success";
              } else if (!success) {
                fetchStatus.standardOrders = "error";
              }
              break;
            case "rdeOrders":
            case "allRdeOrders":
              if (success && data && data.length > 0) {
                rdeOrdersData = [...rdeOrdersData, ...data];
                fetchStatus.rdeOrders = "success";
              } else if (!success) {
                fetchStatus.rdeOrders = "error";
              }
              break;
            case "historicalResults":
              if (success && data && data.length > 0) {
                historicalData = data;
                fetchStatus.historicalResults = "success";
              } else if (!success) {
                fetchStatus.historicalResults = "error";
              }
              break;
          }
        }
      });

      const uniqueStandardOrders = standardOrders.filter(
        (order, index, self) =>
          index === self.findIndex((o) => o.labOrder?.id === order.labOrder?.id)
      );

      const uniqueRdeOrders = rdeOrdersData.filter(
        (order, index, self) =>
          index === self.findIndex((o) => o.id === order.id)
      );

      console.log("📈 Final processed data:", {
        standardOrders: uniqueStandardOrders.length,
        rdeOrders: uniqueRdeOrders.length,
        historicalResults: historicalData.length,
        fetchStatus,
      });

      setLabOrders(uniqueStandardOrders);
      setRdeOrders(uniqueRdeOrders);
      setHistoricalResults(historicalData);
      setDataFetchStatus(fetchStatus);
      setPatient(patientData);
    } catch (error) {
      console.error("❌ Error in comprehensive lab data fetch:", error);
      toast.error("Error fetching lab data: " + error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  }, [patientData]);

  useEffect(() => {
    if (patientData) {
      fetchAllLabData();
    } else {
      setLoading(false);
      toast.error("No patient data available", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [fetchAllLabData]);

  const handleDeleteOrder = async (orderId, orderType = "standard") => {
    try {
      let endpoint;
      if (orderType === "rde") {
        endpoint = `${baseUrl}laboratory/rde-orders/${orderId}`;
      } else {
        endpoint = `${baseUrl}laboratory/orders/${orderId}`;
      }

      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Lab order deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });

      fetchAllLabData();
    } catch (error) {
      console.error("Error deleting lab order:", error);
      toast.error(
        "Error deleting lab order: " +
          (error.response?.data?.message || error.message),
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  const handleDeleteTest = async (testId, testType = "standard") => {
    try {
      let endpoint;
      if (testType === "rde") {
        endpoint = `${baseUrl}laboratory/rde-orders/tests/${testId}`;
      } else {
        endpoint = `${baseUrl}laboratory/orders/tests/${testId}`;
      }

      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Test deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });

      fetchAllLabData();
    } catch (error) {
      console.error("Error deleting test:", error);
      toast.error(
        "Error deleting test: " +
          (error.response?.data?.message || error.message),
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  const handleDeleteResult = async (resultId) => {
    try {
      await axios.delete(`${baseUrl}laboratory/results/${resultId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Result deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });

      fetchAllLabData();
    } catch (error) {
      console.error("Error deleting result:", error);
      toast.error(
        "Error deleting result: " +
          (error.response?.data?.message || error.message),
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  const handleDeleteSample = async (sampleId) => {
    try {
      await axios.delete(`${baseUrl}laboratory/samples/${sampleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Sample deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });

      fetchAllLabData();
    } catch (error) {
      console.error("Error deleting sample:", error);
      toast.error(
        "Error deleting sample: " +
          (error.response?.data?.message || error.message),
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
        {/* <span style={{ marginTop: "20px", fontSize: "16px" }}>
          Loading comprehensive lab data...
        </span> */}
      </div>
    );
  }

  if (!patientData) {
    return (
      <Card>
        <CardBody>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h5>No Patient Data Available</h5>
            <p>Please select a patient from the Checked In Patients list.</p>
            <Link to="/">
              <MatButton variant="contained" color="primary">
                Go Back to Patients List
              </MatButton>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  const totalLabData =
    labOrders.length + rdeOrders.length + historicalResults.length;

  return (
    <div>
      {/* <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "20px" }}>
        <Link
          color="inherit"
          to="/"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Laboratory Home
        </Link>
        <Typography color="textPrimary">Patient Lab Timeline</Typography>
      </Breadcrumbs> */}

      <Card>
        <CardBody>
          <PatientCardDetail patientObj={getPatientObjForCard()} />
          <br />

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <small className="text-success">
                Total Lab Records Found: <strong>{totalLabData}</strong>
              </small>
            </div>
            <MatButton
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleSample()}
            >
              Create Test Order
            </MatButton>
          </div>

          <RecentActivities
            labOrders={labOrders}
            rdeOrders={rdeOrders}
            historicalResults={historicalResults}
            patient={patient}
            onDeleteOrder={handleDeleteOrder}
            onDeleteTest={handleDeleteTest}
            onDeleteResult={handleDeleteResult}
            onDeleteSample={handleDeleteSample}
            onRefresh={fetchAllLabData}
          />

          <CreateTestorder
            modalstatus={modal}
            togglestatus={toggleModal}
            patientData={patientData}
            onSuccess={fetchAllLabData}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PatientTestOrderHistory;