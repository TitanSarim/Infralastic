import './employee-tree-component.css';
import EmployeeCardComponent from '../EmployeeCardComponent';
import {
  deleteEmployee,
  fetchAllCompany,
  fetchCompanyEmployee,
  useGlobalDispatch,
  fetchAllEmployee,
} from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import { fetchManager } from '@infralastic/global-state';
import { BsBuildingSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface filterInterface {
  searchFilter: any;
  location: any;
  company: any;
  department: any;
  job: any;
}
const EmployeeTreeComponent = (props: filterInterface) => {
  const dispatch = useGlobalDispatch();
  const [companyData, setCompanyData] = useState([]);
  const [companyOriginalData, setCompanyOriginalData] = useState([]);
  const [managerEmp, setManagerEmp] = useState(false);
  const [employeeEmp, setEmployeeEmp] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [managerEmployeeOriginalData, setManagerEmployeeOriginalData] =
    useState([]);
  console.log(employeeData, 'employeeData');
  console.log(managerEmp, 'mag');
  console.log(employeeEmp, 'mag');

  const [managerEmployeeData, setManagerEmployeeData] = useState([]);
  const getCompany = () => {
    const config: any = {};
    try {
      dispatch(fetchAllCompany(config)).then(async (res: any) => {
        setCompanyOriginalData(res.payload.company_details);
        setCompanyData(res.payload.company_details);
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  const getEmployees = () => {
    const config: any = {};
    try {
      dispatch(fetchAllEmployee(config)).then(async (res: any) => {
        setOriginalData(res.payload.empolyee_details);
        setEmployeeData(res.payload.empolyee_details);
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  const applyFilters = () => {
    if (employeeEmp && !managerEmp) {
      let filteredData = [...originalData];

      if (props.searchFilter !== '') {
        const searchLetter = props.searchFilter.toLowerCase();

        filteredData = filteredData.filter((res: any) => {
          const employeeName = res.employee_name.toLowerCase();
          return employeeName.includes(searchLetter);
        });
      }
      if (props.department !== '') {
        filteredData = filteredData.filter(
          (res: any) => res.department_name === props.department
        );
      }
      if (props.company !== '') {
        filteredData = filteredData.filter(
          (res: any) => res.company_name === props.company
        );
      }
      if (props.location !== '') {
        filteredData = filteredData.filter(
          (res: any) => res.location_name === props.location
        );
      }
      if (props.job !== '') {
        filteredData = filteredData.filter(
          (res: any) => res.job_title === props.job
        );
      }

      setEmployeeData(filteredData);
    }

    if (managerEmp) {
      let filteredManagerData = [...managerEmployeeOriginalData];

      if (props.searchFilter !== '') {
        const searchLetter = props.searchFilter.toLowerCase();

        filteredManagerData = filteredManagerData.filter((res: any) => {
          const employeeName = res.employee_name.toLowerCase();
          return employeeName.includes(searchLetter);
        });
      }
      if (props.department !== '') {
        filteredManagerData = filteredManagerData.filter(
          (res: any) => res.department_name === props.department
        );
      }
      if (props.company !== '') {
        filteredManagerData = filteredManagerData.filter(
          (res: any) => res.company_name === props.company
        );
      }
      if (props.location !== '') {
        filteredManagerData = filteredManagerData.filter(
          (res: any) => res.location_name === props.location
        );
      }
      if (props.job !== '') {
        filteredManagerData = filteredManagerData.filter(
          (res: any) => res.job_title === props.job
        );
      }
      setManagerEmployeeData(filteredManagerData);
    }

    let filteredCompanyData = [...companyOriginalData];

    if (props.company !== '') {
      filteredCompanyData = filteredCompanyData.filter(
        (res: any) => res.company_name === props.company
      );
    }
    if (props.location !== '') {
      filteredCompanyData = filteredCompanyData.filter(
        (res: any) => res.location_name === props.location
      );
    }

    setCompanyData(filteredCompanyData);
  };

  useEffect(() => {
    applyFilters();
  }, [
    props.searchFilter,
    props.department,
    props.company,
    props.location,
    props.job,
    originalData,
    companyOriginalData,
    managerEmployeeOriginalData,
  ]);

  const handleManager = ({ id }: { id: any }) => {
    const formData: any = {
      employee_id: id,
    };
    try {
      dispatch(fetchManager(formData)).then(async (res: any) => {
        if (res.payload.success === false) {
          setManagerEmp(false);
        } else {
          setManagerEmployeeOriginalData(res.payload.empolyee_details);
          setManagerEmployeeData(res.payload.empolyee_details);
          setManagerEmp(!managerEmp);
        }
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  const handleEmployee = ({ id }: { id: any }) => {
    const formData: any = {
      company_id: id,
    };
    try {
      dispatch(fetchCompanyEmployee(formData)).then(async (res: any) => {
        if (res.payload.success === false) {
          setManagerEmp(false);
        } else {
          setOriginalData(res.payload.empolyee_details);
          setEmployeeData(res.payload.empolyee_details);
          setEmployeeEmp(!employeeEmp);
        }
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  useEffect(() => {
    getCompany();
    getEmployees();
  }, []);

  const delEmployee = async (id: any) => {
    const formData: any = {
      employee_id: id,
    };
    await deleteEmployee(formData).then((res: any) => {
      toast.success(res.data.result.msg);
      setEmployeeData((prevData) =>
        prevData.filter((item: any) => item.employee_id !== id)
      );
      setManagerEmployeeData((prevData) =>
        prevData.filter((item: any) => item.employee_id !== id)
      );
    });
  };
  return (
    // <div>
    <div>
      <div className="d-flex flex-column ">
        <div className="d-flex justify-content-center box1">
          {props.company !== '' ? (
            <>
              {companyData?.map((item: any) => (
                <EmployeeCardComponent
                  employee_id={JSON.parse(item.company_id)}
                  name={item.company_name}
                  image={item?.image_url}
                  handleClick={() =>
                    handleEmployee({ id: JSON.parse(item.company_id) })
                  }
                  designation=""
                  company_id={item?.company_id}
                  handleDelete={''}
                />
              ))}
            </>
          ) : (
            <div>
              <div className="d-flex justify-content-center">
                <BsBuildingSlash size={200} className="theme-danger" />
              </div>
              <p className="text-center my-2 theme-font">
                (No Company Selected)
              </p>
              <h3 className="theme-font">
                Please Select The Company From Filters
              </h3>
            </div>
          )}
        </div>
        <br />
        <br />

        {employeeEmp && (
          <div className="d-flex h-145 justify-content-start align-items-center box2">
            {employeeData
              ?.filter((res: any) => res.manager_name === false)
              .map((item: any) => (
                <div>
                  <EmployeeCardComponent
                    employee_id={JSON.parse(item.employee_id)}
                    name={item.employee_name}
                    image={item.image_url}
                    company_id=""
                    handleClick={() =>
                      handleManager({ id: JSON.parse(item.employee_id) })
                    }
                    designation={item.job_title}
                    handleDelete={() => delEmployee(item.employee_id)}
                  />
                </div>
              ))}
          </div>
        )}
        <br />
        {managerEmp && (
          <div className="d-flex overflow-auto justify-content-center h-145 align-items-center box3">
            {managerEmployeeData?.map((item: any) => (
              <div>
                <EmployeeCardComponent
                  employee_id={JSON.parse(item.employee_id)}
                  name={item.employee_name}
                  image={item.image_url}
                  company_id=""
                  handleClick={() => console.log('')}
                  designation={item.job_title}
                  handleDelete={() => delEmployee(item.employee_id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    /* <div className="container">
        <div className="row">
          <div className="tree">
            <ul>
              <li>
                {props.company !== '' ? (
                  <>
                    {companyData?.map((item: any) => (
                      <EmployeeCardComponent
                        employee_id={JSON.parse(item.company_id)}
                        name={item.company_name}
                        image={item?.image_url}
                        handleClick={() =>
                          handleEmployee({ id: JSON.parse(item.company_id) })
                        }
                        designation=""
                        company_id={item?.company_id}
                        handleDelete={''}
                      />
                      <a
                        onClick={() =>
                          handleEmployee({ id: JSON.parse(item.company_id) })
                        }
                      >
                        <img src={item?.image_url} />

                        <span>{item?.company_name}</span>
                      </a>
                    ))}
                  </>
                ) : (
                  <div>
                    <div className="d-flex justify-content-center">
                      <BsBuildingSlash size={200} className="theme-danger" />
                    </div>
                    <p className="text-center my-2 theme-font">
                      (No Company Selected)
                    </p>
                    <h3 className="theme-font">
                      Please Select The Company From Filters
                    </h3>
                  </div>
                )}

                <ul>
                  <li>
                    {employeeEmp && (
                      <>
                        {employeeData
                          ?.filter((res: any) => res.manager_name === false)
                          .map((item: any) => (
                            <div>
                              <a href="#">
                                <img src={item.image_url} />

                                <span>{item.employee_name}</span>
                              </a>
                            </div>
                          ))}
                      </>
                    )} */

    /* <ul>
                      <li>
                        <a href="#">
                          <span>Great Grand Child</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Great Grand Child</span>
                        </a>
                      </li>
                    </ul> */
    /* </li> */
    /* <li>
                    <a href="#">
                      <img src="images/9.jpg" />

                      <span>Grand Child</span>
                    </a> */
    /* <ul>
                      <li>
                        {' '}
                        <a href="#">
                          <span>Great Grand Child</span>
                        </a>{' '}
                      </li>
                      <li>
                        {' '}
                        <a href="#">
                          <span>Great Grand Child</span>
                        </a>{' '}
                      </li>
                      <li>
                        {' '}
                        <a href="#">
                          <span>Great Grand Child</span>
                        </a>{' '}
                      </li>
                    </ul> */
    /* </li> */
    /* <li>
                    <a href="#">
                      <img src="images/9.jpg" />
                      <span>Grand Child</span>
                    </a>
                  </li> */
    /* </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> */
  );
};
export default EmployeeTreeComponent;
