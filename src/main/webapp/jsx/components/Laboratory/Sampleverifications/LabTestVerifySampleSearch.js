
import React, { useState, useRef, useEffect } from "react";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";

import MatButton from "@material-ui/core/Button";
import { Card, CardBody } from "reactstrap";
import { toast } from 'react-toastify';
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
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorCount, setErrorCount] = useState(0);

  const getData = (query) =>
    new Promise((resolve, reject) => {
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
      }, 30000);

      axios
        .get(
          `${url}laboratory/orders/pending-sample-verification?searchParam=${
            query.search || ""
          }&pageNo=${query.page}&pageSize=${query.pageSize}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((resp) => {
          clearTimeout(timeoutId);
          setLoading(false);
          console.log("Pending sample verification response:", resp);

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

          const validRecords = resp.data.records.filter((row) => {
            if (
              !row.patientId ||
              !row.patientFirstName ||
              !row.patientLastName
            ) {
              console.warn("Filtering out invalid record:", row);
              return false;
            }
            return true;
          });

          resolve({
            data: validRecords.map((row) => ({
              Id: row.patientHospitalNumber || "N/A",
              name:
                (row.patientFirstName + " " + row.patientLastName).trim() ||
                "Unknown Patient",
              date: row.orderDate,
              samples: row.collectedSamples || 0,
              samplecount: row.verifiedSamples || 0,
              sampleresults: row.reportedResults || 0,
              actions:
                row.collectedSamples > 0 ? (
                  <Link
                    to={{
                      pathname: "/samples-verification",
                      state: row,
                    }}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      fontStyle: "bold",
                    }}
                  >
                    <MatButton variant="outlined" color="primary">
                      <VisibilityIcon color="primary" />
                      View
                    </MatButton>
                  </Link>
                ) : (
                  <span style={{ color: "#666", fontSize: "12px" }}>
                    No samples collected
                  </span>
                ),
            })),
            page: query.page,
            totalCount: resp.data.totalRecords || 0,
          });
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          setLoading(false);
          console.error("Error fetching pending sample verification:", error);

          const newErrorCount = errorCount + 1;
          setErrorCount(newErrorCount);

          if (error.response?.status === 404) {
            toast.warn(
              "Some patient records may be missing or have been deleted",
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
    });

  const handleChangePage = (page) => {
    setCurrentPage(page + 1);
  };

  const localization = {
    pagination: {
      labelDisplayedRows: `Page: ${currentPage}`,
    },
  };

  return (
    <div>
      <Card>
        <CardBody>
          {errorCount > 0 && (
            <div
              className="alert alert-warning"
              style={{ marginBottom: "1rem" }}
            >
              ⚠️ Some data may be incomplete due to missing patient records.
              Contact your system administrator if this persists.
            </div>
          )}

          <MaterialTable
            tableRef={tableRef}
            icons={tableIcons}
            title="Laboratory Sample Verification"
            columns={[
              { title: "Hospital ID", field: "Id" },
              {
                title: "Patient Name",
                field: "name",
              },
              {
                title: "Date Order",
                field: "date",
                type: "dateTime",
                filtering: false,
              },
              {
                title: "Sample Collected",
                field: "samples",
                filtering: false,
              },
              {
                title: "Sample Verified",
                field: "samplecount",
                filtering: false,
              },
              {
                title: "Sample Results",
                field: "sampleresults",
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
              pageSizeOptions: [10, 20, 100],
              pageSize: 10,
              debounceInterval: 800,
              loadingType: "linear",
              showEmptyDataSourceMessage: true,
              emptyRowsWhenPaging: false,
              retry: true,
            }}
            localization={{
              ...localization,
              body: {
                emptyDataSourceMessage: "No samples pending verification found",
                loadingMessage: "Loading pending sample verifications...",
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

export default PatientSearch;