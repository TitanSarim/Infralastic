import './global-setting.scss';
import { Card, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import GlobalSettingTable from '../../../../components/Client/Admin/GlobalSettingTable';
import CompanySettingTable from '../../../../components/Client/Admin/CompanySettingTable';
import '../admin.scss';

const GlobalSetting = () => {
  const [user, setUser] = useState(true);
  const [company, setCompany] = useState(false);
  return (
    <div className="theme-font">
      <br />
      <br />
      <br />
      <Row>
        <Col md={3}>
          <Card>
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
                  }}
                >
                  Company Details
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          {user ? (
            <GlobalSettingTable />
          ) : company ? (
            <CompanySettingTable />
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default GlobalSetting;
