import React from 'react'
import {Card, CardBody,CardHeader,Col,Row,Alert,Table, Form,FormGroup,Label,Input} from 'reactstrap'
import { useState , useEffect} from 'react'
import { TiArrowBack } from 'react-icons/ti'
import MatButton from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {FaPlusSquare, FaRegEye} from 'react-icons/fa';
import 'react-widgets/dist/css/react-widgets.css'
//Date Picker
import Page from './../../Page'
import {  fetchById } from '../../../actions/patients'
import {  fetchAllLabTestOrderOfPatient } from '../../../actions/laboratory'
import { useSelector, useDispatch } from 'react-redux';
import PatientDetailCard from 'components/PatientProfile/PatientDetailCard';
import { Spinner } from 'reactstrap';
import { Badge } from 'reactstrap';
import {Menu,MenuList,MenuButton,MenuItem,} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import ModalViewResult from './ViewResult';
import ModalSampleResult from './EnterResultFormIo';
import {authentication} from '../../../_services/authentication';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import ModalSample from './RecollectSample';


const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    },
    td: { borderBottom :'#fff'}
})




const ResultReporting = (props) => {
    const sampleCollections = props.location.state && props.location.state.formDataObj!==null ? props.location.state.formDataObj : {};
    const encounterDate = props.location.state && props.location.state.dateEncounter ? props.location.state.dateEncounter : null ;
    const classes = useStyles()  
    const testOrders = useSelector(state => state.laboratory.testorder);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState('')

   //Filter only sample that is collected in the array 
    const newSample =  sampleCollections.filter(function(sample) {
        return (sample.data!== null && sample.data.lab_test_order_status !==0 && sample.data.lab_test_order_status !=="4");
    });

    const [fetchTestOrders, setFetchTestOrders] = useState(newSample)

    useEffect(() => {
        
        if(props.location.state.encounterId !="" ){         
                setLoading(true);
                    const onSuccess = () => {
                        setLoading(false)
                        
                    }
                    const onError = () => {
                        setLoading(false)     
                    }
            dispatch(fetchAllLabTestOrderOfPatient(props.location.state.encounterId,onSuccess,onError ));
            dispatch(fetchById(props.location.state.hospitalNumber,onSuccess,onError));
        }
    }, []); //componentDidMount 

        //Get list of test type
        const labTestType = [];
            if(sampleCollections !== null || sampleCollections ===""){
                sampleCollections.forEach(function(value, index, array) {
                    if(value['data']!==null)
                        labTestType.push(value['data'].lab_test_group);
                });
            }

        //Make the list contain unique list of Data 
        const uniqueValues = [...new Set(labTestType)];
       
        const [modal2, setModal2] = useState(false)//modal to Enter sample
        const toggleModal2 = () => setModal2(!modal2)
        const [modal3, setModal3] = useState(false)//modal to View Result
        const toggleModal3 = () => setModal3(!modal3)
        const [collectModal, setcollectModal] = useState([])//to collect array of datas into the modal and pass it as props
        const [labNum, setlabNum] = useState({lab_number:""})
        const [modal4, setModal4] = useState(false)//modal to Enter Result
        const toggleModal4 = () => setModal4(!modal4)


        let  labNumber = "" //check if that key exist in the array
            testOrders.forEach(function(value, index, array) {
                if(value['data']!==null &&  value['data'].hasOwnProperty("lab_number")){
                    labNumber = value['data'].lab_number
                } 
               
            });
          

    const handleLabNumber = e => {
        e.preventDefault();   
            setlabNum({ ...labNum, [e.target.name]: e.target.value })
    }
    const handleResult = (row) => {  
        setcollectModal({...collectModal, ...row});
        setModal2(!modal2) 
    }

    const viewresult = (row) => {  
        setcollectModal({...collectModal, ...row});
        setModal3(!modal3) 
    }
    const addresult = (row) => {  
        setcollectModal({...collectModal, ...row});
        setModal2(!modal2) 
    }

    const handleRecollectSample = (row) => { 
        setcollectModal({...collectModal, ...row});
        setModal4(!modal4) 
    }

    const getGroup = e => {
        const getValue =e.target.value;
        if(getValue!=='All' || getValue ===null)
        {
            //const testOrders = fetchTestOrders.length >0 ? fetchTestOrders:{}
            const getNewTestOrder = testOrders.find(x => x.data.lab_test_group === getValue)
            setFetchTestOrders([getNewTestOrder]) 
        }else{
            setFetchTestOrders(newSample)
        }
    };
    //This is function to check for the status of each collection to display on the tablist below 
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
          return <p>{""}</p>
        }
    }
    function sampleTypeList (test){
        
        const  maxVal = []
  
          for(var i=0; i<test.length; i++){
             
                  if ( test[i].display!==null && test[i].display)
                        console.log(test[i])
                            maxVal.push(test[i].display)
              
          }
        return maxVal.toString();
      
    }

