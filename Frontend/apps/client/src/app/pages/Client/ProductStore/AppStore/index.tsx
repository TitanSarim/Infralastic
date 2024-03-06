import React from "react";
import "./app-store.module.scss"
import {Card, Col, Dropdown, Form, Row} from "react-bootstrap";
import {LuSettings2} from "react-icons/lu";
import {BsArrowRight} from "react-icons/bs";
import SoftwareCard from "../../../../components/Client/AppStore/SoftwareCard";
import fake1 from '../../../../../assets/app-store/faxplus.png';
import fake2 from '../../../../../assets/app-store/metric.png';
import fake3 from '../../../../../assets/app-store/rootly.png';
import fake4 from '../../../../../assets/app-store/comprehensive.png';
import fake5 from '../../../../../assets/app-store/remotePc.png';
import fake6 from '../../../../../assets/app-store/ZeroNetwork.png';
import fake7 from '../../../../../assets/app-store/zendesk.png';
import fake8 from '../../../../../assets/app-store/dropbox.png';

const AppStore = () => {
  return(
    <div className='h-100 py-3'>
      <Card className='my-3'>
        <Card.Body>
          <div className="d-flex w-100">
            <div className="w-50">
              <h5 className='theme-font'>App Store</h5>
            </div>
            <div className="w-50 d-flex justify-content-end">
              <Dropdown>
                <Dropdown.Toggle className='bg-transparent border-0 p-0 me-2' id="dropdown-basic">
                  <button
                    className='px-3 py-1 text-white border-0 bg-gray rounded mx-2'
                  >
                    <LuSettings2 size={18} />
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className='theme-font fs-7'>Available Apps</Dropdown.Item>
                  <Dropdown.Item className='theme-font fs-7'>Assigned Apps</Dropdown.Item>
                  <Dropdown.Item className='theme-font fs-7'>Expired Apps</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form>
                <Form.Control
                  type="text"
                  placeholder="Search"
                />
              </Form>
            </div>
          </div>
          <br/>
          <Row>
            <Col md={3} className='br-1'>
              <div className="d-flex">
                <div className="">
                  <h6 className='theme-font text-muted'>CATEGORIES</h6>
                  <br/>
                  <h6 className='theme-font theme-danger my-3'>Home</h6>
                  <h6 className='theme-font text-secondary my-3'>Discounts</h6>
                  <h6 className='theme-font text-secondary my-3'>Collaboration</h6>
                  <h6 className='theme-font text-secondary my-3'>Customer Support</h6>
                  <h6 className='theme-font text-secondary my-3'>Design</h6>
                  <h6 className='theme-font text-secondary my-3'>Develop</h6>
                  <h6 className='theme-font text-secondary my-3'>Finance & Legal</h6>
                  <h6 className='theme-font text-secondary my-3'>Human Resources</h6>
                  <h6 className='theme-font text-secondary my-3'>IT & Security</h6>
                  <h6 className='theme-font text-secondary my-3'>Office Management</h6>
                  <h6 className='theme-font text-secondary my-3'>Workplace Giving</h6>
                </div>
              </div>
            </Col>
            <Col md={9}>
              <div className='px-3'>
                <div className="d-flex">
                  <div className="w-50">
                    <h5 className='theme-font m-0'>Recently Added</h5>
                  </div>
                  <div className="w-50 d-flex justify-content-end align-items-center">
                    <h6 className='theme-font text-muted m-0'>See All <BsArrowRight className='mx-2' /></h6>
                  </div>
                </div>
                <hr/>
                <Row>
                  <Col md={3}>
                    <SoftwareCard
                      image={fake1}
                      name='FaxPlus'
                      description='Lorem ipsum dolor sit amet'
                      price='$1,499.99'
                      reviews={5}
                    />
                  </Col>
                  <Col md={3}>
                    <SoftwareCard
                      image={fake2}
                      name='Metric.ai'
                      description='Lorem ipsum dolor sit amet'
                      price='$1,499.99'
                      reviews={5}
                    />
                  </Col>
                  <Col md={3}>
                    <SoftwareCard
                      image={fake3}
                      name='Rootly'
                      description='Lorem ipsum dolor sit amet'
                      price='$1,499.99'
                      reviews={5}
                    />
                  </Col>
                  <Col md={3}>
                    <SoftwareCard
                      image={fake4}
                      name='Comprehensive'
                      description='Lorem ipsum dolor sit amet'
                      price='$1,499.99'
                      reviews={5}
                    />
                  </Col>
                  <Col md={3}>
                    <SoftwareCard
                      image={fake5}
                      name='RemotePC'
                      description='Lorem ipsum dolor sit amet'
                      price='$1,499.99'
                      reviews={5}
                    />
                  </Col>
                  <Col md={3}>
                    <SoftwareCard
                      image={fake6}
                      name='Zero Networks'
                      description='Lorem ipsum dolor sit amet'
                      price='$1,499.99'
                      reviews={5}
                    />
                  </Col>
                  <Col md={3}>
                    <SoftwareCard
                      image={fake7}
                      name='Zendesk'
                      description='Lorem ipsum dolor sit amet'
                      price='$1,499.99'
                      reviews={5}
                    />
                  </Col>
                  <Col md={3}>
                    <SoftwareCard
                      image={fake8}
                      name='Dropbox'
                      description='Lorem ipsum dolor sit amet'
                      price='$1,499.99'
                      reviews={5}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br/>
      <Card className='bg-theme-danger p-2 border-0 theme-font text-white'>
        <Card.Body>
          <div className="d-flex w-100 px-4 py-2">
            <div className="w-50">
              <h3 className='m-0'>Can't find what you need?</h3>
            </div>
            <div className="d-flex justify-content-end w-50">
              <div className="">
                <button className='text-dark border-0 px-4 py-2 bg-white rounded'>Request an app</button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
export default AppStore;
