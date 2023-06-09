import React, {useEffect, useCallback, useState} from 'react';
import {Card, CardBody,CardHeader,Col,Row,Alert,Table, Form,FormGroup,Label,Input} from 'reactstrap'
import { TiArrowBack } from 'react-icons/ti'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {FaPlusSquare} from 'react-icons/fa';
import {TiArrowForward} from 'react-icons/ti';
import 'react-widgets/styles.css'
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {token, url } from "../../../../api";
import { toast } from 'react-toastify';

import { Spinner } from 'reactstrap';
import { Badge } from 'reactstrap';
import {Menu,MenuList,MenuButton,MenuItem,} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import ModalViewResult from './../TestResult/ViewResult';
// import ModalSampleTransfer from './../TransferSample/TransferSampleModal';
import SampleCollection from './CollectSampleModal'
import { checkStatus } from '../../../../utils'

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
        fontSize:'16px',
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
        fontSize:'16px',
        color:'rgb(153, 46, 98)',
        fontWeight:'600'
    }
}))

    const SampleList = (props) => {

    const testOrders = [];
    const sampleCollections = props.patientObj ? props.patientObj : {};
    const Id = props.id;
    //console.log("id", Id);

    const laborderArray = sampleCollections.labOrder.tests;

    const encounterDate = null ;
    const hospitalNumber =  null;

    const [loading, setLoading] = useState('')
    const [fetchTestOrders, setFetchTestOrders] = useState(sampleCollections)

    const classes = useStyles()

    const labTestType = [];

    if(testOrders !== null || testOrders ===""){
            testOrders.forEach(function(value, index, array) {
                if(value['data']!==null)
                    labTestType.push(value['data'].lab_test_group);
            });
        }

    const uniqueValues = [...new Set(labTestType)];
    const [permissions, setPermissions] = useState([]);
    const [modal, setModal] = useState(false) //Modal to collect sample
    const toggleModal = () => setModal(!modal)
    const [modal2, setModal2] = useState(false)//modal to transfer sample
    const toggleModal2 = () => setModal2(!modal2)
    const [modal4, setModal4] = useState(false)//modal to transfer sample Confirmation
    const toggleModal4 = () => setModal4(!modal4)
    const [modal3, setModal3] = useState(false)//modal to View Result
    const toggleModal3 = () => setModal3(!modal3)
    const [collectModal, setcollectModal] = useState([])//to collect array of datas into the modal and pass it as props
    const [labNumbers, setLabNumbers] = useState([]);

    const userPermission = () => {
        axios
            .get(`${url}account`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                console.log("permission", response.data.permissions)
                setPermissions(response.data.permissions);
            })
            .catch((error) => {
            });
        }

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
        userPermission()
        loadLabNumber()
      }, []);

    let  labNumber = ""

    const [labNumValue, setlabNumValue] = useState("")

    const [labNum, setlabNum] = useState({lab_number:""})

    const getLabNumber = localStorage.getItem('labnumber')

    const handleLabNumber = e => {
        e.preventDefault();
        setlabNum({ ...labNum, [e.target.name]: e.target.value })
        labNumber = e.target.value
        setlabNumValue(labNumber)
    }

    const handleSample = (row,dateEncounter) => {
        setcollectModal({...collectModal, ...row, dateEncounter, hospitalNumber});
        setModal(!modal)
    }

    const transferSample = (row) => {
        setModal2(!modal2)
        setcollectModal({...collectModal, ...row});
    }
    const transferSampleConfirmation = (row) => {
        setModal3(!modal3)
        setcollectModal({...collectModal, ...row});
    }

    const viewresult = (row) => {  
        setcollectModal({...collectModal, ...row});
        setModal3(!modal3) 
    }

    const getGroup = e => {
        const getValue =e.target.value;
        if(getValue!=='All' || getValue ===null)
        {
            const getNewTestOrder = testOrders.find(x => x.data!==null && x.data.lab_test_group === getValue)
            setFetchTestOrders([getNewTestOrder])

        }else{
            setFetchTestOrders(testOrders)
        }
    };

    const sampleStatus = e =>{
        if(e===1){
            return <p><Badge  color="light">Sample Collected</Badge></p>
        }else if(e===2){
            return <p><Badge  color="light">Sample Transfered</Badge></p>
        }else if(e===3){
            return <p><Badge  color="light">Sample Verified</Badge></p>
        }else if(e===4){
            return <p><Badge  color="light">Sample Rejected</Badge></p>
        }else if(e===5){
            return <p><Badge  color="light">Result Available</Badge></p>
        }else{
            return <p><Badge  color="warning">Pending Collection</Badge></p>
        }
    }

    function sampleTypeList (test){
        
        const  maxVal = []
        if (test != null && test.length > 0) {
          for(var i=0; i<test.length; i++){
             
                  if ( test[i].display!==null && test[i].display)
                        console.log(test[i])
                            maxVal.push(test[i].display)
              
          }
        return maxVal.toString();
        }
    }

    const loadData = useCallback(async () => {
        try {
            const response = await axios.get(`${url}laboratory/orders/${Id}`, { headers: {"Authorization" : `Bearer ${token}`} });
            setFetchTestOrders(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching lab", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);

    const sampleAction = (row,dateEncounter) =>{
            if(row.labTestOrderStatus ===0 || row.labTestOrderStatus ===null){
                return (  <Menu>
                            <MenuButton style={{ backgroundColor:"#3F51B5", color:"#fff", border:"2px solid #3F51B5", borderRadius:"4px"}}>
                                Action <span aria-hidden>▾</span>
                            </MenuButton>
                                <MenuList style={{hover:"#eee"}}>
                                <MenuItem onSelect={() => handleSample(row,dateEncounter)}><FaPlusSquare size="15" style={{color: '#000'}}/>{" "}Collect Sample</MenuItem>
                                </MenuList>
                            </Menu>    
                        )
            }
            if(row.labTestOrderStatus ===1){
                return (  <Menu>
                            <MenuButton style={{ backgroundColor:"#3F51B5", color:"#fff", border:"2px solid #3F51B5", borderRadius:"4px"}}>
                                Action <span aria-hidden>▾</span>
                            </MenuButton>
                                <MenuList style={{hover:"#eee"}}>
                                <MenuItem onSelect={() => transferSampleConfirmation(row)}><TiArrowForward size="15" style={{color: '#000'}}/>{" "} Transfer Sample</MenuItem>
                                </MenuList>
                            </Menu>    
                        )
            }
            if(row.labTestOrderStatus===5){
                return (  <Menu>
                            <MenuButton style={{ backgroundColor:"#3F51B5", color:"#fff", border:"2px solid #3F51B5", borderRadius:"4px"}}>
                                Action <span aria-hidden>▾</span>
                            </MenuButton>
                                <MenuList style={{hover:"#eee"}}>
                                <MenuItem onSelect={() => viewresult(row,dateEncounter)}><FaPlusSquare size="15" style={{color: '#000'}}/>{" "}View Result</MenuItem>
                                </MenuList>
                            </Menu>    
                        )
            }
  }

    const handDataReload = () => {
        loadData();
    }

return (
    <div>

        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" 
                to={{pathname: "/laboratory",
                state: 'collect-sample'
                }} 
            >
                    Laboratory
            </Link>
           
            <Typography color="textPrimary">Sample Collection  </Typography>
            
         </Breadcrumbs>
        <br/>    
        <br/>
        <Row>
            <Col>
                <div >
                   
                </div>
                <br/>
                <Card className="mb-12">
                    <CardHeader> <span style={{  textTransform: 'capitalize'}}>Test Order Details </span>

                  </CardHeader>
                <CardBody>
                { labNumValue.length !== 0 ? " " :
                    <Alert color="primary">
                        Please make sure you enter Lab number before collecting sample 
                    </Alert>
                }
                <br />
                    <Row>
                       
                            <Card body>
                                <Row >
                                    <Col md="3">
                                        <FormGroup>
                                             <Label for="occupation" className={classes.label}>Lab Test Group </Label>

                                                <Input
                                                  type="select"
                                                  name="testgroup"
                                                  id="testgroup"
                                                  onChange={getGroup}
                                                  className={classes.input}
                                                >
                                                   <option value="All"> All </option>
                                                    {
                                                      uniqueValues.map(x =>
                                                        <option key={x} value={x}>
                                                          {x}
                                                        </option>
                                                    )}

                                              </Input>
                                        </FormGroup>
                                    </Col>
                                    { getLabNumber === null ?
                                    <Col md="3" className='float-right mr-1'>
                                        {/* {labNum['lab_number']==="" ? */}
                                        <FormGroup>
                                            <Label for="occupation" className={classes.label}>Lab Number *</Label>

                                         <Input
                                              type="select"
                                              name='lab_number'
                                              id='lab_number'
                                              onChange={getGroup}
                                              className={classes.input}
                                              value={labNumber!=="" ? labNumber : labNum.lab_number}
                                              onChange={handleLabNumber}
                                            >
                                               <option value={""}> Select Lab Number </option>
                                               {labNumbers && labNumbers.map((x, i) => (
                                                    <option key={i} value={x.labNumber}>{x.labNumber}</option>
                                               ))}
                                          </Input>

                                        {/*<Input
                                            type='text'
                                            name='lab_number'
                                            id='lab_number'
                                            className={classes.input}
                                            value={labNumber!=="" ? labNumber : labNum.lab_number}
                                            onChange={handleLabNumber}
                                            disabled={labNumber && labNum.lab_number ? 'true' : ''}
                                        />*/}
                                        </FormGroup>                            
                                    </Col>
                                    : " " }
                                </Row>
                                
                                    <Form >
                                    <br/>
                                        <Table  striped responsive>
                                            <thead style={{  backgroundColor:'#014d88', color:'#fff' }}>
                                                <tr>
                                                    <th>Test Group</th>
                                                    <th>Test Type</th>
                                                    <th>Date Requested</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                    <th ></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {!loading ? fetchTestOrders.labOrder.tests.map((row) => (
                                                  row !== null && row.labTestOrderStatus === 0 ?
                                                   <tr key={row.id} style={{ borderBottomColor: '#fff' }}>
                                                    <th className={classes.td}>{row.labTestGroupName}</th>
                                                     <td className={classes.td}>{row.labTestName}</td>
                                                     <td className={classes.td}>{fetchTestOrders.labOrder.orderDate}</td>
                                                     <td className={classes.td}>{sampleStatus(0)}</td>
                                                     <td className={classes.td}>{ permissions.includes('collect_samples') || permissions.includes("all_permission") &&
                                                     sampleAction(row, fetchTestOrders.labOrder.orderDate)
                                                     }</td>
                                                     <td className={classes.td}></td>
                                                   </tr>
                                                   :
                                                   <tr></tr>
                                                 ))
                                                 :<p> <Spinner color="primary" /> Loading Please Wait</p>
                                               }
                                            </tbody>
                                        </Table>
                                        <br />
                                    </Form>
                              </Card>
                  </Row>
                </CardBody>
              </Card>
            </Col>
        </Row>
        {modal || modal2  || modal3 || modal4 ? 
      (
        <>
            <SampleCollection modalstatus={modal} togglestatus={toggleModal} datasample={collectModal} labnumber={labNumValue} handDataReload={handDataReload}/>
            {/* <ModalSampleTransfer modalstatus={modal2} togglestatus={toggleModal2} datasample={collectModal} labnumber={labNumber!=="" ? labNumber : labNum}/> */}
            {/* <ModalViewResult modalstatus={modal3} togglestatus={toggleModal3} datasample={collectModal} />*/}
            {/* <TransferModalConfirmation modalstatus={modal4} togglestatusConfirmation={toggleModal4} datasample={collectModal} actionButton={transferSample} labnumber={labNumber!=="" ? labNumber : labNum}/> */}
       </>
      ) 
      : ""
      } 
    </div>
  )  
}

export default SampleList