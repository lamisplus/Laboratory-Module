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

const ModalSample = (props) => {

    const history = useHistory();
    const classes = useStyles()
    const datasample = props.datasample && props.datasample!==null ? props.datasample : {};
    console.log("ghst", datasample);
    const order_priority = datasample.id && datasample.orderPriority ? datasample.orderPriorityName : null;
    const lab_test_group = datasample.id ? datasample.labTestGroupName : null ;
    const sample_ordered_by = datasample.data ? datasample.data.sample_ordered_by : null ;
    const description = datasample.labTestName ? datasample.labTestName : null ;
    let lab_number = props.labnumber;

    let getLabNumber = ""

    if (lab_number) {
        localStorage.setItem('labnumber',  lab_number);
        //console.log("base value", lab_number)
    }else{
        getLabNumber = localStorage.getItem('labnumber')
        //console.log("value", getLabNumber)
        lab_number = getLabNumber;
    }

    const labId = datasample.id
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const [samples, setSamples] = useState({});
    const [optionsample, setOptionsample] = useState([]);
    const [saveButtonStatus, setSaveButtonStatus] = useState(false);
    const [users, setUsers] = useState([])

    const [otherfields, setOtherFields] = useState({
        sample_collected_by:"",
        sampleTypeId: 0,
        sample_comment:"",
        sample_ID: "",
        date_sample_collected: new Date().toISOString().substr(0, 16),
    });

    const [errors, setErrors] = useState({});

    const sampleTypes = async () => {
        try {
             const response = await axios.get(`${url}laboratory/labtestgroups`, { headers: {"Authorization" : `Bearer ${token}`} });
             response.data.map((data) => {
                if (data.groupName === lab_test_group) {
                    data.labTests.map((x) => {
                        if (x.labTestName === description) {
                            let arr = []
                            x.sampleType.map(({ sampleTypeName, id }) => {arr.push({ title: sampleTypeName, value: id })})
                            setOptionsample(arr)
                        }
                    })
                }

             })
        }
        catch(error) {
            console.log(`error with pulling sample type ${error}`)
        }
    }

    const loginUser = async () => {
        try {
             const response = await axios.get(`${url}users`, { headers: {"Authorization" : `Bearer ${token}`} });
             setUsers(response.data);
        }
        catch(error) {

        }
    }

    useEffect(() => {
        loginUser();
        sampleTypes();

        async function getCharacters() {
            try {
                const response = await axios.get(`${url}application-codesets/v2/SAMPLE_TYPE`, { headers: {"Authorization" : `Bearer ${token}`} });
                const body = response.data;

                setOptionsample(
                    body.map(({ display, id }) => ({ title: display, value: id }))
                );
            } catch (error) {
            }
        }
        //getCharacters();
    }, []);


    const handleOtherFieldInputChange = (e) => {
        setOtherFields({ ...otherfields, [e.target.name]: e.target.value });
    };

    /*****  Validation */
    const validate = () => {
        let temp = { ...errors };

        temp.date_sample_collected = otherfields.date_sample_collected
            ? ""
            : "Date Time is required";
        temp.sample_ID = otherfields.sample_ID
            ? ""
            : "sample ID  is required.";
        //temp.sampleTypeId = otherfields.sampleTypeId ? "" : "Sample Type is required.";
        temp.sample_collected_by = otherfields.sample_collected_by
            ? ""
            : "Sample Collected By  is required.";
        //temp.comment = samples.comment ? "" : "This field is required.";
        setErrors({
            ...temp,
        });
        return Object.values(temp).every((x) => x == "");
    };

    const saveSample = async (e) => {
        e.preventDefault();
         try {

             if (validate()) {
                setLoading(true);

                let sampletostring = null;

                if (samples.sample_type.length > 0) {
                    const arr = [];
                    samples.sample_type.forEach(function (value, index, array) {
                        arr.push(value["value"]);
                    });
                    //console.log(arr.toString())
                    sampletostring = arr.toString();

                }

                const stringArr = sampletostring.split(',')

                let collectedData = []

                for (let sampleType of stringArr) {
                   otherfields.sampleTypeId = sampleType;

                   collectedData.push( {
                      commentSampleCollected: otherfields.sample_comment,
                      sampleNumber: otherfields.sample_ID,
                      dateSampleCollected: otherfields.date_sample_collected.replace('T', ' ')+":00",
                      id: 0,
                      sampleCollectedBy: otherfields.sample_collected_by,
                      sampleCollectionMode: 0,
                      sampleTypeId: otherfields.sampleTypeId,
                      testId: datasample.id
                    })
                }

                //console.log("samples", collectedData)

               if (lab_number) {
                    await axios.post(`${url}laboratory/samples/${lab_number}`, collectedData,
                    { headers: {"Authorization" : `Bearer ${token}`}}).then(resp => {
                        setLoading(!true);
                         toast.success("Sample collection saved successfully!!", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    });
               }
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
                            <ModalHeader toggle={props.togglestatus}>Collect Sample </ModalHeader>
                            <ModalBody>
                                {checklanumber(lab_number)}
                                <Card >
                                    <CardBody>
                                        <Row >
                                            <Col md={12} >
                                                <Alert color="primary" style={{color:"#000" , fontWeight: 'bolder', fontSize:'14px'}}>
                                                    <p style={{marginTop: '.7rem' }}>Lab Test Group : <span style={{ fontWeight: 'bolder'}}>{lab_test_group }</span>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lab Test : &nbsp;&nbsp;
                                                        <span style={{ fontWeight: 'bolder'}}>{description}</span>
                                                        &nbsp;&nbsp;&nbsp;
                                                        &nbsp;&nbsp;&nbsp; Priority : &nbsp;&nbsp;
                                                        <span style={{ fontWeight: 'bolder'}}>{order_priority}</span>
                                                    </p>

                                                </Alert>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for='date collected' className={classes.label}>Date Time Collected *</Label>
                                                    <Input
                                                         type="datetime-local"
                                                         className={classes.input}
                                                         max={new Date().toISOString().substr(0, 16)}
                                                         min={new Date(datasample.dateEncounter).toISOString().substr(0, 16)}
                                                         name="date_sample_collected"
                                                         id="date_sample_collected"
                                                         value={otherfields.date_sample_collected}
                                                         onChange={handleOtherFieldInputChange} />
                                                    {errors.date_sample_collected !="" ? (
                                                        <span className={classes.error}>{errors.date_sample_collected}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for='sample id' className={classes.label}>Sample ID</Label>

                                                    <Input
                                                        className={classes.input}
                                                        type="text"
                                                        name="sample_ID"
                                                        id="sample_ID"
                                                        onChange={handleOtherFieldInputChange}
                                                        value={otherfields.sampleID}
                                                    />

                                                   {errors.time_sample_collected !="" ? (
                                                        <span className={classes.error}>{errors.time_sample_collected}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </Col>

                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="sample type" className={classes.label}>Sample Type</Label>
                                                    <Autocomplete

                                                        multiple="true"
                                                        id="sample_type"
                                                        size="small"
                                                        options={optionsample.length !== 0 ? optionsample : []}
                                                        getOptionLabel={(option) => option.title}
                                                        onChange={(e, i) => {
                                                            setSamples({ ...samples, sample_type: i });
                                                        }}
                                                        renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                <Chip
                                                                    label={option.title}
                                                                    {...getTagProps({ index })}
                                                                    disabled={index === 0}
                                                                />
                                                            ))
                                                        }
                                                        style={{border: "1px solid #014d88",
                                                        borderRadius:'0px',
                                                        fontSize:'14px',
                                                        color:'#000'}}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                margin="normal"
                                                            />
                                                        )}
                                                        required
                                                    />
                                                    {errors.sample_type != "" ? (
                                                        <span className={classes.error}>
                                                    {errors.sample_type}
                                                    </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="collected" className={classes.label}>Collected by </Label>
                                                     <select
                                                        className="form-control"
                                                        name="sample_collected_by"
                                                        id="sample_collected_by"
                                                        style={{border: "1px solid #014d88",
                                                        borderRadius:'0px',
                                                        fontSize:'14px',
                                                        color:'#000'}}
                                                        vaule={otherfields.sample_collected_by}
                                                        onChange={handleOtherFieldInputChange}
                                                     >
                                                        <option value={""}> Select laboratory scientist</option>
                                                        {users && users.map((user, i) =>
                                                        (
                                                            <option key={i} value={user.id}>{user.firstName}</option>
                                                        ))}

                                                    </select>
                                                    <FormFeedback>
                                                        {errors.sample_collected_by}
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label for="Note" className={classes.label}>Note</Label>
                                                    <Input
                                                        className={classes.input}
                                                        type="textarea"
                                                        name="sample_comment"
                                                        id="sample_comment"
                                                        style={{ minHeight: 100, fontSize: 14 }}
                                                        onChange={handleOtherFieldInputChange}
                                                        value={otherfields.sample_comment}
                                                        {...(errors.comment && { invalid: true })}
                                                    ></Input>
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

export default ModalSample;