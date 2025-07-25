import { useState, useEffect, useMemo, memo } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { url as baseUrl, token, wsUrl } from "./../../../api";
import { forwardRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
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
import { Card, CardBody } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { TiArrowForward } from "react-icons/ti";
import { MdDashboard } from "react-icons/md";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "@reach/menu-button/styles.css";
import { Label } from "semantic-ui-react";
import SockJsClient from "react-stomp";

import Spinner from "react-bootstrap/Spinner";
import { usePermissions } from "../../../hooks/usePermissions";
import { useCheckedInPatientData } from "../../../hooks/useCheckedInPatientData";
import CustomTable from "../../../reuseables/CustomTable";

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

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 350,
  },
  button: {
    margin: theme.spacing(1),
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  error: {
    color: "#f85032",
    fontSize: "11px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const CheckedInPatients = (props) => {
  const { hasPermission } = usePermissions();
  const [showPPI, setShowPPI] = useState(true);
  const { fetchPatients } = useCheckedInPatientData(baseUrl, token);
  const [tableRefreshTrigger, setTableRefreshTrigger] = useState(0);

  const permissions = useMemo(
    () => ({
      canSeeEnrollButton: hasPermission("hiv_enrollment_register"),
      canViewDashboard: hasPermission("view_patient"),
    }),
    [hasPermission]
  );

  const onMessageReceived = (msg) => {
    if (
      msg &&
      msg?.toLowerCase()?.includes("check") &&
      msg?.toLowerCase()?.includes("hiv")
    ) {
      setTableRefreshTrigger((prev) => prev + 1);
    }
  };

  const handleCheckBox = (e) => {
    setShowPPI(!e.target.checked);
  };

  const formatCheckInDate = (checkInDate) => {
    if (!checkInDate) return "";

    try {
      const date = new Date(checkInDate);

      const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      return date.toLocaleDateString("en-GB", options);
    } catch (error) {
      return checkInDate;
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Test Order Date",
        field: "checkInDate",
        render: (rowData) => formatCheckInDate(rowData.checkInDate),
      },

      {
        title: "Patient Name",
        field: "fullname",
        hidden: showPPI,
      },
      {
        title: "Hospital Number",
        field: "hospitalNumber",
      },
      { title: "Sex", field: "sex" },
      { title: "Age", field: "age" },
      {
        title: "Actions",
        field: "actions",
        render: (rowData) => {
          const isEnrolled = rowData.isEnrolled;

          return (
            <div>
              {/* {permissions.canSeeEnrollButton && !isEnrolled && (
                <Link
                  to={{
                    pathname: "/enroll-patient",
                    state: { patientId: rowData.id, patientObj: rowData },
                  }}
                >
                  <ButtonGroup
                    variant="contained"
                    aria-label="split button"
                    style={{
                      backgroundColor: "rgb(153, 46, 98)",
                      height: "30px",
                      width: "215px",
                    }}
                    size="large"
                  >
                    <Button
                      color="primary"
                      size="small"
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      style={{
                        backgroundColor: "rgb(153, 46, 98)",
                      }}
                    >
                      <TiArrowForward />
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "rgb(153, 46, 98)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#fff",
                          fontWeight: "bolder",
                        }}
                      >
                        Enroll Patient
                      </span>
                    </Button>
                  </ButtonGroup>
                </Link>
              )} */}

              {/* {permissions.canViewDashboard && isEnrolled && (
                <Link
                  to={{
                    pathname: "/patient-history",
                    state: { patientObj: rowData },
                  }}
                >
                  <ButtonGroup
                    variant="contained"
                    aria-label="split button"
                    style={{
                      backgroundColor: "rgb(153, 46, 98)",
                      height: "30px",
                      width: "215px",
                    }}
                    size="large"
                  >
                    <Button
                      color="primary"
                      size="small"
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      style={{
                        backgroundColor: "rgb(153, 46, 98)",
                      }}
                    >
                      <MdDashboard />
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "rgb(153, 46, 98)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#fff",
                          fontWeight: "bolder",
                        }}
                      >
                        Dashboard
                      </span>
                    </Button>
                  </ButtonGroup>
                </Link>
              )} */}

              <Link
                to={{
                  pathname: "/patient-lab-detail",
                  state: rowData,
                }}
                style={{ cursor: "pointer", color: "blue", fontStyle: "bold" }}
              >
                <ButtonGroup
                  variant="contained"
                  aria-label="split button"
                  style={{
                    backgroundColor: "rgb(153, 46, 98)",
                    height: "30px",
                    width: "215px",
                  }}
                  size="large"
                >
                  <Button
                    color="primary"
                    size="small"
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    style={{
                      backgroundColor: "rgb(153, 46, 98)",
                    }}
                  >
                    <VisibilityIcon />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "rgb(153, 46, 98)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#fff",
                        fontWeight: "bolder",
                      }}
                    >
                      Dashboard
                    </span>
                  </Button>
                </ButtonGroup>
              </Link>
            </div>
          );
        },
      },
    ],
    [showPPI, permissions.canSeeEnrollButton, permissions.canViewDashboard]
  );

  const getData = async (query) => {
    try {
      const { search, page, pageSize } = query;

      const data = await fetchPatients({
        search,
        page,
        pageSize,
      });

      let filteredData = [...(data || [])];

      if (search) {
        const searchLower = search.toLowerCase();
        filteredData = filteredData.filter(
          (patient) =>
            patient.fullname?.toLowerCase().includes(searchLower) ||
            patient.hospitalNumber?.toLowerCase().includes(searchLower)
        );
      }

      const reversedData = filteredData.reverse();
      console.log("format", reversedData);

      return {
        data: reversedData,
        page: page || 0,
        totalCount: reversedData.length || 0,
      };
    } catch (error) {
      console.error("Error fetching patient data:", error);
      return {
        data: [],
        page: 0,
        totalCount: 0,
      };
    }
  };

  return (
    <div>
      <SockJsClient
        url={wsUrl}
        topics={["/topic/checking-in-out-process"]}
        onMessage={onMessageReceived}
        debug={true}
      />
      <Card>
        <CardBody>
          <CustomTable
            key={tableRefreshTrigger}
            title="Patient Test Orders"
            columns={columns}
            data={getData}
            icons={tableIcons}
            showPPI={showPPI}
            onPPIChange={handleCheckBox}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default memo(CheckedInPatients);
