import React, { useState, Fragment} from "react";
import { TiArrowBack } from "react-icons/ti";
import MatButton from '@material-ui/core/Button';
import { Table } from 'reactstrap'
import { makeStyles } from "@material-ui/core/styles";
import momentLocalizer from "react-widgets-moment";
import Moment from "moment";
import { Link } from "react-router-dom";
import DispenseModal from './DispenseDrug'
// import DispenseModal from './DrugDispenseFormIo';
// import DispenseModalUpdate from './DrugDispenseUpdateFormIo';
// import ViewModal from './ViewModalForm';
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { Spinner } from 'reactstrap';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";

import ButtonMui from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

//
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
}));

const Prescriptions = (props) => {

 const prescriptionOrder  = props  && props.patientObj  ? props.patientObj : {}
   
  const classes = useStyles();
  const [loading, setLoading] = useState('')
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal)
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => setModal1(!modal1)
  const [modal2, setModal2] = useState(false);
  const toggleModal2 = () => setModal2(!modal2)
  const [formData, setFormData] = useState(prescriptionOrder);
  const [drugDetails, setDrugDetails] = useState()
  console.log(formData)
const updateFormData = (data) =>{

    // setLoading(true);
    //   const index = formData.findIndex(x => x.drugOrders.id == drugOrders.id);

    //   formData[index] = data;
    //   setFormData(formData);
    // setLoading(false);
    }

  const toggle = (form) => {
    console.log(form)
    setDrugDetails({ ...drugDetails, ...form });
    setModal(!modal);
    
  } 
  const toggle1 = (form) => {
    console.log(form)
    setDrugDetails({ ...drugDetails, ...form });
    setModal1(!modal1)
  }

  const toggle2 = (form) => {
    console.log(form)
    setDrugDetails({ ...drugDetails, ...form });
    setModal2(!modal2)
  }
  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

   const closeBtn1 = (
     <button className="close" onClick={toggle1}>
       &times;
     </button>
   );


 const Actions = (form) => {
  console.log(form) 
   return (
     <Menu>
       <MenuButton
         style={{
           backgroundColor: "#3F51B5",
           color: "#fff",
           border: "2px solid #3F51B5",
           borderRadius: "4px",
         }}
       >
         Action<span aria-hidden>▾</span>
       </MenuButton>
       <MenuList style={{ hover: "#eee" }}>
         {form && form.status === 0 ? (

           <MenuItem onSelect={() => 
            toggle(form)
            }>
             <i
               className="fa fa-pencil"
               aria-hidden="true"
               size="15"
               style={{ cursor: "pointer", color: "#000" }}
             >
               &nbsp; {""} Dispense drugs {}
             </i>
           </MenuItem>

        
         ) : (
           <MenuItem onSelect={() => toggle(form)} >
             <i
               className="fa fa-pencil"
               aria-hidden="true"
               size="15"
               style={{ cursor: "pointer", color: "#000" }}
             >
               &nbsp; {""} Update details
             </i>
           </MenuItem>
         )}
         {form && form.status !=0  ? (
            <MenuItem onSelect={() => toggle1(form)}>
              <i
                className="fa fa-eye"
                aria-hidden="true"
                size="15"
                style={{ cursor: "pointer", color: "#000" }}
              >
                &nbsp; {""}View details
              </i>
            </MenuItem>
         )
         :
         ""
      }
       </MenuList>
     </Menu>
   );
 };
  return (
    <React.Fragment>
        <Card body>
        <Link to={"/"} >
            <ButtonMui
                variant="contained"
                color="primary"
                className=" float-end ms-2"
                //startIcon={<FaUserPlus size="10"/>}

            >
                <span style={{ textTransform: "capitalize" }}>Back</span>
            </ButtonMui>
            </Link>     
          <div>
            {formData.drugOrders.length >= 0 ? (
              <Fragment>
                   <h3>Drug Order Details</h3>
                    <br />
                    
                            <Table striped responsive >
                              <thead style={{backgroundColor: "#9F9FA5",color: "#000",}}>
                                <tr>
                                  <th>Name</th>
                                  <th>Dosage</th>
                                  <th>Duration</th>
                                  <th>Date Prescribed</th>
                                  <th>Date Dispensed</th>
                                  <th></th>
                                </tr>
                              </thead>
                              
                              
                                <tbody >
                                {!loading  ?  formData.drugOrders.map((form) => (
                                  
                                  form !==null?
                                  <tr key={form.id}>
                                    <td>{form.drugName}</td>
                                    <td>{form.dosageFrequency && form.dosageStrengthUnit ? form.dosageFrequency + ' ' + form.dosageStrengthUnit : '' }</td>
                                    <td>{form.duration && form.duration ? form.duration + ' ' + form.durationUnit : ''}</td>
                                    <td>{Moment(form.dateTimePrescribed).format("YYYY-MM-DD @ HH:mm:ss")}</td>
                                    <td>{ form.dateTimeDispensed ? Moment(form.dateTimeDispensed).format("YYYY-MM-DD @ HH:mm:ss") : '' }</td>
                                    <td>{Actions(form)}</td>
                                  </tr>
                                  :
                                   <tr></tr>
                                  ))
                                  :<p> <Spinner color="primary" /> Loading Please Wait</p>
                                } 
                                </tbody>
                               
                            </Table>
                            <br />
                       
              </Fragment>
            ) : (
              <div style={{height:'300px'}}>
                <p>
                  {" "}
                  {/* <Spinner color="primary" /> Loading Please Wait.. */}
                  No Prescription details. Please try again...
                </p>
              </div>
            )}
          </div>
        
     
      {modal || modal1 ? 
      (
        <>
        <DispenseModal  modalstatus={modal} togglestatus={toggleModal} datasample={drugDetails} updateFormData={updateFormData}/>
        {/*<ViewModal modalstatus={modal1} togglestatus={toggleModal1} datasample={drugDetails}/> */}
       </>
      ) 
      : ""
      } 
      </Card>
    </React.Fragment>
  );
}


  
export default Prescriptions;

