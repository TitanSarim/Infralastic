import { Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useGlobalSelector, userLogActivity } from '@infralastic/global-state';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const UserActivityTimeLineComponent = () => {
  const [userActivity, setUserActivity] = useState<any>('');
  const [user_id, setUser_id] = useState('');

  const { userInfo } = useGlobalSelector((state) => state.user);
  // console.log('user_activity', userActivity);

  const userActivityLog = () => {
    const formData = {
      user_id: userInfo?.result?.user_id
        ? userInfo?.result?.user_id
        : userInfo?.user_id,
    };
    userLogActivity(formData).then((res: any) => {
      // console.log(res, 'res user activity');
      const user_logs = res.data.result;
      console.log(user_logs);
      if (user_logs) {
        setUserActivity(user_logs);
      } else {
        // Handle the case where userLogs is null or undefined
        setUserActivity([{ module: 'No Activity Found' }]);
      }
    });
  };

  useEffect(() => {
    userActivityLog();
  }, []);

  return (
    <div>
      <div className="h-100">
        <div className="shadow bg-white rounded p-3 h-100 overflow-hidden">
          <Row className="h-100 overflow-auto">
            <Col md={12}>
              <h5 className="mb-4 theme-font">Audit Activity</h5>
              <div className="d-flex flex-column h-100">
                {userActivity ? (
                  userActivity?.user_logs?.map((item: any, index: any) => (
                    <div key={index}>
                      <h6 className="theme-font">{item?.module}</h6>
                      <div
                        className="py-1"
                        dangerouslySetInnerHTML={{ __html: item?.remarks }}
                      />
                    </div>
                  ))
                ) : (
                  // <p>Loading user activity...</p>
                  <Box sx={{ width: 300 }}>
                    <Skeleton />
                    <Skeleton animation="wave" width={80} />
                    <Skeleton animation={false} />
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                )}
              </div>
            </Col>
          </Row>
          <h5></h5>
        </div>
      </div>
    </div>
  );
};
export default UserActivityTimeLineComponent;
