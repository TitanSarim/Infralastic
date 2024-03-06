import './employee-form-component.scss';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import avatar from '../../../../../assets/employees/Avatar.png';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { storage } from '../../../../services/config/firebase';
import { toast } from 'react-toastify';
import {
  addEmployee,
  fetchAllEmployee,
  fetchEmployee,
  getLocation,
  updateEmployeeById,
  useGlobalDispatch,
  useGlobalSelector,
} from '@infralastic/global-state';
import { fetchAllCompany } from '@infralastic/global-state';
import { fetchAllDepartment } from '@infralastic/global-state';
import Papa from 'papaparse';

const EmployeeFormComponent = () => {
  const router = useNavigate();
  const dispatch = useGlobalDispatch();
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [firstName, setFirstName] = useState<any>('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [company, setCompany] = useState<any>('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState<any>(null);
  const [manager, setManager] = useState<any>(0);
  const [location, setLocation] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [imageFile, setImageFile] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [companyData, setCompanyData] = useState<any>([]);
  const [departmentData, setDepartmentData] = useState<any>([]);
  const [managerData, setManagerData] = useState<any>([]);
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [locationData, setLocationData] = useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id: any = searchParams.get('employee_id');
  const { userInfo } = useGlobalSelector((state) => state.user);
  console.log(userInfo, 'id');

  useEffect(() => {
    getCompany();
    getDepartment();
    getManager();
    fetchLocation();
    // let params = serializeFormQuery(event.target);
    // console.log(params)
    if (id) {
      getEmployeeById();
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      parseFile(file);
    }
  };

  const parseFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      const { data } = Papa.parse(text, { header: true });
      console.log(data);
      data?.map((item: any) => {
        setFirstName(item?.firstName);
        setLastName(item?.lastName);
        setEmail(item?.email);
        setJob(item?.job);
        setPhone(item?.phone);
      });
    };

    reader.readAsText(file);
  };

  const fetchLocation = () => {
    const config = {};
    getLocation(config).then((res: any) => {
      setLocationData(res.data.result.location_details);
    });
  };

  const getEmployeeById = () => {
    const formData: any = {
      employee_id: id,
    };
    try {
      dispatch(fetchEmployee(formData)).then(async (res: any) => {
        setEmployeeData(res.payload);
        setFirstName(res?.payload?.first_name);
        setLastName(res?.payload?.last_name);
        setEmail(res?.payload?.last_name);
        setJob(res?.payload?.job_title);
        setPhone(res?.payload?.phone);
        setDepartment(
          res?.payload?.department_name !== false
            ? res?.payload?.department_name
            : 0
        );
        setManager(
          res?.payload?.manager_name !== false ? res?.payload?.manager_name : 0
        );
        setEmploymentStatus(res?.payload?.employee_status);
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const clear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setJob('');
    setCompany(0);
    setPhone('');
    setDepartment(0);
    setManager(0);
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
  const getDepartment = () => {
    const config: any = {};
    try {
      dispatch(fetchAllDepartment(config)).then(async (res: any) => {
        setDepartmentData(res.payload.departments_details);
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  const getManager = () => {
    const config: any = {};
    try {
      dispatch(fetchAllEmployee(config)).then(async (res: any) => {
        setManagerData(res.payload.empolyee_details);
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  console.log(managerData);
  const imageHandler = (e: any) => {
    setFile(e.target.files[0]);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (company) {
      const selectedCompany = companyData.find(
        (item: any) => item.company_id === parseInt(company, 10)
      );
      if (selectedCompany) {
        setLocation(selectedCompany?.location_id);
      }
    }
  }, [company, companyData]);

  const handleSubmit = () => {
    const storageRef = ref(storage, `employees/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        alert(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          toast.success('Image Uploaded Successfully');
          console.log(url);
          setImageURL(url);
          if (!id) {
            const formData: any = {
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone: phone,
              image_url: url,
              job_title: job,
              employee_id: JSON.parse(id),

              company_id: JSON.parse(company),
              manager_id: JSON.parse(manager),
              location_id: JSON.parse(location),
              department_id: JSON.parse(department),
              employee_status: JSON.parse(employmentStatus),
              user_id: userInfo?.result?.user_id
                ? userInfo?.result?.user_id
                : userInfo.user_id,
            };
            try {
              dispatch(addEmployee(formData)).then(async (res: any) => {
                if (res?.payload?.success === true) {
                  toast.success(res?.payload?.msg);
                  setTimeout(() => {
                    router('/employee-view');
                  }, 3000);
                } else {
                  toast.error(res?.payload);
                }
              });
            } catch (err: any) {
              console.error(err);
              toast.error('Access Denied');
            }
          } else if (id) {
            const formData: any = {
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone: phone,
              image_url: url,
              employee_id: JSON.parse(id),
              job_title: job,
              company_id: JSON.parse(company),
              manager_id: JSON.parse(manager),
              location_id: JSON.parse(location),
              department_id: JSON.parse(department),
              employee_status: JSON.parse(employmentStatus),
              user_id: userInfo?.result?.user_id
                ? userInfo?.result?.user_id
                : userInfo.user_id,
            };
            try {
              dispatch(updateEmployeeById(formData)).then(async (res: any) => {
                if (res.payload.success === true) {
                  toast.success(res.payload.msg);
                  setTimeout(() => {
                    router('/employee-view');
                  }, 3000);
                } else {
                  toast.error(res.payload.msg);
                }
              });
            } catch (err: any) {
              console.error(err);
              toast.error('Access Denied');
            }
          }
        });
      }
    );
  };

  return (
    <>
      <br />
      <br />
      <Card className="border-0 shadow p-2">
        <Card.Body>
          <div>
            <div className="d-flex">
              <div className="d-flex justify-content-center flex-column px-3 w-100">
                <div className="d-flex align-items-center w-100">
                  <div className="d-flex w-100">
                    <div className="d-flex align-items-center w-100">
                      <div>
                        <label>
                          {imageFile && (
                            <img
                              src={imageFile}
                              height="100"
                              width="100"
                              className=" rounded-circle"
                              alt="Image"
                            />
                          )}
                          {!imageFile && (
                            <img
                              className="rounded-circle"
                              height="100"
                              width="100"
                              src={
                                employeeData?.image_url
                                  ? employeeData?.image_url
                                  : avatar
                              }
                              alt=""
                            />
                          )}
                        </label>
                      </div>
                      <div className="d-flex">
                        <input
                          type="file"
                          id="filePicker"
                          hidden
                          onChange={(e) => imageHandler(e)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById('filePicker')!.click()
                          }
                          className="mx-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
                        >
                          Upload Employee Photo
                        </button>
                        <button
                          type="button"
                          className="mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end w-100">
                      <label>
                        <input
                          type="file"
                          id="logo"
                          hidden
                          onChange={(e) => handleFileChange(e)}
                        />
                        <span className="fs-7 theme-danger theme-border-danger px-3 py-2 theme-font rounded">
                          Import Employee Data{' '}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <p className="m-0 fs-7 text-muted py-1">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>
            <br />
            <br />
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicFirstName">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      First Name *
                    </Form.Label>
                    <Form.Control
                      className={
                        firstName !== ''
                          ? 'px-2 py-1 fs-7'
                          : 'px-2 py-1 fs-7 theme-border-danger'
                      }
                      type="name"
                      value={firstName}
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      required={true}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicLastName">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Last Name *
                    </Form.Label>
                    <Form.Control
                      className={
                        lastName !== ''
                          ? 'px-2 py-1 fs-7'
                          : 'px-2 py-1 fs-7 theme-border-danger'
                      }
                      type="name"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      required={true}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Email Address *
                    </Form.Label>
                    <Form.Control
                      className={
                        email !== ''
                          ? 'px-2 py-1 fs-7 theme-font'
                          : 'px-2 py-1 fs-7 theme-border-danger'
                      }
                      type="email"
                      value={email}
                      placeholder="Enter Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      required={true}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicJob">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Job Designation *
                    </Form.Label>
                    <Form.Control
                      className={
                        job !== ''
                          ? 'px-2 py-1 fs-7 theme-font'
                          : 'px-2 py-1 fs-7 theme-border-danger'
                      }
                      type="text"
                      value={job}
                      placeholder="Enter Job Designation"
                      onChange={(e) => setJob(e.target.value)}
                      required={true}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicCompany">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Company *
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      required={true}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    >
                      <option value="0">Select Company</option>
                      {companyData?.map((item: any) => (
                        <option value={item.company_id}>
                          {item.company_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicPhone">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Phone Number *
                    </Form.Label>
                    <Form.Control
                      className={
                        phone !== ''
                          ? 'px-2 py-1 fs-7 theme-font'
                          : 'px-2 py-1 fs-7 theme-border-danger'
                      }
                      type="number"
                      value={phone}
                      placeholder="Enter Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicDepartment">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Department *
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      value={department}
                      disabled={company === ''}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="0">Select Department</option>
                      {departmentData
                        ?.filter((item: any) => item?.company_id == company)
                        .map((item: any) => (
                          <option value={item?.department_id}>
                            {item?.department_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicManager">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Manager
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      value={manager}
                      disabled={company === ''}
                      onChange={(e) => setManager(e.target.value)}
                    >
                      <option value="0">Select Manager</option>
                      {managerData
                        ?.filter(
                          (res: any) =>
                            res.manager_name === false &&
                            res.company_id == company
                        )
                        .map((item: any) => (
                          <option value={item?.employee_id}>
                            {item.employee_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicManager">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Location
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={company === ''}
                      value={location}
                    >
                      <option value="">Select Location</option>
                      {companyData
                        ?.filter((item: any) => item?.company_id == company)
                        .map((item: any) => (
                          <option
                            value={item?.location_id}
                            className="theme-font fs-7"
                          >
                            {item?.location_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicManager">
                    <Form.Label className="fs-7 mb-1 theme-font">
                      Employment Status
                    </Form.Label>
                    <Form.Select
                      className="px-2 py-1 fs-7 theme-font text-muted"
                      aria-label="Default select example"
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value={'true'}>Active</option>
                      <option value={'false'}>Un-Active</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <br />
            <br />
            <div className="d-flex justify-content-end w-100">
              <button
                onClick={() => router('/employees')}
                type="button"
                className="mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
              >
                <BsArrowLeft className="theme-danger me-2" />
                Back
              </button>
              <button
                type="button"
                disabled={[
                  firstName,
                  lastName,
                  email,
                  job,
                  company,
                  phone,
                  imageURL,
                  employmentStatus,
                ].includes('' || 0)}
                onClick={() => handleSubmit()}
                className="me-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
              >
                {id ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-center mt-2">
        <button className="bg-transparent border-0 mb-3 theme-danger fs-5 theme-font d-flex align-items-center">
          <AiOutlinePlus className="me-2" size={22} />
          Add More Employees{' '}
        </button>
      </div>
    </>
  );
};
export default EmployeeFormComponent;
