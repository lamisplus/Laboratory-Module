import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
  Alert,
  Badge,
  Spinner,
} from "reactstrap";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { toast } from "react-toastify";
import { token, url } from "../../../../api";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  resultSection: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  boldText: {
    fontWeight: "bold",
  },
  noResultText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    padding: theme.spacing(2),
  },
}));

const ViewResult = (props) => {
  const classes = useStyles();
  const { datasample = {}, modalstatus, togglestatus } = props;

  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get test results
  const fetchResults = useCallback(async () => {
    if (!datasample.testId && !datasample.id) {
      setError("No test ID available");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const testId = datasample.testId || datasample.id;
      const response = await axios.get(
        `${url}laboratory/results/tests/${testId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResultData(response.data);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Unable to fetch test results");

      // Only show toast for unexpected errors
      if (err.response?.status !== 404) {
        toast.error("An error occurred while fetching sample results", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [datasample.testId, datasample.id]);

  useEffect(() => {
    if (modalstatus && (datasample.testId || datasample.id)) {
      fetchResults();
    }
  }, [modalstatus, fetchResults]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const renderResultContent = () => {
    if (loading) {
      return (
        <div className="text-center p-4">
          <Spinner color="primary" />
          <p className="mt-2">Loading results...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={classes.noResultText}>
          <p>{error}</p>
        </div>
      );
    }

    if (!resultData || !resultData.dateAssayed) {
      return (
        <div className={classes.noResultText}>
          <p>No results available for this test</p>
        </div>
      );
    }

    return (
      <Row>
        <Col xs="4">
          <span className={classes.boldText}>Date Assayed:</span>{" "}
          {formatDate(resultData.dateAssayed)}
        </Col>

        <Col xs="4">
          <span className={classes.boldText}>Date Reported:</span>{" "}
          {formatDate(resultData.dateResultReported)}
        </Col>

        <Col xs="4">
          <Badge color="primary">Result Available</Badge>
        </Col>

        <Col xs="6" className="mt-3">
          <span className={classes.boldText}>Results:</span>{" "}
          {resultData.resultReport || "N/A"}
        </Col>

        <Col xs="6" className="mt-3">
          <span className={classes.boldText}>Unit Measurement:</span>{" "}
          {resultData.unitMeasurement || "N/A"}
        </Col>

        {resultData.resultReported && (
          <Col xs="12" className="mt-3">
            <span className={classes.boldText}>Notes:</span>
            <div
              dangerouslySetInnerHTML={{
                __html: resultData.resultReported,
              }}
              style={{ marginTop: "8px" }}
            />
            <Divider className="mt-3" />
          </Col>
        )}
      </Row>
    );
  };

  const getSampleInfo = () => ({
    labNumber: datasample.labNumber || "N/A",
    sampleId: datasample.sampleNumber || datasample.sample_ID || "N/A",
    sampleType: datasample.sampleTypeName || "N/A",
    dateVerified: datasample.dateSampleVerified
      ? formatDate(datasample.dateSampleVerified)
      : "N/A",
    testName: datasample.labTestName || "Unknown Test",
  });

  const sampleInfo = getSampleInfo();

  return (
    <Modal isOpen={modalstatus} toggle={togglestatus} size="lg">
      <ModalHeader toggle={togglestatus}>
        Lab Test Result Details - {sampleInfo.testName}
      </ModalHeader>

      <ModalBody>
        <Card>
          <CardBody>
            {/* Sample Information Header */}
            <Alert color="info" className="mb-4">
              <Row>
                <Col md="4">
                  <strong>Lab Number:</strong> {sampleInfo.labNumber}
                </Col>
                <Col md="4">
                  <strong>Sample ID:</strong> {sampleInfo.sampleId}
                </Col>
                <Col md="4">
                  <strong>Sample Type:</strong> {sampleInfo.sampleType}
                </Col>
                <Col md="12" className="mt-2">
                  <strong>Date Sample Verified:</strong>{" "}
                  {sampleInfo.dateVerified}
                </Col>
              </Row>
            </Alert>

            {/* Results Section */}
            <div className={classes.resultSection}>
              <h5 className="mb-3">Test Results:</h5>
              <hr />
              {renderResultContent()}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 text-right">
              <MatButton
                variant="contained"
                color="default"
                onClick={togglestatus}
                className={classes.button}
                startIcon={<CancelIcon />}
              >
                Close
              </MatButton>
            </div>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default ViewResult;
