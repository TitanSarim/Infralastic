import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
  addCompany,
  addEmployee,
  getLocation,
  updateEmployeeById,
  useGlobalSelector,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../../services/config/firebase';
import { BsCloudUpload } from 'react-icons/bs';
import Select from 'react-select';
import route from '../../../../routes/route';
import { useNavigate } from 'react-router-dom';

const CompanySettingForm = () => {
  const [name, setName] = useState('');
  const router = useNavigate();
  const [webUrl, setWebUrl] = useState('');
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLongitude] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>([]);
  const [file, setFile] = useState<any>(null);
  const [imageFile, setImageFile] = useState('');
  const [imageURL, setImageURL] = useState('');
  const { userInfo } = useGlobalSelector((state) => state.user);
  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const [SelectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [coordinates, setCoordinates] = useState<any>({
    latitude: null,
    longitude: null,
  });

  // Example function to fetch coordinates data for a selected country.
  // const fetchCoordinates = async (countryName: any) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.example.com/getCoordinates?country=${countryName}`
  //     );
  //     const data = await response.json();
  //     setCoordinates({ latitude: data.latitude, longitude: data.longitude });
  //   } catch (error) {
  //     console.error('Error fetching coordinates:', error);
  //   }
  // };
  const fetchCoordinates = async (countryName: any) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const countryInfo = data[0];
          const coordinates = countryInfo.latlng;
          setLatitude(coordinates[0]);
          setLongitude(coordinates[1]);
          console.log('Coordinates:', coordinates);
          return coordinates; // Return the coordinates or use them as needed
        } else {
          console.error('Country not found');
        }
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };
  // console.log(latitude, longitude);

  // Handle the selection change in the dropdown.
  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    if (selectedOption) {
      fetchCoordinates(selectedOption.value);
      const { value } = selectedOption;

      // Find the corresponding location_id based on the selected location_name
      // const selectedLocationId = locationData.find(item => item.location_name === value)?.location_id || null;
      const selectedLocationId = locationData.find(
        (item: any) => item.location_name === value
      );

      // Update the selected location in state
      setSelectedLocation(selectedLocationId?.location_id);
    } else {
      setCoordinates({ latitude: null, longitude: null });
    }
  };
  console.log(SelectedLocation);
  // console.log(SelectedLocation?.location_id);
  // Fetch coordinates when the component mounts (you can use useEffect for this).
  useEffect(() => {
    if (selectedCountry) {
      fetchCoordinates(selectedCountry.value);
    }
  }, [selectedCountry]);

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
  // console.log(userInfo);

  function handleSubmit() {
    if (name.trim() === '') {
      toast.error('Name field cannot be empty');
      return;
    }

    if (
      latitude !== '' &&
      (parseFloat(latitude) < -90 || parseFloat(latitude) > 90)
    ) {
      toast.error('Latitude must be between -90 and 90 degrees');
      return;
    }

    if (
      longitude !== '' &&
      (parseFloat(longitude) < -90 || parseFloat(longitude) > 90)
    ) {
      toast.error('Longitude must be between -90 and 90 degrees');
      return;
    }

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
            web_url: webUrl,
            location_id: SelectedLocation,
            image_url: url,
            latitude: latitude,
            longitude: longitude,
            user_id: userInfo?.result?.user_id
              ? userInfo?.result?.user_id
              : userInfo.user_id,
            // user_id: 2,
          };
          console.log(formData);
          try {
            addCompany(formData).then(async (res: any) => {
              if (res?.data?.result?.success === true) {
                toast.success(res?.data?.result?.msg);
                setTimeout(() => {
                  router(-1);
                }, 3000);
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
  }, []);
  return (
    <div>
      <br />
      <br />
      <br />
      <div>
        <Card className="border-0">
          <div className="position-absolute back-btn">
            <button
              className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
              onClick={() => router(-1)}
            >
              <BiArrowBack />
            </button>
          </div>
          <Card.Header className="bg-theme-danger text-white theme-font">
            <p className="m-0 p-2 fs-5">
              <span className="text-white">Company Details</span>
            </p>
          </Card.Header>
          <Card.Body>
            {/* // options={[
              //   { label: 'Pakistan', value: 'Pakistan' },
              //   { label: 'USA', value: 'USA' },
           
              // ]} */}

            <div></div>
            <form action="" className="p-2">
              {coordinates.latitude !== null &&
              coordinates.longitude !== null ? (
                <p>
                  Latitude: {coordinates.latitude}, Longitude:{' '}
                  {coordinates.longitude}
                </p>
              ) : (
                <p>Select a country to view its coordinates.</p>
              )}
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Name *
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="w-75 form-control fs-7"
                  type="text"
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
                  placeholder="Enter Web URL"
                />
              </div>
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Location *
                </label>
                {/* <select
                  className="w-75 form-control fs-7"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">none</option>
                  {locationData?.map((item: any) => (
                    <option value={item?.location_id}>
                      {item?.location_name}
                    </option>
                  ))} 
                 </select>  */}
                <Select
                  className="w-75  "
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  options={locationData?.map((item: any) => ({
                    label: item?.location_name,
                    value: item?.location_name,
                  }))}
                />
              </div>
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Latitude *
                </label>
                <input
                  value={latitude}
                  disabled={true}
                  // onChange={(e) => setLatitude(e.target.value)}
                  className="w-75 form-control fs-7"
                  type="number"
                  placeholder="Enter Latitude"
                />
              </div>
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Longitude *
                </label>
                <input
                  value={longitude}
                  disabled={true}
                  // onChange={(e) => setLongitude(e.target.value)}
                  className="w-75 form-control fs-7"
                  type="number"
                  placeholder="Enter Longitude"
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

            <div className="d-flex justify-content-end w-100">
              <button
                className="border-0 bg-gray text-white px-3 py-2 rounded mx-2"
                onClick={() => router('/company-table')}
              >
                Cancel
              </button>
              <button
                className="border-0 bg-theme-danger text-white px-3 py-2 rounded mx-2"
                onClick={() => handleSubmit()}
                type="button"
              >
                Save
              </button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default CompanySettingForm;
