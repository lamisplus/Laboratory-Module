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
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { FaPlusSquare, FaRegEye } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { toast } from "react-toastify";
import { token, url } from "../../../../api";
import axios from "axios";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import MatButton from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import SampleVerification from "./SampleVerification";
import ViewResult from "./../TestResult/ViewResult";

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

const SampleVerificationList = (props) => {
  const classes = useStyles();
  const Id = props.id;
  const isEmbedded = props.isEmbedded || false;
  const onActionComplete = props.onActionComplete;

  const [loading, setLoading] = useState(false);
  const [fetchTestOrders, setFetchTestOrders] = useState({
    labOrder: { tests: [] },
  });
  const [originalData, setOriginalData] = useState({ labOrder: { tests: [] } });

  const [verificationModal, setVerificationModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [selectedSample, setSelectedSample] = useState({});

  const toggleVerificationModal = () =>
    setVerificationModal(!verificationModal);
  const toggleResultModal = () => setResultModal(!resultModal);

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

  const loadData = useCallback(async () => {
    if (!Id) return;

    try {
      setLoading(true);
      const response = await axios.get(`${url}laboratory/orders/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Loaded test orders for verification:", response.data);
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
    loadData();
  }, [loadData]);

  const handleVerifySample = (sample) => {
    console.log("Opening verification modal for sample:", sample);

    if (!sample.id && !sample.sampleId) {
      toast.error("Cannot verify sample: Sample ID is missing", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setSelectedSample(sample);
    setVerificationModal(true);
  };

  const viewResult = (sample) => {
    console.log("Viewing result for sample:", sample);
    setSelectedSample(sample);
    setResultModal(true);
  };

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

  const getSampleActions = (test, sample) => {
    const { labTestOrderStatus } = test;

    if (sample.dateSampleCollected && !sample.dateSampleVerified) {
      return (
        <Menu>
          <MenuButton
            style={{
              backgroundColor: "#3F51B5",
              color: "#fff",
              border: "2px solid #3F51B5",
              borderRadius: "4px",
            }}
          >
            Action <span aria-hidden>▾</span>
          </MenuButton>
          <MenuList>
            <MenuItem
              onSelect={() => handleVerifySample({ ...sample, testData: test })}
            >
              <GoChecklist size="15" style={{ color: "#3F51B5" }} /> Verify
              Sample
            </MenuItem>
          </MenuList>
        </Menu>
      );
    }

    if (labTestOrderStatus === 4) {
      return (
        <Menu>
          <MenuButton
            style={{
              backgroundColor: "#3F51B5",
              color: "#fff",
              border: "2px solid #3F51B5",
              borderRadius: "4px",
            }}
          >
            Action <span aria-hidden>▾</span>
          </MenuButton>
          <MenuList>
            <MenuItem
              onSelect={() => console.log("Re-collect sample:", sample)}
            >
              <FaPlusSquare size="15" style={{ color: "#3F51B5" }} /> Re-collect
              Sample
            </MenuItem>
          </MenuList>
        </Menu>
      );
    }

    if (labTestOrderStatus === 5) {
      return (
        <Menu>
          <MenuButton
            style={{
              backgroundColor: "#3F51B5",
              color: "#fff",
              border: "2px solid #3F51B5",
              borderRadius: "4px",
            }}
          >
            Action <span aria-hidden>▾</span>
          </MenuButton>
          <MenuList>
            <MenuItem
              onSelect={() => viewResult({ ...sample, testData: test })}
            >
              <FaRegEye size="15" style={{ color: "#3F51B5" }} /> View Result
            </MenuItem>
            <MenuItem onSelect={() => console.log("Add result:", sample)}>
              <FaPlusSquare size="15" style={{ color: "#3F51B5" }} /> Add Result
            </MenuItem>
          </MenuList>
        </Menu>
      );
    }

    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const handleDataReload = () => {
    console.log("Reloading verification data...");
    loadData()
      .then(() => {
        console.log("Verification data reloaded successfully");
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

  const generateTableRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="8" className="text-center">
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
          <td colSpan="8" className="text-center">
            No test orders found
          </td>
        </tr>
      );
    }

    const rows = [];

    fetchTestOrders.labOrder.tests.forEach((test) => {
      if (test.samples && test.samples.length > 0) {
        test.samples.forEach((sample) => {
          if (sample.dateSampleCollected && !sample.dateSampleVerified) {
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
                <td>{formatDate(sample.dateSampleCollected)}</td>
                <td>{getSampleStatus(test.labTestOrderStatus)}</td>
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
          <td colSpan="8" className="text-center">
            No samples ready for verification
          </td>
        </tr>
      );
    }

    return rows;
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
                state: "sample-verification",
              }}
            >
              Laboratory
            </Link>
            <Typography color="textPrimary">Sample Verification</Typography>
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
                Samples Collected Details
              </span>
            </CardHeader> */}

            <CardBody>
              <Row>
                <Card body>
                  <Row className="align-items-center justify-content-between">
                    <Col md="4">
                      <FormGroup>
                        <Label className={classes.label}>Lab Test Group</Label>
                        <Input
                          type="select"
                          name="testgroup"
                          id="testgroup"
                          onChange={handleGroupFilter}
                          className={classes.input}
                        >
                          <option value="All">All</option>
                          {uniqueTestGroups.map((group) => (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="auto">
                      <MatButton
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={loadData}
                        startIcon={<RefreshIcon />}
                      >
                        Refresh
                      </MatButton>
                    </Col>
                  </Row>

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
                          <th>Date Collected</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>{generateTableRows()}</tbody>
                    </Table>
                  </Form>
                </Card>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      {verificationModal && (
        <SampleVerification
          modalstatus={verificationModal}
          togglestatus={toggleVerificationModal}
          datasample={selectedSample}
          handDataReload={handleDataReload}
        />
      )}

      {resultModal && (
        <ViewResult
          modalstatus={resultModal}
          togglestatus={toggleResultModal}
          datasample={selectedSample}
        />
      )}
    </div>
  );
};

export default SampleVerificationList;
