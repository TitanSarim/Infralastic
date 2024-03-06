import { useNavigate } from 'react-router-dom';
import './user-cover.scss';
import { BiEdit } from 'react-icons/bi';
import { CiCalendarDate } from 'react-icons/ci';
import { MdManageAccounts } from 'react-icons/md';
import { useGlobalSelector } from '@infralastic/global-state';
import Tooltip from '@mui/material/Tooltip';

import { BsPerson } from 'react-icons/bs';
import { blue, green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { FaUserEdit } from 'react-icons/fa';
const UserCoverComponent = () => {
  const router = useNavigate();
  const { userInfo } = useGlobalSelector((state) => state.user);
  // console.log('check id ', userInfo);
  return (
    <div className="w-100 background-cover  shadow border-0 mtb-4">
      <div className="w-100 position-relative cover-edit d-flex justify-content-end theme-danger">
        {' '}
      </div>

      <div className="d-flex">
        <div className="user-img">
          <img
            src={
              userInfo?.result?.image_url
                ? userInfo?.result?.image_url
                : userInfo?.image_url
            }
            className="shadow-lg"
            width="147"
            height="147"
            alt=""
          />
        </div>
        <div className="d-flex w-100">
          <div className="d-flex w-75 flex-column p-2 adjust-end">
            <div>
              <h3 className="theme-font px-2  margin-bottom-0px">
                {userInfo?.result?.user_name
                  ? userInfo?.result?.user_name
                  : userInfo?.user_name}
              </h3>
            </div>
            <div className="d-flex">
              <div className="theme-font d-flex align-item-center px-2">
                <div className="theme-font d-flex align-items-center">
                  <span className="icon-custom-cover">
                    <MdManageAccounts size={18} className="mx-1" />
                  </span>

                  {userInfo?.result?.role_name
                    ? userInfo?.result?.role_name
                    : userInfo?.role_name}
                </div>
              </div>
              <div className="theme-font d-flex align-item-center px-2">
                <div className="theme-font d-flex align-items-center">
                  <span className="icon-custom-cover-calendar">
                    <CiCalendarDate size={18} className="mx-1" />
                  </span>
                  Joined Date{' '}
                  {userInfo?.result?.create_date
                    ? userInfo?.result?.create_date
                    : userInfo?.create_date}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex w-25 justify-content-end mx-2 my-2 align-items-end">
            {/* <button
              className="bg-theme-danger text-white border-0 px-3 py-2 rounded"
              onClick={() => router('/edit-profile')}
            >
              Edit Profile
            </button> */}
            <Tooltip title="Edit Profile">
              <div className="cursor" onClick={() => router('/edit-profile')}>
                <Avatar sx={{ bgcolor: green[500] }}>
                  <FaUserEdit />
                </Avatar>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCoverComponent;
