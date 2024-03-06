import { Card, Form, InputGroup, FormControl } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import DepartmentTableComponent from '../../../components/Client/Department/DepartmentTableComponent';
import { BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './department.scss';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import {
  fetchAllCompany,
  useGlobalDispatch,
  useGlobalSelector,
} from '@infralastic/global-state';

const Department = () => {
  const router = useNavigate();
  const dispatch = useGlobalDispatch();
  const [department, setDepartment] = useState<any>('');
  const [company, setCompany] = useState<any>('');
  const [companyData, setCompanyData] = useState<any>([]);
  const { departmentInfo } = useGlobalSelector((state) => state.department);

  function downloadCSV() {
    const csvData = departmentInfo?.departments_details?.map((item: any) =>
      Object.values(item).join(',')
    );
    const csvContent = csvData.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'department.csv');
  }

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
    getCompany();
  }, []);
  return (
    <>
      <Card className="rounded mt-4">
        <Card.Body>
          <div className="d-flex w-100 align-items-center py-2">
            <div className="w-100 d-flex ">
              <h5 className="theme-font m-0">DEPARTMENTS</h5>
              <div className="d-flex w-100 justify-content-center">
                <div className="d-flex w-50">
                  <Form.Select
                    className="py-2 fs-7 theme-font text-muted"
                    aria-label="Default select example"
                    required={true}
                    onChange={(e: any) => setCompany(e.target.value)}
                  >
                    <option value="">Select Site</option>
                    {companyData?.map((item: any) => (
                      <option
                        value={item?.company_name}
                        className="theme-font fs-7"
                      >
                        {item?.company_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <div className="w-100 d-flex justify-content-end">
                <InputGroup className=" rounded border">
                  <InputGroup.Text
                    className="bg-white
                                      border-0"
                    id="basic-addon1"
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e: any) => setDepartment(e.target.value)}
                  >
                    <BiSearch size={22} />
                  </InputGroup.Text>
                  <FormControl
                    type="search"
                    className=""
                    placeholder="Search"
                    aria-label="Username"
                    onChange={(e: any) => setDepartment(e.target.value)}
                  />
                  {/* <input
                                      type='text'
                                      className='fs-7 border-0 w-100'
                                      placeholder="Search"
                                      aria-label="Username"
                                      onChange={(e: any) => setDepartment(e.target.value)}
                                  /> */}
                </InputGroup>
              </div>
              <div className="d-flex w-100 align-items-center justify-content-end">
                <button
                  className="bg-transparent border-0"
                  type="button"
                  onClick={() => downloadCSV()}
                >
                  <h6 className="m-0 theme-font px-3">Export</h6>
                </button>
                <button
                  className="border-0 bg-theme-danger text-white py-1 px-2 theme-font rounded d-flex"
                  onClick={() => router('/add-department')}
                >
                  <BsPlus size={24} className="m-0" />{' '}
                  Add&nbsp;New&nbsp;Department
                </button>
              </div>
            </div>
          </div>
          <hr className="mb-0" />
          <DepartmentTableComponent
            searchFilter={department}
            companyFilter={company}
          />
        </Card.Body>
      </Card>
    </>
  );
};
export default Department;
