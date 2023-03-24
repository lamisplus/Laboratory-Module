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
import moment from "moment";
import { Spinner } from 'reactstrap';

import { url as baseUrl, token } from "../../../api";
import axios from "axios";
import { array } from 'yup';
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
     //Update the Regimen Object List 
    const { buttonLabel, className } = props;
    const [errors, setErrors] = useState({});
    const toggle = props.togglestatus
    const modal = props.modalstatus
    const [loading, setLoading] = useState(false)
    const closeBtn = props.close
    const [saving, setSaving] = useState(false);
    const classes = useStyles();
    const [regimens, setRegimens] = useState([])
    const [regimenDrugs, setRegimenDrug] = useState([])
    const [dosageUnit, setDosageUnit] = useState([])
    const [otherDetails, setOtherDetails] = useState()
    const [objValues, setObjValues] = useState({brand: "",
                                                    comments: "string",
                                                    dateTimeDispensed: "yyyy-MM-dd@HH:mm:ss",
                                                    dateTimePrescribed: "yyyy-MM-dd@HH:mm:ss",
                                                    dosageFrequency: 0,
                                                    dosageStrengthUnit: "",
                                                    drugName: "",
                                                    duration: "",
                                                    durationUnit: "",
                                                    encounterDateTime: "yyyy-MM-dd@HH:mm:ss",
                                                    orderedBy: "",
                                                    otherDetails: {},
                                                    patientId: 0,
                                                    startDate: "yyyy-MM-dd",
                                                    status: 0,
                                                    type: ""
                                                });

    const handleInputChange = (e) => {
        setObjValues ({ ...objValues, [e.target.name]: e.target.value });
    }
    const handleInputChangeOtherDetails = (e) => {
        setOtherDetails ({ ...otherDetails, [e.target.name]: e.target.value });

    }
    useEffect(() => {
        RegimenList();
        DosageUnit();
      }, []);
   //Get list of Regimens
   const RegimenList =()=>{
    axios
       .get(`${baseUrl}regimens`,
           { headers: {"Authorization" : `Bearer ${token}`} }
       )
       .then((response) => {
           setRegimens(response.data);
       })
       .catch((error) => {
       });
   
    }
    //Get list of selected Regimen
    const handleSelectedRegimen = (e)=> {
        const id = e.target.value
        async function getRegimenLine() {
            const response = await axios.get(`${baseUrl}drugs/regimen/`+id,
            { headers: {"Authorization" : `Bearer ${token}`} }
            ).then((response) => {
                let updatedObj=[]
                response.data.map((x) => (
                    x["dosageStrength"]="",
                    x["dosageStrengthUnit"]="",
                    updatedObj.push(x)
                ));
                setRegimenDrug(updatedObj)
            })
            .catch((error) => {
            });
           
      }
      getRegimenLine();
  
    }   
    // regimenDrugs.length  > 0 && regimenDrugs.map((x) => (
    //     x["dosageStrength"]="",
    //     x["dosageStrengthUnit"]="",
    //     updatedObj.push(x)
    // ))

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


        toggle()
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
                                
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                        <Label for="artDate">Encounter Date * </Label>
                                        <Input
                                            type="datetime-local"
                                            name="visitDate"
                                            id="visitDate"
                                            onChange={handleInputChange}
                                            value={objValues.visitDate}
                                            required
                                        />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4"></div>
                              
                                    <div className="form-group mb-3 col-md-4"></div>
                                    <div className="form-group mb-3 col-md-12">
                                        <FormGroup>
                                        <Label >Select Regimen *</Label>
                                        <Input
                                            type="select"
                                            name="drugName"
                                            id="drugName"
                                            value={objValues.drugName}
                                            onChange={handleSelectedRegimen}
                                            
                                            >
                                            <option value=""> </option>
                      
                                                {regimens.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.name}
                                                    </option>
                                                ))}
                                        </Input>
                                       
                                        </FormGroup>
                                    </div>
                                    {regimenDrugs.length >0 ? 
                                        (
                                            <>
                                                <Card>
                                                <CardBody>
                                                <h4>Enter Drugs Information </h4>
                                                <div className="row">
                                                {regimenDrugs.map((drugsInfo) => (
                                                    <>
                                                <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                <Label >Drug </Label>
                                                <Input
                                                        type="text"
                                                        name={drugsInfo.name}
                                                        id={drugsInfo.name}
                                                        value={drugsInfo.name}
                                                        onChange={handleInputChangeOtherDetails}
                                                        required
                                                        ></Input>
                                                </FormGroup>
                                                </div>
                                                
                                                <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                <Label >	Dosage Strength - {drugsInfo.abbrev}</Label>
                                                <Input
                                                        type="number"
                                                        name={drugsInfo.code}
                                                        id={drugsInfo.code}
                                                        value=""
                                                        onChange={handleInputChangeOtherDetails}
                                                        required
                                                        >
                                                        
                                                    </Input>
                                                
                                                </FormGroup>
                                                </div>
                                            
                                                <div className="form-group mb-3 col-md-4">
                                                    <FormGroup>
                                                    <Label >Dosage Unit *</Label>
                                                    <Input
                                                        type="select"
                                                        name={drugsInfo.code}
                                                        id={drugsInfo.code}
                                                        onChange={handleInputChangeOtherDetails}
                                                        value=""
                                                        required
                                                    >
                                                        <option value=""> </option>
                                
                                                            {dosageUnit.map((value) => (
                                                                <option key={value.id} value={value.id}>
                                                                    {value.display}
                                                                </option>
                                                            ))}
                                                    </Input>
                                                    
                                                    </FormGroup>
                                                </div>
                                                </>
                                                ))
                                                }
                                                </div>
                                                </CardBody>
                                                </Card>
                                                <br/>
                                            </>
                                        )
                                        :
                                        ""
                                    }
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Dose Frequency</Label>
                                        <Input
                                            type="number"
                                            name="dosageFrequency"
                                            id="dosageFrequency"
                                            value={objValues.dosageFrequency}
                                            onChange={handleInputChange}
                                            required
                                            >
                                            
                                        </Input>
                                        {errors.dosageFrequency !=="" ? (
                                            <span className={classes.error}>{errors.dosageFrequency}</span>
                                        ) : "" }
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
                                                value={objValues.durationUnit} 
                                            />
                                           
                                            
                                        </InputGroup>
                                        {objValues.bodyWeight > 200 ? (
                                                <span className={classes.error}>{"Body Weight cannot be greater than 200."}</span>
                                            ) : "" }
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
