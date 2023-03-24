import React, {useEffect, useCallback, useState} from 'react';
import {token, url } from "../../../../api";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import ButtonMui from "@material-ui/core/Button";
import 'semantic-ui-css/semantic.min.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PatientCardDetail from './../../Patient/PatientCard';
import SampleList from './SampleList';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

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
    const [labObj, setLabObj] = useState({});
    const { classes } = props;

    const patientObj = history.location && history.location.state ? history.location.state : {}
    //console.log("pobj", patientObj.orderId)

    const loadData = useCallback(async () => {
        try {
            const response = await axios.get(`${url}laboratory/orders/${patientObj.orderId}`, { headers: {"Authorization" : `Bearer ${token}`} });
            console.log("verify test obj", response);
            setLabObj(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching lab", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);

     useEffect(() => {
         loadData();
     }, [loadData]);

  return (
    <div className={classes.root}>
      <Card >
        <CardContent>
        {
            Object.entries(labObj).length !== 0 ?
            <>
            <PatientCardDetail patientObj={labObj}/>
            <br/>
            <SampleList  patientObj={labObj} id={patientObj.orderId}/>
            </>
            : <CircularProgress />
        }
         </CardContent>
      </Card>
    </div>
  );
}



export default withStyles(styles)(PatientCard);
