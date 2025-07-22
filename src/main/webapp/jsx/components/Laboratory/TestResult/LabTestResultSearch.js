import React, { useState } from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
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
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import axios from "axios";

import MatButton from "@material-ui/core/Button";
import { Card, CardBody } from "reactstrap";
import { toast } from "react-toastify";
import { token, url } from "../../../../api";

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

const PatientSearch = (props) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  const getData = (query) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      // Clean up search parameter - backend now handles this properly
      const searchParam = query.search?.trim() || "*";

      axios
        .get(
          `${url}laboratory/orders/pending-results?searchParam=${encodeURIComponent(
            searchParam
          )}&pageNo=${query.page}&pageSize=${query.pageSize}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((resp) => {
          setLoading(false);
          setRetryCount(0); // Reset retry count on success

          console.log("Pending results response:", resp);

          if (!resp.data || !resp.data.records) {
            resolve({
              data: [],
              page: query.page,
              totalCount: 0,
            });
            return;
          }

          // Data should already be clean from backend, but keep basic validation
          const validRecords = resp.data.records.filter((row) => {
            return (
              row.patientId && (row.patientFirstName || row.patientLastName)
            );
          });

          resolve({
            data: validRecords.map((row) => ({
              Id: row.patientHospitalNumber || "N/A",
              name:
                `${row.patientFirstName || ""} ${
                  row.patientLastName || ""
                }`.trim() || "Unknown Patient",
              date: row.orderDate,
              sampleverified: row.verifiedSamples || 0,
              samplecount: row.reportedResults || 0,
              actions:
                row.verifiedSamples > 0 ? (
                  <Link
                    to={{
                      pathname: "/result-reporting",
                      state: row,
                    }}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      fontStyle: "bold",
                    }}
                  >
                    <MatButton variant="outlined" color="primary" size="small">
                      <NoteAddIcon color="primary" />
                      View
                    </MatButton>
                  </Link>
                ) : (
                  <span style={{ color: "#666", fontSize: "12px" }}>
                    No verified samples
                  </span>
                ),
            })),
            page: query.page,
            totalCount: resp.data.totalRecords || 0,
          });
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching pending results:", error);

          const newRetryCount = retryCount + 1;
          setRetryCount(newRetryCount);

          if (error.code === "ECONNABORTED") {
            toast.error("Request timed out. Please try again.", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (error.response?.status === 404) {
            toast.warn("No records found for this search", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (error.response?.status >= 500) {
            toast.error(
              "Server error. Please contact support if this persists.",
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

          // Return empty result
          resolve({
            data: [],
            page: query.page,
            totalCount: 0,
          });
        });
    });

  const handleChangePage = (page) => {
    setCurrentPage(page + 1);
  };

  return (
    <div>
      <Card>
        <CardBody>
          {retryCount > 2 && (
            <div
              className="alert alert-warning"
              style={{ marginBottom: "1rem" }}
            >
              ⚠️ Multiple connection issues detected. Please check your network
              connection or contact support.
            </div>
          )}

          <MaterialTable
            icons={tableIcons}
            title="Laboratory Test Result Reporting"
            columns={[
              { title: "Hospital ID", field: "Id" },
              {
                title: "Patient Name",
                field: "name",
              },
              {
                title: "Order Date",
                field: "date",
                type: "date",
                filtering: false,
              },
              {
                title: "Verified Samples",
                field: "sampleverified",
                filtering: false,
                type: "numeric",
              },
              {
                title: "Results Reported",
                field: "samplecount",
                filtering: false,
                type: "numeric",
              },
              {
                title: "Action",
                field: "actions",
                filtering: false,
                sorting: false,
              },
            ]}
            isLoading={loading}
            data={getData}
            onChangePage={handleChangePage}
            options={{
              headerStyle: {
                backgroundColor: "#014d88",
                color: "#fff",
              },
              searchFieldStyle: {
                width: "300%",
                marginLeft: "250px",
              },
              filtering: false,
              exportButton: false,
              searchFieldAlignment: "left",
              pageSizeOptions: [10, 20, 50, 100],
              pageSize: 10,
              debounceInterval: 500, // Reduced debounce since search is now efficient
              loadingType: "linear",
              showEmptyDataSourceMessage: true,
              emptyRowsWhenPaging: false,
              searchAutoFocus: true,
              searchFieldVariant: "outlined",
            }}
            localization={{
              pagination: {
                labelDisplayedRows: `Page: ${currentPage}`,
              },
              body: {
                emptyDataSourceMessage: "No pending result reports found",
                loadingMessage: "Loading pending results...",
              },
              header: {
                actions: "Actions",
              },
              toolbar: {
                searchTooltip: "Search by patient name or hospital ID",
                searchPlaceholder: "Search patients...",
              },
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PatientSearch;
