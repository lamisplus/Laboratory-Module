import React, {Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import {Badge, Alert } from "react-bootstrap";



const RecentActivities = (props) => {
      const ordersObj = props.ordersObj;
      // update the object to Dispense Drug Order List
      let dispensedDrugs =[]
      ordersObj.length > 0 && ordersObj.map((drugOrders) => {
            
            if(drugOrders.status!==0){
              dispensedDrugs.push(drugOrders)
            }
      })

      //Update the Drug order to check the ones that have been dispensed
      let prescribedDrugs =[]
      ordersObj.length > 0 && ordersObj.map((drugOrders) => {
            
            if(drugOrders.status===0){
              prescribedDrugs.push(drugOrders)
            }
      })
      console.log(dispensedDrugs)

  return (
    <Fragment>
      {/* <Ext /> */}
     
      <div className="row">

        <div className="col-xl-4 col-xxl-6 col-lg-6">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Drug Prescribed</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  {prescribedDrugs.length>0 && prescribedDrugs.map((drugOrders, index)=>(
                    <li>
                    <div className={ index % 2===0 ? "timeline-badge success" : "timeline-badge primary"}></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span><b>{drugOrders.drugName}</b></span>
                      <h6 className="mb-0">
                        Date Prescribed{" "} <br/>
                        <strong className="text-primary">{drugOrders.dateTimePrescribed}</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Dosage{" "}<br/>
                        <strong className="text-primary">{drugOrders.dosageFrequency}</strong>
                      </h6>
                      <h6 className="mb-0">
                        Period{" "}<br/>
                        <strong className="text-primary"><span>
                          {'Start at '} <b>{drugOrders.startDate || ''}</b> {' for '} <b>{drugOrders.duration}{' '}{drugOrders.durationUnit}</b>
                        </span>
                        </strong>
                      </h6>
                      <h6 className="mb-0">
                        Status{" "}<br/>
                        <strong className="text-primary">
                        <Badge as="a" href="" variant={  index % 2===0? "outline-warning badge-rounded" : "outline-warning badge-rounded" }>
                            Not Dispensed
                        </Badge>
                        </strong>
                      </h6>
                    </Link>
                  </li>
                  ))

                  }
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-6 col-lg-6">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Drug Dispensed</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine1"
                className="widget-timeline dz-scroll style-1 height370 ps ps--active-y"
              >
                <ul className="timeline">
                {dispensedDrugs.length>0 ? dispensedDrugs.map((drugOrders, index)=>(
                  <li>
                    <div className="timeline-badge info"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span><b>Drug Name : {drugOrders.drugName}</b></span>
                      <p className="mb-0">
                        Date Dispense<br/>
                        {drugOrders.dateTimeDispensed}
                      </p>
                      <strong className="text-warning">
                          Frequency<br/>
                          {drugOrders.dosageFrequency}
                     </strong><br/>
                     <strong className="text-primary">
                      dispensedBy<br/>
                      {drugOrders.dispensedBy}
                     </strong><br/>
                    
                    </Link>
                  </li>
                 ))

                 :
                  <Alert
                      variant="info"
                      className="alert-dismissible solid fade show"
                    >
                      <p>No Drug Dispense</p>
                  </Alert>
                
                }
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
       
        
 </div>
      
    </Fragment>
  );
};

export default RecentActivities;
