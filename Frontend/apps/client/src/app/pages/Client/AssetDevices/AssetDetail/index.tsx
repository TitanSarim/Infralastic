import './asset-detail.scss';
import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IoIosUndo } from 'react-icons/io';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { getCompanyById } from '@infralastic/global-state';
import AssetTable from '../../../../components/Client/AssetDevices/AssetTable';
const AssetDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const id: any = searchParams.get('company_id');

  const [location, setLocation] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [reports, setReports] = useState(false);
  const [company_name, setcompany_name] = useState([]);

  console.log(id);
  const fetchCompanyById = () => {
    const config: any = {
      company_id: id,
    };
    try {
      getCompanyById(config).then(async (res: any) => {
        console.log(res);
        setcompany_name(res.data.result.company_name);
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCompanyById();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center py-4 w-100 align-items-center">
        <Row className="w-100">
          <Col md={4}>
            <div className="d-flex align-items-center  h-100">
              <h4 className="theme-font m-0">Assets or Devices</h4>
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
                    Site
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
          <Col md={4}>
            <div className="d-flex align-items-center h-100 justify-content-end">
              <h6 className="theme-font m-0">
                <IoIosUndo className="theme-danger" size={20} /> Showing all
                data against <a className="theme-danger">{company_name}</a>
              </h6>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <AssetTable />
      </div>
    </>
  );
};
export default AssetDetail;
