import React, {useState, useEffect} from 'react';

import {CardBody,InputGroup, Form,Input,Label,Card,ModalHeader,CardHeader,Modal, ModalBody,FormGroup} from 'reactstrap'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
//import moment from "moment";
import { Spinner } from 'reactstrap';
import { toast} from "react-toastify";
import { url  as baseUrl, token} from "../../../api";
import axios from "axios";
//import { CardHeader } from 'material-ui';



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
    const [errors, setErrors] = useState({});
    const toggle = props.togglestatus
    const modal = props.modalstatus
    const [loading, setLoading] = useState(false)
    const closeBtn = props.close
    const [saving, setSaving] = useState(false);
    const classes = useStyles();
    const [drugs, setDrugs] = useState([])
    const [dosageUnit, setDosageUnit] = useState([])
    const [drugOrdersObj] = useState({drugOrders:[]})
    const [objValues, setObjValues] = useState({brand: "",
                                                comments: "",
                                                dateTimeDispensed: "",
                                                dateTimePrescribed: "",
                                                dosageFrequency:"",
                                                dosageStrengthUnit: "",
                                                drugName: "",
                                                duration: "",
                                                durationUnit: "",
                                                encounterDateTime: "",
                                                orderedBy: "",
                                                otherDetails: {},
                                                patientId: 190,
                                                startDate: "",
                                                status: 0,
                                                type: ""
                                                });

    const handleInputChange = (e) => {
        setObjValues ({ ...objValues, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        DrugList();
        DosageUnit();
      }, []);
   //Get list of Regimens
   const DrugList =()=>{
    axios
       .get(`${baseUrl}drugs`,
           { headers: {"Authorization" : `Bearer ${token}`} }
       )
       .then((response) => {
        setDrugs(response.data);
       })
       .catch((error) => {
       });
   
    }
    // Dosage Strength Unit
    const DosageUnit =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/DOSE_STRENGTH_UNIT`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               //console.log(response.data);
               setDosageUnit(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });
       
     }


    const handleDispense = (e) => {
        e.preventDefault()
        objValues.encounterDateTime=Moment(objValues.encounterDateTime).format("YYYY-MM-DD@HH:mm:ss")
        drugOrdersObj.drugOrders=[objValues]
        setSaving(true);
            axios.post(`${baseUrl}drug-orders`, drugOrdersObj,
            { headers: {"Authorization" : `Bearer ${token}`}},
            
            )
              .then(response => {
                  setSaving(false);
                  toast.success("Record save successful");                  
                  props.DrugOrderList()
                  props.togglestatus()

              })
              .catch(error => {
                  //console.log(error)
                  setSaving(false);
                  toast.error("Something went wrong");
              });

    };



    return (
        <div>
            <Card>
                <CardBody>
                    <Modal
                        isOpen={modal}
                        toggle={toggle}
                        className={className}
                        size="xl"
                    >
                        <ModalHeader toggle={toggle} close={closeBtn}>
                            DRUG PRESCRIPTION
                        </ModalHeader>
                        <ModalBody>
                        <form >
                                <div className="row">
                                
                                    <div className="form-group  col-md-4">
                                        <FormGroup>
                                        <Label for="artDate">Encounter Date * </Label>
                                        <Input
                                            type="datetime-local"
                                            name="encounterDateTime"
                                            id="encounterDateTime"
                                            onChange={handleInputChange}
                                            value={objValues.encounterDateTime}
                                            required
                                        />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group  col-md-4"></div>
                              
                                    <div className="form-group col-md-4"></div>
                                    <Card>
                                    <CardBody>
                                    <h4>Enter Drugs Information </h4>
                                    <div className="row">
                                    <div className="form-group  col-md-4">
                                    <FormGroup>
                                    <Label >Select Drug </Label>
                                    <Input
                                            type="select"
                                            name="drugName"
                                            id="drugName"
                                            value={objValues.drugName}
                                            onChange={handleInputChange}
                                            required
                                            >
                                            <option value=""> </option>
                      
                                            {drugs.map((value) => (
                                                <option key={value.name} value={value.name}>
                                                    {value.name}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    </div>
                                    
                                    <div className="form-group  col-md-4">
                                    <FormGroup>
                                    <Label >	Dosage Strength</Label>
                                    <Input
                                            type="number"
                                            name="dosageStrength"
                                            id="dosageStrength"
                                            value={objValues.dosageStrength}
                                            onChange={handleInputChange}
                                            required
                                            >
                                            
                                        </Input>
                                    {/* {errors.dosageStrength !=="" ? (
                                            <span className={classes.error}>{errors.dosageStrength}</span>
                                        ) : "" } */}
                                    </FormGroup>
                                    </div>
                                
                                    <div className="form-group  col-md-4">
                                        <FormGroup>
                                        <Label >Dosage Unit *</Label>
                                        <Input
                                            type="select"
                                            name="dosageStrengthUnit"
                                            id="dosageStrengthUnit"
                                            onChange={handleInputChange}
                                            value={objValues.dosageStrengthUnit}
                                            required
                                        >
                                             <option value=""> </option>
                      
                                                {dosageUnit.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>
                                           
                                            {errors.dosageStrengthUnit !=="" ? (
                                            <span className={classes.error}>{errors.dosageStrengthUnit}</span>
                                        ) : "" }
                                        </FormGroup>
                                    </div>
                                    </div>
                                    </CardBody>
                                    </Card>
                                    <br/>
                                    <div className="form-group mb-3 col-md-12">
                                        <FormGroup>
                                        <Label >Drug Brand Name</Label>
                                        <Input
                                            type="text"
                                            name="brand"
                                            id="brand"
                                            value={objValues.brand}
                                            onChange={handleInputChange}
                                            ></Input>
                                       
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Dose Frequency</Label>
                                        <Input
                                            type="text"
                                            name="dosageFrequency"
                                            id="dosageFrequency"
                                            value={objValues.dosageFrequency}
                                            onChange={handleInputChange}
                                            required
                                            >
                                            
                                        </Input>
                                        {/* {errors.dosageFrequency !=="" ? (
                                            <span className={classes.error}>{errors.dosageFrequency}</span>
                                        ) : "" } */}
                                        </FormGroup>
                                    </div>
                                    
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Start Date </Label>
                                        <Input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            value={objValues.startDate}
                                            onChange={handleInputChange}
                                            required
                                            >
                                             
                                        </Input>
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Duration </Label>
                                        <Input
                                            type="number"
                                            name="duration"
                                            id="duration"
                                            value={objValues.duration}
                                            onChange={handleInputChange}
                                            required
                                            >
                                          
                                        </Input>
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Duration Unit </Label>
                                        <InputGroup> 
                                            <Input 
                                                type="number"
                                                name="durationUnit"
                                                id="durationUnit"
                                                onChange={handleInputChange}
                                                value={objValues.bodyWeight} 
                                            />
                                           
                                            
                                        </InputGroup>
                                        
                                        </FormGroup>
                                    </div>

                                    <div className="form-group mb-3 col-md-12">
                                        <FormGroup>
                                        <Label >Clinical Notes</Label>
                                        <Input
                                            type="textarea"
                                            name="comments"
                                            rows="40" cols="50"
                                            id="comments"
                                            onChange={handleInputChange}
                                            value={objValues.comments}
                                            required
                                        />
                                        </FormGroup>
                                    </div>
                                </div>
                                
                                {saving ? <Spinner /> : ""}
                                <br />
                            
                                <MatButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={handleDispense}
                            >
                                {!saving ? (
                                <span style={{ textTransform: "capitalize" }}>Save</span>
                                ) : (
                                <span style={{ textTransform: "capitalize" }}>Saving...</span>
                                )}
                            </MatButton>
                          
                            <MatButton
                                variant="contained"
                                className={classes.button}
                                startIcon={<CancelIcon />}
                                //onClick={props.togglestatus()}
                                
                            >
                                <span style={{ textTransform: "capitalize" }}>Cancel</span>
                            </MatButton>
                          
                                </form>
                        </ModalBody>
                    </Modal>
                </CardBody>
            </Card>
        </div>
    );
}


export default DispenseModal;
