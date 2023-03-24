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
import { url } from "../../../../api";
import { Spinner } from "reactstrap";



const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
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
        fontSize: "12.8px",
    },
}));

const ModalTransfer = (props) => {
    const classes = useStyles()
    const datasample = props.datasample && props.datasample!==null ? props.datasample : {};
    const order_priority = datasample.data && datasample.data.order_priority && datasample.data.order_priority.display   ? datasample.data.order_priority.display : null;
    const lab_test_group = datasample.data ? datasample.data.lab_test_group : null ;
    const sample_ordered_by = datasample.data ? datasample.data.sample_ordered_by : null ;
    const description = datasample.data ? datasample.data.description : null ;
    const lab_number = props.labnumber  ? props.labnumber : null;

    const labId = datasample.id
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const [samples, setSamples] = useState({});
    const [optionsample, setOptionsample] = useState([]);
    const [saveButtonStatus, setSaveButtonStatus] = useState(false);
    const [otherfields, setOtherFields] = useState({sample_collected_by:"",sample_ordered_by:"",sample_priority:"",time_sample_collected:"", comment_sample_collected:""});
    //This is to get SAMPLE TYPE from application Codeset
    const [errors, setErrors] = useState({});


    useEffect(() => {
        async function getCharacters() {
            try {
                const response = await axios(
                    url + "application-codesets/codesetGroup?codesetGroup=SAMPLE_TYPE"
                );
                const body = response.data;
                setOptionsample(
                    body.map(({ display, id }) => ({ title: display, value: id }))
                );
            } catch (error) {
            }
        }
        getCharacters();
    }, []);

    const handleInputChangeSample = (e) => {
        setSamples({ ...samples, [e.target.name]: e.target.value });
    };
    const handleOtherFieldInputChange = (e) => {
        setOtherFields({ ...otherfields, [e.target.name]: e.target.value });
    };

    /*****  Validation */
    const validate = () => {
        let temp = { ...errors };
        temp.date_sample_collected = samples.date_sample_collected
            ? ""
            : "Date is required";
        temp.time_sample_collected = otherfields.time_sample_collected
            ? ""
            : "Time  is required.";
        temp.sample_type = samples.sample_type ? "" : "Sample Type.";
        temp.sample_collected_by = otherfields.sample_collected_by
            ? ""
            : "Collected By  is required.";
        //temp.comment = samples.comment ? "" : "This field is required.";
        setErrors({
            ...temp,
        });
        return Object.values(temp).every((x) => x == "");
    };
    const saveSample = (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const newDatenow = moment(samples.date_sample_collected).format(
                "DD-MM-YYYY"
            );
            const newTimeSampleCollected = moment(otherfields.time_sample_collected).format("LT");
            datasample.data.lab_test_order_status = 1;
            datasample.data.date_sample_collected = newDatenow;
            datasample.data.comment = samples.comment;

            /* processing the sample type to a string   */
            if (samples.sample_type.length > 0) {
                const arr = [];
                samples.sample_type.forEach(function (value, index, array) {
                    arr.push(value["title"]);
                });
                const sampletostring = arr.toString();
                datasample.data.sample_type = sampletostring;
            } else {
                datasample.data.sample_type = datasample.data.sample_type;
            }
            /* end of the process */
            const onSuccess = () => {
                setLoading(false);
                props.togglestatus();
            };
            const onError = () => {
                setLoading(false);
                props.togglestatus();
            };
            datasample["lab_number"] = lab_number;
            datasample.data["sample_collected_by"] =otherfields["sample_collected_by"];
            datasample.data["sample_ordered_by"] = otherfields["sample_ordered_by"];
            datasample.data["sample_priority"] = "Normal";
            datasample.data["lab_number"] = lab_number;
            datasample.data["time_sample_collected"] = newTimeSampleCollected;
            datasample.data["comment_sample_collected"] = samples["comment"];
            datasample.data["date_sample_ordered"] = datasample.dateEncounter;
            //return console.log(datasample)
            //props.createCollectedSample(datasample, labId, onSuccess, onError);
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
                                                <Alert color="dark" style={{backgroundColor:'#9F9FA5', color:"#000" , fontWeight: 'bolder', fontSize:'14px'}}>
                                                    <p style={{marginTop: '.7rem' }}>Lab Test Group : <span style={{ fontWeight: 'bolder'}}>{lab_test_group }</span>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lab Test Ordered : &nbsp;&nbsp;
                                                        <span style={{ fontWeight: 'bolder'}}>{description}</span>
                                                        &nbsp;&nbsp;&nbsp; Lab Number : &nbsp;&nbsp;
                                                        <span style={{ fontWeight: 'bolder'}}>{lab_number===""?" ---":lab_number}</span>
                                                        <br/>
                                                        Order by : &nbsp;&nbsp;
                                                        <span style={{ fontWeight: 'bolder'}}>{ sample_ordered_by}</span>
                                                        &nbsp;&nbsp;&nbsp; Priority : &nbsp;&nbsp;
                                                        <span style={{ fontWeight: 'bolder'}}>{order_priority}</span>
                                                    </p>

                                                </Alert>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for='maritalStatus'>Date Collected</Label>
                                                    <DateTimePicker
                                                        time={false}
                                                        name="date_sample_collected"
                                                        id="date_sample_collected"
                                                        value={samples.date_sample_collected}
                                                        onChange={value1 =>
                                                            setSamples({ ...samples, date_sample_collected: value1 })
                                                        }
                                                        {...(errors.date_sample_collected && { invalid: true})}
                                                    />
                                                    {errors.date_sample_collected !="" ? (
                                                        <span className={classes.error}>{errors.date_sample_collected}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for='maritalStatus'>Time Collected</Label>

                                                    <DateTimePicker
                                                        date={false}
                                                        name="time_sample_collected"
                                                        id="time_sample_collected"

                                                        onChange={value1 =>
                                                            setOtherFields({ ...otherfields, time_sample_collected: value1 })
                                                        }
                                                        required
                                                    />
                                                    {errors.time_sample_collected !="" ? (
                                                        <span className={classes.error}>{errors.time_sample_collected}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </Col>

                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="maritalStatus">Sample Type</Label>
                                                    <Autocomplete
                                                        multiple="true"
                                                        id="sample_type"
                                                        size="small"
                                                        options={optionsample}
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
                                                        style={{ width: "auto", marginTop: "-1rem" }}
                                                        s
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
                                                    <Label for="occupation">Collected by </Label>

                                                    <Input
                                                        type="select"
                                                        name="sample_collected_by"
                                                        id="sample_collected_by"
                                                        vaule={otherfields.sample_collected_by}
                                                        onChange={handleOtherFieldInputChange}
                                                        {...(errors.sample_collected_by && {
                                                            invalid: true,
                                                        })}
                                                    >
                                                        <option value=""> </option>
                                                        <option value="Dorcas"> Dorcas </option>
                                                        <option value="Jeph"> Jeph </option>
                                                        <option value="Debora"> Debora </option>
                                                    </Input>
                                                    <FormFeedback>
                                                        {errors.sample_collected_by}
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={7}>
                                                <FormGroup>
                                                    <Label for="maritalStatus">Note</Label>
                                                    <Input
                                                        type="textarea"
                                                        name="comment"
                                                        id="comment"
                                                        onChange={handleInputChangeSample}
                                                        value={samples.comment}
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

export default ModalTransfer;
