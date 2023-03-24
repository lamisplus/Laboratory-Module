import React, {useState} from 'react';
import MaterialTable from 'material-table';

import { Link } from 'react-router-dom'
//import Remove from '@material-ui/icons/Remove';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { FaPlus } from "react-icons/fa";
// import axios from "axios";
// import { url as baseUrl , PHARMACYSERVICECODE} from "../../api";
import {medicationObj} from './MedicationObj';
import { Badge } from 'reactstrap';
import { Card, Row, Col,} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import DrugRegimenOrder from './DrugPrecription'
import RegimenPrescription from './RegimenPrescription'
import { forwardRef } from 'react';

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

const divStyle = {
    borderRadius: "2px",
    fontSize: 14,
  };

const DRUG_ORDER_STATUS = [{name:"Not Dispensed", id: 0},
{name:"Dispensed", id: 1}];

const PatientSearch = (props) => {
    const prescriptions = medicationObj
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [modalRegimen, setModalRegimen] = useState(false);
    const toggleModalRegimen = () => setModalRegimen(!modalRegimen) 

    const DisplayDrugOrderModal = ()=>{
        //console.log(modal)
        setModal(!modal);
        //console.log(modal)
    }
    const DisplayRegimenModal = ()=>{
        //console.log(modal)
        setModalRegimen(!modalRegimen);
        //console.log(modal)
    }

  return (

    <div>
    <Row>

    <Col xl={12}>
    <Card style={divStyle}>

    <Card.Body>
    <Button
                variant="contained"
                color="primary"
                className=" float-end ms-2"
                startIcon={<FaPlus size="10"/>}
                onClick={()=>DisplayRegimenModal()}

            >
                <span style={{ textTransform: "capitalize" }}>New Regimen Prescription</span>
        </Button>
        <Button
                variant="contained"
                color="primary"
                className=" float-end ms-2"
                startIcon={<FaPlus size="10"/>}
                onClick={()=>DisplayDrugOrderModal()}

            >
                <span style={{ textTransform: "capitalize" }}>New Drug Prescription</span>
        </Button>
        
            <br/><br/>
            <MaterialTable
                icons={tableIcons}
                title="Drug Order History"
                columns={[
                { title: "Drug Name", field: "name" },
                {
                    title: "Date",
                    field: "date",
                },
                { title: "Dosage", field: "dosage", filtering: false, },
                {
                    title: "Period",
                    field: "period",
                    filtering: false,
                },
                {
                    title: "Status",
                    field: "status",
                    filtering: false,
                },
               
                ]}
                data={ prescriptions.map((row) => ({
                name: <span>
                            {row.regimen ?
                                ( row.regimen && row.regimen.regimen ? row.regimen.regimen + ' - ': '')
                                :
                            <b> {row.drugs && row.drugs.length > 0 ? row.drugs.map(x=>x.drug.name).toString() : ''}</b>}
                        </span>,
                date: row.date_prescribed,
                dosage: row.dosage_frequency || '-',
                period: <span>
                            {'Start at '} <b>{row.start_date || ''}</b> {' for '} <b>{row.duration}{' '}{row.duration_unit}</b>
                        </span>,
                status: <span> 
                            <Badge  color="primary">{row.prescription_status ? DRUG_ORDER_STATUS.find(x => x.id == row.prescription_status).name : ''}</Badge>
                            </span>,
             
                }))}
                
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
      </Card.Body>
      </Card>
      </Col>
      </Row>
      <DrugRegimenOrder modalstatus={modal} togglestatus={toggleModal}/>
      <RegimenPrescription modalstatus={modalRegimen} togglestatus={toggleModalRegimen} />
    </div>
  );
}

export default PatientSearch;


