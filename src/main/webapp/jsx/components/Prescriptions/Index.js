import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';

import 'semantic-ui-css/semantic.min.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PatientCardDetail from './../Patient/PatientCard';
import PatientPrescriptions from './PatientPrescriptions';
import { useHistory } from "react-router-dom";



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
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
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
    let history = useHistory();
    const [key, setKey] = useState('home');
    const { classes } = props;

    const patientObj = history.location && history.location.state ? history.location.state : {}
    console.log(patientObj)
  return (
    <div className={classes.root}>
        
        <Card >
        <CardContent>
        <PatientCardDetail patientObj={patientObj}/>
        <br/>
           
        <PatientPrescriptions  patientObj={patientObj}/> 
           
            
           
          
         </CardContent>
      </Card>
    </div>
  );
}



export default withStyles(styles)(PatientCard);
