import './asset-view-component.scss';
import { Card, Col, Row } from 'react-bootstrap';
import avatar from '../../../../../assets/employees/Avatar.png';
import { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { getAssetById } from '@infralastic/global-state';

const AssetViewComponent = () => {
  const router = useNavigate();
  const [imageFile, setImageFile] = useState('');
  const [assetId, setAssetId] = useState('');
  const [category, setCategory] = useState<any>('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [operatingSystem, setOperatingSystem] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [iPAddress, setIPAddress] = useState('');
  const [hardDriveDetail, setHardDriveDetail] = useState('');
  const [ram, setRam] = useState<any>('');
  const [cost, setCost] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warrantyExpirationDate, setWarrantyExpirationDate] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState('');
  const [purchaseFrom, setPurchaseFrom] = useState<any>('');
  const [endOfLifeDate, setEndOfLifeDate] = useState('');
  const [nextServiceDate, setNextServiceDate] = useState('');
  const [location, setLocation] = useState<any>('');
  const [dateAdded, setDateAdded] = useState('');
  const [checkInNotes, setCheckInNotes] = useState<any>(null);
  const [checkOutNotes, setCheckOutNotes] = useState<any>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const id: any = searchParams.get('asset_unique_id');
  console.log(id);
  const fetchAssetById = () => {
    const formData: any = {
      asset_unique_id: JSON.parse(id),
    };
    getAssetById(formData).then((res: any) => {
      console.log(res, 'res');
      setAssetId(res?.data?.result?.asset_unique_id);
      setCategory(res.data?.result?.category_name);
      setDescription(res.data?.result?.asset_name);
      setManufacturer(res.data?.result?.manufacturer);
      setDeviceModel(res.data?.result?.device_model);
      setSerialNumber(res.data?.result?.serial_number);
      setOperatingSystem(res.data?.result?.operating_system);
      setMacAddress(res.data.result?.mac_address);
      setIPAddress(res.data.result?.ip_address);
      setHardDriveDetail(res.data.result?.hard_drive_details);
      setRam(res.data.result?.ram);
      setCost(res.data.result?.cost);
      setPurchaseDate(res.data.result?.purchase_date);
      setWarrantyExpirationDate(res.data.result?.warranty_expiration_date);
      setWarrantyInfo(res.data.result?.warranty_info);
      setPurchaseFrom(
        res.data.result?.purchase_from !== ''
          ? res.data.result?.purchase_from
          : 'Not Added'
      );
      setEndOfLifeDate(res.data.result?.end_of_life_date);
      setNextServiceDate(res.data.result?.next_service_date);
      setLocation(res.data.result?.location_name);
      setDateAdded(res.data.result?.date_added);
      setImageFile(res.data.result?.image_url);
      setCheckInNotes(res.data.result?.check_in_notes);
      setCheckOutNotes(res.data.result?.check_out_notes);
    });
  };

  useEffect(() => {
    fetchAssetById();
  }, []);

  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Card.Body>
          <div>
            <div className="d-flex py-3">
              <div className="d-flex w-100">
                <div className="d-flex  align-items-center w-50">
                  <div>
                    <label>
                      {imageFile && (
                        <img
                          src={imageFile}
                          height="100"
                          width="100"
                          className=" rounded-circle"
                          alt="Image"
                        />
                      )}
                      {!imageFile && (
                        <img
                          className="rounded-circle"
                          height="100"
                          width="100"
                          src={avatar}
                          alt=""
                        />
                      )}
                      <input type="file" id="logo" hidden />
                    </label>
                  </div>
                  <div className="d-flex flex-column mx-2">
                    <h6 className="m-0 theme-danger theme-font">
                      Device Photo
                    </h6>
                    <h5 className="m-0 mt-2 theme-font">Lenovo Think Pad</h5>
                  </div>
                </div>
                {/*<div className=" w-50">*/}
                {/*    {(checkInNotes !== false && checkInNotes !== '') &&<>*/}
                {/*        <h5 className='theme-font'>CheckIn Notes</h5>*/}
                {/*        <p>{checkInNotes}</p>*/}
                {/*      </>*/}
                {/*    }*/}
                {/*    {(checkOutNotes !== false && checkOutNotes !== '') &&<>*/}
                {/*        <h5 className='theme-font'>CheckOut Notes</h5>*/}
                {/*        <p>{checkOutNotes}</p>*/}
                {/*      </>*/}
                {/*    }*/}
                {/*</div>*/}
              </div>
            </div>
            <hr className="my-4" />
            <Row>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Asset ID</p>
                    <p className="fs-7 m-0 text-muted mt-1">{assetId}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Category</p>
                    <p className="fs-7 m-0 text-muted mt-1">{category}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Description</p>
                    <p className="fs-7 m-0 theme-danger mt-1">{description}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Manufacturer</p>
                    <p className="fs-7 m-0 theme-danger mt-1">{manufacturer}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Device Model</p>
                    <p className="fs-7 m-0 theme-danger mt-1">{deviceModel}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Serial Number</p>
                    <p className="fs-7 m-0 theme-danger mt-1">{serialNumber}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Operating System</p>
                    <p className="fs-7 m-0 text-muted mt-1">
                      {operatingSystem}
                    </p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">MAC Address</p>
                    <p className="fs-7 m-0 text-muted mt-1">{macAddress}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">IP Address</p>
                    <p className="fs-7 m-0 text-muted mt-1">{iPAddress}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Hard Drive Detail</p>
                    <p className="fs-7 m-0 text-muted mt-1">
                      {hardDriveDetail}
                    </p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">RAM</p>
                    <p className="fs-7 m-0 theme-danger mt-1">{ram}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Cost</p>
                    <p className="fs-7 m-0 theme-danger mt-1">{cost}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Purchase Date</p>
                    <p className="fs-7 m-0 text-muted mt-1">{purchaseDate}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">
                      Warranty Expiration Date
                    </p>
                    <p className="fs-7 m-0 text-muted mt-1">
                      {warrantyExpirationDate}
                    </p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Warranty Info</p>
                    <p className="fs-7 m-0 text-muted mt-1">{warrantyInfo}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Purchase From</p>
                    <p className="fs-7 m-0 text-muted mt-1">{purchaseFrom}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">End of Life Date</p>
                    <p className="fs-7 m-0 text-muted mt-1">{endOfLifeDate}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Next Service Date</p>
                    <p className="fs-7 m-0 text-muted mt-1">
                      {nextServiceDate}
                    </p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Location</p>
                    <p className="fs-7 m-0 text-muted mt-1">{location}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex w-100 mb-3">
                  <div className="w-100">
                    <p className="fs-6 m-0 theme-font">Date Added</p>
                    <p className="fs-7 m-0 text-muted mt-1">{dateAdded}</p>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <BiPencil />
                  </div> */}
                </div>
              </Col>
            </Row>
            <hr />
            <br />
            <div className="d-flex justify-content-end w-100">
              <button
                type="button"
                className="mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  router({
                    pathname: '/add-asset',
                    search: `?${createSearchParams({
                      asset_unique_id: id,
                    })}`,
                  })
                }
                type="button"
                className="me-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
              >
                Edit Asset Details
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default AssetViewComponent;
