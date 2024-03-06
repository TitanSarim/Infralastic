import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './userabout.scss';
import { AiOutlineMail } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { GoCheck } from 'react-icons/go';
import { MdOutlineManageAccounts, MdOutlineLocalPhone } from 'react-icons/md';
import { useGlobalSelector, getAllRoles } from '@infralastic/global-state';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
const UserAboutComponent = () => {
  const [roles, setRolesData] = useState<any>('');

  const { userInfo } = useGlobalSelector((state) => state.user);

  // console.log(userInfo, 'useraboutcompoent');
  const fetchRoles = () => {
    const config = {};
    getAllRoles(config).then((res) => {
      setRolesData(res.data.result.role_details);
    });
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  console.log(roles);
  return (
    <Card className="h-100 shadow border-0 ">
      <Card.Body>
        <div className="theme-font">
          <h5 className=" text-muted">About</h5>
          <div>
            <div className="">
              <div className="theme-font d-flex mtb-10px">
                <span className="icon-custom">
                  <BsPerson className="mx-1" size={18} />
                </span>
                <span className="text-muted">Full Name:</span>{' '}
                {userInfo?.result?.user_name
                  ? userInfo?.result?.user_name
                  : userInfo?.user_name}
              </div>
              <div className="theme-font  d-flex mtb-10px">
                <span className="icon-custom">
                  <GoCheck className="mx-1" size={18} />
                </span>
                <span className="text-muted">Status:</span> Active
              </div>
              <div className="theme-font d-flex mtb-10px">
                <span className="icon-custom">
                  <MdOutlineManageAccounts className="mx-1" size={18} />
                </span>
                <span className="text-muted"> Role:</span>{' '}
                {userInfo?.result?.role_name
                  ? userInfo?.result?.role_name
                  : userInfo?.role_name}
              </div>
            </div>
          </div>
          <br />
          <div className="theme-font">
            <h5 className="text-muted mb-1">Contact</h5>
            <div>
              <div className="theme-font d-flex mtb-10px  email-alignment">
                <span className="theme-danger icon-custom">
                  <AiOutlineMail size={18} className="mx-1" />
                </span>
                <span></span>
                {userInfo?.result?.email
                  ? userInfo?.result?.email
                  : userInfo?.email}
              </div>
            </div>
            <div>
              <div className="theme-font d-flex mtb-10px">
                <span className="icon-custom">
                  <MdOutlineLocalPhone size={18} className="mx-1" />
                </span>

                {userInfo?.result?.phone
                  ? userInfo?.result?.phone
                  : userInfo?.phone}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default UserAboutComponent;
