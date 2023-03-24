import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { Button } from 'semantic-ui-react';
import { Grid, Step, Label, Segment, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { Col, Row } from "reactstrap";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import MatButton from "@material-ui/core/Button";
import { TiArrowBack } from 'react-icons/ti'

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '20.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing(1)}px ${theme.spacing(1) * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

function PatientCard(props) {

    const { classes } = props;

    const patientObj = props.patientObj ? props.patientObj : {}

    const calculate_age = dob => {
    var today = new Date();
    var dateParts = dob.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    var birthDate = new Date(dateObject); // create a date object directlyfrom`dob1`argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age_now--;
            }
        if (age_now === 0) {
                return m + " month(s)";
            }
            return age_now + " year(s)";
    };
   
    const CurrentStatus = (currentStatus)=>{
        if(currentStatus==="4"){
            return (<Label color="blue" size="mini">Current Status: <b>Admitted</b></Label>);
        }else if(currentStatus==="5"){
            return (<Label color="olive" size="mini">Current Status: <b>ICU</b></Label>);
        }else if(currentStatus==="6"){
            return (<Label color="teal" size="mini">Current Status: <b>Discharge</b></Label>);
        }else if(currentStatus==="7"){
            return (<Label color="red" size="mini">Current Status: <b>Dead</b></Label>);
        }else {
            return   (<Label color="green" size="mini">Current Status: <b>Active</b></Label>);
        }

    }

    const VaccinationStatus = (patient)=>{
        //console.log(patient)
        if(patient.vaccination_status===null){
            return (<><Label color="yellow" size="mini">Vaccination Status: Not Vaccinated</Label></> )
        }else if(patient.vaccination_status==="1"){
            return (<><Label color="teal" size="mini">Vaccination Status: Partially Vaccinated</Label></> )
        }else if(patient.vaccination_status==="2"){
            return (<><Label color="green" size="mini">Vaccination Status: Fully Vaccinated</Label></> )
        }else {
            return ""
        }
    }

  
  return (
    <div className={classes.root}>
       <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                
                <Row>
                    
                    <Col md={12}>
                    <Row className={"mt-1"}>
                    <Col md={12} className={classes.root2}>
                        <b style={{fontSize: "25px", color:'rgb(153, 46, 98)'}}>
                        {patientObj.patientFirstName + " " + patientObj.patientLastName }
                         < span style={{color:'green'}}>
                             {": "+"Active"}
                        </span>
                        </b>
                    </Col>
                    <Col md={4} className={classes.root2} style={{marginTop:"10px"}}>
                    <span  style={{color:'#000'}}>
                        {" "}
                        Hospital Number : <b style={{color:'#0B72AA'}}>{patientObj.patientHospitalNumber }</b>
                    </span>
                    </Col>

                    <Col md={4} className={classes.root2} style={{marginTop:"10px"}}>
                    <span style={{color:'#000'}}>
                        Date Of Birth : <b style={{color:'#0B72AA'}}>{patientObj.patientDob }</b>
                    </span>
                    </Col>
                    <Col md={4} className={classes.root2} style={{marginTop:"10px"}}>
                    <span style={{color:'#000'}}>
                        {" "}
                        Age : <b style={{color:'#0B72AA'}}>{calculate_age(moment(patientObj.patientDob).format("DD-MM-YYYY"))}</b>
                    </span>
                    </Col>
                    <Col md={4} style={{marginTop:"10px"}}>
                    <span style={{color:'#000'}}>
                        {" "}
                        Sex :{" "}
                        <b style={{color:'#0B72AA',fontFamily:`'poppins', sans-serif`,fontWeight:'bolder'}}>{patientObj.patientSex }</b>
                    </span>
                    </Col>
                    <Col md={4} className={classes.root2} style={{marginTop:"10px"}}>
                    <span style={{color:'#000'}}>
                        {" "}
                        E-mail : <b style={{color:'#0B72AA'}}>{patientObj.patientPhoneNumber }</b>
                    </span>
                    </Col>
                    <Col md={4} className={classes.root2} style={{marginTop:"10px"}}>
                    <span style={{color:'#000'}}>
                        {" "}
                        Address: <b style={{color:'#0B72AA'}}> </b>
                    </span>
                    </Col>

                    {/*<Col md={12}>
                    {VaccinationStatus(patientObj)}
                    {CurrentStatus(patientObj.current_status)}
                    
                    </Col>*/}
                    </Row>
                    </Col>

                </Row>
                </ExpansionPanelSummary>

                <ExpansionPanelActions expandIcon={<ExpandMoreIcon />}>
                  <div className="float-end" style={{floated:'right'}}>
                    <Link to={"/"} >
                        <Button
                            floated='right'
                            style={{padding:'0px'}}
                        >
                            <MatButton
                                variant="contained"
                                floated='right'
                                startIcon={<TiArrowBack  />}
                                style={{backgroundColor:"rgb(153, 46, 98)", color:'#fff', height:'35px'}}
                            >
                                <span style={{ textTransform: "capitalize" }}>Back</span>
                            </MatButton>
                        </Button>

                    </Link>
                    </div>
                </ExpansionPanelActions>
            </ExpansionPanel>
        
    </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