//This is function to check for the status of each collection to display on the tablist below 
    const sampleAction = (e) =>{
    
        return (
            <Menu>
                <MenuButton style={{ backgroundColor:"#3F51B5", color:"#fff", border:"2px solid #3F51B5", borderRadius:"4px"}}>
                    Action <span aria-hidden>▾</span>
                </MenuButton>
                    <MenuList style={{hover:"#eee"}}>
                    {e.data.lab_test_order_status ===3 ?
                        <MenuItem onSelect={() => handleResult(e)} hidden={!authentication.userHasRole(["laboratory_write"])}><FaPlusSquare size="15" style={{color: '#3F51B5'}}/>{" "}Enter Result</MenuItem>
                    :""}
                    {e.data.lab_test_order_status===5 ?
                        <MenuItem onSelect={() => viewresult(e)}><FaRegEye size="15" style={{color: '#3F51B5'}}/>{" "}View Result</MenuItem>
                        
                    :""}
                    {e.data.lab_test_order_status===5 ?
                        <MenuItem onSelect={() => addresult(e)}><FaPlusSquare size="15" style={{color: '#3F51B5'}}/>{" "}Add Result</MenuItem>
                    :""}
                    
                    {e.data.lab_test_order_status===4 ?
                        <MenuItem onSelect={() => handleRecollectSample(e)} hidden={!authentication.userHasRole(["laboratory_write"])}><FaPlusSquare size="15" style={{color: '#3F51B5'}}/>{" "}Re-Collect Sample</MenuItem>
                    :""}   
                    </MenuList>
            </Menu>
          )
  }

return (
    <React.Fragment>
    <Card>
    <CardBody>
        <br/>
     <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={{pathname: "/laboratory", state: 'test-result'}} >
                Laboratory
            </Link>
            
            <Typography color="textPrimary">Result Reporting  </Typography>
            
         </Breadcrumbs>
            
        <br/>
        <br/>
        <Row>
            <Col>
                <div >
                    {!loading ?
                        <PatientDetailCard getpatientdetails={ props.location.state }/>  
                    :
                        <p> <Spinner color="primary" /> Loading Please Wait..</p>
                    }
                </div>
                <br/>
                <Card className="mb-12">
                    <CardHeader> <span style={{  textTransform: 'capitalize'}}>Test Order Details </span>
                        <Link 
                            to ={{ 
                              pathname: "/laboratory",  
                              state: 'test-result'
                            }} 
                        >
                    
                            <MatButton
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}                        
                                className=" float-right mr-1"
                            >
                                <TiArrowBack/>{" "} Back
                            </MatButton>
                      
                        </Link>
                  </CardHeader>
                <CardBody>
                  
                <br />
                    <Row>
                        <Col>
                            <Card body>
                                <Row form>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="occupation">Lab Test Group </Label>

                                                <Input
                                                  type="select"
                                                  name="testgroup"
                                                  id="testgroup"
                                                  onChange={getGroup}
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
                                    <Col md={3} className='float-right mr-1'>
                                        {/* {labNum['lab_number']==="" ? */}
                                        <FormGroup>
                                            <Label for="occupation">Lab Number </Label>
                                        <Input
                                            type='text'
                                            name='lab_number'
                                            id='lab_number'
                                            value={labNumber!=="" ? labNumber : labNum.lab_number}
                                            disabled='true'
                                            onChange={handleLabNumber}
                                        />
                                        </FormGroup>                            
                                    </Col>
                                </Row>
                                    <Form >
                                        <Table  striped responsive>
                                            <thead style={{  backgroundColor: "#014d88", color: "#fff"}}>
                                                <tr>
                                                    <th>Test</th>
                                                    <th>Sample Type</th>
                                                    <th>Date Requested</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               
                                                {!loading ? fetchTestOrders.map((row) => (
                                                    <tr key={row.id} style={{ borderBottomColor: '#fff' }}>
                                                      <th className={classes.td}>{row.data.description===""?" ":row.data.description}</th>
                                                      <td className={classes.td}>{sampleTypeList(row.data && row.data.sample_type!==null ? row.data.sample_type : null)}</td>
                                                      <td className={classes.td}> {encounterDate} </td>
                                                      <td className={classes.td}>{sampleStatus(row.data.lab_test_order_status)} </td>
                                                      <td className={classes.td}>{sampleAction(row)}</td>
                                                    </tr>
                                                  ))
                                                  :<p> <Spinner color="primary" /> Loading Please Wait</p>
                                                } 
                                            </tbody>
                                        </Table>
                                        <br />
                                  
                                    </Form>
                                
                              </Card>
                        </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
        </Row>
        </CardBody>
        </Card>
        <ModalSampleResult modalstatus={modal2} togglestatus={toggleModal2} datasample={collectModal} />
        <ModalViewResult modalstatus={modal3} togglestatus={toggleModal3} datasample={collectModal} /> 
        <ModalSample modalstatus={modal4} togglestatus={toggleModal4} datasample={collectModal}  labnumber={newSample[0].data.lab_number}/>   
    </React.Fragment>
  )
  
}


export default ResultReporting