import React, { useEffect, useCallback, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Badge,
} from "reactstrap";
import { TiDocumentText } from "react-icons/ti";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { FaPlusSquare, FaRegEye } from "react-icons/fa";
import MaterialTable from "material-table";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import EnterResult from "./EnterResult";
import ViewResult from "./../TestResult/ViewResult";
import axios from "axios";
import { token, url } from "../../../../api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "1px solid #014d88",
    borderRadius: "0px",
    fontSize: "16px",
    color: "#000",
  },
  label: {
    fontSize: "16px",
    color: "rgb(153, 46, 98)",
    fontWeight: "600",
  },
}));

const ResultReportingList = (props) => {
  const classes = useStyles();
  const Id = props.id;
  const patientId = props.patientObj?.patientId;
  const isEmbedded = props.isEmbedded || false; // New prop to hide breadcrumb when embedded
  const onActionComplete = props.onActionComplete; // Callback for when actions are completed

  const [loading, setLoading] = useState(false);
  const [fetchTestOrders, setFetchTestOrders] = useState({
    labOrder: { tests: [] },
  });
  const [originalData, setOriginalData] = useState({ labOrder: { tests: [] } });
  const [showHistoricalView, setShowHistoricalView] = useState(false);
  const [historicalResults, setHistoricalResults] = useState([]);

  // Modal states
  const [resultModal, setResultModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedSample, setSelectedSample] = useState({});

  const toggleResultModal = () => setResultModal(!resultModal);
  const toggleViewModal = () => setViewModal(!viewModal);

  // Load historical results
  const loadHistoricalResults = useCallback(async () => {
    if (!patientId) return;

    try {
      const response = await axios.get(
        `${url}laboratory/results/patients/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Historical results loaded:", response.data);
      setHistoricalResults(response.data);
    } catch (error) {
      console.error("Error fetching historical results:", error);
      toast.error("An error occurred while fetching previous results", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [patientId]);

  // Load current test orders
  const loadCurrentData = useCallback(async () => {
    if (!Id) return;

    try {
      setLoading(true);
      const response = await axios.get(`${url}laboratory/orders/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Current test orders loaded:", response.data);
      setOriginalData(response.data);
      setFetchTestOrders(response.data);
    } catch (error) {
      console.error("Error loading test orders:", error);
      toast.error("An error occurred while fetching lab data", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  }, [Id]);

  useEffect(() => {
    loadCurrentData();
    if (patientId) {
      loadHistoricalResults();
    }
  }, [loadCurrentData, loadHistoricalResults]);

  // Get unique test groups for filtering
  const getUniqueTestGroups = () => {
    if (!originalData?.labOrder?.tests) return [];

    const testGroups = [];
    originalData.labOrder.tests.forEach((test) => {
      if (test?.labTestGroupName) {
        testGroups.push(test.labTestGroupName);
      }
    });

    return [...new Set(testGroups)];
  };

  const uniqueTestGroups = getUniqueTestGroups();

  // Handle adding result
  const handleAddResult = (sample, testData) => {
    console.log("Adding result for sample:", sample);
    console.log("Patient object for visitId:", props.patientObj);

    if (!sample.id && !sample.sampleId) {
      toast.error("Cannot add result: Sample ID is missing", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const visitId = props.patientObj?.visitId;
    console.log("Retrieved visitId for checkout:", visitId);

    setSelectedSample({
      ...sample,
      testData: testData,
      patientId: patientId,
      visitId: visitId, // Get visitId directly from patient object
    });
    setResultModal(true);
  };

  // Handle viewing result
  const handleViewResult = (sample, testData) => {
    console.log("Viewing result for sample:", sample);
    setSelectedSample({
      ...sample,
      testData: testData,
      labTestName: testData.labTestName,
    });
    setViewModal(true);
  };

  // Filter tests by group
  const handleGroupFilter = (e) => {
    const selectedGroup = e.target.value;

    if (selectedGroup === "All") {
      setFetchTestOrders(originalData);
    } else {
      const filteredTests = {
        ...originalData,
        labOrder: {
          ...originalData.labOrder,
          tests: originalData.labOrder.tests.filter(
            (test) => test.labTestGroupName === selectedGroup
          ),
        },
      };
      setFetchTestOrders(filteredTests);
    }
  };

  // Get sample status badge
  const getSampleStatus = (status) => {
    switch (status) {
      case 1:
        return <Badge color="info">Sample Collected</Badge>;
      case 2:
        return <Badge color="warning">Sample Transferred</Badge>;
      case 3:
        return <Badge color="success">Sample Verified</Badge>;
      case 4:
        return <Badge color="danger">Sample Rejected</Badge>;
      case 5:
        return <Badge color="primary">Result Available</Badge>;
      default:
        return <Badge color="secondary">Unknown Status</Badge>;
    }
  };

  // Get available actions for verified samples
  const getSampleActions = (test, sample) => {
    console.log(
      "Checking actions for test status:",
      test.labTestOrderStatus,
      "sample:",
      sample
    );

    // Only show actions for samples that have been verified
    if (sample.dateSampleVerified) {
      // Check multiple ways if results exist
      const hasResults =
        (sample.results && sample.results.length > 0) ||
        test.labTestOrderStatus === 5 ||
        sample.resultReported ||
        sample.dateResultReported;

      console.log("Sample has results:", hasResults, {
        resultsArray: sample.results?.length || 0,
        testStatus: test.labTestOrderStatus,
        resultReported: sample.resultReported,
        dateResultReported: sample.dateResultReported,
        dateSampleVerified: sample.dateSampleVerified,
      });

      return (
        <Menu>
          <MenuButton
            style={{
              backgroundColor: "rgb(153, 46, 98)",
              color: "#fff",
              border: "0px",
              borderRadius: "4px",
              padding: "5px",
            }}
          >
            Action <span aria-hidden>▾</span>
          </MenuButton>
          <MenuList>
            <MenuItem onSelect={() => handleViewResult(sample, test)}>
              <FaRegEye size="15" style={{ color: "#3F51B5" }} /> View Result
            </MenuItem>
            {!hasResults && (
              <MenuItem onSelect={() => handleAddResult(sample, test)}>
                <FaPlusSquare size="15" style={{ color: "#3F51B5" }} /> Add
                Result
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      );
    }

    return null;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  // Handle data reload after adding result
  const handleDataReload = () => {
    console.log("Reloading result reporting data...");
    loadCurrentData()
      .then(() => {
        console.log("Result reporting data reloaded successfully");
        // toast.success("Data refreshed successfully", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });

        // Call the callback if provided (for embedded usage)
        if (onActionComplete && typeof onActionComplete === "function") {
          onActionComplete();
        }
      })
      .catch((error) => {
        console.error("Error reloading data:", error);
        toast.error("Error refreshing data", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  // Toggle between current and historical view
  const handleViewToggle = () => {
    setShowHistoricalView(!showHistoricalView);
  };

  // Generate table rows for current results
  const generateCurrentTableRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            <Spinner color="primary" /> Loading Please Wait
          </td>
        </tr>
      );
    }

    if (
      !fetchTestOrders?.labOrder?.tests ||
      fetchTestOrders.labOrder.tests.length === 0
    ) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            No test orders found
          </td>
        </tr>
      );
    }

    const rows = [];

    fetchTestOrders.labOrder.tests.forEach((test) => {
      if (test.samples && test.samples.length > 0) {
        test.samples.forEach((sample) => {
          // Show samples that have been verified - each sample is handled independently
          const isRejected = sample.commentSampleVerified
            ?.toLowerCase()
            .includes("reject");
          const isCollected = sample.dateSampleCollected !== null;
          const isVerified = sample.dateSampleVerified !== null;

          console.log("Sample check:", {
            sampleNumber: sample.sampleNumber,
            testStatus: test.labTestOrderStatus,
            isRejected,
            isCollected,
            isVerified,
            dateSampleVerified: sample.dateSampleVerified,
          });

          if (!isRejected && isCollected && isVerified) {
            // Determine the actual status to display
            let displayStatus = test.labTestOrderStatus;
            if (
              test.labTestOrderStatus === 5 ||
              sample.dateResultReported ||
              sample.resultReported
            ) {
              displayStatus = 5; // Result Available
            }

            rows.push(
              <tr key={`${test.id}-${sample.id || sample.sampleNumber}`}>
                <td>{test.labTestGroupName}</td>
                <td>{test.labTestName}</td>
                <td>{sample.sampleNumber}</td>
                <td>
                  <Badge color="primary">
                    {sample.sampleTypeName || "N/A"}
                  </Badge>
                </td>
                <td>{formatDate(sample.dateSampleVerified)}</td>
                <td>{getSampleStatus(displayStatus)}</td>
                <td>{getSampleActions(test, sample)}</td>
              </tr>
            );
          }
        });
      }
    });

    if (rows.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            No verified samples available for result reporting
          </td>
        </tr>
      );
    }

    return rows;
  };

  // Prepare historical data for MaterialTable
  const getHistoricalTableData = () => {
    return historicalResults.map((row) => ({
      patientId: row.patientId,
      patientName: `${row.patientFirstName} ${row.patientLastName}`,
      orderDate: row.orderDate,
      sampleType: row.sampleTypeName,
      dateCollected: row.DateSampleCollected || "----",
      dateVerified: row.dateSampleVerified || "----",
      dateReported: row.dateResultReported || "----",
      resultStatus: row.dateResultReported ? "Available" : "Not Available",
    }));
  };

  return (
    <div>
      {/* Only show breadcrumb when not embedded */}
      {!isEmbedded && (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              to={{
                pathname: "/laboratory",
                state: "result-reporting",
              }}
            >
              Laboratory
            </Link>
            <Typography color="textPrimary">Result Reporting</Typography>
          </Breadcrumbs>

          <br />
          <br />
        </>
      )}

      <Row>
        <Col>
          <Card className="mb-12">
            {/* <CardHeader>
              <span style={{ textTransform: "capitalize" }}>
                Test Order Details
              </span>
            </CardHeader> */}

            <CardBody>
              <Card body>
                <Row className="align-items-center justify-content-between">
                  <Col md="4">
                    <div className="d-flex align-items-center">
                      <Label
                        className={classes.label}
                        style={{ marginRight: "10px", marginBottom: "0" }}
                      >
                        Lab Test Group:
                      </Label>
                      <Input
                        type="select"
                        name="testgroup"
                        id="testgroup"
                        onChange={handleGroupFilter}
                        className={classes.input}
                        style={{ width: "auto", minWidth: "250px" }}
                      >
                        <option value="All">All</option>
                        {uniqueTestGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                  <Col md="auto">
                    <div style={{ display: "flex", gap: "10px" }}>
                      <MatButton
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={loadCurrentData}
                        startIcon={<RefreshIcon />}
                      >
                        Refresh
                      </MatButton>
                      <MatButton
                        style={{
                          backgroundColor: "rgb(153, 46, 98)",
                        }}
                        type="submit"
                        variant="contained"
                        color={showHistoricalView ? "primary" : "secondary"}
                        onClick={handleViewToggle}
                      >
                        <TiDocumentText />{" "}
                        {showHistoricalView
                          ? "View Recent Results"
                          : "Historical Results"}
                      </MatButton>
                    </div>
                  </Col>
                </Row>
                <br />

                {showHistoricalView ? (
                  <MaterialTable
                    title="Historical patient sample results"
                    columns={[
                      { title: "Patient ID", field: "patientId" },
                      { title: "Patient Name", field: "patientName" },
                      {
                        title: "Date Order",
                        field: "orderDate",
                        type: "date",
                        filtering: false,
                      },
                      {
                        title: "Sample Type",
                        field: "sampleType",
                        filtering: false,
                      },
                      {
                        title: "Date Sample Collected",
                        field: "dateCollected",
                        filtering: false,
                      },
                      {
                        title: "Date Sample Verified",
                        field: "dateVerified",
                        filtering: false,
                      },
                      {
                        title: "Date Result Reported",
                        field: "dateReported",
                        filtering: false,
                      },
                      {
                        title: "Result Status",
                        field: "resultStatus",
                        filtering: false,
                      },
                    ]}
                    data={getHistoricalTableData()}
                    options={{
                      headerStyle: {
                        backgroundColor: "#014d88",
                        color: "#fff",
                      },
                      // searchFieldStyle: {
                      //   width: "300px",

                      // },
                      filtering: false,
                      exportButton: false,
                      searchFieldAlignment: "left",
                      pageSizeOptions: [10, 20, 100],
                      pageSize: 10,
                      debounceInterval: 400,
                    }}
                  />
                ) : (
                  <>
                    <Form>
                      <br />
                      <Table striped responsive>
                        <thead
                          style={{ backgroundColor: "#014d88", color: "#fff" }}
                        >
                          <tr>
                            <th>Test Group</th>
                            <th>Test Type</th>
                            <th>Sample ID</th>
                            <th>Sample Type</th>
                            <th>Date Verified</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{generateCurrentTableRows()}</tbody>
                      </Table>
                    </Form>
                  </>
                )}
              </Card>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      {resultModal && (
        <EnterResult
          modalstatus={resultModal}
          togglestatus={toggleResultModal}
          datasample={selectedSample}
          patientId={patientId}
          handDataReload={handleDataReload}
        />
      )}

      {viewModal && (
        <ViewResult
          modalstatus={viewModal}
          togglestatus={toggleViewModal}
          datasample={selectedSample}
        />
      )}
    </div>
  );
};

export default ResultReportingList;
