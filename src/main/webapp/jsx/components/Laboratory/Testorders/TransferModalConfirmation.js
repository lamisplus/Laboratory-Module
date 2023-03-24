import React, {useState}  from "react";
import {Modal,ModalHeader, ModalBody,Form,Col,Card,CardBody,} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import MatButton from "@material-ui/core/Button";
import ModalSampleTransfer from './TransferSampleFormIo';

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
  console.log(props)
    const classes = useStyles()
    const [modal2, setModal2] = useState(false)//modal to transfer sample
    const toggleModal2 = () => setModal2(!modal2)
    
    const transferSample = (row) => {
      props.togglestatusConfirmation();
      props.actionButton()

  }

    return (
        <div >
            <Card >
                <CardBody>
                    <Modal isOpen={props.modalstatus} toggle={props.togglestatusConfirmation} className={props.className} size="lg">
                        <Form >
                            <ModalHeader toggle={props.togglestatusConfirmation}>Transfer Sample Confirmation</ModalHeader>
                            <ModalBody>
                            <Card >
                                <CardBody>
                                    <Col md={12} >
                                       <h4>Are you sure you want to transfer sample to other Laboratory outside yours?</h4>
                                    </Col>
                                    
                                </CardBody>
                            </Card>
                              <br/>
                              <MatButton
                                    onClick={transferSample}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                >
                                    Yes
                                </MatButton>
                                       
                                <MatButton
                                    variant="contained"
                                    color="default"
                                    onClick={props.togglestatusConfirmation}
                                    className={classes.button}
                                    startIcon={<CancelIcon />}
                                >
                                    No
                                </MatButton>  
                            </ModalBody>
                        </Form>
                    </Modal>
                </CardBody>
            </Card>
            {/* labnumber={labNumber!=="" ? labNumber : labNum} */}
            <ModalSampleTransfer modalstatus={modal2} togglestatus={toggleModal2} datasample={props.datasample} />

        </div>
        
    );
};

export default ModalSample;
