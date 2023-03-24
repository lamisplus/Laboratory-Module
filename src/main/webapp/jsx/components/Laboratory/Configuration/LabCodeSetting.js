import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Form,FormFeedback,Row,Alert,Col,Input,FormGroup,Label,Card,CardBody,Table} from "reactstrap";
import MatButton from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { toast} from "react-toastify";
import axios from "axios";
import { token, url } from "../../../../api";
import Button from '@mui/material/Button';


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

function LabCodeSetting(props) {
    const classes = useStyles()
    const [otherfields, setOtherFields] = useState({
        archived: 0,
        id: 0,
        labName:"",
        labNumber: "",
        uuid: ""
    });

    const [errors, setErrors] = useState({});
    const [labNumbers, setLabNumbers] = useState([]);

    const handleOtherFieldInputChange = (e) => {
        setOtherFields({ ...otherfields, [e.target.name]: e.target.value });
    };

   const loadLabNumber = useCallback(async () => {
        try {
            const response = await axios.get(`${url}laboratory/lab-numbers`, { headers: {"Authorization" : `Bearer ${token}`} });
            setLabNumbers(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching lab number", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);

    useEffect (() => {
        loadLabNumber()
      }, []);

    const validate = () => {
    let temp = { ...errors };

    temp.labName = otherfields.labName
        ? ""
        : "Lab Name is required";
    temp.labNumber = otherfields.labNumber
        ? ""
        : "Lab Number is required";
     setErrors({
                 ...temp,
             });
     return Object.values(temp).every((x) => x == "");

    }

    const saveSample = async (e) => {
        e.preventDefault();
         try {

            if (validate()) {
            console.log("submitted", otherfields)

            await axios.post(`${url}laboratory/lab-numbers`, otherfields,
              { headers: {"Authorization" : `Bearer ${token}`}}).then(resp => {
                  console.log("lab number saved.", resp);
                   toast.success("Lab number added successfully!!", {
                      position: toast.POSITION.TOP_RIGHT
                  });
              });
            }
            loadLabNumber()
            setOtherFields({
               archived: 0,
               id: 0,
               labName:"",
               labNumber: "",
               uuid: ""
           })
         } catch (e) {
            toast.error("An error occurred while saving lab settings", {
                 position: toast.POSITION.TOP_RIGHT
             });
         }
    };

    const deleteConfig = async (e, id) => {
        e.preventDefault();
      try {
          const response = await axios.delete(`${url}laboratory/lab-numbers/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });
          console.log(" delete lab number", response);
          loadLabNumber()
          toast.success("Lab number deleted successfully!!", {
              position: toast.POSITION.TOP_RIGHT
          });

      } catch (e) {
          toast.error("An error occurred while deleting a config", {
              position: toast.POSITION.TOP_RIGHT
          });
      }
   }

  return (
    <>
        <Form onSubmit={saveSample}>
             <Row >
                <Col md={6}>
                    <FormGroup>
                        <Label for='labName' className={classes.label}>Laboratory Name</Label>

                        <Input
                            className={classes.input}
                            type="text"
                            name="labName"
                            id="labName"
                            onChange={handleOtherFieldInputChange}
                            value={otherfields.labName}
                        />

                       {errors.labName !="" ? (
                            <span className={classes.error}>{errors.labName}</span>
                        ) : "" }
                    </FormGroup>
                </Col>
                  <Col md={6}>
                    <FormGroup>
                        <Label for='labNumber' className={classes.label}>Laboratory Number</Label>

                        <Input
                            className={classes.input}
                            type="text"
                            name="labNumber"
                            id="labNumber"
                            onChange={handleOtherFieldInputChange}
                            value={otherfields.labNumber}
                        />

                       {errors.labNumber !="" ? (
                            <span className={classes.error}>{errors.labNumber}</span>
                        ) : "" }
                    </FormGroup>
                </Col>
               <Col>
               <MatButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Save
                </MatButton>
               </Col>
             </Row>
             <hr />
             <Row>
                    <Table className="table-sm" bordered size="sm" responsive>
                        <thead style={{  backgroundColor:'#014d88', color:'#fff', textAlign: 'center' }}>
                            <tr>
                                <th>S/N</th>
                                <th>Lab Name</th>
                                <th>Lab Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                        { labNumbers && labNumbers.map((data, i) => (
                             <tr key={i}>
                                <td>{++i}</td>
                                <td>{data.labName}</td>
                                <td>{data.labNumber}</td>
                                <td>
                                <Button variant="contained" color="error"
                                      onClick={ e => deleteConfig( e, data.id)}> remove
                                 </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
             </Row>
        </Form>
    </>
  );
}

export default LabCodeSetting;