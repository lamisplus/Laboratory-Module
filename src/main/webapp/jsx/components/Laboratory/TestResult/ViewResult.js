import React, { useState, useCallback, useEffect }   from 'react';
import {
    Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Label, Card, CardBody, Alert
} from 'reactstrap';
import MatButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import { Badge } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import { toast } from 'react-toastify';
import {token, url} from '../../../../api'

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

const ModalViewResult = (props) => {

    const [collectResult, setCollectResult] = useState([])

    const classes = useStyles()
    const datasample = props.datasample ? props.datasample : {};
    //console.log("bnm",datasample)
    const sample_type = datasample.sampleTypeName;
    const lab_number = datasample.labNumber;
    const date_sample_verified = datasample.dateSampleVerified;
    const time_sample_verified = datasample.timeSampleVerified;
    const date_result_reported = datasample.id ? datasample.date_result_reported : null ;
    const test_result = datasample.id ? datasample.comment_sample_reported : null ;
    const result_detail = datasample.id && datasample.reported_result ?  datasample.reported_result : null
    const sample_id = datasample.sampleNumber ? datasample.sampleNumber : 0 ;

    const [sampleResults, setSampleResults] = useState({
         id: 1,
         uuid: "5fb73629-64c6-406f-8ce4-57b01b98dc7c",
         sampleID: "19",
         pcrLabSampleNumber: "BMSH/BMMC/22/0089",
         visitDate: "2022-09-09",
         dateSampleReceivedAtPcrLab: "2022-09-09",
         resultDate: "2022-09-09",
         testResult: "67854",
         assayDate: "2022-09-09",
         approvalDate: "2022-09-09",
         dateResultDispatched: "2022-09-09",
         sampleStatus: "Completed",
         sampleTestable: "true"
       })

    const getResults = useCallback(async () => {
        try {
            const response = await axios.get(`${url}laboratory/results/tests/${datasample.testId}`, { headers: {"Authorization" : `Bearer ${token}`}});

            setCollectResult(response.data);
        } catch (e) {
           // toast.error("An error occurred while fetching sample results", {
             //   position: toast.POSITION.TOP_RIGHT
            //});
        }
    }, []);

    useEffect(() => {
        getResults();
    }, [getResults]);

  return (      
      <div>
              <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
                  <ModalHeader toggle={props.togglestatus}>Lab Test Result Details</ModalHeader>
                      <ModalBody>
                          <Card>
                            <CardBody>
                                <Row style={{ marginTop: '20px'}}>
                                    <Col xs="12">
                                    <Alert color="success" style={{color:"#000" , fontWeight: 'bolder', }}>
                                     <p style={{marginTop: '.7rem' }}>
                                        Lab number: &nbsp;&nbsp; <span style={{ fontWeight: 'bolder'}}>{ lab_number}</span>
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                         Sample ID: &nbsp;&nbsp; <span style={{ fontWeight: 'bolder'}}>{" "}{ sample_id}</span>
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                         Sample type: &nbsp;&nbsp;
                                         <span style={{ fontWeight: 'bolder'}}>{" "}{ sample_type}</span>
                                          <br/>
                                         Date sample verified : &nbsp;&nbsp;
                                         <span style={{ fontWeight: 'bolder'}}>{" "}{ date_sample_verified }</span>
                                     </p>

                                   </Alert>
                                    </Col>
                                    <Col xs="12">
                                        <h4>Sample Result: </h4>
                                        <hr/>
                                        {datasample.labTestName === "Viral Load" && collectResult.dateAssayed !== null?
                                        <>
                                              <Row >
                                                  <Col xs="4">
                                                  <span style={{ fontWeight: 'bold'}}>Date Assayed </span>: {collectResult.dateAssayed}
                                                  <br/>
                                                  </Col>
                                                  <br/>
                                                  <Col xs="4">
                                                      <span style={{ fontWeight: 'bold'}}>Date Reported </span>: {collectResult.dateResultReported}
                                                      <br/>
                                                  </Col>

                                                  <Col xs="4">
                                                      {/*<span style={{ fontWeight: 'bold'}}> Result </span>:*/}
                                                      <Badge  color="info"> {ReactHtmlParser("Result Available")}</Badge>
                                                  </Col>

                                                   <Col xs="4">
                                                      <br />
                                                        <span style={{ fontWeight: 'bold'}}> Results </span>: {collectResult.resultReport}
                                                    </Col>
                                                    <Col xs="4">
                                                    <br />
                                                         <span style={{ fontWeight: 'bold'}}> Unit Measurement </span>: {}
                                                    </Col>

                                                  <Col xs="12">
                                                  <br />
                                                      <span style={{ fontWeight: 'bold'}}> Notes </span>: {ReactHtmlParser(collectResult.resultReported)}
                                                      <Divider  />
                                                  </Col>
                                              </Row>

                                            <hr />
                                            </>
                                            :  !collectResult ? "No Result Available" :
                                             collectResult.dateAssayed !== null ?
                                              <Row >
                                                  <Col xs="4">
                                                  <span style={{ fontWeight: 'bold'}}>Date Assayed </span>: {collectResult.dateAssayed }
                                                  <br/>
                                                  </Col>
                                                  <br/>
                                                  <Col xs="4">
                                                      <span style={{ fontWeight: 'bold'}}>Date Reported </span>: {collectResult.dateResultReported }
                                                      <br/>
                                                  </Col>

                                                  <Col xs="4">
                                                      {/*<span style={{ fontWeight: 'bold'}}> Result </span>:*/}
                                                      <Badge  color="info"> {ReactHtmlParser("Result Available")}</Badge>
                                                  </Col>

                                                  <Col xs="4">
                                                    <br />
                                                      <span style={{ fontWeight: 'bold'}}> Results </span>: {collectResult.resultReport}
                                                  </Col>
                                                  <Col xs="4">
                                                  <br />
                                                       <span style={{ fontWeight: 'bold'}}> Unit Measurement </span>: {}
                                                  </Col>

                                                  <Col xs="12">
                                                  <br />
                                                      <span style={{ fontWeight: 'bold'}}> Notes </span>: {ReactHtmlParser(collectResult.resultReported)}
                                                      <Divider  />
                                                  </Col>
                                              </Row>
                                              : "No Result Available"
                                        }
                                    </Col>
                    
                                </Row>
                            <br/>
                          
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
      </Modal>
    </div>
  );
}

export default ModalViewResult;
