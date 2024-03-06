import { useNavigate } from 'react-router-dom';
import UserCoverComponent from '../../components/Client/UserProfile/UserCoverComponet';
import UserAboutComponent from '../../components/Client/UserProfile/UserAboutComponent';
import { Col, Row } from 'react-bootstrap';
import UserActivityTimeLineComponent from '../../components/Client/UserProfile/UserActivityTimeLineComponent';
import UserAuthenticationComponent from '../../components/Client/UserProfile/UserAuthenticationComponent';
import { getUserById, useGlobalSelector } from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import UserRecentDeviceTableComponent from '../../components/Client/UserProfile/UserRecentDeviceTableComponent';
const UserProfile = () => {
  const router = useNavigate();
  const { userInfo } = useGlobalSelector((state) => state.user);
  const [userData, setUserData] = useState<any>(null);
  const fetchUser = () => {
    const formData: any = {
      user_id: userInfo?.result?.user_id,
    };
    getUserById(formData).then((res: any) => {
      setUserData(res?.data?.result);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <UserCoverComponent />
      <Row>
        <Col md={3} className="my-2">
          <UserAboutComponent />
        </Col>
        <Col md={9}>
          <UserActivityTimeLineComponent />
          <br />
          <UserAuthenticationComponent user={userInfo} />
          <br />
        </Col>
        <Col md={12}>
          <UserRecentDeviceTableComponent />
          {/*<br/>*/}
          {/*<UserDeleteAccountComponent/>*/}
        </Col>
      </Row>
    </div>
  );
};
export default UserProfile;
