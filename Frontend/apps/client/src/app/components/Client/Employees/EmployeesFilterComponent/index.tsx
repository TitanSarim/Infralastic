import {Col, Row, InputGroup, Form} from "react-bootstrap";
import './employees-filter-component.scss';
import {FiMapPin} from "react-icons/fi";
import {BsBuildings} from "react-icons/bs";
import {BiSearch, BiSitemap, BiUserCheck} from "react-icons/bi";
import {getAllJobs, getLocation} from "@infralastic/global-state";
import {useEffect, useState} from "react";
import {fetchAllCompany, useGlobalDispatch} from "@infralastic/global-state";
import {fetchAllDepartment} from "@infralastic/global-state";

interface filterProps {
  searchData: any;
  location: any;
  department: any;
  job: any;
  company: any
}
const EmployeeFilterComponent = (props: filterProps) => {
    const dispatch = useGlobalDispatch();
    const [locationData, setLocationData] = useState<any>([]);
    const [companyData, setCompanyData] = useState<any>([]);
    const [company, setCompany] = useState<any>('');
    const [departmentData, setDepartmentData] = useState<any>([]);
    const [jobData, setJobData] = useState<any>([]);
    const [department, setDepartment] = useState<any>('');
    const fetchLocation = () => {
        const config = {}
        getLocation(config).then((res: any) => {
            setLocationData(res.data.result.location_details)
        })
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
    function handleCompany(e: any ) {
        props.company(e.target.value)
        setCompany(e.target.value)
    }
    function handleDepartment(e: any ) {
        props.department(e.target.value)
        setDepartment(e.target.value)
    }
    const getDepartment = () => {
        const config: any = {}
        try {
            dispatch(fetchAllDepartment(config)).then(async (res: any) => {
                setDepartmentData(res?.payload?.departments_details)
            });
        } catch (err: any) {
            console.error(err);
        }
    }
    const getJobs = () => {
      const config: any = {}
      getAllJobs(config).then((res: any) => {
        setJobData(res?.data.result?.job_details)
      })
    }

    useEffect(() => {
        fetchLocation();
        getCompany();
        getDepartment();
        getJobs();
    }, [])
  return(
      <div className='d-flex align-items-center justify-content-center w-100'>
          <div className='pe-3'>
              <InputGroup className="shadow p-2 bg-white rounded">
                  <InputGroup.Text
                      className='bg-white border-0'
                      id="basic-addon1">
                      <BiSearch size={22} />
                  </InputGroup.Text>
                  <input
                      type='text'
                      className='fs-7 border-0'
                      id='outline-none'
                      placeholder="Search Employee"
                      aria-label="Username"
                      onChange={(e: any) => props.searchData(e.target.value)}
                  />
              </InputGroup>
          </div>
          <div className='bg-dark filter-container rounded p-2'>
              <Row>

                  <Col className='br-1' md={4}>
                      <Form.Group controlId="company">
                          <InputGroup>
                              <InputGroup.Text id="basic-addon2" className='bg-white px-2'><BsBuildings className='me-2'/></InputGroup.Text>
                              <Form.Select
                                className='py-2 ps-0 fs-7 theme-font text-muted border-start-0 '
                                aria-label="Default select example"
                                required={true}
                                onChange={(e: any) => handleCompany(e)}
                              >
                                <option value=''>Select Site</option>
                                {companyData?.map((item: any) => (
                                  <option value={item?.company_name} className='theme-font fs-7'>{item?.company_name}</option>
                                ))}
                              </Form.Select>
                          </InputGroup>
                      </Form.Group>
                  </Col>
                  <Col className='br-1' md={4}>
                      <Form.Group controlId="department">
                          <InputGroup>
                              <InputGroup.Text id="basic-addon2" className='bg-white px-2'><BiSitemap className='me-2'/></InputGroup.Text>
                              <Form.Select
                                disabled={company === ""}
                                className='py-2 ps-0 fs-7 theme-font text-muted border-start-0 '
                                aria-label="Default select example"
                                required={true}
                                onChange={(e: any) => handleDepartment(e)}
                              >
                                <option value=''>Select Department</option>
                                {departmentData?.filter((item:any) => item.company_name == company).map((item: any) => (
                                  <option value={item?.department_name} className='theme-font fs-7'>{item?.department_name}</option>
                                ))}
                              </Form.Select>
                        </InputGroup>
                      </Form.Group>
                  </Col>
                  <Col md={4}>
                      <Form.Group controlId="designation">
                          <InputGroup>
                              <InputGroup.Text id="basic-addon2" className='bg-white px-2'><BiUserCheck className='me-2'/></InputGroup.Text>
                              <Form.Select
                                className='py-2 ps-0 fs-7 theme-font text-muted border-start-0 '
                                aria-label="Default select example"
                                required={true}
                                disabled={department === ""}
                                onChange={(e: any) => props.job(e.target.value)}
                              >
                                <option value=''>Select Designation</option>
                                {jobData?.filter((item: any) => item.department_name == department)?.map((item: any) => (
                                  <option value={item.job_name} className='theme-font fs-7'>{item?.job_name}</option>
                                ))}
                            </Form.Select>
                          </InputGroup>
                      </Form.Group>
                  </Col>
              </Row>
          </div>
      </div>
  )
}
export default EmployeeFilterComponent;
