import React, { Fragment } from "react";
// BS
import { Dropdown, Nav, Tab } from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
// images

// Page titie


const RecentActivities = () => {
  return (
    <Fragment>
      {/* <Ext /> */}
     
      <div className="row">
      <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header  border-0 pb-0">
              <h4 className="card-title">Test Orders</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_Todo1"
                className="widget-media dz-scroll ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2">
                        <img  alt="" width="50"  />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Biochemistry</h5>
                        <small className="d-block">
                          29 July 2022 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-info">RA</div>
                      <div className="media-body">
                        <h5 className="mb-1">Sample Collection</h5>
                        <small className="d-block">
                          29 July 2022 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className="i-false p-0 btn-info sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-success">
                        <i className="fa fa-home"></i>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Lab Test Order</h5>
                        <small className="d-block">
                          29 July 2022 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant=" light"
                          className=" i-false p-0 btn-success sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2">
                        <img  alt="" width="50"  />
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Dr sultads Send you Photo</h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-danger">RA</div>
                      <div className="media-body">
                        <h5 className="mb-1">Clinic Visit</h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          type="button"
                          className="btn btn-danger light sharp   i-false p-0 sharp "
                          data-toggle="dropdown"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-panel">
                      <div className="media me-2 media-primary">
                        <i className="fa fa-home"></i>
                      </div>
                      <div className="media-body">
                        <h5 className="mb-1">Clinic Visit</h5>
                        <small className="d-block">
                          29 July 2020 - 02:26 PM
                        </small>
                      </div>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle
                          variant="primary light"
                          className=" i-false p-0 sharp"
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-item"
                            to="/widget-basic"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Sample Collection Status</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-badge primary"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge info"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge danger"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                       <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge success"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                       <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge warning"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                       <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge dark"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                       <span>10 Days ago</span>
                      <h6 className="mb-0">
                        Date Sample Collected{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Assay{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                      <h6 className="mb-0">
                        Date Result Received{" "}<br/>
                        <strong className="text-primary">04 Nov, 2021</strong>.
                      </h6>
                    </Link>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">Result Reporting</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine1"
                className="widget-timeline dz-scroll style-1 height370 ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-badge primary"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                     <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge info"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge danger"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge success"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge warning"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
                  <li>
                    <div className="timeline-badge dark"></div>
                    <Link
                      className="timeline-panel text-muted"
                      to="/widget-basic"
                    >
                      <span>20 Days ago</span>
                      <h6 className="mb-0">
                      Current Regimen
                        TDF(300mg)+3TC(300mg)+DTG(50mg){" "}
                        <strong className="text-info">Current Regimen Line<br/>
                        ART First Line Adult</strong>
                      </h6>
                      <p className="mb-0">
                        Refill Date<br/>
                        08 Jan, 2022
                      </p>
                      <strong className="text-warning">
                          Next Appointment<br/>
                        05 Jul, 2022
                     </strong><br/>
                     <strong className="text-primary">
                        Refill Duration<br/>
                        180
                     </strong><br/>
                     <strong className="text-teal">
                     Refill Duration<br/>
                        180
                     </strong>
                     <strong className="mb-0">
                     IPT<br/>
                    Isoniazid Preventive Therapy (IPT)
                    </strong><br/>
                    <strong className="mb-0">
                    IPT Date<b/>
                    08 Jan, 2022
                    </strong>
                    

                    </Link>
                  </li>
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
