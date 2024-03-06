import './check-out-form-component.scss';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import bogus from '../../../../../assets/assign-stamp.png';
import {
  checkOut,
  fetchAllCompany,
  getAllAssets,
  getAllEmployee,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllDepartment,
  useGlobalDispatch,
} from '@infralastic/global-state';

const CheckOutFormComponent = () => {
  const dispatch = useGlobalDispatch();
  const router = useNavigate();
  const [email, setEmail] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [dueByDate, setDueByDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [department, setDepartment] = useState<any>([]);
  const [departmentId, setDepartmentId] = useState<any>('');
  const [assets, setAssets] = useState('');
  const [conditionAtCheckOut, setConditionAtCheckOut] = useState('');
  const [personStatus, setPersonStatus] = useState('');
  const [checkOutNotes, setCheckOutNotes] = useState('');
  const [permanent, setPermanent] = useState(false);
  const [assetData, setAssetData] = useState<any>([]);
  const [employeeData, setEmployeeData] = useState<any>([]);
  const [company, setCompany] = useState('');
  const [companyData, setCompanyData] = useState<any>([]);
  const [assetStatus, setAssetStatus] = useState<any>('');
  function fetchAssets() {
    const formData: any = {
      page_no: 1,
    };
    getAllAssets(formData).then((res: any) => {
      setAssetData(res.data.result.asset_details);
    });
  }

  function fetchAllEmployees() {
    const config: any = {};

    getAllEmployee(config).then((res: any) => {
      setEmployeeData(res.data.result.empolyee_details);
    });
  }

  const getDepartment = () => {
    const config: any = {};
    try {
      dispatch(fetchAllDepartment(config)).then(async (res: any) => {
        setDepartment(res.payload.departments_details);
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const getCompany = () => {
    const config: any = {};
    try {
      dispatch(fetchAllCompany(config)).then(async (res: any) => {
        setCompanyData(res.payload.company_details);
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
    fetchAssets();
    getDepartment();
    getCompany();
  }, []);

  const handleSubmit = () => {
    const formData: any = {
      asset_unique_id: JSON.parse(assets),
      employee_id: JSON.parse(assignee),
      employee_email: email,
      permanent: permanent ? 'True' : 'False',
      condition: conditionAtCheckOut,
      person_status: personStatus,
      check_out_notes: checkOutNotes,
      digital_stamp: 'digital_stamp',
      check_out_date: checkOutDate,
      due_by_date: dueByDate,
      department_id: JSON.parse(departmentId),
      company_id: JSON.parse(company),
      asset_status: assetStatus,
    };
    checkOut(formData).then((res: any) => {
      toast.success(res.data.result.msg);
      setTimeout(() => {
        router('/confirm-assets');
      }, 3000);
    });
  };
  console.log(department);
  useEffect(() => {
    try {
      const assigneeJSON = JSON.parse(assignee);
      const selectedEmployee = employeeData.find(
        (item: any) => item.employee_id === assigneeJSON
      );
      if (selectedEmployee) {
        setEmail(selectedEmployee?.email);
        setPersonStatus(selectedEmployee?.employee_status);
      }
    } catch (error) {
      console.error('Error parsing assignee JSON:', error);
    }
  }, [assignee, employeeData]);

  useEffect(() => {
    const fetchCurrentDate = () => {
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0]; // Format date as "YYYY-MM-DD"
      setCheckOutDate(formattedDate);
    };

    fetchCurrentDate();
  }, []);

  return (
    <div>
      <Card>
        <Card.Body>
          <div className="px-3">
            <h4 className="theme-font py-4">Asset Check-Out</h4>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicFirstName">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      User Email
                    </Form.Label>
                    <Form.Control
                      className="px-2 py-1 fs-7"
                      type="name"
                      value={email}
                      placeholder="User Email"
                      required={true}
                      disabled={true}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicFirstName">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Check Out Date
                    </Form.Label>
                    <Form.Control
                      className="px-2 py-1 fs-7"
                      type="date"
                      value={checkOutDate}
                      placeholder="Check Out Date"
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      required={true}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicStatus">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Asset Status
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      required={true}
                      value={assetStatus}
                      onChange={(e) => setAssetStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Temporary">Temporary</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicCompany">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Assignee
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      required={true}
                      disabled={departmentId === ''}
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                    >
                      <option value="">Select Assignee</option>
                      {employeeData
                        ?.filter(
                          (item: any) => item.department_id == departmentId
                        )
                        .map((item: any) => (
                          <option value={item.employee_id}>
                            {item.employee_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicCompany">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Company
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      required={true}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    >
                      <option value="">Select Company</option>
                      {companyData?.map((item: any) => (
                        <option value={item?.company_id}>
                          {item?.company_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicCompany">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Department
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      required={true}
                      value={departmentId}
                      disabled={company === ''}
                      onChange={(e) => setDepartmentId(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {department
                        ?.filter((item: any) => item.company_id == company)
                        .map((item: any) => (
                          <option value={item.department_id}>
                            {item.department_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicFirstName">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Due By Date
                    </Form.Label>
                    <Form.Control
                      className="px-2 py-1 fs-7"
                      type="date"
                      value={dueByDate}
                      disabled={permanent}
                      placeholder="Due By Date"
                      onChange={(e) => setDueByDate(e.target.value)}
                      required={true}
                    />
                  </Form.Group>
                  <div className="d-flex">
                    <input
                      onClick={() => setPermanent(!permanent)}
                      type="checkbox"
                    />
                    <p className="m-0 ms-2 theme-font fs-7 text-muted">
                      Permanent
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicCompany">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Assets
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      required={true}
                      value={assets}
                      onChange={(e) => setAssets(e.target.value)}
                    >
                      <option value="">Select Assets</option>
                      {assetData
                        ?.filter((item: any) => item.employee_id === false)
                        .map((item: any) => (
                          <option value={item.asset_unique_id}>
                            {item.asset_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicCompany">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Condition at Check Out
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      required={true}
                      value={conditionAtCheckOut}
                      onChange={(e) => setConditionAtCheckOut(e.target.value)}
                    >
                      <option value="">Select Condition at Check Out</option>
                      <option value="New">New</option>
                      <option value="Old">Old</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicCompany">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Person Status
                    </Form.Label>
                    <Form.Control
                      className="px-2 py-1 fs-7"
                      type="text"
                      value={personStatus}
                      placeholder="Person Status"
                      disabled={true}
                      required={true}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicFirstName">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Check Out Notes
                    </Form.Label>
                    <Form.Control
                      className="px-2 py-1 fs-7"
                      type="name"
                      as="textarea"
                      rows={2}
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
                      <Form.Label className="fs-7 mb-1 theme-font">
                        Digital Stamp
                      </Form.Label>
                      <p className="fs-7 theme-font">
                        I will not break, lose or sell this precious asset{' '}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <div className="d-flex justify-content-center border rounded mt-3">
                      <img src={bogus} height={145} width={145} alt="" />
                    </div>
                  </Col>
                </Row>
              </Row>
            </Form>
            <br />
            <div className="d-flex justify-content-end w-100">
              <button
                type="button"
                className="mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit()}
                type="button"
                className="me-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
              >
                Check Out
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default CheckOutFormComponent;
