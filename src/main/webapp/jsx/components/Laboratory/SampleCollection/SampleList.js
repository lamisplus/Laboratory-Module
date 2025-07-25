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
} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { TiArrowForward } from "react-icons/ti";
import axios from "axios";
import { token, url } from "../../../../api";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import { Badge } from "reactstrap";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import SampleCollection from "./CollectSampleModal";
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

const SampleList = (props) => {
  const classes = useStyles();

  const sampleCollections = props.patientObj ? props.patientObj : {};
  const Id = props.id;
  const isEmbedded = props.isEmbedded || false;
  const onActionComplete = props.onActionComplete;

  const [loading, setLoading] = useState(false);
  const [fetchTestOrders, setFetchTestOrders] = useState(sampleCollections);
  const [permissions, setPermissions] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [collectModal, setcollectModal] = useState({});

  const toggleModal = () => setModal(!modal);
  const toggleModal2 = () => setModal2(!modal2);
  const toggleModal3 = () => setModal3(!modal3);

  const getUniqueTestGroups = () => {
    if (!fetchTestOrders?.labOrder?.tests) return [];

    const testGroups = fetchTestOrders.labOrder.tests
      .filter((test) => test?.labTestGroupName)
      .map((test) => test.labTestGroupName);

    return [...new Set(testGroups)];
  };

  const uniqueTestGroups = getUniqueTestGroups();

  const userPermission = () => {
    axios
      .get(`${url}account`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setPermissions(response.data.permissions);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
      });
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}laboratory/orders/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFetchTestOrders(response.data);
      console.log("Loaded test orders:", response.data);
    } catch (e) {
      console.error("Error loading data:", e);
      toast.error("An error occurred while fetching lab data", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  }, [Id]);

  useEffect(() => {
    userPermission();
    if (Id) {
      loadData();
    }
  }, [Id, loadData]);

  const handleSample = (row, dateEncounter) => {
    console.log("Handling sample collection for test:", row);

    if (!row.id) {
      toast.error("Cannot collect sample: Test ID is missing", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setcollectModal({
      ...row,
      dateEncounter,
      hospitalNumber: sampleCollections.patientHospitalNumber,
    });
    setModal(!modal);
  };

  const transferSample = (row) => {
    console.log("Handling sample transfer for test:", row);
    setcollectModal(row);
    setModal2(!modal2);
  };

  const viewResult = (row) => {
    console.log("Viewing result for test:", row);
    setcollectModal(row);
    setModal3(!modal3);
  };

  const getGroup = (e) => {
    const selectedGroup = e.target.value;

    if (selectedGroup === "All") {
      loadData();
    } else {
      const filteredTests = {
        ...fetchTestOrders,
        labOrder: {
          ...fetchTestOrders.labOrder,
          tests: fetchTestOrders.labOrder.tests.filter(
            (test) => test.labTestGroupName === selectedGroup
          ),
        },
      };
      setFetchTestOrders(filteredTests);
    }
  };

  const sampleStatus = (status) => {
    switch (status) {
      case 1:
        return <Badge color="info">Sample Collected</Badge>;
      case 2:
        return <Badge color="primary">Sample Transferred</Badge>;
      case 3:
        return <Badge color="success">Sample Verified</Badge>;
      case 4:
        return <Badge color="danger">Sample Rejected</Badge>;
      case 5:
        return <Badge color="primary">Result Available</Badge>;
      default:
        return <Badge color="warning">Pending Collection</Badge>;
    }
  };

  const sampleAction = (row, dateEncounter) => {
    const { labTestOrderStatus } = row;

    if (!row.id) {
      console.error("Test ID missing for sample collection");
      return null;
    }

    if (labTestOrderStatus === 0 || labTestOrderStatus === null) {
      return (
        <Menu>
          <MenuButton
            style={{
              backgroundColor: "rgb(153, 46, 98)",
              color: "#fff",
              border: "0px",
              padding: "5px",
              borderRadius: "4px",
            }}
          >
            Action <span aria-hidden>▾</span>
          </MenuButton>
          <MenuList>
            <MenuItem onSelect={() => handleSample(row, dateEncounter)}>
              <FaPlusSquare size="15" style={{ color: "#000" }} /> Collect
              Sample
            </MenuItem>
          </MenuList>
        </Menu>
      );
    }

    if (labTestOrderStatus === 1) {
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
            <MenuItem onSelect={() => transferSample(row)}>
              <TiArrowForward size="15" style={{ color: "#000" }} /> Transfer
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
            <MenuItem onSelect={() => viewResult(row)}>
              <FaPlusSquare size="15" style={{ color: "#000" }} /> View Result
            </MenuItem>
          </MenuList>
        </Menu>
      );
    }

    return null;
  };

  // Handle data reload after sample collection
  const handDataReload = () => {
    console.log("Reloading sample collection data...");
    loadData()
      .then(() => {
        console.log("Sample collection data reloaded successfully");

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

  // Check if we have permission to collect samples
  // const hasCollectionPermission =
  //   permissions.includes("collect_samples")
  //   // ||
  //   // permissions.includes("all_permission");

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
                state: "collect-sample",
              }}
            >
              Laboratory
            </Link>
            <Typography color="textPrimary">Sample Collection</Typography>
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
              <Row>
                <Card body>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label className={classes.label}>Lab Test Group</Label>
                        <Input
                          type="select"
                          name="testgroup"
                          id="testgroup"
                          onChange={getGroup}
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
                          <th>Date Requested</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              <Spinner color="primary" /> Loading Please Wait
                            </td>
                          </tr>
                        ) : (
                          fetchTestOrders?.labOrder?.tests?.map(
                            (row) =>
                              row && (
                                <tr key={row.id}>
                                  <td>{row.labTestGroupName}</td>
                                  <td>{row.labTestName}</td>
                                  <td>{fetchTestOrders.labOrder.orderDate}</td>
                                  <td>
                                    {sampleStatus(row.labTestOrderStatus)}
                                  </td>
                                  <td>
                                    {
                                      sampleAction(
                                        row,
                                        fetchTestOrders.labOrder.orderDate
                                     )}
                                  </td>
                                </tr>
                              )
                          ) || (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No test orders found
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                    <br />
                  </Form>
                </Card>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      {modal && (
        <SampleCollection
          modalstatus={modal}
          togglestatus={toggleModal}
          datasample={collectModal}
          handDataReload={handDataReload}
        />
      )}

      {modal3 && (
        <ViewResult
          modalstatus={modal3}
          togglestatus={toggleModal3}
          datasample={collectModal}
        />
      )}
    </div>
  );
};

export default SampleList;
