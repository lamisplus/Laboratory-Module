import React, { useState, useEffect } from "react";
import {Modal,ModalHeader, ModalBody,Form,FormFeedback,Row,Alert,Col,Input,FormGroup,Label,Card,CardBody,} from "reactstrap";
import axios from "axios";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/styles.css";
import { DateTimePicker } from "react-widgets";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import { token, url } from "../../../../api";
import { Spinner } from "reactstrap";
import { toast} from "react-toastify";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },

    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        border:'1px solid #014d88',
        borderRadius:'0px',
        fontSize:'14px',
        color:'#000'
    },
    arial: {
        border:'2px solid #014d88',
        borderRadius:'0px',
        fontSize:'15px',
        color:'#000'
    },
    error: {
        color: "#f85032",
        fontSize: "11px",
    },
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    },
    inputGroupText:{
        backgroundColor:'#014d88',
        fontWeight:"bolder",
        color:'#fff',
        borderRadius:'0px'
    },
   label:{
       fontSize:'14px',
       color:'#014d88',
       fontWeight:'bold'
   }
}))

const ModalVerifySample = (props) => {
    const history = useHistory();
    const classes = useStyles()
    const datasample = props.datasample && props.datasample!==null ? props.datasample : {};
    //console.log('modal', datasample)
    const sample_type = datasample.sampleTypeName;
    const lab_number = datasample.labNumber;
    const date_sample_collected = datasample.dateSampleCollected;
    const time_sample_collected = datasample.timeSampleCollected;
    const lab_test_id = datasample.id;

    const sampleId = datasample.id;

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const [samples, setSamples] = useState({});
    const [optionsample, setOptionsample] = useState([]);
    const [saveButtonStatus, setSaveButtonStatus] = useState(false);
    const [otherFields, setotherFields] = useState({
        date_sample_verified:new Date().toISOString().substr(0, 16),
        sample_verified_by:"",
        verification_status:"",
        comment_sample_verified:""
    });
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState({});


    const loginUser = async () => {
        try {
             const response = await axios.get(`${url}users`, { headers: {"Authorization" : `Bearer ${token}`} });
             setUsers(response.data);
        }
        catch(error) {

        }
    }

    useEffect(() => {
        loginUser()
        async function getCharacters() {
            try {
            } catch (error) {
            }
        }
    }, []);

    const handleOtherFieldInputChange = e => {
      setotherFields ({ ...otherFields, [e.target.name]: e.target.value });
    }

    /*****  Validation */
   const validate = () => {
         let temp = { ...errors }
         temp.date_sample_verified = otherFields.date_sample_verified ? "" : "This field is required"
         temp.verification_status = otherFields.verification_status ? "" : "This field  is required."
         temp.sample_verified_by = otherFields.sample_verified_by ? "" : "This field is required."
         //temp.comment_sample_verified = otherFields.comment_sample_verified ? "" : "Sample verification Comments is required."
         //temp.verification_status = otherFields.verification_status ? "" : "This filed is required."
         setErrors({
             ...temp
         })
         return Object.values(temp).every(x => x == "")
       }

    const saveSample = async (e) => {
        e.preventDefault();

         try {

             if (validate()) {
                setLoading(true);
                otherFields.date_sample_verified = otherFields.date_sample_verified.replace('T', ' ')+":00"

                let verifiedSamples = {
                  commentSampleVerified: otherFields.comment_sample_verified,
                  dateSampleVerified: otherFields.date_sample_verified,
                  sampleAccepted: otherFields.verification_status,
                  sampleVerifiedBy: otherFields.sample_verified_by
                }
                console.log(verifiedSamples)

                await axios.post(`${url}laboratory/verified-samples/${lab_test_id}`, verifiedSamples,
                { headers: {"Authorization" : `Bearer ${token}`}}).then(resp => {
                    console.log("sample verified", resp);
                    setLoading(!true);
                     toast.success("Sample verified successfully!!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });

                props.togglestatus()
                props.handDataReload()
            }

         } catch (e) {

            toast.error("An error occurred during sample collection", {
                 position: toast.POSITION.TOP_RIGHT
             });
         }
    };

    function checklanumber(lab_num) {
        if (lab_num === "" || lab_num===null) {
            return (
                <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                    Please make sure you enter a lab number
                </Alert>
            );
        }
    }

    return (
        <div >
            <Card >
                <CardBody>
                    <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
                        <Form onSubmit={saveSample}>
                            <ModalHeader toggle={props.togglestatus}>Verify Sample </ModalHeader>
                            <ModalBody>
                                {/**{checklanumber(lab_number)}*/}
                                <Card >
                                    <CardBody>
                                        <Row >
                                            <Col md={12} >
                                               <Alert color="primary" style={{color:"#000" , fontWeight: 'bolder', }}>
                                                <p style={{marginTop: '.7rem' }}>Lab number: <span style={{ fontWeight: 'bolder'}}>{lab_number}</span>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;Sample type:
                                                    <span style={{ fontWeight: 'bolder'}}>{" "}{sample_type}</span>
                                                            &nbsp;&nbsp;&nbsp;&nbsp; Date sample collected :
                                                    <span style={{ fontWeight: 'bolder'}}>{" "}{date_sample_collected}</span>
                                                </p>

                                              </Alert>
                                        </Col>
                                            <Col md={12}>
                                              <FormGroup>
                                                <Label for='date_sample_verified' className={classes.label}>Date Time Verified</Label>
                                                <Input
                                                 type="datetime-local"
                                                 className={classes.input}
                                                 min={datasample.dateSampleCollected}
                                                 max={new Date().toISOString().substr(0, 16)}
                                                 name="date_sample_verified"
                                                 id="date_sample_verified"
                                                 value={otherFields.date_sample_verified}
                                                 onChange={handleOtherFieldInputChange} />

                                                  {errors.date_sample_verified !="" ? (
                                                    <span className={classes.error}>{errors.date_sample_verified}</span>
                                                  ) : "" }
                                              </FormGroup>
                                            </Col>
                                            {/*<Col md={6}>
                                              <FormGroup>
                                                <Label for='' className={classes.label}>Time Verified</Label>

                                                 <Input
                                                    className={classes.input}
                                                    type="text"
                                                    name="time_sample_verified"
                                                    id="time_sample_verified"
                                                    onChange={value1 =>
                                                        setotherFields({ ...otherFields, time_sample_verified: value1 })
                                                    }
                                                    value={samplesVerified.dateSampleVerified}
                                                />

                                                   {errors.time_sample_verified !="" ? (
                                                      <span className={classes.error}>{errors.time_sample_verified}</span>
                                                      ) : "" }
                                              </FormGroup>
                                              </Col>*/}

                                              <Col md={6}>
                                              <FormGroup>
                                                  <Label for="verification_status" className={classes.label}>Approve Sample</Label>

                                                    <select
                                                        className={classes.input}
                                                        className="form-control"
                                                        name="verification_status"
                                                        id="verification_status"
                                                        style={{border: "1px solid #014d88",
                                                        borderRadius:'0px',
                                                        fontSize:'14px',
                                                        color:'#000'}}
                                                        vaule={otherFields.sample_verified_by}
                                                        onChange={handleOtherFieldInputChange}
                                                        {...(errors.sample_verified_by && { invalid: true})}
                                                      >
                                                         <option value={""}>Select</option>
                                                          <option value="Valid">Sample is Valid </option>
                                                          <option value="Rejected">Sample is Rejected</option>
                                                    </select>
                                                      {errors.sample_verified_by !="" ? (
                                                        <span className={classes.error}>{errors.sample_verified_by}</span>
                                                      ) : "" }
                                              </FormGroup>
                                          </Col>
                                              <Col md={6}>
                                                <FormGroup>
                                                    <Label for="sample_verified_by" className={classes.label}>Verify by </Label>

                                                      <select
                                                          className={classes.input}
                                                          className="form-control"
                                                          name="sample_verified_by"
                                                          id="sample_verified_by"
                                                          style={{border: "1px solid #014d88",
                                                          borderRadius:'0px',
                                                          fontSize:'14px',
                                                          color:'#000'}}
                                                          vaule={otherFields.sample_verified_by}
                                                          onChange={handleOtherFieldInputChange}
                                                          {...(errors.sample_verified_by && { invalid: true})}
                                                        >
                                                          <option value={""}> Sample verified by</option>
                                                           {users && users.map((user, i) =>
                                                           (
                                                               <option key={i} value={user.id}>{user.firstName}</option>
                                                           ))}
                                                      </select>
                                                        {errors.sample_verified_by !="" ? (
                                                          <span className={classes.error}>{errors.sample_verified_by}</span>
                                                        ) : "" }
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                              <FormGroup>
                                                <Label for='comment_sample_verified' className={classes.label}>Note</Label>
                                                <Input
                                                className={classes.input}
                                                  type='textarea'
                                                  name='comment_sample_verified'
                                                  id='comment_sample_verified'
                                                  style={{ minHeight: 100, fontSize: 14 }}
                                                  onChange={handleOtherFieldInputChange}
                                                  value = {otherFields.comment}
                                                  {...(errors.comment && { invalid: true})}
                                                  >
                                                  </Input>
                                                  <FormFeedback>{errors.comment}</FormFeedback>

                                              </FormGroup>
                                            </Col>

                                            <br />
                                            <br />
                                            <Col md={12}>
                                                {loading ? (
                                                    <>
                                                        <Spinner /> <p> &nbsp;&nbsp;Processing...</p>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        </Row>
                                        {lab_number && lab_number !== null ? (
                                            <MatButton
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                disabled={loading}
                                            >
                                                Save
                                            </MatButton>
                                        ) : (
                                            <MatButton
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                disabled="true"
                                            >
                                                Save
                                            </MatButton>
                                        )}
                                        <MatButton
                                            variant="contained"
                                            color="default"
                                            onClick={props.togglestatus}
                                            className={classes.button}
                                            startIcon={<CancelIcon />}
                                        >
                                            Cancel
                                        </MatButton>
                                    </CardBody>
                                </Card>
                            </ModalBody>
                        </Form>
                    </Modal>
                </CardBody>
            </Card>
        </div>
    );
};

export default ModalVerifySample;
