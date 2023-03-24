import React, {useEffect, useCallback, useState} from 'react';
import {Card, CardBody,CardHeader,Col,Row,Alert,Table, Form,FormGroup,Label,Input} from 'reactstrap'

import { TiArrowBack, TiDocumentText } from 'react-icons/ti'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {FaPlusSquare} from 'react-icons/fa';
import 'react-widgets/styles.css'
import { ToastContainer } from "react-toastify";
import { checkStatus } from '../../../../utils'
import MaterialTable from 'material-table';
import { Spinner } from 'reactstrap';
import { Badge } from 'reactstrap';
import {Menu,MenuList,MenuButton,MenuItem,} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import {FaRegEye} from 'react-icons/fa';
import {GoChecklist} from 'react-icons/go';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import ModalViewResult from './../TestResult/ViewResult';
// import ModalSampleTransfer from './../TransferSample/TransferSampleModal';
import ModalEnterResult from './EnterResult'
import axios from "axios";
import {token, url} from '../../../../api'
import { toast} from "react-toastify";

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
    console.log(sampleCollections)
    const patientId = sampleCollections.patientId ? sampleCollections.patientId : ""
    const Id = props.id;
    const encounterDate = null ;
    const hospitalNumber =  null;

    const [loading, setLoading] = useState('')
    const [fetchTestOrders, setFetchTestOrders] = useState(sampleCollections)

    const [flipTable, setFlipTable] = useState(false)
    const [previousRecords, setPreviousRecords] = useState([]);

    const classes = useStyles()

    const previousData = useCallback(async () => {
        try {
            const response = await axios.get(`${url}laboratory/results/patients/${props.patientObj.patientId}`, { headers: {"Authorization" : `Bearer ${token}`} });
            //console.log("prev results", response);
            setPreviousRecords(response.data);
        } catch (e) {
            toast.error("An error occurred while fetching previous results", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, []);
   
    useEffect(() => {
        previousData()
    }, [previousData]);

    //Get list of test type
    const labTestType = [];
    if(testOrders !== null || testOrders ===""){
            testOrders.forEach(function(value, index, array) {
                if(value['data']!==null)
                    labTestType.push(value['data'].lab_test_group);
            });
        }

    const uniqueValues = [...new Set(labTestType)];
    const [modal, setModal] = useState(false) //Modal to collect sample
    const toggleModal = () => setModal(!modal)
    const [modal2, setModal2] = useState(false)//modal to transfer sample
    const toggleModal2 = () => setModal2(!modal2)
    const [modal4, setModal4] = useState(false)//modal to transfer sample Confirmation
    const toggleModal4 = () => setModal4(!modal4)
    const [modal3, setModal3] = useState(false)//modal to View Result
    const toggleModal3 = () => setModal3(!modal3)
    const [collectModal, setcollectModal] = useState([])//to collect array of datas into the modal and pass it as props
    const [labNum, setlabNum] = useState({lab_number:""})

    let  labNumber = "" //check if that key exist in the array

    let lab = localStorage.getItem('labnumber');

    if (lab !== null) {
        labNumber = lab;
    }

    const handleLabNumber = e => {
        e.preventDefault();   
            setlabNum({ ...labNum, [e.target.name]: e.target.value })
            labNumber = e.target.value
    }

    const handleVerifySample = (row) => {  
        setcollectModal({...collectModal, ...row});
        setModal(!modal) 
      }

    const handleRecollectSample = (row) => {
        setcollectModal({...collectModal, ...row});
        setModal2(!modal2) 
    }
    const addResult = (row) => {  
        setcollectModal({...collectModal, ...row});
        setModal(!modal)
    }

    const viewresult = (row, labTestName) => {
        setcollectModal({...collectModal, ...row, labTestName: labTestName});
        setModal3(!modal3)
    }

    const getGroup = e => {
        const getValue =e.target.value;
        if(getValue!=='All' || getValue ===null)
        { 
            //const testOrders = fetchTestOrders.length >0 ? fetchTestOrders:{}
           const getNewTestOrder = testOrders.find(x => x.data!==null && x.data.lab_test_group === getValue)
           setFetchTestOrders([getNewTestOrder])
           // testOrders =[...getNewTestOrder] 
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
            return <p><Badge  color="success">Sample Verified</Badge></p>
        }else if(e===4){
            return <p><Badge  color="light">Sample Rejected</Badge></p>
        }else if(e===5){
            return <p><Badge  color="light">Result Available</Badge></p>
        }else{
            return <p><Badge  color="light">Pending Collection</Badge></p>
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

    const sampleAction = (id, row, sample) =>{
    console.log("samples",sample.results)
    if(id===3){
        return (
                <Menu>
                <MenuButton style={{ backgroundColor:"#3F51B5", color:"#fff", border:"2px solid #3F51B5", borderRadius:"4px"}}>
                    Action <span aria-hidden>▾</span>
                </MenuButton>
                    <MenuList style={{hover:"#eee"}}>
                        <MenuItem onSelect={() => viewresult(row, sample.labTestName)}><FaRegEye size="15" style={{color: '#3F51B5'}}/>{" "}View Result</MenuItem>
                        { sample.results.length === 0 ?
                        <MenuItem onSelect={() => addResult(row)}><FaPlusSquare size="15" style={{color: '#3F51B5'}}/>{" "} Add Result</MenuItem>
                        : " "}
                    </MenuList>

                </Menu>
            )
        }
    }

    const handleTableChange = () => {
        setFlipTable(!flipTable)
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

    const handDataReload = () => {
        loadData();
    }

    const text = "rejected";

return (
    <div>

        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" 
                to={{pathname: "/laboratory",
                state: 'result'
                }} 
            >
                    Laboratory
            </Link>
           
            <Typography color="textPrimary">Result Reporting  </Typography>
            
         </Breadcrumbs>
        <br/>    
        <br/>
        <Row>
            <Col>

                <Card className="mb-12">
                    <CardHeader> <span style={{  textTransform: 'capitalize'}}>Test Order Details </span>
                  </CardHeader>
                <CardBody>
                    <Row>

                       <Card body>
                            <Row >
                                <Col md="3" className='float-right mr-1'>
                                     <MatButton
                                        type='submit'
                                        variant='contained'
                                        color={flipTable === true ? "primary": "secondary"}
                                        className=" float-right mr-1"
                                        onClick={() => handleTableChange()}
                                    >
                                        <TiDocumentText/>{" "} { flipTable === true ? "View Recent Results": "Historical Results"}
                                    </MatButton>
                                </Col>
                            </Row>
                            <br />


                                    {
                                        flipTable === true ?
                                        <MaterialTable

                                          title="Historical patient sample results"
                                          columns={[
                                              { title: "Patient ID", field: "Id" },
                                              {
                                                title: "Patient Name",
                                                field: "name",
                                              },
                                              { title: "Date Order", field: "date", type: "date" , filtering: false},
                                              {
                                                  title: "Sample type",
                                                  field: "samplecount",
                                                  filtering: false
                                                },
                                              {
                                                  title: "Date sample collected",
                                                  field: "count",
                                                  filtering: false
                                                },
                                              {
                                                title: "Date Sample verified",
                                                field: "samples",
                                                filtering: false
                                              },
                                               {
                                                  title: "Date sample result reported",
                                                  field: "sampleverified",
                                                  filtering: false
                                                },
                                                 {
                                                  title: "Result",
                                                  field: "results",
                                                  filtering: false
                                                },

                                          ]}
                                          //isLoading={loading}
                                          data={ previousRecords.map((row) => ({

                                          Id: row.patientId,
                                          name: row.patientFirstName +  ' ' + row.patientLastName,
                                          date: row.orderDate,
                                          samplecount: row.sampleTypeName,
                                          count: row.DateSampleCollected === null ? "----" : row.DateSampleCollected,
                                          samples: row.dateSampleVerified === null ? "----": row.dateSampleVerified,
                                          sampleverified: row.dateResultReported === null ? "----" : row.dateResultReported,
                                          results:  row.dateResultReported !== null ? "Available" : "Not Available"
                                          }))}

                                           options={{
                                              headerStyle: {
                                                  backgroundColor: "#014d88",
                                                  color: "#fff"
                                              },
                                              searchFieldStyle: {
                                                  width : '300%',
                                                  margingLeft: '250px',
                                              },
                                              filtering: false,
                                              exportButton: false,
                                              searchFieldAlignment: 'left',
                                              pageSizeOptions:[10,20,100],
                                              pageSize:10,
                                              debounceInterval: 400
                                          }}
                                        />
                                        :
                                        <>
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
                                            {/*<Col md="3" className='float-right mr-1'>

                                                <FormGroup>
                                                    <Label for="occupation">Lab Number </Label>
                                                <Input
                                                    type='text'
                                                    name='lab_number'
                                                    id='lab_number'
                                                    value={labNumber!=="" ? labNumber : labNum.lab_number}
                                                    onChange={handleLabNumber}
                                                    disabled={labNumber && labNum.lab_number ? 'true' : ''}
                                                />
                                                </FormGroup>
                                            </Col>*/}

                                        </Row>
                                         <Form >
                                            <br/>
                                            <Table  striped responsive>
                                                <thead style={{  backgroundColor: "#014d88", color: "#fff" }}>
                                                    <tr>
                                                        <th>Test Group</th>
                                                        <th>Test Type</th>
                                                        <th>Sample Id</th>
                                                         <th>Sample Type</th>
                                                        <th>Date Verified</th>
                                                        <th >Status</th>
                                                        <th>Action</th>
                                                        <th ></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                 {!loading ? fetchTestOrders.labOrder.tests.map((row) => (
                                                        row.samples.map((sample) => (
                                                             !sample.commentSampleVerified?.toLowerCase().includes(text) && sample.dateSampleCollected !== null && row.labTestOrderStatus !== 1 ?
                                                               <tr key={row.id} style={{ borderBottomColor: '#fff' }}>
                                                                 <th className={classes.td}>{row.labTestGroupName}</th>
                                                                <td className={classes.td}>{row.labTestName}</td>
                                                                <td className={classes.td}>{sample.sampleNumber}</td>
                                                                 <td className={classes.td}><Badge  color="primary">{sample.sampleTypeName}</Badge></td>
                                                                 <td className={classes.td}>{sample.dateSampleVerified}</td>
                                                                 <td className={classes.td}>{sampleStatus(3)}</td>
                                                                 <td className={classes.td}>{sampleAction(3, sample, row)}</td>
                                                                 <td className={classes.td}></td>
                                                               </tr>
                                                               :
                                                               <tr></tr>
                                                        ))
                                                     ))
                                                     :<p> <Spinner color="primary" /> Loading Please Wait</p>
                                                   }
                                                </tbody>
                                            </Table>
                                            <br />

                                        </Form>
                                      </>
                                    }

                              </Card>

                  </Row>
                </CardBody>
              </Card>
            </Col>
        </Row>
        {modal || modal2  || modal3 || modal4 ? 
      (
        <>
            <ModalEnterResult modalstatus={modal} togglestatus={toggleModal} datasample={collectModal} patientId={patientId}
            labnumber={labNumber !=="" ? labNumber : labNum['lab_number'] } handDataReload={handDataReload}/>
            <ModalViewResult modalstatus={modal3} togglestatus={toggleModal3} datasample={collectModal} />
            {/* <TransferModalConfirmation modalstatus={modal4} togglestatusConfirmation={toggleModal4} datasample={collectModal} actionButton={transferSample} labnumber={labNumber!=="" ? labNumber : labNum}/> */}
       </>
      ) 
      : ""
      } 
    </div>
  )  
}

export default SampleList