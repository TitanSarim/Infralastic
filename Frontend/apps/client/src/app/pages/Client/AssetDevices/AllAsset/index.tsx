import './all-asset.scss';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import AssetInventory from '../../../../components/Client/AssetDevices/AssetInventory';
import EmployeesFilterComponent from '../../../../components/Client/Employees/EmployeesFilterComponent';
import EmployeeTreeComponent from '../../../../components/Client/Employees/EmployeeTreeComponent';
import { useNavigate } from 'react-router-dom';
import { BiDotsVerticalRounded, BiArrowBack } from 'react-icons/bi';

const AllAsset = () => {
  const [location, setLocation] = useState(true);
  const [employee, setEmployee] = useState(false);
  const [reports, setReports] = useState(false);
  const [search, setSearch] = useState('');
  const [locationData, setLocationData] = useState('');
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [job, setJob] = useState('');
  const router = useNavigate();

  return (
    <div>
      <div className=" back-btn">
        <button
          className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
          onClick={() => router(-1)}
        >
          <BiArrowBack />
        </button>
      </div>
      <div className="d-flex justify-content-center py-4 w-100 align-items-center">
        <Row className="w-100">
          <Col md={4}>
            <div className="d-flex align-items-center  h-100">
              <h4 className="theme-font m-0">Assets or Devicess</h4>
            </div>
          </Col>
          <Col md={4}>
            <div className="switcher">
              <div className="card">
                <div className="card-body d-flex p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLocation(true);
                      setEmployee(false);
                      setReports(false);
                    }}
                    className={
                      location
                        ? 'w-100 text-white border-0 theme-font br-1 bg-theme-danger p-2 rounded'
                        : 'w-100 bg-transparent border-0 theme-font br-1 p-2'
                    }
                  >
                    Location
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation(false);
                      setEmployee(true);
                      setReports(false);
                    }}
                    className={
                      employee
                        ? 'w-100 text-white border-0 theme-font br-1 bg-theme-danger p-2 rounded'
                        : 'w-100 bg-transparent border-0 theme-font br-1 p-2'
                    }
                  >
                    Employee
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation(false);
                      setEmployee(false);
                      setReports(true);
                    }}
                    className={
                      reports
                        ? 'w-100 text-white border-0 theme-font bg-theme-danger p-2 rounded'
                        : 'w-100 bg-transparent border-0 theme-font p-2'
                    }
                  >
                    Reports
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}></Col>
        </Row>
      </div>
      <div>
        {location ? (
          <AssetInventory />
        ) : employee ? (
          <div className="h-100 w-100">
            <br />
            <div className="d-flex justify-content-center w-100">
              <EmployeesFilterComponent
                searchData={(e: any) => setSearch(e)}
                location={(e: any) => setLocationData(e)}
                company={(e: any) => setCompany(e)}
                department={(e: any) => setDepartment(e)}
                job={(e: any) => setJob(e)}
              />
            </div>
            <br />
            <br />
            <div className="">
              <div className="h-100">
                <EmployeeTreeComponent
                  searchFilter={search}
                  location={locationData}
                  department={department}
                  company={company}
                  job={job}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default AllAsset;
