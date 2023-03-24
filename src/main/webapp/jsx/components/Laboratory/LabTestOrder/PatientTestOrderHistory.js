
import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MatButton from '@material-ui/core/Button'
import { forwardRef } from 'react';
import axios from "axios";
import { url as baseUrl } from "./../../../../api";
import CreateTestorder from './CreateTestorder'
import RecentActivities from './RecentActivities' 

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const formDataObj= [
    {
        "id": 1138,
        "data": {
            "user_id": "",
            "lab_number": "NG/CCRHS/133",
            "patient_id": 16,
            "description": "Viral Load",
            "lab_test_id": 16,
            "sample_type": {
                "id": 186,
                "code": "ee0947",
                "display": "Blood",
                "language": "en",
                "codesetGroup": "SAMPLE_TYPE"
            },
            "lab_test_group": "Virology",
            "order_priority": {
                "id": 295,
                "code": "6fca9e78-3305-43a5-a45e-dddb92aa4e6e",
                "display": "NORMAL",
                "language": "en",
                "codesetGroup": "TEST_ORDER_PRIORITY"
            },
            "reported_result": [
                {
                    "date_asseyed": "",
                    "result_reported_by": "",
                    "date_result_reported": null,
                    "time_result_reported": ""
                }
            ],
            "unit_measurement": "copies/ml",
            "lab_test_group_id": 4,
            "sample_order_date": "2021-04-29",
            "sample_order_time": "",
            "sample_verified_by": "",
            "sample_collected_by": "",
            "date_result_reported": null,
            "date_sample_verified": "",
            "time_sample_Verified": "",
            "date_sample_collected": "",
            "lab_test_order_status": 5,
            "time_sample_collected": "",
            "viral_load_indication": {
                "id": 301,
                "code": "b97e4080-f1b0-4bf8-bb82-31b556152125",
                "display": "Routine (every 12 months)",
                "language": null,
                "codeset_group": "VIRAL_LOAD_INDICATION"
            },
            "sample_collection_mode": [],
            "comment_sample_verified": "",
            "comment_sample_collected": ""
        },
        "encounterId": 969,
        "organisationUnitByOrganisationUnitId": {
            "id": 1740,
            "name": "Minna OSS",
            "description": "Facility in Chanchaga",
            "organisationUnitLevelId": 4,
            "parentOrganisationUnitId": 582,
            "details": null,
            "parentOrganisationUnitName": null,
            "parentParentOrganisationUnitName": null
        },
        "uuid": "2d805cc0-05ad-4abc-8937-a0e0823ae1ce"
    }
];
const PatientSearch = (props) => {
    const [loading, setLoading] = useState('')
    const [modal, setModal] = useState(false) //Modal for Creating Test Order
    const toggleModal = () => setModal(!modal)
    // useEffect(() => {
    // setLoading('true');
    //     const onSuccess = () => {
    //         setLoading(false)
    //     }
    //     const onError = () => {
    //         setLoading(false)     
    //     }
    //        // props.fetchAllLabTestOrderToday(onSuccess, onError);
    // }, []); //componentDidMount
    const handleSample = () => { 
        setModal(!modal) 
    }
    const collectedSamples = []

    formDataObj.forEach(function(value, index, array) {
        const dataSamples = formDataObj 
        for(var i=0; i<dataSamples.length; i++){
            for (var key in dataSamples[i]) {
            
            if (dataSamples[i][key]!==null && (dataSamples[i][key].lab_test_order_status >= 1  ))
            collectedSamples.push(value)
        }            
          }
    });
    

    
  return (
      <div>
          <br/>
          <MatButton
                type='submit'
                variant='contained'
                color='primary'
                onClick={() => handleSample()}                        
                className=" float-end mr-1"
            >
              Create Test Order
            </MatButton>
            <br/>
          <br/>
         <RecentActivities />
         <CreateTestorder modalstatus={modal} togglestatus={toggleModal} />
    </div>
  );
}


  
export default PatientSearch;