import './check-in-form-component.scss';
import {Card, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import bogus from '../../../../../assets/assign-stamp.png'
import {checkIn, getAllAssets, getAllEmployee, useGlobalDispatch} from "@infralastic/global-state";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { format } from 'date-fns';
import {fetchAllDepartment} from "@infralastic/global-state";

const CheckInFormComponent = () => {
    const router = useNavigate();
    const dispatch = useGlobalDispatch();
    const [checkInDate, setCheckInDate] = useState('');
    const [assets, setAssets] = useState('');
    const [checkOutNotes, setCheckOutNotes] = useState('');
    const [assignee, setAssignee] = useState('');
    const [assetData, setAssetData] = useState<any>([])
    const [employeeData, setEmployeeData] = useState<any>([]);
    const [department, setDepartment] = useState<any>([]);

    useEffect(() => {
      const fetchCurrentDate = () => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0]; // Format date as "YYYY-MM-DD"
        setCheckInDate(formattedDate);
      };

      fetchCurrentDate();
    }, []);



  function fetchAssets() {
        const formData: any = {
            page_no: 1
        }
        getAllAssets(formData).then((res: any) => {
            setAssetData(res.data.result.asset_details)
        })
    }

    useEffect(() => {
        fetchAssets();
    }, [])

    const handleSubmit = () => {
        const formData: any = {
            asset_unique_id: JSON.parse(assets),
            check_in_notes: checkOutNotes,
            check_in_date: checkInDate,
        }
        checkIn(formData).then((res: any) => {
            toast.success(res.data.result.msg)
            setTimeout(() => {
                router('/all-assets')
            }, 3000)
        })
    }

    useEffect(() => {
      try {
        const selectedAsset = assetData.find((item: any) => item.asset_unique_id === JSON.parse(assets));
        console.log("Selected Asset:", selectedAsset);
        if (selectedAsset) {
          setAssignee(selectedAsset.employee_name);
          setDepartment(selectedAsset.department_name);
        }
      } catch (error) {
        console.error("Error finding selected asset:", error);
      }
    }, [assets, assetData]);

  return(
      <div>
          <Card>
              <Card.Body>
                  <div className='px-3'>
                      <h4 className='theme-font py-4'>Asset CheckIn</h4>
                      <Form>
                          <Row>
                              <Col md={6}>
                                  <Form.Group className="mb-2" controlId="formBasicCompany">
                                      <Form.Label className='fs-7 mb-1 theme-font'>Assets</Form.Label>
                                      <Form.Select
                                          className='px-2 py-1 fs-7 theme-font text-muted'
                                          aria-label="Default select example"
                                          required={true}
                                          value={assets}
                                          onChange={(e) => setAssets(e.target.value)}
                                          >
                                          <option value=''>Select Assets</option>
                                          {assetData?.filter((item: any) => item.employee_id !== false).map((item: any) => (
                                            <option value={item.asset_unique_id}>{item.asset_name}</option>
                                          ))}
                                      </Form.Select>
                                  </Form.Group>
                              </Col>
                              <Col md={6}>
                                  <Form.Group className="mb-2" controlId="formBasicCompany">
                                      <Form.Label className='fs-7 mb-1 theme-font'>Assignee</Form.Label>
                                      <Form.Control
                                        className='px-2 py-1 fs-7'
                                        type="text"
                                        value={assignee}
                                        placeholder="Assignee"
                                        required={true}
                                        disabled={true}
                                      />
                                  </Form.Group>
                              </Col>
                              <Col md={6}>
                                  <Form.Group className="mb-2" controlId="formBasicCompany">
                                      <Form.Label className='fs-7 mb-1 theme-font'>Department</Form.Label>
                                      <Form.Control
                                        className='px-2 py-1 fs-7'
                                        type="text"
                                        value={department}
                                        placeholder="Department"
                                        required={true}
                                        disabled={true}
                                      />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                  <Form.Group className="mb-2" controlId="formBasicFirstName">
                                      <Form.Label className='fs-7 mb-1 theme-font'>Check In Date</Form.Label>
                                      <Form.Control
                                        className='px-2 py-1 fs-7'
                                        type="date"
                                        value={checkInDate}
                                        placeholder="Check In Date"
                                        onChange={(e) => setCheckInDate(e.target.value)}
                                        required={true}
                                      />
                                  </Form.Group>
                              </Col>
                              <Col md={6}>
                                  <Form.Group className="mb-2" controlId="formBasicFirstName">
                                      <Form.Label className='fs-7 mb-1 theme-font'>Check In Notes</Form.Label>
                                      <Form.Control
                                          className='px-2 py-1 fs-7'
                                          type="name"
                                          as="textarea" rows={2}
                                          value={checkOutNotes}
                                          placeholder="Lorem ipsum dolor sit amet consectetur. Nunc molestie nibh nulla mauris laoreet arcu. Quisque ultricies "
                                          onChange={(e) => setCheckOutNotes(e.target.value)}
                                          required={true}
                                      />
                                  </Form.Group>
                              </Col>
                              <Row>
                                  <Col md={6}>
                                      <Form.Group className="mb-2" controlId="formBasicFirstName">
                                          <Form.Label className='fs-7 mb-1 theme-font'>Digital Stamp</Form.Label>
                                          <p className='fs-7 theme-font'>I will not break, lose or sell this precious asset </p>
                                      </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                      <div className='d-flex justify-content-center border rounded mt-3'>
                                          <img src={bogus} height={145} width={145} alt=""/>
                                      </div>
                                  </Col>
                              </Row>
                          </Row>
                      </Form>
                      <br/>
                      <div className="d-flex justify-content-end w-100">
                          <button
                              type='button'
                              className='mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0'>
                             Cancel
                          </button>
                          <button
                              onClick={() => handleSubmit()}
                              type='button'
                              className='me-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0'>
                              Check In
                          </button>
                      </div>
                  </div>
              </Card.Body>
          </Card>
      </div>
  )
}
export default CheckInFormComponent;
