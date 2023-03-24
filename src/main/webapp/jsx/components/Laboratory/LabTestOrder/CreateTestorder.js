import React, { useState, useEffect } from "react";
import {Modal,ModalHeader, ModalBody,Form,FormFeedback,Row,Alert,Col,Input,FormGroup,Label,Card,CardBody,Table} from "reactstrap";
import axios from "axios";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/styles.css";
import {Icon, List, Label as LabelSui} from 'semantic-ui-react'
import moment from "moment";
import { url } from "../../../../api";
import { Spinner } from "reactstrap";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'



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

const ModalSample = (props) => {
    const classes = useStyles()

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const [samples, setSamples] = useState({});
    const [otherfields, setOtherFields] = useState({test:"",encounterDate:"",encounterTime:"",testGroup:"", priority:"", sampleOrderedBy:""});
    //This is to get SAMPLE TYPE from application Codeset
    const [errors, setErrors] = useState({});
    const [testOrders, settestOrders] = useState([]);
    const [locationListArray2, setLocationListArray2] = useState([])

    useEffect(() => {
       
    }, []);

    const addOrder = e => { 
        if(validate()){ 
        const alltestOrders = [...testOrders, otherfields];
        settestOrders(alltestOrders);
        console.log(alltestOrders)
        }else{

            return;
        }
        
    }

    const handleOtherFieldInputChange = (e) => {
        
        setOtherFields({ ...otherfields, [e.target.name]: e.target.value });
    };

    /* Remove Relative Location function **/
    const removeTestOrders = index => {       
        testOrders.splice(index, 1);
        settestOrders([...testOrders]);
       
    };
    /*****  Validation */
    const validate = () => {
        let temp = { ...errors };
        temp.test = otherfields.test
            ? ""
            : "This field is required.";
        temp.encounterDate = otherfields.encounterDate
            ? ""
            : "This field is required.";
        temp.encounterTime = otherfields.encounterTime ? "" : "This field is required.";
        temp.testGroup = otherfields.testGroup
            ? ""
            : "This field is required.";
        temp.priority = otherfields.priority ? "" : "This field is required.";
        temp.sampleOrderedBy = otherfields.sampleOrderedBy ? "" : "This field is required.";
        setErrors({
            ...temp,
        });
        return Object.values(temp).every((x) => x == "");
    };
    const saveSample = (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            
           
            /* end of the process */
            const onSuccess = () => {
                setLoading(false);
                props.togglestatus();
            };
            const onError = () => {
                setLoading(false);
                props.togglestatus();
            };

            //return console.log(datasample)
            //props.createCollectedSample(datasample, labId, onSuccess, onError);
        }
    };
    console.log(testOrders.length >0)

    return (
        <div >
            <Card >
                <CardBody>
                    <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="xl">
                        <Form onSubmit={saveSample}>
                            <ModalHeader toggle={props.togglestatus}>Create Test Order </ModalHeader>
                            <ModalBody>
                               
                                <Card >
                                    <CardBody>
                                        <Row >
                                            
                                            <Col md={5}>
                                                <FormGroup>
                                                    <Label for='maritalStatus'>Test Order Date</Label>
                                                    <Input
                                                        type="date"
                                                        name="encounterDate"
                                                        id="encounterDate"
                                                        vaule={otherfields.encounterDate}
                                                        onChange={handleOtherFieldInputChange}
                                                       
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={5}>
                                                <FormGroup>
                                                    <Label for='maritalStatus'>Test Order Time </Label>
                                                    <Input
                                                        type="time"
                                                        name="encounterTime"
                                                        id="encounterTime"
                                                        onChange={handleOtherFieldInputChange}
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={2}></Col>
                                            <Col md={5}>
                                                <FormGroup>
                                                    <Label for="maritalStatus">Test Order Type</Label>
                                                        <select
                                                            defaultValue={"option"}
                                                            onChange={handleOtherFieldInputChange}
                                                            className="form-control"
                                                            name="testGroup"
                                                            id="testGroup"
                                                        >
                                                        <option value="option" disabled>
                                                        Choose...
                                                        </option>
                                                       
                                                        <option>Option 3</option>
                                                        </select>
                                                </FormGroup>
                                            </Col>
                                            <Col md={5}>
                                                <FormGroup>
                                                    <Label for="occupation">Priority* </Label>
                                                    <select
                                                        defaultValue={"option"}
                                                        onChange={handleOtherFieldInputChange}
                                                        className="form-control"
                                                        name="priority"
                                                        id="priority"
                                                    >
                                                        <option value="option" disabled>
                                                        Choose...
                                                        </option>
                                                        <option>Normal</option>
                                                        <option>Emergency</option>
                                                       
                                                    </select>
                                                    
                                                    <FormFeedback>
                                                        {errors.sample_collected_by}
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={2}></Col>
                                            <Col md={5} className='float-right mr-1'>
                                                <FormGroup>
                                                    <Label for="occupation">Test* </Label>

                                                    <select
                                                        defaultValue={"option"}
                                                        id="test"
                                                        className="form-control"
                                                        name="test"
                                                        onChange={handleOtherFieldInputChange}
                                                    >
                                                        <option value="option" disabled>
                                                        Choose...
                                                        </option>
                                                        
                                                        <option>Option 3</option>
                                                    </select>
                                                    <FormFeedback>
                                                        {errors.sample_collected_by}
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            
                                            <Col md={5}>
                                                <FormGroup>
                                                    <Label for="occupation">Test Order By* </Label>

                                                        <select
                                                            defaultValue={"option"}
                                                            id="sampleOrderedBy"
                                                            className="form-control"
                                                            name="sampleOrderedBy"
                                                            onChange={handleOtherFieldInputChange}
                                                        >
                                                            <option value="option" disabled>
                                                            Choose...
                                                            </option>
                                                           
                                                            <option>Option 3</option>
                                                        </select>
                                                    <FormFeedback>
                                                        {errors.sample_collected_by}
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={2}>

                                                <LabelSui as='a' color='black' onClick={addOrder}   size='small' style={{ marginTop:35}}>
                                                    <Icon name='plus' /> Add Order
                                                </LabelSui>
                                            </Col>
                                            <hr/>
                                            <br />
                                            <Col md={12}>
                                                  <div className={classes.demo}>
                                                  {testOrders.length >0 
                                                    ?
                                                      <List>
                                                      <Table  striped responsive>
                                                            <thead >
                                                                <tr>
                                                                    <th>Test</th>
                                                                    <th>Test Group</th>
                                                                    <th >Order By</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {testOrders.map((testOrders, index) => (

                                                                <TestOrderList
                                                                    key={index}
                                                                    index={index}
                                                                    testOrders={testOrders}
                                                                    removeTestOrders={removeTestOrders}
                                                                />
                                                          ))}
                                                          </tbody>
                                                        </Table>
                                                      </List>
                                                     :
                                                     ""
                                                  }               
                                                  </div>
                                            </Col>
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
                                        
                                            <MatButton
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                disabled={testOrders.length >0 ===true ? false : "true"}
                                            >
                                                Save
                                            </MatButton>
                                     
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


function TestOrderList({
    testOrders,
    index,
    removeTestOrders,
  }) {
    function displayDetail (detailObj){

        return(
            <>
                  <List>
                    {detailObj.name!==null && detailObj.name!=="" ? (
                    <List.Item>
                    <List.Icon name='user' />
                    <List.Content>{detailObj.name}</List.Content>
                    </List.Item>
                    ) :
                    ""
                    }
                    {detailObj.address!==null && detailObj.address!=="" ? (
                    <List.Item>
                    <List.Icon name='marker' />
                    <List.Content> {detailObj.address}</List.Content>
                    </List.Item>
                    ) :
                    ""
                    }
                    {detailObj.email!==null && detailObj.email!==""? (
                    <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>
                        {detailObj.email}
                    </List.Content>
                    </List.Item>
                    ) :
                    ""
                    }
                    {detailObj.phone!==null && detailObj.phone!==""? (
                    <List.Item>
                    <List.Icon name='phone' />
                    <List.Content>
                        {detailObj.phone}
                    </List.Content>
                    </List.Item>
                    ) :
                    ""
                    }
                </List>  
            </>
        )
    }
    return (
            <tr>
                <th>{testOrders.test}</th>
                <th>{testOrders.testGroup}</th>
                <th></th>
                <th >
                    <IconButton aria-label="delete" size="small" color="error" onClick={() =>removeTestOrders(index)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    
                </th>
            </tr> 
    );
  }

export default ModalSample;
