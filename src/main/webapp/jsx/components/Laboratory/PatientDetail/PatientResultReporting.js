import React, { useState, useEffect, useCallback } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import { Card, CardBody } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { token, url } from "../../../../api";
import MatButton from "@material-ui/core/Button";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import RefreshIcon from "@material-ui/icons/Refresh";
import SampleList from "../TestResult/SampleList";
import { useLaboratory } from "../../../context/LaboratoryContext";

// Material-UI icons for table
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

const PatientResultReporting = ({ patient, permissions }) => {
  const { 
    selectedOrder, 
    setSelectedOrder, 
    clearSelectedOrder,
    refreshResultReporting,
    refreshFlags 
  } = useLaboratory();
  
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  
  const handleViewOrder = (orderData) => {
    console.log("Viewing order for result reporting:", orderData);
    setSelectedOrder(orderData);
  };


  const handleBackToResults = () => {
    clearSelectedOrder();
  };

  
  const getData = useCallback((query) =>
    new Promise((resolve, reject) => {
      if (!patient?.id) {
        resolve({
          data: [],
          page: 0,
          totalCount: 0,
        });
        return;
      }

      setLoading(true);

 
      const timeoutId = setTimeout(() => {
        setLoading(false);
        toast.error("Request timeout - please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
        resolve({
          data: [],
          page: 0,
          totalCount: 0,
        });
      }, 30000); // 30 second timeout

      axios
        .get(
          `${url}laboratory/orders/pending-results/patients/${patient.id}?pageNo=${query.page}&pageSize=${query.pageSize}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((resp) => {
          clearTimeout(timeoutId);
          setLoading(false);
          console.log("Patient result reporting response:", resp);

          if (
            !resp.data ||
            resp.data.records === null ||
            resp.data.records === undefined
          ) {
            resolve({
              data: [],
              page: 0,
              totalCount: 0,
            });
            return;
          }

          
          const patientRecords = resp.data.records;

          console.log(`Found ${patientRecords.length} result reporting records for patient ${patient.id}`);

          resolve({
            data: patientRecords.map((row) => ({
              Id: row.patientHospitalNumber || patient.hospitalNumber,
              name: row.patientFirstName && row.patientLastName 
                ? `${row.patientFirstName} ${row.patientLastName}`.trim()
                : patient.fullname || `${patient.firstName || ''} ${patient.surname || ''}`.trim(),
              date: row.orderDate,
              orderId: row.orderId,
              verifiedSamples: row.verifiedSamples || 0,
              reportedResults: row.reportedResults || 0,
              pendingResults: (row.verifiedSamples || 0) - (row.reportedResults || 0),
              actions: (row.verifiedSamples > 0) ? (
                <MatButton 
                  variant="outlined" 
                  color="primary" 
                  size="small"
                  onClick={() => handleViewOrder({
                    ...row,
                    orderId: row.orderId,
                    patientId: patient.id,
                    patientFirstName: patient.firstName,
                    patientLastName: patient.surname,
                    patientHospitalNumber: patient.hospitalNumber,
                    visitId: patient.visitId,
                  })}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <NoteAddIcon color="primary" />
                  Report
                </MatButton>
              ) : (
                <span style={{ color: '#666', fontSize: '12px' }}>
                  No verified samples
                </span>
              ),
            })),
            page: query.page,
            totalCount: patientRecords.length,
          });
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          setLoading(false);
          console.error("Error fetching patient result reporting:", error);

          if (error.response?.status === 404) {
            // Handle 404 errors gracefully
            toast.warn(
              "Patient records may be missing or have been deleted",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            );
          } else {
            toast.error(
              `Error loading data: ${
                error.response?.data?.message || error.message
              }`,
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            );
          }

        
          resolve({
            data: [],
            page: 0,
            totalCount: 0,
          });
        });
    }), [patient]);

  // Auto-refresh when refresh flag changes
  useEffect(() => {
    console.log("Result reporting refresh flag changed:", refreshFlags.resultReporting);
    if (refreshFlags.resultReporting > 0) {
      console.log("Auto-refreshing result reporting due to context change");
    
    }
  }, [refreshFlags.resultReporting]);


  if (selectedOrder) {
    return (
      <div>
      
        <Card>
          <CardBody>
   
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "20px",
              paddingBottom: "15px",
              borderBottom: "1px solid #e0e0e0"
            }}>
              <MatButton Results
                variant="contained"
                color="primary"
                onClick={handleBackToResults}
                startIcon={<ArrowBackIcon />}
                size="small"
              >
                Back to Result Reporting
              </MatButton>
              <span style={{ fontSize: "14px", color: "#666" }}>
                Order ID: <strong>{selectedOrder.orderId}</strong>
              </span>
            </div>

            
            <SampleList 
              patientObj={selectedOrder}
              id={selectedOrder.orderId}
              isEmbedded={true}
              onActionComplete={() => {
            
                refreshResultReporting();
                toast.success("Result reporting completed!", {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }}
            />
          </CardBody>
        </Card>
      </div>
    );
  }


  return (
    <div>
      <Card>
        <CardBody>
          <MaterialTable
            key={`result-reporting-${refreshFlags.resultReporting}`}
            icons={tableIcons}
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Result Reporting</span>
                <MatButton
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={refreshResultReporting}
                  startIcon={<RefreshIcon />}
                  style={{ marginLeft: '10px' }}
                >
                  Refresh
                </MatButton>
              </div>
            }
            columns={[
              { title: "Hospital ID", field: "Id" },
              {
                title: "Patient Name",
                field: "name",
              },
              {
                title: "Order ID",
                field: "orderId",
                filtering: false,
              },
              {
                title: "Date Order",
                field: "date",
                type: "dateTime",
                filtering: false,
              },
              {
                title: "Verified Samples",
                field: "verifiedSamples",
                filtering: false,
              },
              {
                title: "Results Reported",
                field: "reportedResults",
                filtering: false,
              },
              {
                title: "Pending Results",
                field: "pendingResults",
                filtering: false,
              },
              {
                title: "Action",
                field: "actions",
                filtering: false,
              },
            ]}
            isLoading={loading}
            data={getData}
            options={{
              headerStyle: {
                backgroundColor: "#014d88",
                color: "#fff",
              },
              searchFieldStyle: {
                width: "300px",
              },
              filtering: false,
              exportButton: false,
              searchFieldAlignment: "left",
              pageSizeOptions: [5, 10, 20],
              pageSize: 5,
              debounceInterval: 800,
              loadingType: "linear",
              showEmptyDataSourceMessage: true,
              emptyRowsWhenPaging: false,
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "No results pending for this patient",
                loadingMessage: "Loading result reporting data...",
              },
              header: {
                actions: "Actions",
              },
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PatientResultReporting; 