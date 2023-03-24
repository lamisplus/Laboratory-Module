import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody,Form,FormFeedback,Row,Col,
FormGroup,Label,Input,Card,CardBody} from 'reactstrap';
import { connect } from 'react-redux';
import axios from "axios";
import "react-widgets/styles.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";
import {token, url} from '../../../../api'
// import { useSelector, useDispatch } from 'react-redux';
// import { createCollectedSample, fetchFormById } from '../../../actions/laboratory'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';
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

const ModalSampleResult = (props) => {
    const history = useHistory();
    const classes = useStyles()
    const datasample = props.datasample ? props.datasample : {};

    const patientId = props.patientId
    const sample_type = datasample.sampleTypeName;
    const [users, setUsers] = useState([])

    const lab_number = datasample.labNumber;
    const date_sample_collected = datasample.dateSampleCollected;
    const time_sample_collected = datasample.timeSampleCollected;
    const lab_test_id = datasample.id;

    const unit_measurement = datasample.id ? datasample.unitMeasurement : null ;
    const labId = datasample.id

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const [loading, setLoading] = useState(false)
    const [samples, setSamples] = useState({}) 
    const [otherfields, setOtherFields] = 
            useState({
            date_asseyed:new Date().toISOString().substr(0, 16),
            date_result_reported:new Date().toISOString().substr(0, 16),
            resultReported:"",
            test_result:"",
            result_reported_by: "",
            dateSampleReceivedAtPcrLab: "",
            pcrLabSampleNumber: ""
          }); 
    const [errors, setErrors] = useState({});
    const [inputFlip, setInputFlip] = useState(2)

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
      }, []);

      const handleOtherFieldInputChange = e => {
          setOtherFields ({ ...otherfields, [e.target.name]: e.target.value });
      }

    const validate = () => {
      let temp = { ...errors }
      ///temp.time_result_enetered = otherfields.time_result_enetered ? "" : "Date is required"
      temp.date_result_reported = otherfields.date_result_reported ? "" : "Date  is required."
      //temp.result_reported_by = otherfields.result_reported_by ? "" : "This filed is required."
      temp.date_asseyed = otherfields.date_asseyed ? "" : "This filed is required." 
      //temp.resultReported = otherfields.resultReported ? "" : "This filed is required."
      setErrors({
          ...temp
      })
      return Object.values(temp).every(x => x == "")
  }

    const saveSample = async (e) => {
        e.preventDefault()
        if(validate()){
              setLoading(true);

              let resultSamples = {
                dateAssayed: otherfields.date_asseyed.replace('T', ' ')+":00",
                dateResultReported: otherfields.date_result_reported.replace('T', ' ')+":00",
                dateSampleReceivedAtPcrLab: otherfields.dateSampleReceivedAtPcrLab.length !== 0 ? otherfields.dateSampleReceivedAtPcrLab.replace('T', ' ')+":00" : "",
                facilityId: 0,
                id: 0,
                patientId: patientId,
                patientUuid: "",
                pcrLabSampleNumber: otherfields.pcrLabSampleNumber,
                resultReported: otherfields.resultReported,
                resultReportedBy: otherfields.result_reported_by,
                testId: datasample.testId,
                resultReport: otherfields.test_result
              }

              console.log("samples result", resultSamples);

              await axios.post(`${url}laboratory/results`, resultSamples,
              { headers: {"Authorization" : `Bearer ${token}`}}).then(resp => {
                  console.log("sample result saving...", resp);
                  setLoading(!true);
                   toast.success("Sample result added successfully!!", {
                      position: toast.POSITION.TOP_RIGHT
                  });

                  props.togglestatus()
                  //props.handDataReload()
              });
              props.togglestatus()
      }
    }
    const textstyle = {
        fontSize: '14px',
        fontWeight: 'bolder'
      };

   function checklanumber(lab_num) {
          if (lab_num === "" || lab_num===null) {
              return (
                  <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                      Please make sure you enter the sample lab number
                  </Alert>
              );
          }
      }
      
  return (
      <div >
          <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
              <Form onSubmit={saveSample}>
                  <ModalHeader toggle={props.togglestatus}>Result Reporting</ModalHeader>
                      <ModalBody>
                            {/*{checklanumber(lab_number)}*/}
                          <Card>
                              <CardBody>
                                  <Row style={{ marginTop: '20px'}}>
                                      <Col md="12" >
                                          <Alert color="primary" style={{color:"#000" , fontWeight: 'bolder', }}>
                                          <p style={{marginTop: '.7rem' }}>Lab number: &nbsp;<span style={{ fontWeight: 'bolder'}}>{lab_number}</span>
                                              &nbsp;&nbsp;&nbsp;&nbsp;Sample type:&nbsp;
                                              <span style={{ fontWeight: 'bolder'}}>{" "}{sample_type}</span>
                                                      &nbsp;&nbsp;&nbsp;&nbsp; Date sample collected :
                                              <span style={{ fontWeight: 'bolder'}}>{" "} &nbsp;{date_sample_collected}</span>
                                          </p>

                                        </Alert>
                                            <br />
                                      </Col>

                                      <Col xs="6">
                                          <FormGroup>
                                             <Label for='date_asseyed' className={classes.label}>Date Assayed</Label>
                                             <Input
                                              type="datetime-local"
                                              className={classes.input}
                                              max={new Date().toISOString().substr(0, 16)}
                                              min={datasample.dateSampleVerified}
                                              name="date_asseyed"
                                              id="date_asseyed"
                                              value={otherfields.date_asseyed}
                                              onChange={handleOtherFieldInputChange} />

                                               {errors.date_asseyed !="" ? (
                                                 <span className={classes.error}>{errors.date_asseyed}</span>
                                               ) : "" }
                                           </FormGroup>
                                      </Col>
                                      <Col xs="6">
                                           <FormGroup>
                                             <Label for='date_result_reported' className={classes.label}>Date Result Reported</Label>
                                             <Input
                                              type="datetime-local"
                                              className={classes.input}
                                              max={new Date().toISOString().substr(0, 16)}
                                              min={datasample.dateSampleVerified}
                                              name="date_result_reported"
                                              id="date_result_reported"
                                              value={otherfields.date_result_reported}
                                              onChange={handleOtherFieldInputChange} />

                                               {errors.date_result_reported !="" ? (
                                                 <span className={classes.error}>{errors.date_result_reported}</span>
                                               ) : "" }
                                           </FormGroup>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col md={6}>
                                              <FormGroup>
                                                  <Label for="result_reported_by" className={classes.label}>Reported by </Label>

                                                    <select
                                                        className={classes.input}
                                                        className="form-control"
                                                        name="result_reported_by"
                                                        id="result_reported_by"
                                                        style={{border: "1px solid #014d88",
                                                        borderRadius:'0px',
                                                        fontSize:'14px',
                                                        color:'#000'}}
                                                        vaule={otherfields.result_reported_by}
                                                        onChange={handleOtherFieldInputChange}
                                                        {...(errors.result_reported_by && { invalid: true})}
                                                      >
                                                        <option value={""}> Sample result reported by</option>
                                                         {users && users.map((user, i) =>
                                                         (
                                                             <option key={i} value={user.id}>{user.firstName}</option>
                                                         ))}
                                                    </select>
                                                      {errors.result_reported_by !="" ? (
                                                        <span className={classes.error}>{errors.result_reported_by}</span>
                                                      ) : "" }
                                              </FormGroup>
                                      </Col>
                                      {inputFlip === 0 ?
                                        <Col md={6}>
                                            <FormGroup>
                                              <Label for='test_result' className={classes.label}>Result</Label>

                                               <Input
                                                   className={classes.input}
                                                  type="number"
                                                  name="test_result"
                                                  id="test_result"
                                                  onChange={handleOtherFieldInputChange}
                                                  value={otherfields.test_result}
                                              />

                                               {errors.test_result !="" ? (
                                                    <span className={classes.error}>{errors.test_result}</span>
                                                    ) : "" }
                                            </FormGroup>
                                        </Col>
                                        : inputFlip === 1 ?
                                          <Col md={6}>
                                             <FormGroup>
                                               <Label for="test_result" className={classes.label}>Result </Label>

                                                 <select
                                                     className={classes.input}
                                                     className="form-control"
                                                     name="test_result"
                                                     id="test_result"
                                                     style={{border: "1px solid #014d88",
                                                     borderRadius:'0px',
                                                     fontSize:'14px',
                                                     color:'#000'}}
                                                     vaule={otherfields.test_result}
                                                     onChange={handleOtherFieldInputChange}
                                                     {...(errors.test_result && { invalid: true})}
                                                   >
                                                     <option value={""}> Select sample result</option>
                                                     <option value="1"> Positive</option>
                                                     <option value="0"> Negative</option>
                                                 </select>
                                                   {errors.result_reported_by !="" ? (
                                                     <span className={classes.error}>{errors.result_reported_by}</span>
                                                   ) : "" }
                                           </FormGroup>
                                         </Col> : inputFlip === 2 ?
                                          <Col md={6}>
                                              <FormGroup>
                                                <Label for='test_result' className={classes.label}>Result</Label>

                                                 <Input
                                                     className={classes.input}
                                                    type="text"
                                                    name="test_result"
                                                    id="test_result"
                                                    onChange={handleOtherFieldInputChange}
                                                    value={otherfields.test_result}
                                                />

                                                 {errors.test_result !="" ? (
                                                      <span className={classes.error}>{errors.test_result}</span>
                                                      ) : "" }
                                              </FormGroup>
                                          </Col> : " "}
                                  </Row>
                                  { /*
                                  <Row>
                                       <Col xs="6">
                                           <FormGroup>
                                             <Label for='dateSampleReceivedAtPcrLab' className={classes.label}>Date Sample PCR Lab</Label>
                                             <Input
                                              type="datetime-local"
                                              className={classes.input}
                                              //max={new Date().toISOString().substr(0, 16)}
                                              min={new Date(datasample.dateSampleVerified).toISOString().substr(0, 16)}
                                              name="dateSampleReceivedAtPcrLab"
                                              id="dateSampleReceivedAtPcrLab"
                                              value={otherfields.dateSampleReceivedAtPcrLab}
                                              onChange={handleOtherFieldInputChange} />
                                           </FormGroup>
                                      </Col>
                                      <Col md={6}>
                                        <FormGroup>
                                          <Label for='pcrLabSampleNumber' className={classes.label}>PCR Lab Sample Number</Label>

                                           <Input
                                               className={classes.input}
                                              type="text"
                                              name="pcrLabSampleNumber"
                                              id="pcrLabSampleNumber"
                                              onChange={handleOtherFieldInputChange}
                                              value={otherfields.pcrLabSampleNumber}
                                          />
                                        </FormGroup>
                                    </Col>
                                  </Row>*/}
                                  <Row>             
                                     <Col md={12}>
                                       <FormGroup>
                                         <Label for='resultReported' className={classes.label}>Result Report</Label>
                                         <Input
                                            className={classes.input}
                                           type='textarea'
                                           name='resultReported'
                                           id='resultReported'
                                           style={{ minHeight: 100, fontSize: 14 }}
                                           onChange={handleOtherFieldInputChange}
                                           >
                                           </Input>
                                       </FormGroup>
                                     </Col>

                                </Row>
                                    <br/>
                                    {loading ? <Spinner /> : ""}
                                    <br/>
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
      </div>
  );
}

export default ModalSampleResult;
