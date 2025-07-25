import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormFeedback,
  Row,
  Alert,
  Col,
  Input,
  FormGroup,
  Label,
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import axios from "axios";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { token, url } from "../../../../api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    border: "1px solid #014d88",
    borderRadius: "0px",
    fontSize: "14px",
    color: "#000",
  },
  error: {
    color: "#f85032",
    fontSize: "11px",
  },
  label: {
    fontSize: "14px",
    color: "#014d88",
    fontWeight: "bold",
  },
}));

const SampleCollection = (props) => {
  const classes = useStyles();
  const { datasample = {}, modalstatus, togglestatus, handDataReload } = props;

  const [loading, setLoading] = useState(false);
  const [sampleTypes, setSampleTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedSampleTypes, setSelectedSampleTypes] = useState([]);

  const [formData, setFormData] = useState({
    sample_collected_by: "",
    sample_comment: "",
    sample_ID: "",
    date_sample_collected: new Date().toISOString().substr(0, 16),
  });

  const [errors, setErrors] = useState({});

  const loadSampleTypes = async () => {
    try {
      const response = await axios.get(`${url}laboratory/labtestgroups`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const testGroup = response.data.find(
        (group) => group.groupName === datasample.labTestGroupName
      );

      if (testGroup) {
        const test = testGroup.labTests.find(
          (test) => test.labTestName === datasample.labTestName
        );

        if (test && test.sampleType) {
          const sampleTypeOptions = test.sampleType.map((type) => ({
            title: type.sampleTypeName,
            value: type.id,
          }));
          setSampleTypes(sampleTypeOptions);
        }
      }
    } catch (error) {
      console.error("Error loading sample types:", error);
      loadGeneralSampleTypes();
    }
  };

  const loadGeneralSampleTypes = async () => {
    try {
      const response = await axios.get(
        `${url}application-codesets/v2/SAMPLE_TYPE`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sampleTypeOptions = response.data.map((type) => ({
        title: type.display,
        value: type.id,
      }));
      setSampleTypes(sampleTypeOptions);
    } catch (error) {
      console.error("Error loading general sample types:", error);
      toast.error("Error loading sample types", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const loadUsers = async () => {
    try {
      const response = await axios.get(`${url}users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Error loading users", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (modalstatus && datasample.id) {
      loadSampleTypes();
      loadUsers();
    }
  }, [modalstatus, datasample]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSampleTypeChange = (event, newValue) => {
    setSelectedSampleTypes(newValue);

    // Clear sample type error
    if (errors.sample_type) {
      setErrors({
        ...errors,
        sample_type: "",
      });
    }
  };

  // Validation
  const validate = () => {
    let tempErrors = {};

    if (!formData.date_sample_collected) {
      tempErrors.date_sample_collected = "Date Time is required";
    }

    if (!formData.sample_ID || !formData.sample_ID.trim()) {
      tempErrors.sample_ID = "Sample ID is required";
    }

    if (!formData.sample_collected_by) {
      tempErrors.sample_collected_by = "Sample Collected By is required";
    }

    if (!selectedSampleTypes || selectedSampleTypes.length === 0) {
      tempErrors.sample_type = "At least one sample type is required";
    }

    if (!datasample.id) {
      tempErrors.general = "Test ID is missing. Cannot collect sample.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const saveSample = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const collectedData = selectedSampleTypes.map((sampleType) => ({
        sampleNumber: formData.sample_ID,
        sampleTypeId: sampleType.value,
        sampleCollectionMode: 0,
        dateSampleCollected:
          formData.date_sample_collected.replace("T", " ") + ":00",
        commentSampleCollected: formData.sample_comment || null,
        sampleCollectedBy: formData.sample_collected_by,
        testId: datasample.id,
        sampleLoggedRemotely: 0,
        dateSampleLoggedRemotely: null,
      }));

      const labNumber = `LAB-${datasample.id}-${new Date().getTime()}`;

      console.log("Sending sample data:", {
        labNumber,
        samples: collectedData,
        endpoint: `${url}laboratory/samples/${labNumber}`,
      });

      const response = await axios.post(
        `${url}laboratory/samples/${labNumber}`,
        collectedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Sample collection response:", response.data);

      setFormData({
        sample_collected_by: "",
        sample_comment: "",
        sample_ID: "",
        date_sample_collected: new Date().toISOString().substr(0, 16),
      });
      setSelectedSampleTypes([]);
      setErrors({});

      togglestatus();
      if (handDataReload) {
        handDataReload();
      }
    } catch (error) {
      console.error("Sample collection error:", error);

      // ✅ IMPROVED: Better error handling for backend responses
      let errorMessage = "An error occurred during sample collection";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid sample data. Please check your inputs.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error occurred. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={modalstatus} toggle={togglestatus} size="lg">
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={togglestatus}>Collect Sample</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Row>
                <Col md={12}>
                  <Alert
                    color="primary"
                    style={{
                      color: "#000",
                      fontWeight: "bolder",
                      fontSize: "14px",
                    }}
                  >
                    <p style={{ marginTop: ".7rem" }}>
                      Lab Test Group:{" "}
                      <span style={{ fontWeight: "bolder" }}>
                        {datasample.labTestGroupName}
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lab Test:{" "}
                      <span style={{ fontWeight: "bolder" }}>
                        {datasample.labTestName}
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Priority:{" "}
                      <span style={{ fontWeight: "bolder" }}>
                        {datasample.orderPriorityName}
                      </span>
                    </p>
                  </Alert>
                </Col>

                {/* Show general error if test ID is missing */}
                {errors.general && (
                  <Col md={12}>
                    <Alert color="danger">{errors.general}</Alert>
                  </Col>
                )}

                <Col md={6}>
                  <FormGroup>
                    <Label className={classes.label}>
                      Date Time Collected *
                    </Label>
                    <Input
                      type="datetime-local"
                      className={classes.input}
                      max={new Date().toISOString().substr(0, 16)}
                      min={
                        datasample.dateEncounter
                          ? new Date(datasample.dateEncounter)
                              .toISOString()
                              .substr(0, 16)
                          : undefined
                      }
                      name="date_sample_collected"
                      value={formData.date_sample_collected}
                      onChange={handleInputChange}
                      invalid={!!errors.date_sample_collected}
                    />
                    {errors.date_sample_collected && (
                      <span className={classes.error}>
                        {errors.date_sample_collected}
                      </span>
                    )}
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label className={classes.label}>Sample ID *</Label>
                    <Input
                      className={classes.input}
                      type="text"
                      name="sample_ID"
                      onChange={handleInputChange}
                      value={formData.sample_ID}
                      invalid={!!errors.sample_ID}
                      placeholder="Enter unique sample ID"
                    />
                    {errors.sample_ID && (
                      <span className={classes.error}>{errors.sample_ID}</span>
                    )}
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label className={classes.label}>Sample Type *</Label>
                    <Autocomplete
                      multiple
                      options={sampleTypes}
                      getOptionLabel={(option) => option.title}
                      value={selectedSampleTypes}
                      onChange={handleSampleTypeChange}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={index}
                            label={option.title}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Select sample types"
                          error={!!errors.sample_type}
                        />
                      )}
                    />
                    {errors.sample_type && (
                      <span className={classes.error}>
                        {errors.sample_type}
                      </span>
                    )}
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label className={classes.label}>Collected by *</Label>
                    <Input
                      type="select"
                      name="sample_collected_by"
                      className={classes.input}
                      value={formData.sample_collected_by}
                      onChange={handleInputChange}
                      invalid={!!errors.sample_collected_by}
                    >
                      <option value="">Select laboratory scientist</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </Input>
                    {errors.sample_collected_by && (
                      <FormFeedback>{errors.sample_collected_by}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>

                <Col md={12}>
                  <FormGroup>
                    <Label className={classes.label}>Note</Label>
                    <Input
                      className={classes.input}
                      type="textarea"
                      name="sample_comment"
                      style={{ minHeight: 100, fontSize: 14 }}
                      onChange={handleInputChange}
                      value={formData.sample_comment}
                      placeholder="Add any additional notes..."
                    />
                  </FormGroup>
                </Col>

                {loading && (
                  <Col md={12} className="text-center">
                    <Spinner color="primary" />
                    <span className="ml-2">Processing...</span>
                  </Col>
                )}
              </Row>

              <div className="mt-3">
                <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  disabled={loading || !datasample.id}
                >
                  {loading ? "Saving..." : "Save"}
                </MatButton>

                <MatButton
                  variant="contained"
                  color="default"
                  onClick={togglestatus}
                  className={classes.button}
                  startIcon={<CancelIcon />}
                  disabled={loading}
                >
                  Cancel
                </MatButton>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export default SampleCollection;
