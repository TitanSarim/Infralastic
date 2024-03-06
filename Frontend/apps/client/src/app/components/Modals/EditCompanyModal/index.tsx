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

interface CompanyModal {
  show: any;
  hide: any;
  id: any;
}
const EditCompanyModal = (props: CompanyModal) => {
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
  function isURL(str: any) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(str);
  }

  const handleWebUrlChange = (e: any) => {
    const inputValue = e.target.value;

    if (isURL(inputValue)) {
      // If it's a valid URL, set the state
      setWebUrl(inputValue);
    } else {
      // Handle the case where it's not a valid URL (e.g., show an error message)
      // You can add your error handling logic here
      // For now, let's clear the field if it's not a valid URL
      setWebUrl('');
    }
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
      setWebUrl(res.data.result.web_url.toString());
      setImageFile(res.data.result.image_url);
      setLocation(res.data.result.location_name);
    });
  }
  console.log(location);
  function handleSubmit() {
    const storageRef = ref(storage, `company/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        alert(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          toast.success('Image Uploaded Successfully');
          setImageURL(url);
          const formData: any = {
            company_name: name,
            company_id: props.id,
            web_url: webUrl,
            location_id: JSON.parse(location),
            image_url: url,
          };
          try {
            updateCompany(formData).then(async (res: any) => {
              if (res?.data?.result?.success === true) {
                toast.success(res?.data?.result?.msg);
              } else {
                toast.error(res?.payload);
              }
            });
          } catch (err: any) {
            console.error(err);
            toast.error('Access Denied');
          }
        });
      }
    );
  }

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
                <span className="theme-danger"> Edit Company Details</span>
              </p>
            </Card.Header>
            <Card.Body>
              <form action="" className="p-2">
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Name *
                  </label>
                  <input
                    onChange={(e) => handleWebUrlChange(e)}
                    className="w-75 form-control fs-7"
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Web URL
                  </label>

                  <input
                    onChange={(e) => setWebUrl(e.target.value)}
                    className="w-75 form-control fs-7"
                    type="text"
                    value={
                      webUrl === 'true' ? '' : webUrl === 'false' ? '' : webUrl
                    }
                    placeholder="Enter Web URL"
                  />
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Location *
                  </label>
                  <select
                    className="w-75 form-control fs-7"
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">{location}</option>
                    {locationData?.map((item: any) => (
                      <option value={item?.location_id}>
                        {item?.location_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Latitude *
                  </label>
                  <input
                    onChange={(e) => setLatitude(e.target.value)}
                    className="w-75 form-control fs-7"
                    type="number"
                    value={latitude}
                    placeholder="Enter Latitude"
                  />
                </div>
                <div className="d-flex align-items-center py-2 w-100">
                  <label className="w-25 fs-7" htmlFor="">
                    Longitude *
                  </label>
                  <input
                    onChange={(e) => setLongitude(e.target.value)}
                    className="w-75 form-control fs-7"
                    type="number"
                    placeholder="Enter Longitude"
                    value={longitude}
                  />
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
                      <input
                        type="file"
                        hidden
                        id="filePicker"
                        onChange={(e) => imageHandler(e)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById('filePicker')!.click()
                      }
                      className="bg-transparent border-0"
                    >
                      <BsCloudUpload className="mx-2 theme-danger" size={20} />
                      Upload Latest
                    </button>
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
              Cancel
            </button>
            <button
              className="border-0 bg-theme-danger text-white px-3 py-2 rounded mx-2"
              onClick={() => handleSubmit()}
              type="button"
            >
              Update
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditCompanyModal;
