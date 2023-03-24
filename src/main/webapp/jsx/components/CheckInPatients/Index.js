
import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import { forwardRef } from 'react';
import axios from "axios";
import { url as baseUrl } from "./../../../api";

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

const PatientSearch = (props) => {
    const [loading, setLoading] = useState('')
    
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
    const collectedSamples = []

    props.labObj.forEach(function(value, index, array) {
        const dataSamples = value.formDataObj 
        for(var i=0; i<dataSamples.length; i++){
            for (var key in dataSamples[i]) {
            
            if (dataSamples[i][key]!==null && (dataSamples[i][key].lab_test_order_status <=0  ))
            collectedSamples.push(value)
        }            
          }
    });
    


    function totalSampleVerified (test){
        const  maxVal = []
        for(var i=0; i<test.length; i++){
          for (var key in test[i]) {
            if (test[i][key]!==null && test[i][key].lab_test_order_status >2 )
              maxVal.push(test[i][key])
          }
          
        }
            return maxVal.length;
      }
    
  return (
      <div>
          
          <MaterialTable
           icons={tableIcons}
              title="Checked In Patients"
              columns={[
                  { title: "Patient ID", field: "Id" },
                  {
                    title: "Patient Name",
                    field: "name",
                  },
                  { title: "Date Order", field: "date", type: "date" , filtering: false},          
                  {
                    title: "Total Sample ",
                    field: "count",
                    filtering: false
                  },
                  {
                    title: "Sample Collected ",
                    field: "samplecount",
                    filtering: false
                  },
                  {
                    title: "Action",
                    field: "actions",
                    filtering: false,
                  },
              ]}
              //isLoading={loading}
                data={collectedSamples.map((row) => ({
                Id: row.hospitalNumber,
                name: row.firstName +  ' ' + row.lastName,
                date: row.dateEncounter,
                count: row.formDataObj.length,
                samplecount: totalSampleVerified(row.formDataObj),
                actions: <Link to ={{ 
                                        pathname: "/test-order",  
                                        state: row
                                    }}  
                                        style={{ cursor: "pointer", color: "blue", fontStyle: "bold" 
                                    }}
                        >
                                    <Tooltip title="Sample Verification">
                                        <IconButton aria-label="Sample Verification" >
                                            <VisibilityIcon color="primary"/>
                                        </IconButton>
                                    </Tooltip>
                        </Link>

                })
            )}
            // data={query =>
            //       new Promise((resolve, reject) =>
            //           axios.get(`${baseUrl}encounters/${LABSERVICECODE}/{dateStart}/{dateEnd}?size=${query.pageSize}&page=${query.page}&search=${query.search}`)
            //               .then(response => response)
            //               .then(result => {

            //                   //console.log('in result')
            //                   //console.log( result.headers);
            //                   console.log( result.headers['x-total-count']);
            //                   resolve({
            //                       data: result.data.map((row) => ({
            //                         Id: row.hospitalNumber,
            //                         name: row.firstName +  ' ' + row.lastName,
            //                         date: row.dateEncounter,
            //                         count: row.formDataObj.length,
            //                         samplecount: totalSampleConllected(row.formDataObj),
            //                           actions:
            //                           <Link to ={{ 
            //                                         pathname: "/collect-sample",  
            //                                         state: row
            //                                     }} 
            //                                         style={{ cursor: "pointer", color: "blue", fontStyle: "bold"}}
            //                                     >
            //                                         <Tooltip title="Collect Sample">
            //                                             <IconButton aria-label="Collect Sample" >
            //                                                 <VisibilityIcon color="primary"/>
            //                                             </IconButton>
            //                                         </Tooltip>
            //                                     </Link>
            //                       })),
            //                       page: query.page,
            //                       totalCount: result.headers['x-total-count'],
            //                   })
            //               })
            //       )}

                  options={{
                    headerStyle: {
                        backgroundColor: "#9F9FA5",
                        color: "#000",
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
        
    </div>
  );
}

// const mapStateToProps = state => {
//     return {
//         patientsTestOrderList: state.laboratory.list
//     };
// };
// const mapActionToProps = {
//     fetchAllLabTestOrderToday: fetchAllLabTestOrder
// };
  
export default PatientSearch;