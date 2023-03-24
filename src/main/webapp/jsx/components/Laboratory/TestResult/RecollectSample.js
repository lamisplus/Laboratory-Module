import React, { useState } from "react";
import {Modal,ModalHeader, ModalBody,Form,Alert,Col,Card,CardBody,} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import {
    createCollectedSample,
    fetchFormById,
} from "../../../actions/laboratory";
import * as CODES from "./../../../api/codes";
import FormRenderer from "components/FormManager/FormRenderer";

Moment.locale("en");
momentLocalizer();

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
    const datasample = props.datasample && props.datasample!==null ? props.datasample : {};
    const order_priority = datasample.data && datasample.data.order_priority && datasample.data.order_priority.display   ? datasample.data.order_priority.display : null;
    const lab_test_group = datasample.data ? datasample.data.lab_test_group : null ;
    const sample_ordered_by = datasample.data ? datasample.data.sample_ordered_by : null ;
    const description = datasample.data ? datasample.data.description : null ;
    const lab_number = props.labnumber && props.labnumber!==null  ? props.labnumber : null;
    const labId = datasample.id
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    //This is to get SAMPLE TYPE from application Codeset

    const currentForm = {
          code: CODES.LAB_SAMPLE_ORDER_FORM,
          programCode: CODES.GENERAL_SERVICE,
          formName: "Laboratory Sample Collection",
          options:{
              hideHeader: true
          },
      };


    const saveSample = (e) => {
        const newData = e.data 
        const newDateSampleCollected = moment(newData.date_sample_collected).format(
          "DD-MM-YYYY"
        );
        if(newData.date_sample_collected){
          newData['date_sample_collected'] = newDateSampleCollected
        }
        if(newData.date_sample_collected){
          newData['sample_type'] = newData.sample_type.toString()
        }
        if(newData.time_sample_collected){
          newData['time_sample_collected'] = moment(newData.time_sample_collected, "hh:mm").format('LT')
        }
        datasample.data.lab_test_order_status = 1;
        datasample.data["lab_number"] = lab_number;
        Object.assign(datasample.data, newData)

        /* end of the process */
            const onSuccess = () => {
                props.togglestatus();
            };
            const onError = () => {
                props.togglestatus();
            };
            datasample["lab_number"] = lab_number;
            props.createCollectedSample(datasample, labId, onSuccess, onError);
        
    };

    function checklanumber(lab_num) {       
        if (lab_num === "" || lab_num===null) {
            return (
                <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                    Please make sure you enter a lab number
                </Alert>
            );
        }
        else{
          return (
            <Card >
              <CardBody>
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
                  <FormRenderer
                    formCode={currentForm.code}
                    programCode={currentForm.programCode}
                    onSubmit={saveSample}
                  />
              </CardBody>
          </Card>
            
          )
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
                                
                            </ModalBody>
                        </Form>
                    </Modal>
                </CardBody>
            </Card>
        </div>
    );
};

export default connect(null, { createCollectedSample, fetchFormById })(
    ModalSample
);
