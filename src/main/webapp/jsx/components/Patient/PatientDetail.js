import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import ButtonMui from "@material-ui/core/Button";
import 'semantic-ui-css/semantic.min.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PatientCardDetail from './PatientCard';
import SampleList from './../Laboratory/SampleCollection/SampleList';
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
    let history = useHistory();
    //const [key, setKey] = useState('home');
    const { classes } = props;

    const patientObj = history.location && history.location.state ? history.location.state : {}
    //console.log(patientObj)
  return (
    <div className={classes.root}>
      <Card >
        <CardContent>
               
            <br/><br/>
            <PatientCardDetail patientObj={patientObj}/>
            <br/>
            <SampleList  patientObj={patientObj}/> 
           
            
           
          
         </CardContent>
      </Card>
    </div>
  );
}



export default withStyles(styles)(PatientCard);
