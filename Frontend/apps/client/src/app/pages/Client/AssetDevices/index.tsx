import './asset-devices.scss';
import Map from '../../../components/Map';
import { Form, InputGroup } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import EmployeesFilterComponent from '../../../components/Client/Employees/EmployeesFilterComponent';
import EmployeeTreeComponent from '../../../components/Client/Employees/EmployeeTreeComponent';
import ErrorBoundary from '../../../components/shared/errorboundary';

const AssetDevices = () => {
  const MAPBOX_TOKEN =
    'pk.eyJ1Ijoid2FzaTkyMTAiLCJhIjoiY2xndjhvYmxnMmxvczNkbW0wbjFjamhlNiJ9.LzgcCec7AYnKErhYUUo70w';
  const [location, setLocation] = useState(true);
  const [employee, setEmployee] = useState(false);
  const [reports, setReports] = useState(false);
  const [search, setSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [locationData, setLocationData] = useState('');
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [job, setJob] = useState('');
  console.log(inputSearch);
  return (
    <ErrorBoundary>
      <div className="d-flex justify-content-center py-4">
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
      </div>
      {location ? (
        <div className="custom-mapbox">
          <div className="d-flex justify-content-center align-items-center w-100">
            <div className="px-4 map-search w-75 ">
              <InputGroup className="shadow p-2 bg-white rounded">
                <InputGroup.Text
                  className="bg-white border-0"
                  id="basic-addon1"
                >
                  <BiSearch size={22} />
                </InputGroup.Text>
                <Form.Control
                  className="header-input border-0"
                  placeholder="Search your assets"
                  aria-label="Username"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>
          <Map mapboxToken={MAPBOX_TOKEN} query={inputSearch} />
        </div>
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
    </ErrorBoundary>
  );
};
export default AssetDevices;
