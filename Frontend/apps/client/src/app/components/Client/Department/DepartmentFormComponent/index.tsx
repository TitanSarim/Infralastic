import './department-form-component.scss';
import {Card, Col, Form, Row} from "react-bootstrap";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import avatar from '../../../../../assets/employees/Avatar.png'
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {storage} from "../../../../services/config/firebase";
import {toast} from "react-toastify";
import {
  addNewDepartment, fetchAllCompany,
  fetchDepartmentById,
  updateDepartmentById,
  useGlobalSelector,
} from "@infralastic/global-state";
import {fetchAllEmployee} from "@infralastic/global-state";
import {useGlobalDispatch} from "@infralastic/global-state";
import Select from "react-select";

const DepartmentFormComponent = () => {
    const router = useNavigate();
    const dispatch = useGlobalDispatch();
    const [name, setName] = useState('');
    const [departmentHead, setDepartmentHead] = useState('');
    const [employeeData, setEmployeeData] = useState<any>(null);
    const [file, setFile] = useState<any>(null);
    const [imageFile, setImageFile] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [company, setCompany] = useState('');
    const [companyData, setCompanyData] = useState<any>([])
    const [searchParams, setSearchParams] = useSearchParams();
    const { userInfo } = useGlobalSelector((state) => state.user);
    const id: any = searchParams.get('department_id')

    const clear = () => {
        setName('');
        setDepartmentHead('');
    }
    const imageHandler = (e:any) => {
        setFile(e.target.files[0]);
        setImageFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = () => {
        const storageRef = ref(storage, `department/${file?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            () => {
            },
            (error: any) => {
                alert(error);
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
                    toast.success('Image Uploaded Successfully')
                    console.log(url)
                    setImageURL(url)
                    if (!id) {
                      const formData: any = {
                        department_name: name,
                        manager_id: departmentHead !== '' ? JSON.parse(departmentHead) : 0,
                        image_url: url,
                        company_id: JSON.parse(company),
                        user_id: userInfo?.result?.user_id
                      }
                      try {
                        dispatch(addNewDepartment(formData)).then(async (res: any) => {
                          console.log(res)
                          if (res.payload.success === true) {
                            toast.success(res.payload.msg);
                            setTimeout(() => {
                              router('/department')
                            }, 3000)
                          } else {
                            toast.error(res.payload.msg);
                          }
                        });
                      } catch (err: any) {
                        console.error(err);
                        toast.error('Access Denied');
                      }
                    } else if (id) {
                      const formData: any = {
                        department_name: name,
                        manager_id: departmentHead !== '' ? JSON.parse(departmentHead) : 0,
                        image_url: url,
                        department_id: id,
                        company_id: JSON.parse(company),
                        user_id: userInfo?.result?.user_id
                      }
                      try {
                        dispatch(updateDepartmentById(formData)).then(async (res: any) => {
                          console.log(res)
                          if (res.payload.success === true) {
                            toast.success(res.payload.msg);
                            setTimeout(() => {
                              router('/department')
                            }, 3000)
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

    }

    const getEmployees = () => {
        const config: any = {}
        try {
            dispatch(fetchAllEmployee(config)).then(async (res: any) => {
                setEmployeeData(res.payload.empolyee_details)
            });
        } catch (err: any) {
            console.error(err);
        }
    }
    const getDepartment = () => {
        const formData: any = {
            department_id: id
        }
        try {
            dispatch(fetchDepartmentById(formData)).then(async (res: any) => {
               setImageFile(res.payload.image_url);
               setName(res.payload.department_name);
               setCompany(res.payload.company_id)
               setDepartmentHead(res.payload.manager_id)
            });
        } catch (err: any) {
            console.error(err);
        }
    }

    const getCompany = () => {
      const config: any = {}
      try {
        dispatch(fetchAllCompany(config)).then(async (res: any) => {
          setCompanyData(res.payload.company_details)
        });
      } catch (err: any) {
        console.error(err);
      }
    }

    useEffect(() => {
        getEmployees();
        getCompany();
        if (id) {
            getDepartment();
            getCompany();
        }
    }, [])

    return(
        <>
            <br/>
            <br/>
            <Card className='border-0 shadow p-2'>
                <Card.Body>
                    <div>
                        <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column px-3 w-100">
                                <div className="d-flex align-items-center w-100">
                                    <div className="d-flex w-100">
                                        <div className='d-flex align-items-center w-100'>
                                            <div>
                                                <label>
                                                    {imageFile &&
                                                        <img src={imageFile} height='100' width='100' className=' rounded-circle' alt="Image"/>
                                                    }
                                                    {!imageFile &&
                                                        <img className='rounded-circle' height='100' width='100' src={avatar} alt=""/>
                                                    }
                                                </label>
                                            </div>
                                            <div className='d-flex'>
                                                <input
                                                  type="file"
                                                  id="filePicker"
                                                  hidden
                                                  onChange={(e) => imageHandler(e)}
                                                />
                                                <button
                                                    type='button'
                                                    onClick={() => document.getElementById('filePicker')!.click()}
                                                    className='mx-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0'>
                                                    Upload Department Photo
                                                </button>
                                                <button
                                                    type='button'
                                                    className='mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0'>
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className='m-0 fs-7 text-muted py-1'>Allowed JPG, GIF or PNG. Max size of 800K</p>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-2" controlId="formBasicFirstName">
                                        <Form.Label className='fs-7 mb-1 theme-font'>Department Name *</Form.Label>
                                        <Form.Control
                                            className={name !== '' ? 'px-2 py-1 fs-7 custom-search-select' : 'px-2 py-1 fs-7 theme-border-danger custom-search-select'}
                                            type="name"
                                            value={name}
                                            placeholder="Enter Department Name"
                                            onChange={(e) => setName(e.target.value)}
                                            required={true}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2" controlId="formBasicManager">
                                        <Form.Label className='fs-7 mb-1 theme-font'>Department Head</Form.Label>
                                        <Select
                                            className='fs-7 theme-font text-muted custom-search-select'
                                            isDisabled={company === ''}
                                            options={employeeData?.filter((res: any) => res.company_id == company).map((item: any) => ({
                                                value: item.employee_id,
                                                label: item.employee_name
                                            }))}
                                            onChange={(selectedOption: any) => setDepartmentHead(selectedOption.value)}
                                            placeholder="Select Department Head"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2" controlId="formBasicCompany">
                                        <Form.Label className='fs-7 mb-1 theme-font'>Company</Form.Label>
                                        <Form.Select
                                            className='fs-7 theme-font text-muted custom-search-select'
                                            aria-label="Default select example"
                                            required={true}
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            >
                                            <option value=''>Select Site</option>
                                            {companyData?.map((item: any) => (
                                              <option value={item?.company_id}>{item?.company_name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <br/>
                        <br/>
                        <div className="d-flex justify-content-end w-100">
                            <button
                                onClick={() => router('/department')}
                                type='button'
                                className='mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0'>
                                <BsArrowLeft className='theme-danger me-2' />Back
                            </button>
                            <button
                                type='button'
                                disabled={[name, imageFile].includes('')}
                                onClick={() => handleSubmit()}
                                className='me-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0'>
                                Save
                            </button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
export default DepartmentFormComponent;
