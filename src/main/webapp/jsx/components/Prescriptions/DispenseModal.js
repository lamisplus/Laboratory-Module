import React, {useState, useEffect} from 'react';
import {  Modal, ModalHeader, ModalBody,
    Form,
    Row,
    Col,Input,
    FormGroup,
    Label,Card, CardBody
} from 'reactstrap';

import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";
import { Spinner } from 'reactstrap';
import { url } from "./../../../api";
import axios from "axios";


Moment.locale('en');
momentLocalizer();
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
        display: 'none'
    }
}))

const DispenseModal = (props) => {
    const { buttonLabel, className } = props;
    const toggle = props.togglestatus
    const modal = props.modalstatus
    const closeBtn = props.close
    const classes = useStyles();
    const [optionsample, setOptionsample] = useState([]);
    const formData = props.formData ? props.formData : {}
    const [formValues, setFormValues] = useState({})
    console.log(props.formData)
    const handleInputChange = (e) => {
        setFormValues ({ ...formValues, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        async function getCharacters() {
            try {
                const response = await axios(
                    url + "drugs"
                );
                const body = response.data;
                console.log(body)
                setOptionsample(
                    body.map(({ genericName, id }) => ({ title: genericName, value: id }))
                );
            } catch (error) {
            }
        }
        getCharacters();
    }, []);

    const handleDispense = (e) => {
        e.preventDefault()
        const date_dispensed = moment(formValues.dateDispensed).format(
            "DD-MM-YYYY"
        );
        formData.data.brand_name_dispensed = formValues.brandName
        formData.data.quantity_dispensed = formValues.qtyDispensed
        formData.data.prescription_status = 1
        formData.data.date_dispensed = date_dispensed
        formData.data.comment = formValues.comment
        const data = { ...formData };
        //props.updatePrescriptionStatus(formData.id, data);

        toggle()
    };



    return (
        <div>
            <Card>
                <CardBody>
                    <ToastContainer autoClose={3000} hideProgressBar />
                    <Modal
                        isOpen={modal}
                        toggle={toggle}
                        className={className}
                        size="lg"
                    >
                        <ModalHeader toggle={toggle} close={closeBtn}>
                            Dispensing
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <div
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#9F9FA5",
                                        padding: "1rem 1rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Drug Prescribed:{" "}
                                    <span>
                                        {/* <b>{formData.data.generic_name}</b> */}
                                    </span>
                                    &nbsp;&nbsp; Quantity Prescribed:&nbsp;
                                    <span>
                                        <b>2 packs</b>
                                    </span>
                                    &nbsp;&nbsp; Stock Balance: &nbsp;
                                    <span style={{ color: "#19FF32" }}>
                                        <b>400 packs</b>
                                    </span>
                                </div>
                            </Row>
                            <Form onSubmit={handleDispense}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">Date Dispensed</Label>
                                            <DateTimePicker
                                                time={false}
                                                name="dateDispensed"
                                                value={formValues.dateDispensed}
                                                onChange={dateValue => setFormValues({...formValues, dateDispensed: dateValue})}
                                                id="date_sample_collected"
                                                defaultValue={new Date()}
                                                max={new Date()}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <br/>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleNumber">Drug Name (Brand name)</Label>
                                            {/* <Input
                                                type="text"
                                                name="brandName"
                                                value={formValues.brandName}
                                                id="drugDispensed"
                                                placeholder="brand name"
                                                onChange={handleInputChange}
                                            /> */}

                                            <Autocomplete
                                                multiple="true"
                                                id="drugDispensed"
                                                size="small"
                                                options={optionsample}
                                                //loading="true"
                                                //value={formValues.generic_name}
                                                getOptionLabel={(option) => option.title}
                                                //defaultValue={}
                                                onChange={(e, i) => {
                                                    setFormValues({ ...formValues, brandName: i });
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
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <Label for="exampleNumber">Quantity</Label>
                                            <Input
                                                type="number"
                                                name="qtyDispensed"
                                                id="exampleNumber"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="exampleSelect">Unit</Label>
                                            <Input
                                                type="select"
                                                name="unitDispensed"
                                                id="exampleSelect"
                                                onChange={handleInputChange}>
                                                <option value="Packs">Packs</option>
                                                <option value="Tablets">Tablets</option>
                                                <option value="ml">ml</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label for="comment">Note</Label>
                                            <Input
                                                type="textarea"
                                                name="comment"
                                                id="comment"
                                                onChange={handleInputChange}
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <MatButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    // disabled={loading}
                                >
                                    Ok
                                </MatButton>

                                <MatButton
                                    variant="contained"
                                    color="default"
                                    onClick={toggle}
                                    className={classes.button}
                                    startIcon={<CancelIcon />}>
                                    Cancel
                                </MatButton>
                            </Form>
                        </ModalBody>
                    </Modal>
                </CardBody>
            </Card>
        </div>
    );
}


export default DispenseModal;
