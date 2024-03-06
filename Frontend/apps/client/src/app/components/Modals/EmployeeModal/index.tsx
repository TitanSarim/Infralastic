import { Badge, Button, Col, Modal, Row } from 'react-bootstrap';
import avatar from '../../../../assets/employees/Avatar.png';
import mouse from '../../../../assets/mouse1.png';
import desktop from '../../../../assets/desktop1.png';
import laptop from '../../../../assets/laptop1.png';
import { AiFillMobile } from 'react-icons/ai';
import { BsHeadphones } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {
  fetchAllCompany,
  getCompanyById,
  useGlobalDispatch,
} from '@infralastic/global-state';

const EmployeeModalComponent = ({
  show,
  assetData,
  company_id,
  hide,
  data,
}: {
  show: any;
  hide: any;
  company_id: any;
  assetData: any;
  data: any;
}) => {
  const dispatch = useGlobalDispatch();
  const [assets, setAssets] = useState<any>([]);
  const [companyData, setCompanyData] = useState<any>([]);
  const lapCount = assetData?.filter(
    (item: any) => item.category_name === 'Laptop'
  );
  const mouseCount = assetData?.filter(
    (item: any) => item.category_name === 'Mouse'
  );
  const desktopCount = assetData?.filter(
    (item: any) => item.category_name === 'Desktop'
  );
  const mobileCount = assetData?.filter(
    (item: any) => item.category_name === 'Mobile'
  );
  const headphoneCount = assetData?.filter(
    (item: any) => item.category_name === 'Headphone'
  );
  const lapCountCompany = data?.company_assets?.filter(
    (item: any) => item.category_name === 'Laptop'
  );
  const mouseCountCompany = data?.company_assets?.filter(
    (item: any) => item.category_name === 'Mouse'
  );
  const desktopCountCompany = data?.company_assets?.filter(
    (item: any) => item.category_name === 'Desktop'
  );
  const mobileCountCompany = data?.company_assets?.filter(
    (item: any) => item.category_name === 'Mobile'
  );
  const headphoneCountCompany = data?.company_assets?.filter(
    (item: any) => item.category_name === 'Headphone'
  );

  console.log('data', data);
  return (
    <>
      <Modal show={show} onHide={hide} size="xl">
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div className="py-3 mb-2 d-flex align-items-center">
                <img
                  src={data?.image_url}
                  className="rounded-circle"
                  height="42"
                  width="42"
                  alt=""
                />
                {company_id !== '' ? (
                  <h5 className="theme-danger px-2 m-0 theme-font">
                    {data?.company_name}
                  </h5>
                ) : (
                  <h5 className="theme-danger px-2 m-0 theme-font">
                    {data?.employee_name}
                  </h5>
                )}
              </div>
              <hr />
              <Row>
                {company_id === '' && (
                  <Col md={6}>
                    <p className="mb-1 theme-font fs-7">Email</p>
                    <p className="theme-danger theme-font fs-7">
                      {data?.email}
                    </p>
                  </Col>
                )}
                {company_id !== '' && (
                  <Col md={6}>
                    <p className="mb-1 theme-font fs-7">Name</p>
                    <p className="theme-danger theme-font fs-7">
                      {data?.company_name}
                    </p>
                  </Col>
                )}
                {company_id !== '' ? (
                  <Col md={6}>
                    <p className="mb-1 theme-font fs-7">Company ID</p>
                    <p className="theme-danger theme-font fs-7">
                      #{data?.company_id}
                    </p>
                  </Col>
                ) : (
                  <Col md={6}>
                    <p className="mb-1 theme-font fs-7">Employee ID</p>
                    <p className="theme-danger theme-font fs-7">
                      #{data?.employee_id}
                    </p>
                  </Col>
                )}
                {company_id !== '' && (
                  <Col md={6}>
                    <p className="mb-1 theme-font fs-7">Location</p>
                    <p className="theme-danger theme-font fs-7">
                      {data?.location_name}
                    </p>
                  </Col>
                )}
                {company_id === '' && (
                  <>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Phone #</p>
                      <p className="theme-font fs-7">+92 {data?.phone}</p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Job Designation</p>
                      <p className="theme-danger theme-font fs-7">
                        {data?.job_title}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Department</p>
                      <p className="theme-font fs-7">{data?.department_name}</p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Status</p>
                      <p className="theme-danger theme-font fs-7">
                        <Badge bg="success">Active</Badge>
                      </p>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
            {company_id === '' ? (
              <Col md={6}>
                <div className="py-3 d-flex align-items-center">
                  <img src={avatar} height="42" width="42" alt="" />
                  <div className="px-2 d-flex flex-column">
                    <h5 className="theme-danger m-0 theme-font">
                      Devices Details
                    </h5>
                    <p className="m-0 text-muted fs-8">
                      Byte Legion Assigned 2 Devices to Asad
                    </p>
                  </div>
                </div>
                <hr />
                <Row>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(desktopCount)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex justify-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {desktopCount?.length ? desktopCount?.length : 0}
                        </span>
                      </div>
                      <img src={desktop} height="52" width="52" alt="Desktop" />
                      <p>Desktop</p>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(lapCount)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex justify-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {lapCount?.length ? lapCount?.length : 0}
                        </span>
                      </div>
                      <img src={laptop} height="52" width="52" alt="Laptop" />
                      <p>Laptop</p>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(mouseCount)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex align-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {mouseCount?.length ? mouseCount?.length : 0}
                        </span>
                      </div>
                      <img src={mouse} height="52" width="52" alt="Mouse" />
                      <p>Mouse</p>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(mobileCount)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex justify-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {mobileCount?.length ? mobileCount?.length : 0}
                        </span>
                      </div>
                      <AiFillMobile size={52} width={52} height={52} />
                      <p>Mobile</p>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(headphoneCount)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex justify-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {headphoneCount?.length ? headphoneCount?.length : 0}
                        </span>
                      </div>
                      <BsHeadphones size={52} width={52} height={52} />
                      <p>Headphone</p>
                    </div>
                  </Col>
                </Row>
                <hr />
                {assets?.map((item: any) => (
                  <Row>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Asset Name</p>
                      <p className="theme-danger theme-font fs-7">
                        {item?.asset_name}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Asset Unique ID</p>
                      <p className="theme-danger theme-font fs-7">
                        {item?.asset_unique_id}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Assign Date</p>
                      <p className="theme-font fs-7">{item?.date_added}</p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Serial #</p>
                      <p className="theme-danger theme-font fs-7">
                        {item?.serial_number}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">IP Address</p>
                      <p className="theme-font fs-7">{item?.ip_address}</p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Status</p>
                      <p className="theme-danger theme-font fs-7">
                        {item?.employee_id ? (
                          <Badge bg="success">Assigned</Badge>
                        ) : (
                          <Badge bg="danger">Un-assigned</Badge>
                        )}
                      </p>
                    </Col>
                    <hr />
                  </Row>
                ))}
              </Col>
            ) : (
              <Col md={6}>
                <div className="py-3 d-flex align-items-center">
                  <img src={avatar} height="42" width="42" alt="" />
                  <div className="px-2 d-flex flex-column">
                    <h5 className="theme-danger m-0 theme-font">
                      Devices Details
                    </h5>
                    <p className="m-0 text-muted fs-8">
                      Byte Legion Assigned 2 Devices to Asad
                    </p>
                  </div>
                </div>
                <hr />
                <Row>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(desktopCountCompany)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex justify-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {desktopCountCompany?.length
                            ? desktopCountCompany?.length
                            : 0}
                        </span>
                      </div>
                      <img src={desktop} height="52" width="52" alt="Desktop" />
                      <p>Desktop</p>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(lapCountCompany)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex justify-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {lapCountCompany?.length
                            ? lapCountCompany?.length
                            : 0}
                        </span>
                      </div>
                      <img src={laptop} height="52" width="52" alt="Laptop" />
                      <p>Laptop</p>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(mouseCountCompany)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex align-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {mouseCountCompany?.length
                            ? mouseCountCompany?.length
                            : 0}
                        </span>
                      </div>
                      <img src={mouse} height="52" width="52" alt="Mouse" />
                      <p>Mouse</p>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(mobileCountCompany)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex justify-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {mobileCountCompany?.length
                            ? mobileCountCompany?.length
                            : 0}
                        </span>
                      </div>
                      <AiFillMobile size={52} width={52} height={52} />
                      <p>Mobile</p>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div
                      onClick={() => setAssets(headphoneCountCompany)}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="d-flex justify-content-end position-absolute">
                        <span className="rounded-circle px-2 fs-7 text-white bg-theme-danger">
                          {headphoneCountCompany?.length
                            ? headphoneCountCompany?.length
                            : 0}
                        </span>
                      </div>
                      <BsHeadphones size={52} width={52} height={52} />
                      <p>Headphone</p>
                    </div>
                  </Col>
                </Row>
                <hr />
                {assets?.map((item: any) => (
                  <Row>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Asset Name</p>
                      <p className="theme-danger theme-font fs-7">
                        {item?.asset_name}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Asset ID</p>
                      <p className="theme-danger theme-font fs-7">
                        {item?.asset_id}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 theme-font fs-7">Category Name</p>
                      <p className="theme-danger theme-font fs-7">
                        {item?.category_name}
                      </p>
                    </Col>
                    <hr />
                  </Row>
                ))}
              </Col>
            )}
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hide}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EmployeeModalComponent;
