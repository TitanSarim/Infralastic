import './asset-form-component.scss';
import { Card, Col, Form, Row } from 'react-bootstrap';
import avatar from '../../../../../assets/employees/Avatar.png';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../../services/config/firebase';
import { toast } from 'react-toastify';
import {
  createAsset,
  fetchAllCompany,
  getAllCategories,
  getAssetById,
  getLocation,
  getSites,
  updateAsset,
  useGlobalDispatch,
  useGlobalSelector,
} from '@infralastic/global-state';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AssetFormComponent = () => {
  const [imageFile, setImageFile] = useState('');
  const [file, setFile] = useState<any>(null);
  const [assetId, setAssetId] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [category, setCategory] = useState<any>('');
  const [categoryData, setCategoryData] = useState<any>([]);
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [operatingSystem, setOperatingSystem] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [iPAddress, setIPAddress] = useState('');
  const [hardDriveDetail, setHardDriveDetail] = useState('');
  const [ram, setRam] = useState<any>('');
  const [cost, setCost] = useState<any>('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warrantyExpirationDate, setWarrantyExpirationDate] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState('');
  const [purchaseFrom, setPurchaseFrom] = useState<any>('');
  const [endOfLifeDate, setEndOfLifeDate] = useState('');
  const [nextServiceDate, setNextServiceDate] = useState('');
  const [location, setLocation] = useState<any>('');
  const [site_id, setsite_id] = useState<any>('');
  const [locationData, setLocationData] = useState<any>([]);
  const [companyData, setCompanyData] = useState<any>([]);
  const [dateAdded, setDateAdded] = useState('');
  const [timeAdded, setTimeAdded] = useState('');
  const router = useNavigate();
  const dispatch = useGlobalDispatch();
  const { userInfo } = useGlobalSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const id: any = searchParams.get('asset_unique_id');
  console.log(userInfo);
  const imageHandler = (e: any) => {
    setFile(e.target.files[0]);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = () => {
    document.getElementById('filePicker')!.click();
  };

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

  const getAllCategory = () => {
    const formData: any = {
      company_id: 1,
    };
    getAllCategories(formData).then((res: any) => {
      setCategoryData(res.data.result.asset_details);
    });
  };
  console.log('company id', userInfo?.result?.company_id);
  const handleSubmit = () => {
    const storageRef = ref(storage, `assets/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      () => {},
      (error: any) => {
        alert(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url: any) => {
          if (!id) {
            const formData: any = {
              asset_unique_id: JSON.parse(assetId),
              asset_name: description,
              cost: JSON.parse(cost),
              manufacturer: manufacturer,
              device_model: deviceModel,
              serial_number: serialNumber,
              operating_system: operatingSystem,
              mac_address: macAddress,
              ip_address: iPAddress,
              hard_drive_details: hardDriveDetail,
              ram: ram,
              purchase_date: purchaseDate,
              warranty_expiration_date: warrantyExpirationDate,
              warranty_info: warrantyInfo,
              purchase_from: purchaseFrom,
              end_of_life_date: endOfLifeDate,
              next_service_date: nextServiceDate,
              date_added: dateAdded,
              time_added: timeAdded,
              // location_id: JSON.parse(location),
              category_id: JSON.parse(category),
              image_url: url,
              company_id: JSON.parse(site_id),
              user_id: userInfo?.result?.user_id
                ? userInfo?.result?.user_id
                : userInfo.user_id,
              site_id: userInfo?.result?.user_id
                ? userInfo?.result?.user_id
                : userInfo.user_id,
            };
            toast.success('Image Uploaded Successfully');
            try {
              await createAsset(formData).then((res: any) => {
                if (res.data.result.success === true) {
                  toast.success(res.data.result.msg);
                  setTimeout(() => {
                    router('/all-assets');
                  }, 3000);
                } else {
                  toast.error(res.data.result.msg);
                }
              });
            } catch (err: any) {
              console.error(err);
              toast.error(err);
            }
          } else if (id) {
            const formData: any = {
              asset_unique_id: JSON.parse(assetId),
              asset_name: description,
              cost: JSON.parse(cost),
              manufacturer: manufacturer,
              device_model: deviceModel,
              serial_number: serialNumber,
              operating_system: operatingSystem,
              mac_address: macAddress,
              ip_address: iPAddress,
              hard_drive_details: hardDriveDetail,
              ram: ram,
              purchase_date: purchaseDate,
              warranty_expiration_date: warrantyExpirationDate,
              warranty_info: warrantyInfo,
              purchase_from: purchaseFrom,
              end_of_life_date: endOfLifeDate,
              next_service_date: nextServiceDate,
              date_added: dateAdded,
              time_added: timeAdded,
              user_id: userInfo?.result?.user_id,
              company_id: JSON.parse(site_id),

              // location_id: JSON.parse(location),
              category_id: JSON.parse(category),
              image_url: url,
            };
            toast.success('Image Uploaded Successfully');
            try {
              await updateAsset(formData).then((res: any) => {
                if (res.data.result.success === true) {
                  toast.success(res.data.result.msg);
                  setTimeout(() => {
                    router(-1);
                  }, 3000);
                } else {
                  toast.error(res.data.result.msg);
                }
              });
            } catch (err: any) {
              console.error(err);
              toast.error(err);
            }
          }
        });
      }
    );
  };

  const fetchLocation = () => {
    const config = {};
    getLocation(config).then((res: any) => {
      setLocationData(res.data.result.location_details);
    });
  };
  console.log(location);
  const fetchAssetById = () => {
    const formData: any = {
      asset_unique_id: JSON.parse(id),
    };
    getAssetById(formData).then((res: any) => {
      setAssetId(res.data?.result?.asset_unique_id);
      setCategory(res.data.result.category_id);
      setDescription(res.data.result.asset_name);
      setManufacturer(res.data.result.manufacturer);
      setDeviceModel(res.data.result.device_model);
      setSerialNumber(res.data.result.serial_number);
      setOperatingSystem(res.data.result.operating_system);
      setMacAddress(res.data.result.mac_address);
      setIPAddress(res.data.result.ip_address);
      setHardDriveDetail(res.data.result.hard_drive_details);
      setRam(res.data.result.ram);
      setCost(res.data.result.cost);
      setPurchaseDate(res.data.result.purchase_date);
      setWarrantyExpirationDate(res.data.result.warranty_expiration_date);
      setWarrantyInfo(res.data.result.warranty_info);
      setPurchaseFrom(
        res.data.result.purchase_from !== ''
          ? res.data.result.purchase_from
          : 'Not Added'
      );
      setEndOfLifeDate(res.data.result.end_of_life_date);
      setNextServiceDate(res.data.result.next_service_date);
      setLocation(res.data.result.location_id);
      setDateAdded(res.data.result.date_added);
      setImageFile(res.data.result.image_url);
    });
  };

  useEffect(() => {
    fetchLocation();
    getAllCategory();
    getCompany();
    if (id) {
      fetchAssetById();
    }
  }, []);

  return (
    <div>
      <Card>
        <Card.Body>
          <div className="d-flex py-3">
            <div className="d-flex align-items-center w-100">
              <div>
                <label>
                  {imageFile && (
                    <img
                      src={imageFile}
                      height="100"
                      width="100"
                      className="rounded-circle"
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
                </label>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <label>
                    <button
                      type="button"
                      onClick={() => handleUpload()}
                      className="mx-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
                    >
                      Upload Employee Photo
                    </button>
                    <input
                      type="file"
                      id="filePicker"
                      hidden
                      onChange={(e) => imageHandler(e)}
                    />
                  </label>
                  <button
                    type="button"
                    className="mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
                  >
                    Reset
                  </button>
                </div>
                <p className="mx-2 m-0 text-muted fs-8 mt-2 theme-font">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Asset ID
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="number"
                    value={assetId}
                    placeholder="Asset Id"
                    onChange={(e) => setAssetId(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicCompany">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Category
                  </Form.Label>
                  <Form.Select
                    className="px-2 py-1 fs-7 theme-font text-muted"
                    aria-label="Default select example"
                    required={true}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="0">Select Category</option>
                    {categoryData?.map((item: any) => (
                      <option value={item?.categ_id}>{item?.categ_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Description
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="name"
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Manufacturer
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="name"
                    value={manufacturer}
                    placeholder="Manufacturer"
                    onChange={(e) => setManufacturer(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Device Model
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="name"
                    value={deviceModel}
                    placeholder="Device Model"
                    onChange={(e) => setDeviceModel(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Serial Number
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="name"
                    value={serialNumber}
                    placeholder="Serial Number"
                    onChange={(e) => setSerialNumber(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Operating System
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="name"
                    value={operatingSystem}
                    placeholder="Operating System"
                    onChange={(e) => setOperatingSystem(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    MAC Address
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="number"
                    value={macAddress}
                    placeholder="MAC Address"
                    onChange={(e) => setMacAddress(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    IP Address
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="number"
                    value={iPAddress}
                    placeholder="IP Address"
                    onChange={(e) => setIPAddress(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Hard Drive Detail
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="name"
                    value={hardDriveDetail}
                    placeholder="Hard Drive Detail"
                    onChange={(e) => setHardDriveDetail(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicCompany">
                  <Form.Label className="fs-7 mb-1 theme-font">RAM</Form.Label>
                  <Form.Select
                    className="px-2 py-1 fs-7 theme-font text-muted"
                    aria-label="Default select example"
                    required={true}
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                  >
                    <option value="">Select RAM</option>
                    <option value="32GB">32GB</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">Cost</Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="number"
                    value={cost}
                    placeholder="Cost"
                    onChange={(e) => setCost(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Purchase Date
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="date"
                    min="2000-10-31"
                    max="2024-12-31"
                    placeholder="Purchase Date"
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Warranty Expiration Date
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="date"
                    max="9999-12-31"
                    value={warrantyExpirationDate}
                    placeholder="Warranty Expiration Date"
                    onChange={(e) => setWarrantyExpirationDate(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Warranty Info
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="name"
                    value={warrantyInfo}
                    placeholder="Warranty Info"
                    min="2000-10-31"
                    max="2024-12-31"
                    onChange={(e) => setWarrantyInfo(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicCompany">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Purchase From
                  </Form.Label>
                  <Form.Select
                    className="px-2 py-1 fs-7 theme-font text-muted"
                    aria-label="Default select example"
                    required={true}
                    value={purchaseFrom}
                    onChange={(e) => setPurchaseFrom(e.target.value)}
                  >
                    <option value="">Select Purchase</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    End of Life Date
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="date"
                    min="2000-10-31"
                    max="2040-12-31"
                    value={endOfLifeDate}
                    placeholder="End of Life Date"
                    onChange={(e) => setEndOfLifeDate(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicFirstName">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Next Service Date
                  </Form.Label>
                  <Form.Control
                    className="px-2 py-1 fs-7"
                    type="date"
                    max="9999-12-31"
                    value={nextServiceDate}
                    placeholder="Next Service Date"
                    onChange={(e) => setNextServiceDate(e.target.value)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2" controlId="formBasicCompany">
                  <Form.Label className="fs-7 mb-1 theme-font">
                    Sites
                  </Form.Label>
                  <Form.Select
                    className="px-2 py-1 fs-7 theme-font text-muted"
                    aria-label="Default select example"
                    required={true}
                    value={site_id}
                    onChange={(e) => setsite_id(e.target.value)}
                  >
                    <option value="">Select Site</option>
                    {companyData?.map((item: any) => (
                      <option value={item?.company_id}>
                        {item?.company_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2" controlId="formBasicFirstName">
                      <Form.Label className="fs-7 mb-1 theme-font">
                        Date Added
                      </Form.Label>
                      <Form.Control
                        className="px-2 py-1 fs-7"
                        type="date"
                        value={dateAdded}
                        min="2000-10-31"
                        max="2024-12-31"
                        placeholder="Date Added"
                        onChange={(e) => setDateAdded(e.target.value)}
                        required={true}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2" controlId="formBasicFirstName">
                      <Form.Label className="fs-7 mb-1 theme-font">
                        Time Added
                      </Form.Label>
                      <Form.Control
                        className="px-2 py-1 fs-7"
                        type="time"
                        value={timeAdded}
                        placeholder="Time Added"
                        onChange={(e) => setTimeAdded(e.target.value)}
                        required={true}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <hr />
          <br />
          <div className="d-flex justify-content-end w-100">
            <button
              type="button"
              className="mx-2 border-0 reset-btn text-muted py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
            >
              <BsArrowLeft className="theme-danger me-2" />
              Back
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="me-2 border-0 bg-theme-danger text-white py-2 px-3 fs-7 theme-font rounded fs-7 d-flex align-items-center m-0"
            >
              Save
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default AssetFormComponent;
