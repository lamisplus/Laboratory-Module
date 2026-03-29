import React, { Fragment, useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { url as baseUrl, token } from "../../../../api";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import CustomTable from "../../../../reuseables/CustomTable";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import { forwardRef } from "react";
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
import Button from "@material-ui/core/Button";

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
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bolder",
  },
  actionButton: {
    backgroundColor: "rgb(153, 46, 98)",
    height: "30px",
    width: "215px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(133, 26, 78)",
    },
  },
  buttonText: {
    fontSize: "12px",
    color: "#fff",
    fontWeight: "bolder",
  },
  iconButton: {
    padding: "4px",
  },
}));

const LaboratoryHistory = (props) => {
  const classes = useStyles();
  const [laboratoryHistory, setLaboratoryHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPPI, setShowPPI] = useState(true); // PII toggle state
  const [tableRefreshTrigger, setTableRefreshTrigger] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: 50,
    totalElements: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  let history = useHistory();

  useEffect(() => {
    // Initial load with default parameters
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}laboratory/orders?pageNo=0&pageSize=50`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("Initial API response:", response.data);
        
        if (response.data && response.data.data) {
          // Handle new API response format with pagination
          const processedData = response.data.data.map(item => {
            const labOrder = item.labOrder || {};
            const tests = labOrder.tests || [];
            const firstTest = tests[0] || {};
            
            return {
              ...item,
              firstName: item.patientFirstName || item.firstName || "",
              surname: item.patientLastName || item.surname || "",
              fullname: item.patientName || `${item.patientFirstName || ""} ${item.patientLastName || ""}`.trim() || "N/A",
              hospitalNumber: item.hospitalNumber || item.patientHospitalNumber || "N/A",
              dateOfBirth: item.dateOfBirth || item.patientDob || "",
              sex: item.sex || item.patientSex || "",
              phoneNumber: item.phoneNumber || item.patientPhoneNumber || "",
              address: item.address || item.patientAddress || "",
              labTestName: firstTest.labTestName || item.labTestName || "N/A",
              labTestGroupName: firstTest.labTestGroupName || item.labTestGroupName || "N/A",
              labTestOrderStatusName: firstTest.labTestOrderStatusName || item.labTestOrderStatusName || "Unknown",
              dateOrderBy: firstTest.orderDate || labOrder.orderDate || item.dateOrderBy || item.dateCreated || "N/A",
              result: firstTest.result || item.result || "N/A",
              dateResultReported: firstTest.dateResultReported || item.dateResultReported || "N/A",
              labOrder: labOrder
            };
          });
          
          setLaboratoryHistory(processedData);
          setPagination({
            currentPage: response.data.currentPage || 0,
            pageSize: response.data.pageSize || 50,
            totalElements: response.data.totalElements || 0,
            totalPages: response.data.totalPages || 0
          });
        } else if (response.data && Array.isArray(response.data)) {
          // Handle legacy response format
          const processedData = response.data.map(item => {
            const labOrder = item.labOrder || {};
            const tests = labOrder.tests || [];
            const firstTest = tests[0] || {};
            
            return {
              ...item,
              firstName: item.patientFirstName || item.firstName || "",
              surname: item.patientLastName || item.surname || "",
              fullname: item.patientName || `${item.patientFirstName || ""} ${item.patientLastName || ""}`.trim() || "N/A",
              hospitalNumber: item.hospitalNumber || item.patientHospitalNumber || "N/A",
              dateOfBirth: item.dateOfBirth || item.patientDob || "",
              sex: item.sex || item.patientSex || "",
              phoneNumber: item.phoneNumber || item.patientPhoneNumber || "",
              address: item.address || item.patientAddress || "",
              labTestName: firstTest.labTestName || item.labTestName || "N/A",
              labTestGroupName: firstTest.labTestGroupName || item.labTestGroupName || "N/A",
              labTestOrderStatusName: firstTest.labTestOrderStatusName || item.labTestOrderStatusName || "Unknown",
              dateOrderBy: firstTest.orderDate || labOrder.orderDate || item.dateOrderBy || item.dateCreated || "N/A",
              result: firstTest.result || item.result || "N/A",
              dateResultReported: firstTest.dateResultReported || item.dateResultReported || "N/A",
              labOrder: labOrder
            };
          });
          
          setLaboratoryHistory(processedData);
          setPagination({
            currentPage: 0,
            pageSize: 50,
            totalElements: processedData.length,
            totalPages: 1
          });
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
        toast.error("Failed to load laboratory history: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const fetchLaboratoryHistory = async (page = 0, size = 50, search = "") => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams({
        pageNo: page.toString(),
        pageSize: size.toString()
      });
      
      if (search && search.trim()) {
        params.append('search', search.trim());
      }

      const response = await axios.get(`${baseUrl}laboratory/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("API response:", response.data);
      
      if (response.data && response.data.data) {
        // Handle new API response format with pagination
        const processedData = response.data.data.map(item => {
          // Extract lab order data if it exists
          const labOrder = item.labOrder || {};
          const tests = labOrder.tests || [];
          const firstTest = tests[0] || {};
          
          return {
            ...item,
            // Patient data fields expected by PatientLabDetail
            firstName: item.patientFirstName || item.firstName || "",
            surname: item.patientLastName || item.surname || "",
            fullname: item.patientName || `${item.patientFirstName || ""} ${item.patientLastName || ""}`.trim() || "N/A",
            hospitalNumber: item.hospitalNumber || item.patientHospitalNumber || "N/A",
            dateOfBirth: item.dateOfBirth || item.patientDob || "",
            sex: item.sex || item.patientSex || "",
            phoneNumber: item.phoneNumber || item.patientPhoneNumber || "",
            address: item.address || item.patientAddress || "",
            // Lab test data from nested structure
            labTestName: firstTest.labTestName || item.labTestName || "N/A",
            labTestGroupName: firstTest.labTestGroupName || item.labTestGroupName || "N/A",
            labTestOrderStatusName: firstTest.labTestOrderStatusName || item.labTestOrderStatusName || "Unknown",
            dateOrderBy: firstTest.orderDate || labOrder.orderDate || item.dateOrderBy || item.dateCreated || "N/A",
            result: firstTest.result || item.result || "N/A",
            dateResultReported: firstTest.dateResultReported || item.dateResultReported || "N/A",
            // Preserve the original lab order structure for the detail components
            labOrder: labOrder
          };
        });
        
        console.log("Processed data:", processedData);
        setLaboratoryHistory(processedData);
        
        // Update pagination state
        setPagination({
          currentPage: response.data.currentPage || 0,
          pageSize: response.data.pageSize || 50,
          totalElements: response.data.totalElements || 0,
          totalPages: response.data.totalPages || 0
        });
      } else if (response.data && Array.isArray(response.data)) {
        // Handle legacy response format (fallback)
        const processedData = response.data.map(item => {
          const labOrder = item.labOrder || {};
          const tests = labOrder.tests || [];
          const firstTest = tests[0] || {};
          
          return {
            ...item,
            firstName: item.patientFirstName || item.firstName || "",
            surname: item.patientLastName || item.surname || "",
            fullname: item.patientName || `${item.patientFirstName || ""} ${item.patientLastName || ""}`.trim() || "N/A",
            hospitalNumber: item.hospitalNumber || item.patientHospitalNumber || "N/A",
            dateOfBirth: item.dateOfBirth || item.patientDob || "",
            sex: item.sex || item.patientSex || "",
            phoneNumber: item.phoneNumber || item.patientPhoneNumber || "",
            address: item.address || item.patientAddress || "",
            labTestName: firstTest.labTestName || item.labTestName || "N/A",
            labTestGroupName: firstTest.labTestGroupName || item.labTestGroupName || "N/A",
            labTestOrderStatusName: firstTest.labTestOrderStatusName || item.labTestOrderStatusName || "Unknown",
            dateOrderBy: firstTest.orderDate || labOrder.orderDate || item.dateOrderBy || item.dateCreated || "N/A",
            result: firstTest.result || item.result || "N/A",
            dateResultReported: firstTest.dateResultReported || item.dateResultReported || "N/A",
            labOrder: labOrder
          };
        });
        
        setLaboratoryHistory(processedData);
        setPagination({
          currentPage: 0,
          pageSize: 50,
          totalElements: processedData.length,
          totalPages: 1
        });
      }
    } catch (error) {
      console.error("Error fetching laboratory history:", error);
      toast.error("Failed to fetch laboratory history: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    // Trigger table refresh by updating the trigger
    setTableRefreshTrigger(prev => prev + 1);
  };

  // Handle PII toggle
  const handleCheckBox = (e) => {
    setShowPPI(!e.target.checked);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleViewPatient = (patientData) => {
    console.log("Navigating to patient detail with data:", patientData);
    // Navigate to patient detail view with complete patient data
    history.push({
      pathname: "/patient-lab-detail",
      state: patientData,
    });
  };

  // Define columns with PII support
  const columns = useMemo(() => [
    {
      title: "Patient Name",
      field: "fullname",
      hidden: showPPI, // Hide when PII is enabled
      render: (rowData) => (
        <span style={{ fontWeight: "bold", color: "#4d8bc9" }}>
          {rowData.fullname || "N/A"}
        </span>
      ),
    },
    {
      title: "Hospital Number",
      field: "hospitalNumber",
      render: (rowData) => (
        <span style={{ color: "#666" }}>
          {rowData.hospitalNumber || "N/A"}
        </span>
      ),
    },
    {
      title: "Phone Number",
      field: "phoneNumber",
      render: (rowData) => (
        <span style={{ color: "#666" }}>
          {rowData.phoneNumber || "N/A"}
        </span>
      ),
    },
    {
      title: "Test Name",
      field: "labTestName",
      render: (rowData) => (
        <span>
          {rowData.labTestGroupName && rowData.labTestGroupName !== "others"
            ? `${rowData.labTestGroupName} - ${rowData.labTestName}`
            : rowData.labTestName || "N/A"}
        </span>
      ),
    },
    {
      title: "Order Date",
      field: "dateOrderBy",
      render: (rowData) => formatDate(rowData.dateOrderBy),
    },
    {
      title: "Status",
      field: "labTestOrderStatusName",
      render: (rowData) => {
        const getStatusColor = (status) => {
          switch (status) {
            case "Result Reported":
              return "#52ba76";
            case "Sample Collected":
              return "#4651a3";
            case "Sample Verified":
              return "#4d8bc9";
            case "Pending Sample Collection":
              return "#f24a24";
            default:
              return "#f24a24";
          }
        };

        return (
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              backgroundColor: getStatusColor(rowData.labTestOrderStatusName),
              color: "white",
              textAlign: "center",
              display: "inline-block",
              minWidth: "120px"
            }}
          >
            {rowData.labTestOrderStatusName || "N/A"}
          </span>
        );
      },
    },
    {
      title: "Actions",
      field: "actions",
      render: (rowData) => (
        <Tooltip title="View Patient Details">
          <Button
            variant="contained"
            size="small"
            onClick={() => handleViewPatient(rowData)}
            className={classes.actionButton}
            startIcon={<VisibilityIcon />}
          >
            Dashboard
          </Button>
        </Tooltip>
      ),
    },
  ], [showPPI]);

  // getData function for CustomTable with server-side search and pagination
  const getData = async (query) => {
    try {
      const { search, page, pageSize } = query;
      
      // Build query parameters for API call
      const params = new URLSearchParams({
        pageNo: (page || 0).toString(),
        pageSize: (pageSize || 50).toString()
      });
      
      if (search && search.trim()) {
        params.append('search', search.trim());
      }

      console.log("Making API call with params:", params.toString());

      // Make API call directly
      const response = await axios.get(`${baseUrl}laboratory/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("API response:", response.data);
      
      let processedData = [];
      
      if (response.data && response.data.data) {
        // Handle new API response format with pagination
        processedData = response.data.data.map(item => {
          const labOrder = item.labOrder || {};
          const tests = labOrder.tests || [];
          const firstTest = tests[0] || {};
          
          return {
            ...item,
            firstName: item.patientFirstName || item.firstName || "",
            surname: item.patientLastName || item.surname || "",
            fullname: item.patientName || `${item.patientFirstName || ""} ${item.patientLastName || ""}`.trim() || "N/A",
            hospitalNumber: item.hospitalNumber || item.patientHospitalNumber || "N/A",
            dateOfBirth: item.dateOfBirth || item.patientDob || "",
            sex: item.sex || item.patientSex || "",
            phoneNumber: item.phoneNumber || item.patientPhoneNumber || "",
            address: item.address || item.patientAddress || "",
            labTestName: firstTest.labTestName || item.labTestName || "N/A",
            labTestGroupName: firstTest.labTestGroupName || item.labTestGroupName || "N/A",
            labTestOrderStatusName: firstTest.labTestOrderStatusName || item.labTestOrderStatusName || "Unknown",
            dateOrderBy: firstTest.orderDate || labOrder.orderDate || item.dateOrderBy || item.dateCreated || "N/A",
            result: firstTest.result || item.result || "N/A",
            dateResultReported: firstTest.dateResultReported || item.dateResultReported || "N/A",
            labOrder: labOrder
          };
        });
      } else if (response.data && Array.isArray(response.data)) {
        // Handle legacy response format
        processedData = response.data.map(item => {
          const labOrder = item.labOrder || {};
          const tests = labOrder.tests || [];
          const firstTest = tests[0] || {};
          
          return {
            ...item,
            firstName: item.patientFirstName || item.firstName || "",
            surname: item.patientLastName || item.surname || "",
            fullname: item.patientName || `${item.patientFirstName || ""} ${item.patientLastName || ""}`.trim() || "N/A",
            hospitalNumber: item.hospitalNumber || item.patientHospitalNumber || "N/A",
            dateOfBirth: item.dateOfBirth || item.patientDob || "",
            sex: item.sex || item.patientSex || "",
            phoneNumber: item.phoneNumber || item.patientPhoneNumber || "",
            address: item.address || item.patientAddress || "",
            labTestName: firstTest.labTestName || item.labTestName || "N/A",
            labTestGroupName: firstTest.labTestGroupName || item.labTestGroupName || "N/A",
            labTestOrderStatusName: firstTest.labTestOrderStatusName || item.labTestOrderStatusName || "Unknown",
            dateOrderBy: firstTest.orderDate || labOrder.orderDate || item.dateOrderBy || item.dateCreated || "N/A",
            result: firstTest.result || item.result || "N/A",
            dateResultReported: firstTest.dateResultReported || item.dateResultReported || "N/A",
            labOrder: labOrder
          };
        });
      }

      return {
        data: processedData,
        page: page || 0,
        totalCount: response.data?.totalElements || processedData.length || 0,
      };
    } catch (error) {
      console.error("Error fetching laboratory data:", error);
      toast.error("Failed to fetch laboratory data: " + (error.response?.data?.message || error.message));
      return {
        data: [],
        page: 0,
        totalCount: 0,
      };
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2">Loading laboratory history...</p>
      </div>
    );
  }

  const renderTableView = () => {
    return (
      <div className="row">
        <div className="col-xl-12">
          {laboratoryHistory.length > 0 ? (
            <CustomTable
              key={tableRefreshTrigger}
              title="Laboratory History"
              columns={columns}
              data={getData}
              icons={tableIcons}
              isLoading={false}
              showPPI={showPPI}
              onPPIChange={handleCheckBox}
              options={{
                search: true,
                pagination: true,
                pageSize: 50,
                pageSizeOptions: [25, 50, 100],
                showFirstLastPageButtons: true,
                showSelectAllCheckbox: false,
                showTextRowsSelected: false,
                searchFieldAlignment: "left",
                searchFieldVariant: "outlined",
                searchFieldStyle: {
                  marginBottom: "10px"
                },
                loadingType: "overlay"
              }}
            />
          ) : (
            <Alert
              variant="info"
              className="alert-dismissible solid fade show"
            >
              <p>No laboratory history found</p>
            </Alert>
          )}
        </div>
      </div>
    );
  };

  const getStatusCounts = () => {
    const counts = {
      total: pagination.totalElements || laboratoryHistory.length,
      pending: 0,
      collected: 0,
      verified: 0,
      reported: 0,
      others: 0
    };

    laboratoryHistory.forEach(item => {
      const status = item.labTestOrderStatusName?.toLowerCase() || '';
      if (status.includes('pending sample collection')) counts.pending++;
      else if (status.includes('sample collected')) counts.collected++;
      else if (status.includes('sample verified')) counts.verified++;
      else if (status.includes('result reported')) counts.reported++;
      else if (status.includes('unknown') || status === '') counts.others++;
      else counts.pending++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <Fragment>
      {/* Summary Cards */}
      <div className="row mb-3">
  <div className="col-xl-3 col-lg-3 col-md-6">
    <div className="card" style={{ backgroundColor: "#ffffff", color: "black" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="card-title">Total Orders</h6>
            <h3>{statusCounts.total}</h3>
          </div>
          <div className="align-self-center">
            <i className="fa fa-flask fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-lg-3 col-md-6">
    <div className="card" style={{ backgroundColor: "#ffffff", color: "black" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="card-title">Pending</h6>
            <h3>{statusCounts.pending}</h3>
          </div>
          <div className="align-self-center">
            <i className="fa fa-clock-o fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-lg-3 col-md-6">
    <div className="card" style={{ backgroundColor: "#ffffff", color: "black" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="card-title">Collected</h6>
            <h3>{statusCounts.collected}</h3>
          </div>
          <div className="align-self-center">
            <i className="fa fa-tint fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-lg-3 col-md-6">
    <div className="card" style={{ backgroundColor: "#ffffff", color: "black" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="card-title">Reported</h6>
            <h3>{statusCounts.reported}</h3>
          </div>
          <div className="align-self-center">
            <i className="fa fa-check-circle fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {renderTableView()}
    </Fragment>
  );
};

export default LaboratoryHistory;