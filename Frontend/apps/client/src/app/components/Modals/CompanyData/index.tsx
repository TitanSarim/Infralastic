import { Button, Card, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
  addCompany,
  getCompanyById,
  getLocation,
  updateCompany,
} from '@infralastic/global-state';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../services/config/firebase';
import { toast } from 'react-toastify';
import { BsCloudUpload } from 'react-icons/bs';

interface CompanyModals {
  show: any;
  hide: any;
  id: any;
}
const CompanyModel = (props: CompanyModals) => {
  const [name, setName] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [location, setLocation] = useState<any>('');
  const [latitude, setLatitude] = useState<any>('');
  const [longitude, setLongitude] = useState<any>('');
  const [locationData, setLocationData] = useState<any>([]);
  const [file, setFile] = useState<any>(null);
  const [imageFile, setImageFile] = useState('');
  const [imageURL, setImageURL] = useState('');

  const fetchLocation = () => {
    const config = {};
    getLocation(config).then((res: any) => {
      setLocationData(res.data.result.location_details);
    });
  };
  const imageHandler = (e: any) => {
    setFile(e.target.files[0]);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  function fetchCompanyById() {
    const formData = {
      company_id: props.id,
    };
    getCompanyById(formData).then((res: any) => {
      console.log('editdata', res.data);
      setLatitude(res.data.result.latitude);
      setLongitude(res.data.result.longitude);
      setName(res.data.result.company_name);
      setWebUrl(res.data.result.web_url);
      setImageFile(res.data.result.image_url);
      setLocation(res.data.result.location_name);
    });
  }
  console.log(location);

  useEffect(() => {
    fetchLocation();
    if (props.id !== null) {
      fetchCompanyById();
    }
  }, []);
  return (
    <>
      <Modal show={props.show} onHide={props.hide} size="xl">
        <Modal.Body className="p-0">
          <Card className="border-0">
            <Card.Header className="bg-dark text-white theme-font">
              <p className="m-0 p-2 fs-5">
                <span className="theme-danger">Company Details</span>
              </p>
            </Card.Header>
            <Card.Body>
              <form action="" className="p-2">
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Name
                  </label>
                  <p>{name}</p>
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Web URL
                  </label>
                  <p>{webUrl}</p>
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Location
                  </label>
                  <p>{location}</p>
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Latitude
                  </label>
                  <p>{latitude}</p>
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Longitude
                  </label>
                  <p>{longitude}</p>
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Logo
                  </label>
                  <div className="d-flex flex-column">
                    <label>
                      {imageFile && (
                        <img
                          src={imageFile}
                          height="54"
                          width="178"
                          alt="Image"
                        />
                      )}
                    </label>
                  </div>
                </div>
              </form>
              <br />
            </Card.Body>
          </Card>
          <div className="d-flex justify-content-end w-100 p-2">
            <button
              onClick={props.hide}
              className="border-0 bg-gray text-white px-3 py-2 rounded mx-2"
            >
              Back
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CompanyModel;
