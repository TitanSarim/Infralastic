import { Card, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
  addAdminUser,
  getAllRoles,
  getUserById,
  updateAdminUser,
  useGlobalDispatch,
  useGlobalSelector,
  userPasswordChange,
  userUpdate,
} from '@infralastic/global-state';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import './editprofile.scss';
import { toast } from 'react-toastify';
import { BsCloudUpload } from 'react-icons/bs';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../services/config/firebase';
import { useNavigate } from 'react-router-dom';
import { parse } from 'path';

const EditProfile = () => {
  const dispatch = useGlobalDispatch();
  const router = useNavigate();
  const [roles, setRoles] = useState<any>('');
  const [role, setRole] = useState<any>('');
  const [role_id, setRole_id] = useState<any>('');

  const [roleData, setRoleData] = useState<any>([]);
  const [userName, setUserName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [phone, setPhone] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [showPassword, setshowPassword] = useState<any>('');
  const [repeatpasswordshow, setrepeatPasswordShow] = useState<any>('');

  const [userFile, setUserFile] = useState<any>(null);
  const [coverFile, setCoverFile] = useState<any>(null);
  const [userImage, setUserImage] = useState<any>('');
  const [coverImage, setCoverImage] = useState<any>('');
  const [token, settoken] = useState<any>('');
  const [newPassword, setnewPassword] = useState(''); // Repeat password
  const [repeatPassword, setRepeatPassword] = useState(''); // Repeat password
  const { userInfo } = useGlobalSelector((state) => state.user);
  console.log('id ', userInfo?.result?.user_id);
  const handleSubmitPassword = () => {
    if (newPassword === repeatPassword) {
      // Passwords match, proceed with saving
      // userPasswordChange
      const formData: any = {
        login: email,
        new_password: newPassword,
      };
      userPasswordChange(formData).then((res: any) => {
        console.log(res, 'respassword');
        // const user_logs = res.data.result;
        toast.success('Passwords match. Saving...');
        // Add your saving logic here
      });
    } else {
      // Passwords do not match, show an error or handle it as needed
      toast.error('Passwords do not match.');
      // You can display an error message to the user or take other actions
    }
  };
  console.log(userInfo);
  const handleTogglePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };
  const handleToggleRepeatPasswordVisibility = () => {
    setrepeatPasswordShow(!repeatpasswordshow);
  };
  console.log('user info', userInfo);
  function fetchUserById() {
    const formData = {
      user_id: userInfo?.result?.user_id
        ? userInfo?.result?.user_id
        : userInfo?.user_id,
    };
    // console.log(userInfo);
    getUserById(formData).then((res: any) => {
      console.log('profilepage', res.data);
      setUserName(res.data.result?.user_name);
      setEmail(res.data.result?.email);
      setPhone(res.data.result?.phone);
      setUserImage(res.data.result?.image_url);
      setCoverImage(res.data.result?.cover_url);
      const role_id = res.data.result.role_data[0]?.role_id || ''; // Extract "developer" or use an empty string if it doesn't exist

      const role_name = res.data.result.role_data[0]?.role_name || ''; // Extract "developer" or use an empty string if it doesn't exist
      setRole_id(role_id);
      setRole(role_name);
      settoken(res?.data?.result?.token);
      // setRole(res?.data?.result?.role_name);
    });
  }
  console.log(role);
  // console.log(email);
  // console.log(phone);
  const fetchRoles = () => {
    const config = {};
    getAllRoles(config).then((res) => {
      setRoleData(res?.data?.result?.role_details);
    });
  };

  const imageHandler = (e: any) => {
    setUserFile(e.target.files[0]);
    setUserImage(URL.createObjectURL(e.target.files[0]));
  };
  console.log(userFile, 'userFile');
  // const coverHandler = (e: any) => {
  //   setCoverFile(e.target.files[0]);
  //   setCoverImage(URL.createObjectURL(e.target.files[0]));
  // };
  // function handleSubmit() {
  //   const formData = {
  //     name: userName,
  //     login: email,
  //     password: password,
  //     phone: phone,
  //     role_id: JSON.parse(roles),
  //     user_id: userInfo?.result?.user_id
  //   }
  //   updateAdminUser(formData).then((res: any) => {
  //     toast.success(res.data.result.msg)
  //     setTimeout(() => {
  //       window.location.reload()
  //     }, 3000)
  //   })
  // }
  useEffect(() => {
    fetchRoles();
    if ((userInfo?.result?.user_id || userInfo?.user_id) !== null) {
      fetchUserById();
    }
  }, []);
  function handlecheck() {
    console.log('image_url', userImage);
  }
  function handleSubmit() {
    if (userFile) {
      const storageRef = ref(storage, `user/${userFile?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, userFile);
      console.log(uploadTask);
      uploadTask.on(
        'state_changed',
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          alert(error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (userImageUrl: string) => {
              const formData: any = {
                name: userName,
                login: email,
                // password: password,
                phone: phone,
                role_id: JSON.parse(role_id),
                image_url: userImageUrl,
                user_id: userInfo?.result?.user_id
                  ? userInfo?.result?.user_id
                  : userInfo?.user_id,
                Oauth: false,
                Oauth_token: '',
              };
              console.log(formData);

              try {
                dispatch(userUpdate(formData)).then((res: any) => {
                  toast.success(res?.payload?.msg);
                  if (res?.payload?.success === true) {
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
          );
        }
      );
    } else {
      const formData: any = {
        name: userName,
        login: email,
        // password: password,
        phone: phone,
        role_id: JSON.parse(role_id),
        image_url: userImage,
        user_id: userInfo?.result?.user_id
          ? userInfo?.result?.user_id
          : userInfo?.user_id,
        Oauth: false,
        Oauth_token: '',
      };
      console.log(formData);

      try {
        dispatch(userUpdate(formData)).then((res: any) => {
          toast.success(res?.payload?.msg);
          if (res?.payload?.success === true) {
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
  }
  console.log(email, 'email');
  return (
    <>
      <div>
        <br />
        <br />
        <Card className="border-0">
          <Card.Body>
            <h3 className="theme-font theme-danger my-3">Edit Profile</h3>
            <form action="" className="p-2">
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  User Name *
                </label>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-75 form-control fs-7"
                  type="text"
                  value={userName}
                  placeholder="Enter Username"
                />
              </div>
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Role *
                </label>

                <input
                  className="w-75 form-control fs-7"
                  value={role}
                  type="text"
                  disabled={true}
                  // onChange={()=>setRoleData(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Email *
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-75 form-control fs-7"
                  type="text"
                  value={email}
                  placeholder="Enter Email"
                />
              </div>

              {/* <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Password *
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-75 form-control fs-7"
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                />
              </div> */}

              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Phone *
                </label>
                {isNaN(phone) ? ( // Check if the phone value is not a number
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-75 form-control fs-7"
                    type="number"
                    value={phone}
                    placeholder="Enter Phone"
                  />
                ) : (
                  // Display an empty input field if the phone value is a number
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-75 form-control fs-7"
                    type="number"
                    value={phone}
                    placeholder="Enter Phone"
                  />
                )}
              </div>
              {/* In this code, we use the isNaN function to check if the phone value is not a number. If it's not a number, we render the input field with the current value. If it is a number, we render an empty input field. This way, the input field will only be shown if the value is not a number, and it will be empty if the value is a number. */}

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
            <div className="d-flex w-100 justify-content-end">
              <button
                className="bg-secondary rounded border-0 text-white px-3 py-1 mx-2"
                onClick={() => router(-1)}
              >
                Back
              </button>
              <button
                className="bg-theme-danger rounded border-0 text-white px-3 py-1 mx-2"
                onClick={() => handleSubmit()}
              >
                Save
              </button>
            </div>
          </Card.Body>
        </Card>
        <Card className="border-0 my-2">
          <Card.Body>
            <h3 className="theme-font theme-danger my-3">Change Password</h3>
            <form action="" className="p-2">
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Password *
                </label>
                <input
                  onChange={(e) => setnewPassword(e.target.value)}
                  className="w-75 form-control fs-7"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  placeholder="Enter Password"
                />
                <div
                  className="icon-container"
                  onClick={() => handleTogglePasswordVisibility()}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}{' '}
                </div>
              </div>
              <div className="d-flex align-items-center py-2 w-100">
                <label className="w-25 fs-7" htmlFor="">
                  Repeat Password *
                </label>
                <input
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-75 form-control fs-7"
                  type={repeatPassword ? 'text' : 'password'}
                  value={repeatPassword}
                  placeholder="Repeat Password"
                />
                <div
                  className="icon-container-2"
                  onClick={() => handleToggleRepeatPasswordVisibility()}
                >
                  {repeatPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}{' '}
                </div>
              </div>
            </form>
            <br />
            <div className="d-flex w-100 justify-content-end">
              <button
                className="bg-secondary rounded border-0 text-white px-3 py-1 mx-2"
                onClick={() => router(-1)}
              >
                Back
              </button>
              <button
                className="bg-theme-danger rounded border-0 text-white px-3 py-1 mx-2"
                onClick={() => handleSubmitPassword()}
              >
                Save
              </button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default EditProfile;
