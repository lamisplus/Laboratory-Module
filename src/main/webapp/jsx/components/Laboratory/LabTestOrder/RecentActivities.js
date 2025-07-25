import React, { Fragment, useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from "../../../reuseables/ConfirmDialog";

const RecentActivities = ({
  labOrders,
  rdeOrders = [],
  historicalResults,
  patient,
  onDeleteOrder,
  onDeleteTest,
  onDeleteResult,
  onDeleteSample,
  onRefresh,
}) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  // Process standard lab orders to extract test orders
  const getStandardTestOrders = () => {
    if (!labOrders || labOrders.length === 0) return [];

    let allTests = [];
    labOrders.forEach((order) => {
      if (order.labOrder && order.labOrder.tests) {
        order.labOrder.tests.forEach((test) => {
          allTests.push({
            ...test,
            orderType: "standard",
            orderId: order.labOrder.id,
            orderDate: order.labOrder.orderDate,
            patientInfo: {
              firstName: order.patientFirstName,
              lastName: order.patientLastName,
              hospitalNumber: order.patientHospitalNumber,
            },
          });
        });
      }
    });

    return allTests;
  };

  // Process RDE lab orders
  const getRdeTestOrders = () => {
    if (!rdeOrders || rdeOrders.length === 0) return [];

    return rdeOrders.map((order) => ({
      ...order,
      orderType: "rde",
      labTestName: order.labTestName || "RDE Test",
      labTestGroupName: order.labTestGroupName || "RDE",
      orderDate: order.orderDate || order.dateOrderBy,
      labTestOrderStatus: order.labTestOrderStatus || 0,
      samples: order.sampleNumber
        ? [
            {
              id: order.id,
              sampleNumber: order.sampleNumber,
              dateSampleCollected: order.sampleCollectionDate,
              sampleCollectedBy: order.sampleCollectedBy,
            },
          ]
        : [],
      results: order.result
        ? [
            {
              id: order.id,
              resultReported: order.result,
              dateResultReported: order.dateResultReported,
              resultReportedBy: order.resultReportedBy,
            },
          ]
        : [],
    }));
  };

  // Combine all test orders
  const getAllTestOrders = () => {
    const standardTests = getStandardTestOrders();
    const rdeTests = getRdeTestOrders();
    const allTests = [...standardTests, ...rdeTests];

    // Sort by order date (newest first)
    return allTests.sort(
      (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );
  };

  // Get sample collection status from all sources
  const getSampleCollectionStatus = () => {
    const allTests = getAllTestOrders();
    let sampleStatus = [];

    allTests.forEach((test) => {
      if (test.samples && test.samples.length > 0) {
        test.samples.forEach((sample) => {
          sampleStatus.push({
            testName: test.labTestName,
            testGroupName: test.labTestGroupName,
            sampleId: sample.id,
            sampleNumber: sample.SampleNumber || sample.sampleNumber,
            dateCollected: sample.dateSampleCollected,
            collectedBy: sample.sampleCollectedBy,
            dateVerified: sample.dateSampleVerified,
            verifiedBy: sample.sampleVerifiedBy,
            sampleAccepted: sample.sampleAccepted,
            orderDate: test.orderDate,
            orderType: test.orderType,
          });
        });
      }
    });

    return sampleStatus.sort(
      (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );
  };

  // Get result reporting data from all sources
  const getResultReporting = () => {
    const allTests = getAllTestOrders();
    let results = [];

    // From test orders
    allTests.forEach((test) => {
      if (test.results && test.results.length > 0) {
        test.results.forEach((result) => {
          results.push({
            testName: test.labTestName,
            testGroupName: test.labTestGroupName,
            resultId: result.id,
            dateAssayed: result.dateAssayed,
            dateResultReported: result.dateResultReported,
            resultReported: result.resultReported,
            resultReportedBy: result.resultReportedBy,
            checkedBy: result.checkedBy,
            dateChecked: result.dateChecked,
            approvedBy: result.approvedBy,
            dateApproved: result.dateApproved,
            orderDate: test.orderDate,
            orderType: test.orderType,
            source: "testOrder",
          });
        });
      }
    });

    // From historical results
    if (historicalResults && historicalResults.length > 0) {
      historicalResults.forEach((result) => {
        results.push({
          testName: result.labTestName || result.LabTestName,
          testGroupName: result.groupName || result.GroupName,
          resultId: result.id,
          dateAssayed: result.dateAssayed,
          dateResultReported:
            result.dateResultReported || result.DateResultReported,
          resultReported: result.resultReported || result.ResultReported,
          resultReportedBy: result.resultReportedBy,
          checkedBy: result.checkedBy,
          dateChecked: result.dateChecked,
          approvedBy: result.approvedBy,
          dateApproved: result.dateApproved,
          orderDate: result.orderDate || result.OrderDate,
          orderType: "historical",
          source: "historical",
        });
      });
    }

    return results.sort(
      (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );
  };

  const handleDeleteOrder = (orderId, orderType) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete ${orderType === "rde" ? "RDE" : "Standard"} Lab Order`,
      subTitle:
        "Are you sure you want to delete this lab order? This action cannot be undone.",
      onConfirm: () => {
        onDeleteOrder(orderId, orderType);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const handleDeleteTest = (testId, testType) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete ${testType === "rde" ? "RDE" : "Standard"} Test`,
      subTitle:
        "Are you sure you want to delete this test? This action cannot be undone.",
      onConfirm: () => {
        onDeleteTest(testId, testType);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const handleDeleteResult = (resultId) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Test Result",
      subTitle:
        "Are you sure you want to delete this test result? This action cannot be undone.",
      onConfirm: () => {
        onDeleteResult(resultId);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const handleDeleteSample = (sampleId) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Sample",
      subTitle:
        "Are you sure you want to delete this sample? This action cannot be undone.",
      onConfirm: () => {
        onDeleteSample(sampleId);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 0:
        return "warning"; // Pending
      case 1:
        return "info"; // Sample Collected
      case 2:
        return "primary"; // Sample Transferred
      case 3:
        return "success"; // Sample Verified
      case 4:
        return "danger"; // Sample Rejected
      case 5:
        return "success"; // Result Reported
      default:
        return "secondary";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending Sample Collection";
      case 1:
        return "Sample Collected";
      case 2:
        return "Sample Transferred";
      case 3:
        return "Sample Verified";
      case 4:
        return "Sample Rejected";
      case 5:
        return "Result Reported";
      default:
        return "Unknown Status";
    }
  };

  const allTestOrders = getAllTestOrders();
  const sampleCollectionData = getSampleCollectionStatus();
  const resultReportingData = getResultReporting();

  console.log("🔬 RecentActivities Data:", {
    standardLabOrders: labOrders?.length || 0,
    rdeOrders: rdeOrders?.length || 0,
    allTestOrders: allTestOrders.length,
    sampleCollectionData: sampleCollectionData.length,
    resultReportingData: resultReportingData.length,
  });

  return (
    <Fragment>
      <div className="row">
        {/* Test Orders Column */}
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Test Orders</h4>
              <small className="text-muted">
                {allTestOrders.length} test(s) ordered
                {labOrders?.length > 0 && (
                  <span className="badge badge-primary ml-1">
                    Std: {getStandardTestOrders().length}
                  </span>
                )}
                {rdeOrders?.length > 0 && (
                  <span className="badge badge-info ml-1">
                    RDE: {getRdeTestOrders().length}
                  </span>
                )}
              </small>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                className="widget-media dz-scroll ps ps--active-y"
              >
                <ul className="timeline">
                  {allTestOrders.length === 0 ? (
                    <li>
                      <div className="timeline-panel">
                        <div className="media-body text-center">
                          <h6 className="mb-1 text-muted">
                            No test orders found
                          </h6>
                          <small>
                            No tests have been ordered for this patient
                          </small>
                        </div>
                      </div>
                    </li>
                  ) : (
                    allTestOrders.map((test, index) => (
                      <li key={`${test.orderType}-${test.id || index}`}>
                        <div className="timeline-panel">
                          <div
                            className={`media me-2 media-${getStatusBadgeColor(
                              test.labTestOrderStatus
                            )}`}
                          >
                            {test.orderType === "rde"
                              ? "R"
                              : test.labTestGroupName
                              ? test.labTestGroupName.charAt(0).toUpperCase()
                              : "T"}
                          </div>
                          <div className="media-body">
                            <h5 className="mb-1">
                              {test.labTestName}
                              <small
                                className={`ml-2 badge badge-${
                                  test.orderType === "rde" ? "info" : "primary"
                                }`}
                              >
                                {test.orderType === "rde" ? "RDE" : "STD"}
                              </small>
                            </h5>
                            <h6 className="mb-1 text-info">
                              {test.labTestGroupName}
                            </h6>
                            <small className="d-block">
                              {moment(test.orderDate).format(
                                "DD MMM YYYY - hh:mm A"
                              )}
                            </small>
                            <small
                              className={`badge badge-${getStatusBadgeColor(
                                test.labTestOrderStatus
                              )} mt-1`}
                            >
                              {getStatusText(test.labTestOrderStatus)}
                            </small>
                          </div>
                          <Dropdown className="dropdown">
                            <Dropdown.Toggle
                              variant="primary light"
                              className="i-false p-0 sharp"
                              style={{ background: "none", border: "none" }}
                            >
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth="1"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x="0" y="0" width="24" height="24" />
                                  <circle fill="#000000" cx="5" cy="12" r="2" />
                                  <circle
                                    fill="#000000"
                                    cx="12"
                                    cy="12"
                                    r="2"
                                  />
                                  <circle
                                    fill="#000000"
                                    cx="19"
                                    cy="12"
                                    r="2"
                                  />
                                </g>
                              </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  console.log("Edit test:", test.id)
                                }
                              >
                                <EditIcon fontSize="small" className="me-2" />
                                Edit Test
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleDeleteTest(test.id, test.orderType)
                                }
                              >
                                <DeleteIcon fontSize="small" className="me-2" />
                                Delete Test
                              </Dropdown.Item>
                              {test.orderId && (
                                <Dropdown.Item
                                  onClick={() =>
                                    handleDeleteOrder(
                                      test.orderId,
                                      test.orderType
                                    )
                                  }
                                >
                                  <DeleteIcon
                                    fontSize="small"
                                    className="me-2"
                                  />
                                  Delete Entire Order
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>

        {/* Sample Collection Status Column */}
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Sample Collection Status</h4>
              <small className="text-muted">
                {sampleCollectionData.length} sample(s) tracked
              </small>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  {sampleCollectionData.length === 0 ? (
                    <li>
                      <div className="timeline-panel">
                        <div className="timeline-badge secondary"></div>
                        <div className="media-body text-center">
                          <h6 className="mb-1 text-muted">
                            No samples collected
                          </h6>
                          <small>No samples have been collected yet</small>
                        </div>
                      </div>
                    </li>
                  ) : (
                    sampleCollectionData.map((sample, index) => (
                      <li key={`sample-${sample.sampleId || index}`}>
                        <div
                          className={`timeline-badge ${
                            sample.dateVerified
                              ? "success"
                              : sample.dateCollected
                              ? "info"
                              : "warning"
                          }`}
                        ></div>
                        <div className="timeline-panel text-muted">
                          <span>{moment(sample.orderDate).fromNow()}</span>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-0">
                                <strong className="text-primary">
                                  {sample.testName}
                                </strong>
                                <small
                                  className={`ml-2 badge badge-${
                                    sample.orderType === "rde"
                                      ? "info"
                                      : "primary"
                                  }`}
                                >
                                  {sample.orderType === "rde" ? "RDE" : "STD"}
                                </small>
                                <br />
                                <small className="text-info">
                                  {sample.testGroupName}
                                </small>
                              </h6>

                              {sample.dateCollected && (
                                <h6 className="mb-1">
                                  Date Sample Collected
                                  <br />
                                  <strong className="text-success">
                                    {moment(sample.dateCollected).format(
                                      "DD MMM, YYYY"
                                    )}
                                  </strong>
                                  {sample.collectedBy && (
                                    <>
                                      <br />
                                      <small>By: {sample.collectedBy}</small>
                                    </>
                                  )}
                                </h6>
                              )}

                              {sample.dateVerified && (
                                <h6 className="mb-1">
                                  Date Sample Verified
                                  <br />
                                  <strong className="text-info">
                                    {moment(sample.dateVerified).format(
                                      "DD MMM, YYYY"
                                    )}
                                  </strong>
                                  {sample.verifiedBy && (
                                    <>
                                      <br />
                                      <small>By: {sample.verifiedBy}</small>
                                    </>
                                  )}
                                </h6>
                              )}

                              {sample.sampleNumber && (
                                <h6 className="mb-0">
                                  Sample Number
                                  <br />
                                  <strong className="text-primary">
                                    {sample.sampleNumber}
                                  </strong>
                                </h6>
                              )}

                              {sample.sampleAccepted !== undefined && (
                                <small
                                  className={`badge mt-1 ${
                                    sample.sampleAccepted === "true" ||
                                    sample.sampleAccepted === true
                                      ? "badge-success"
                                      : "badge-danger"
                                  }`}
                                >
                                  {sample.sampleAccepted === "true" ||
                                  sample.sampleAccepted === true
                                    ? "Accepted"
                                    : "Rejected"}
                                </small>
                              )}
                            </div>

                            {sample.sampleId && (
                              <Dropdown className="dropdown">
                                <Dropdown.Toggle
                                  variant="light"
                                  className="i-false p-0 sharp btn-sm"
                                  style={{ background: "none", border: "none" }}
                                >
                                  <svg
                                    width="12px"
                                    height="12px"
                                    viewBox="0 0 24 24"
                                  >
                                    <g
                                      stroke="none"
                                      strokeWidth="1"
                                      fill="none"
                                      fillRule="evenodd"
                                    >
                                      <rect
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="5"
                                        r="2"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="12"
                                        r="2"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="19"
                                        r="2"
                                      />
                                    </g>
                                  </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleDeleteSample(sample.sampleId)
                                    }
                                  >
                                    <DeleteIcon
                                      fontSize="small"
                                      className="me-2"
                                    />
                                    Delete Sample
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            )}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>

        {/* Result Reporting Column */}
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Result Reporting</h4>
              <small className="text-muted">
                {resultReportingData.length} result(s) reported
              </small>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                className="widget-timeline dz-scroll style-1 height370 ps ps--active-y"
              >
                <ul className="timeline">
                  {resultReportingData.length === 0 ? (
                    <li>
                      <div className="timeline-panel">
                        <div className="timeline-badge secondary"></div>
                        <div className="media-body text-center">
                          <h6 className="mb-1 text-muted">
                            No results reported
                          </h6>
                          <small>No test results have been reported yet</small>
                        </div>
                      </div>
                    </li>
                  ) : (
                    resultReportingData.map((result, index) => (
                      <li key={`result-${result.resultId || index}`}>
                        <div className="timeline-badge success"></div>
                        <div className="timeline-panel text-muted">
                          <span>{moment(result.orderDate).fromNow()}</span>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-0">
                                <strong className="text-primary">
                                  {result.testName}
                                </strong>
                                <small
                                  className={`ml-2 badge badge-${
                                    result.orderType === "rde" ||
                                    result.orderType === "historical"
                                      ? "info"
                                      : "primary"
                                  }`}
                                >
                                  {result.orderType === "rde"
                                    ? "RDE"
                                    : result.orderType === "historical"
                                    ? "HIST"
                                    : "STD"}
                                </small>
                                <br />
                                <small className="text-info">
                                  {result.testGroupName}
                                </small>
                              </h6>

                              {result.resultReported && (
                                <h6 className="mb-1">
                                  Result
                                  <br />
                                  <strong className="text-success">
                                    {result.resultReported}
                                  </strong>
                                </h6>
                              )}

                              {result.dateResultReported && (
                                <h6 className="mb-1">
                                  Date Result Reported
                                  <br />
                                  <strong className="text-primary">
                                    {moment(result.dateResultReported).format(
                                      "DD MMM, YYYY"
                                    )}
                                  </strong>
                                  {result.resultReportedBy && (
                                    <>
                                      <br />
                                      <small>
                                        By: {result.resultReportedBy}
                                      </small>
                                    </>
                                  )}
                                </h6>
                              )}

                              {result.dateAssayed && (
                                <h6 className="mb-1">
                                  Date Assayed
                                  <br />
                                  <strong className="text-warning">
                                    {moment(result.dateAssayed).format(
                                      "DD MMM, YYYY"
                                    )}
                                  </strong>
                                </h6>
                              )}

                              {result.dateApproved && (
                                <h6 className="mb-0">
                                  Date Approved
                                  <br />
                                  <strong className="text-success">
                                    {moment(result.dateApproved).format(
                                      "DD MMM, YYYY"
                                    )}
                                  </strong>
                                  {result.approvedBy && (
                                    <>
                                      <br />
                                      <small>By: {result.approvedBy}</small>
                                    </>
                                  )}
                                </h6>
                              )}

                              {result.checkedBy && (
                                <h6 className="mb-0">
                                  Checked By
                                  <br />
                                  <strong className="text-teal">
                                    {result.checkedBy}
                                  </strong>
                                  {result.dateChecked && (
                                    <>
                                      <br />
                                      <small>
                                        {moment(result.dateChecked).format(
                                          "DD MMM, YYYY"
                                        )}
                                      </small>
                                    </>
                                  )}
                                </h6>
                              )}
                            </div>

                            {result.resultId && (
                              <Dropdown className="dropdown">
                                <Dropdown.Toggle
                                  variant="light"
                                  className="i-false p-0 sharp btn-sm"
                                  style={{ background: "none", border: "none" }}
                                >
                                  <svg
                                    width="12px"
                                    height="12px"
                                    viewBox="0 0 24 24"
                                  >
                                    <g
                                      stroke="none"
                                      strokeWidth="1"
                                      fill="none"
                                      fillRule="evenodd"
                                    >
                                      <rect
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="5"
                                        r="2"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="12"
                                        r="2"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="19"
                                        r="2"
                                      />
                                    </g>
                                  </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleDeleteResult(result.resultId)
                                    }
                                  >
                                    <DeleteIcon
                                      fontSize="small"
                                      className="me-2"
                                    />
                                    Delete Result
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            )}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog for Deletes */}
      <ConfirmDialog
        title={confirmDialog.title}
        subTitle={confirmDialog.subTitle}
        isOpen={confirmDialog.isOpen}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </Fragment>
  );
};

export default RecentActivities;
