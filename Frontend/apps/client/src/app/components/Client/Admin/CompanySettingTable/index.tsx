import './company-setting-table.scss';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useState } from 'react';
import AdminCompanyTable from '../AdminCompanyTable';
import { BiArrowBack } from 'react-icons/bi';
import { LuSettings2 } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import '../admin.scss';
const CompanySettingTable = () => {
  const [user, setUser] = useState<any>(false);
  const [company, setCompany] = useState<any>(true);
  const [search, setSearch] = useState<string>('');

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };
  const router = useNavigate();
  return (
    <div className="theme-font">
      <br />
      <br />
      <br />
      <Row>
        <Col md={3}>
          <Card>
            <div className="position-absolute back-btn">
              <button
                className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
                onClick={() => router(-1)}
              >
                <BiArrowBack />
              </button>
            </div>
            <Card.Body>
              <div className="p-2">
                <h5 className="mb-3">Global Settings</h5>
                <p
                  className={
                    user ? 'active fs-7 mb-2 p-3 cursor' : 'mb-2 fs-7 cursor'
                  }
                  onClick={() => {
                    setUser(true);
                    setCompany(false);
                    router('/user-table');
                  }}
                >
                  User Administration
                </p>
                <p
                  className={
                    company ? 'active fs-7 mb-2 p-3 cursor' : 'fs-7 cursor'
                  }
                  onClick={() => {
                    setUser(false);
                    setCompany(true);
                    router('/company-table');
                  }}
                >
                  Sites Details
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <div>
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center theme-font p-2">
                  <p className="theme-font mb-0 mx-3">Sites</p>
                  <input
                    type="text"
                    className="form-control p-2 px-3 fs-7 mx-2"
                    placeholder="Search"
                    value={search}
                    onChange={(event) => handleSearchChange(event)}
                  />
                  <Dropdown>
                    <Dropdown.Toggle
                      className="bg-transparent border-0 p-0 me-2"
                      id="dropdown-basic"
                    >
                      <button className="px-3 py-1 text-white border-0 bg-gray h-34 rounded mx-2">
                        <LuSettings2 size={20} />
                      </button>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item className="theme-font fs-7">
                        Request
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <button
                    className="px-2 pe-3 text-white border-0 bg-theme-danger rounded d-flex h-34 align-items-center"
                    onClick={() => router('/company-form')}
                  >
                    <BsPlus size={20} className="me-2" />
                    Add&nbsp;New&nbsp;Company
                  </button>
                </div>
                <hr className="mt-3 mb-0" />
                <AdminCompanyTable search={search} />
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default CompanySettingTable;
