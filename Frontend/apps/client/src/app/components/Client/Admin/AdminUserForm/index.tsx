import './admin-user-form.scss';
import { Card } from 'react-bootstrap';
import {
  addAdminUser,
  addCompany,
  getAllRoles,
  getAllUser,
} from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { BsCloudUpload } from 'react-icons/bs';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../../services/config/firebase';
import { useAuth0 } from '@auth0/auth0-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AdminUserForm = (id: any) => {
  const [roles, setRoles] = useState<any>('');
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [roleData, setRoleData] = useState<any>([]);
  const [userName, setUserName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [phone, setPhone] = useState<any>('');
  const [userFile, setUserFile] = useState<any>(null);
  const [coverFile, setCoverFile] = useState<any>(null);
  const [userImage, setUserImage] = useState<any>('');
  const [coverImage, setCoverImage] = useState<any>('');
  const [userData, setUserData] = useState<any>([]);
  const [tempUser, setTempUser] = useState<any>('');
  const [oauth, setOAuth] = useState<any>(false);
  const [twoFactor, settwoFactor] = useState<any>(false);

  const [IsValidPassword, setIsValidPassword] = useState<any>(true);
  const [isValidEmail, setIsValidEmail] = useState<any>(true);
  const [showPassword, setShowPassword] = useState<any>(false);

  const [isUserNameExists, setIsUserNameExists] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);

  const validatePassword = (password: any) => {
    // Define your password criteria here
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(
      password
    );

    // Combine all criteria to determine overall password validity
    return (
      lengthCriteria &&
      uppercaseCriteria &&
      lowercaseCriteria &&
      numberCriteria &&
      specialCharCriteria
    );
  };
  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const router = useNavigate();

  const imageHandler = (e: any) => {
    setUserFile(e.target.files[0]);
    setUserImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const coverHandler = (e: any) => {
    setCoverFile(e.target.files[0]);
    setCoverImage(URL.createObjectURL(e.target.files[0]));
  };

  console.log('twofactor', twoFactor);

  const fetchRoles = () => {
    const config = {};
    getAllRoles(config).then((res) => {
      setRoleData(res.data.result.role_details);
    });
  };

  const fetchUsers = () => {
    const config = {};
    getAllUser(config).then((res) => {
      setUserData(res.data.result.role_details);
    });
  };

  const validateEmail = (email: any) => {
    // Regular expression for a valid email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    const newEmail = e.target.value;

    const doesEmaleExist = userData.some((item: any) => item.email === newEmail);

    setIsEmailExists(doesEmaleExist)

    setEmail(newEmail);
  };
  const handleBlur = () => {
    setIsValidEmail(validateEmail(email));
  };
  const handleBlurPassword = () => {
    setIsValidPassword(validatePassword(password));
  };
  // function handlSubmit() {
  //   const formData = {
  //     name: userName,
  //     login: email,
  //     password: password,
  //     phone: phone,
  //     role_id: JSON.parse(roles)
  //   }
  //   addAdminUser(formData).then((res: any) => {
  //     toast.success(res.data.result.msg);
  //     if (res?.data?.result?.success === true) {
  //       setTimeout(() => {
  //         router(-1)
  //       }, 3000)
  //     }
  //   })
  // }

  // * Toggle the state of the checkbox
  const handleCheckboxChange = () => {
    setOAuth(!oauth);
  };

  const currentDatetime = new Date().toISOString();
  const token = `${currentDatetime}-${email}-${userName}`;

  function handleSubmit() {
    const storageRef = ref(storage, `user/${userFile?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, userFile);

    uploadTask.on(
      'state_changed',
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        alert(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((userImageUrl: string) => {
          const coverStorageRef = ref(storage, `user/${coverFile?.name}`);
          const coverUploadTask = uploadBytesResumable(
            coverStorageRef,
            coverFile
          );

          coverUploadTask.on(
            'state_changed',
            (res: any) => {
              console.log(res);
            },
            (error: any) => {
              alert(error);
            },
            async () => {
              // getDownloadURL(coverUploadTask.snapshot.ref).then(
              //   (coverImageUrl: string) => {
              toast.success('Images Uploaded Successfully');

              const formData: any = {
                name: userName,
                login: email,
                password: password,
                phone: phone,
                role_id: JSON.parse(roles),
                image_url: userImageUrl,
                temp_user_id: JSON.parse(tempUser),
                // cover_url: coverImageUrl,
                link: 'https://infralastic-capp.infralastic.com/change-password',
                Oauth: oauth,
                two_factor_auth: twoFactor,
                Oauth_token: token,
              };

              try {
                addAdminUser(formData).then((res: any) => {
                  toast.success(res?.data?.result?.msg);
                  if (res?.data?.result?.success === true) {
                    setTimeout(() => {
                      router(-1);
                    }, 3000);
                  }
                });
              } catch (err: any) {
                console.error(err);
                toast.error('Access Denied');
              }
            }
            //   );
            // }
          );
        });
      }
    );
  }

  const handleRoleChange = (e: any) => {
    const selectedRole = e.target.value;
    setRoles(selectedRole);
    setTempUser('0');
  };

  const handleTempUserChange = (e: any) => {
    const selectedTempUser = e.target.value;
    setTempUser(selectedTempUser);
    setRoles('0');
  };

    // dublciate usename
  const handleUserNameChange = (e: any) => {
    const inputUserName = e.target.value;
    const doesUserNameExist = userData.some((item: any) => item.user_name === inputUserName);
    setIsUserNameExists(doesUserNameExist);
    setUserName(inputUserName);
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);
  return (
    <div>
      <br />
      <br />
      <br />

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
            Step 01: <span className="text-white">Add User</span>
          </p>
        </Card.Header>
        <Card.Body>
          <form action="" className="p-2">

            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                User Name *
              </label>
              <input
                onChange={handleUserNameChange}
                className="w-75 form-control fs-7"
                type="text"
                placeholder="Enter Username"
              />
            </div>
            <div className="valadition-field">{isUserNameExists === true ? "User with this name is already exists" : ""}</div>

            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                Role *
              </label>
              <select
                className="w-75 form-control fs-7"
                value={roles}
                onChange={handleRoleChange}
              >
                <option value="">Select Role</option>
                {roleData?.map((item: any) => (
                  <option value={item?.role_id}>{item?.role_name}</option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                Email *
              </label>
              <input
                onChange={(e) => handleEmailChange(e)}
                onBlur={(e) => handleBlur()}
                className="w-75 form-control fs-7"
                type="text"
                placeholder="Enter Email"
                style={{ borderColor: isValidEmail ? '#ced4da' : 'red' }}
              />
            </div>
            {!isValidEmail && (
              <div className="valadition-field">
                Please enter a valid email address.
              </div>
            )}
            <div className="valadition-field">{isEmailExists === true ?  "User with this Email is already exists" : ""}</div>

            {/* <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                Password *
              </label>

              <input
                // onChange={(e) => handlePassword(e)}
                onBlur={(e) => handleBlurPassword()}
                onChange={handlePasswordChange}
                style={{ borderColor: IsValidPassword ? '#ced4da' : 'red' }}
                className="w-75 form-control fs-7"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
              />
              <div onClick={() => handleTogglePasswordVisibility()}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}{' '}
              </div>
            </div> */}
            <div className="d-flex align-items-center py-2 w-100 position-relative">
              <label className="w-25 fs-7" htmlFor="">
                Password *
              </label>

              <input
                onBlur={handleBlurPassword}
                onChange={handlePasswordChange}
                style={{ borderColor: IsValidPassword ? '#ced4da' : 'red' }}
                className="w-75 form-control fs-7"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
              />

              {/* Add the icon using CSS */}
              <div
                className="icon-container"
                onClick={() => handleTogglePasswordVisibility()}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}{' '}
              </div>
            </div>

            {!IsValidPassword && (
              <div className="valadition-field">
                Password must contain at least 8 characters, including uppercase
                and lowercase letters, numbers, and special characters.
              </div>
            )}

            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                Phone *
              </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                className="w-75 form-control fs-7"
                type="number"
                placeholder="Enter Phone"
              />
            </div>

            {/* LADP */}
            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                Temp User *
              </label>
              <select
                className="w-75 form-control fs-7"
                value={tempUser}
                onChange={handleTempUserChange}
              >
                <option value="">Select Temp User</option>
                {userData?.map((item: any) => (
                  <option value={item?.user_id}>{item?.user_name}</option>
                ))}
              </select>
            </div>

            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                OAuth *
              </label>
              <div className="px-4">
                <Checkbox
                  name="auth"
                  checked={oauth}
                  onChange={handleCheckboxChange}
                  color="success"
                />
              </div>
            </div>

            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                Two-factor *
              </label>
              <div className="px-4">
                {/* <input
                  type="checkbox"
                 
                /> */}
                <Checkbox
                  inputProps={{ 'aria-label': 'controlled' }}
                  name="twoFactor"
                  checked={twoFactor}
                  onChange={() => settwoFactor(!twoFactor)}
                  color="success"
                />
              </div>
            </div>


            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                User Image *
              </label>
              <div className="d-flex flex-column">
                <label>
                  {userImage && (
                    <img
                      src={userImage}
                      height="54"
                      width="54"
                      className="rounded-circle"
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
                  onClick={() => document.getElementById('filePicker')!.click()}
                  className="bg-transparent border-0"
                >
                  <BsCloudUpload className="mx-2 theme-danger" size={20} />
                  Upload Latest
                </button>
              </div>
            </div>
            {/* <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                Cover Image *
              </label>
              <div className="d-flex flex-column">
                <label>
                  {coverImage && (
                    <img src={coverImage} height="54" width="178" alt="Image" />
                  )}
                  <input
                    type="file"
                    hidden
                    id="filePicker2"
                    onChange={(e) => coverHandler(e)}
                  />
                </label>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById('filePicker2')!.click()
                  }
                  className="bg-transparent border-0"
                >
                  <BsCloudUpload className="mx-2 theme-danger" size={20} />
                  Upload Latest
                </button>
              </div>
            </div> */}
          </form>
          <br />
          <br />
          <br />
        </Card.Body>
      </Card>

      {/* <Card className='border-0'>
        <Card.Header className='bg-dark text-white theme-font'>
          <p className='m-0 p-2 fs-5'>Step 02: <span className='theme-danger'>Define Scope</span></p>
        </Card.Header>
        <Card.Body>
          <form action="" className='d-flex w-100'>
            <label className='w-25' htmlFor="">Devices to be managed</label>
            <div className="d-flex align-items-center">
              <div className='px-4'>
                <input type="radio" name="role" />
                <label className='px-1' htmlFor="html">All Devices</label>
              </div>
              <div className='px-4'>
                <input type="radio" name="role" />
                <label className='px-1' htmlFor="css">Selected Group(s)</label>
              </div>
            </div>
          </form>
          <br/>
          <br/>
          <div className="d-flex justify-content-end w-100">
            <button className='border-0 bg-gray text-white px-3 py-2 rounded mx-2'>Cancel</button>
            <button
              className='border-0 bg-theme-danger text-white px-3 py-2 rounded mx-2'
              onClick={() => handleSubmit()}
              type='button'
            >Add User</button>
          </div>
        </Card.Body>
      </Card> */}
      <div className="d-flex justify-content-end w-100">
        <button className="border-0 bg-gray text-white px-3 py-2 rounded mx-2">
          Cancel
        </button>
         <button
          className={`border-0 bg-theme-danger text-white px-3 py-2 rounded mx-2 `}
          onClick={() => handleSubmit()}
          type="button"
          disabled={isUserNameExists || isEmailExists}
        >
          Add User
        </button>
      </div>
    </div>
  );
};
export default AdminUserForm;
