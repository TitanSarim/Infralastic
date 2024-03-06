import './employee-card-component.scss';
import {Card, Dropdown, DropdownButton} from "react-bootstrap";
import {useState} from "react";
import {BiDotsVerticalRounded} from "react-icons/bi";
import EmployeeModalComponent from "../../../Modals/EmployeeModal";
import {AiOutlineEdit} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import {HiBars3} from "react-icons/hi2";
import {
  fetchAllCompany,
  fetchEmployee,
  fetchEmployeeAsset,
  getCompanyById,
  useGlobalDispatch
} from "@infralastic/global-state";

import {createSearchParams, useNavigate} from "react-router-dom";
const EmployeeCardComponent = (
   {name, employee_id, image, designation, handleClick, handleDelete, company_id}:
   {name: any, employee_id: any, image: any, designation: any, handleClick: any, handleDelete: any, company_id: any}) => {
    const [visible, setVisible] = useState(false);
    const router = useNavigate();
    const [show, setShow] = useState(false);
    const [data, setData] = useState<any>(null);
    const [assetData, setAssetData] = useState<any>(null);
    const [companyData, setCompanyData] = useState<any>(null);
    const dispatch = useGlobalDispatch();
    const getEmployee = () => {
        const formData: any = {
            employee_id: employee_id
        }
        try {
            dispatch((fetchEmployee(formData))).then(async (res: any) => {
                setData(res.payload)
                setShow(!show)

            });
        } catch (err: any) {
            console.error(err);
        }
    }

    const getCompany = () => {
      const config: any = {}
      try {
        dispatch(fetchAllCompany(config)).then(async (res: any) => {
          setAssetData(res.payload.company_details);
          setShow(!show);
        });
      } catch (err: any) {
        console.error(err);
      }
    }
    const fetchCompanyById = () => {
      const config: any = {
        company_id: company_id
      }
      try {
        getCompanyById(config).then(async (res: any) => {
          setData(res.data.result);
        });
      } catch (err: any) {
        console.error(err);
      }
    }
    const getEmployeeAsset = () => {
      const formData: any = {
        employee_id: employee_id,
        page_no: 1
      }
      try {
        dispatch((fetchEmployeeAsset(formData))).then(async (res: any) => {
          setAssetData(res.payload.asset_details);
        });
      } catch (err: any) {
        console.error(err);
      }
    }

    const handleData = () => {
      getEmployee();
      getEmployeeAsset();
    }
    const handleCompanyData = () => {
      getCompany();
      fetchCompanyById();
    }
    const editEmployee = async () => {
        router({
            pathname: '/add-employee',
            search: `?${createSearchParams({
                employee_id: employee_id
            })}`
        })
    }
  return(
      <>
          <Card
                className={visible
                    ? 'border-0 shadow employee-card-w text-center d-flex justify-content-center card-select mx-4'
                    : 'border-0 shadow employee-card-w text-center d-flex justify-content-center mx-4'}
          >
              <Card.Body className='p-2' >
                  <div className="position-absolute end-0">
                      <DropdownButton
                          size='sm'
                          drop='end'
                          className="bg-transparent custom-btn"
                          id="dropdown-item-button"
                          title={<BiDotsVerticalRounded />}
                      >
                        {(company_id !== '') && <>
                          <Dropdown.Item onClick={() => handleCompanyData()} className='text-muted fs-7' as="button"><HiBars3 className='me-2' />Company Details</Dropdown.Item>
                        </>}
                        {(company_id === '') && <>
                          <Dropdown.Item onClick={() => handleData()} className='text-muted fs-7' as="button"><HiBars3 className='me-2' />Details</Dropdown.Item>
                          </>
                        }
                        {(company_id === '') && <>
                          <Dropdown.Item onClick={() => editEmployee()} className='text-muted fs-7' as="button"><AiOutlineEdit className='me-2' />Edit</Dropdown.Item>
                          <Dropdown.Item onClick={handleDelete} className='text-muted fs-7' as="button"><MdDelete className='me-2' />Delete</Dropdown.Item>
                        </>
                        }
                      </DropdownButton>
                      <button className='bg-transparent border-0 m-0 p-0'></button>
                  </div>
                  <div className='employee-card-img mb-2'>
                    <img className='rounded-circle' height='60' width='60' src={image} alt='' />
                  </div>
                  <div onClick={() => setVisible(!visible)}>
                      <div onClick={handleClick}>
                          <h6 className='fs-7 fw-semibold'>{name}</h6>
                          <p className='fs-8 mb-0'>{designation}</p>
                      </div>
                  </div>
                  {/*<button onClick={() => setShow(!show)} className='bg-transparent border-0 p-0 m-0'><TbAntennaBars1 /></button>*/}
              </Card.Body>
          </Card>
          {show &&
            <EmployeeModalComponent
              assetData={assetData}
              data={data}
              show={show}
              company_id={company_id}
              hide={() => setShow(false)}
            />
          }
      </>
  )
}
export default EmployeeCardComponent;
