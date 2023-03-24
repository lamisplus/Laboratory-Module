import React, {useState, useEffect} from 'react';
import {  Modal, ModalHeader, ModalBody, FormFeedback,Form,Row,Col,FormGroup,Label,Input,Card,CardBody} from 'reactstrap';
import { connect } from 'react-redux';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";

//import { sampleVerification, fetchFormById } from '../../../actions/laboratory';
import { Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';

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
        border:'2px solid #014d88',
        borderRadius:'0px',
        fontSize:'16px',
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
        fontSize:'16px',
        color:'rgb(153, 46, 98)',
        fontWeight:'600'
    }
}))

Moment.locale('en');
momentLocalizer();


const ModalVerifySample = (props) => {
  const classes = useStyles()
  const dataSample = props.datasample ? props.datasample : {};
  //console.log("xc", dataSample)
  const lab_test_group = dataSample.id ? dataSample.labTestGroupName : null ;
  const description = dataSample.id ? dataSample.labTestName : null ;
  const date_sample_collected = dataSample.data ? dataSample.data.date_sample_collected : null ;
  const labId = dataSample.id
  const [loading, setLoading] = useState(false)
  const [samples, setSamples] = useState({}) 
  const [otherFields, setotherFields] = 
    useState({  date_sample_verified:"",
                sample_verified_by:"",
                sample_priority:"",
                time_sample_verified:"",
                comment:"",
                verification_status:"",
                comment_sample_verified:""

            });

  const [errors, setErrors] = useState({});

    const handleOtherFieldInputChange = e => {
      setotherFields ({ ...otherFields, [e.target.name]: e.target.value });
    }

    const validate = () => {
      let temp = { ...errors }
      temp.date_sample_verified = otherFields.date_sample_verified ? "" : "Date is required"
      temp.time_sample_transfered = otherFields.time_sample_transfered ? "" : "Time  is required."
      temp.sample_verified_by = otherFields.sample_verified_by ? "" : "This filed is required." 
      temp.comment = otherFields.comment ? "" : "Comment is required." 
      temp.verification_status = otherFields.verification_status ? "" : "This filed is required."
      setErrors({
          ...temp
      })
      return Object.values(temp).every(x => x == "")
    }
    const saveSample = e => {
      e.preventDefault()
      if(validate()){
          setLoading(true);    
          const newDateSampleVerified = moment(otherFields.date_sample_transfered).format("DD-MM-YYYY");
          const newTimeSampleVerified = moment(otherFields.time_sample_Verified).format("LT");
          dataSample.data.lab_test_order_status = otherFields.verification_status;
          dataSample.data['date_sample_verified'] = newDateSampleVerified
          dataSample.data['time_sample_Verified'] = newTimeSampleVerified
          dataSample.data.comment = otherFields['comment']
          dataSample.data['sample_verified_by'] = otherFields.sample_verified_by
          dataSample.data['comment_sample_verified']= otherFields.comment

          const onSuccess = () => {
            setLoading(false);
            props.togglestatus()
          }
          const onError = () => {
            setLoading(false);
            props.togglestatus()
          }
          props.sampleVerification(dataSample, labId,onSuccess,onError)
        }
    }
  return (
      
      <div >
      <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={props.togglestatus}>Sample Verification </ModalHeader>
        <ModalBody>
        <Card >
        <CardBody>
        <Row >
        <Col md={12} >

        <Alert color="dark" style={{backgroundColor:'#9F9FA5', color:"#000" , fontWeight: 'bolder', }}>
          <p style={{marginTop: '.7rem' }}>Lab number: <span style={{ fontWeight: 'bolder'}}>{lab_test_group}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;Sample type:
              <span style={{ fontWeight: 'bolder'}}>{" "}{description}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp; Date sample collected :
              <span style={{ fontWeight: 'bolder'}}>{" "}{date_sample_collected}</span>
          </p>

        </Alert>
      </Col>
      <Col md={6}>
          <FormGroup>
            <Label for='maritalStatus' className={classes.label}>Date Verified</Label>
            <DateTimePicker
                time={false}
                name="date_sample_verified"
                id="date_sample_verified"
                onChange={value1 =>
                  setotherFields({ ...otherFields, date_sample_verified: value1 })
                }
            /> 
              {errors.time_sample_transfered !="" ? (
                <span className={classes.error}>{errors.time_sample_transfered}</span>
              ) : "" }
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup> 
            <Label for='' className={classes.label}>Time Verified</Label>
            
            <DateTimePicker
                date={false}
                name="time_sample_transfered"
                id="time_sample_transfered"
                onChange={value1 =>
                  setotherFields({ ...otherFields, time_sample_transfered: value1 })
                }
            />
                {errors.time_sample_transfered !="" ? (
                  <span className={classes.error}>{errors.time_sample_transfered}</span>
                  ) : "" }
          </FormGroup>
          </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleSelect" className={classes.label}>Confirm Sample</Label>
            <Input type="select" name="verification_status" id="verification_status" 
              value={otherFields.verification_status}
              {...(errors.verification_status && { invalid: true})}
            onChange={handleOtherFieldInputChange}>
              <option value=""></option>
              <option value="3">Sample Valid </option>
              <option value="4">Sample Rejected</option>
              
            </Input>
            <FormFeedback>{errors.verification_status}</FormFeedback>
          </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
                <Label for="occupation" className={classes.label}>Verify by </Label>

                    <Input
                      type="select"
                      name="sample_verified_by"
                      id="sample_verified_by"
                      vaule={otherFields.sample_verified_by}
                      onChange={handleOtherFieldInputChange}
                      {...(errors.sample_verified_by && { invalid: true})} 
                    >
                      <option value=""></option>
                        <option value="Dorcas"> Dorcas </option>
                        <option value="Jeph"> Jeph </option>
                        <option value="Debora"> Debora </option>
                  </Input>
                      <FormFeedback>{errors.sample_verified_by}</FormFeedback>
            </FormGroup>
        </Col>
          <Col md={7}>
          <FormGroup>
            <Label for='maritalStatus' className={classes.label}>Note</Label>
            <Input
              type='textarea'
              name='comment'
              id='comment'
              onChange={handleOtherFieldInputChange}
              value = {otherFields.comment}                                      
              {...(errors.comment && { invalid: true})}                                   
              >                         
              </Input>
              <FormFeedback>{errors.comment}</FormFeedback>                        
            
          </FormGroup>
        </Col>  
        
      
     </Row>
     <br/>
       {loading ? <Spinner /> : ""}
       <br/>
     <MatButton
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            Save
          </MatButton>
          <MatButton
            variant='contained'
            color='default'
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
    </div>
  );
}

//export default connect(null, { sampleVerification, fetchFormById })(ModalSample);
export default ModalVerifySample;
