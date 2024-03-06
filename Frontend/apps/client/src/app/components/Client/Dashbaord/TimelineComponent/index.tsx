import { Col, Row } from 'react-bootstrap';
import './timeline-component.scss';
import { useState, useEffect } from 'react';
import { useGlobalSelector, userLogActivity } from '@infralastic/global-state';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
interface dashboard {
  userInfo: any;
}

const TimelineComponent = (props: dashboard) => {
  const [userActivity, setUserActivity] = useState<any>('');

  console.log(props?.userInfo?.result?.user_id);
  const userActivityLog = () => {
    const formData = {
      user_id: props.userInfo?.result?.user_id
        ? props.userInfo?.result?.user_id
        : props.userInfo?.user_id,
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
    <div className="h-100">
      <div className="shadow bg-white rounded p-3 h-100 overflow-hidden">
        <Row className="h-100 overflow-auto">
          <Col md={1}></Col>
          <Col md={11}>
            {/* <h5 className="mb-4 theme-font">Audit Activity</h5>
            <div className="d-flex flex-column h-100">
              <div>
                <h6 className="theme-font">New asset</h6>
                <p className="fs-7 text-muted theme-font">
                  Karen has added a new asset in inventory
                </p>
              </div>
              <div>
                <h6 className="theme-font">Create a new stock for client</h6>
                <p className="fs-7 text-muted theme-font">
                  Create a new stock for client
                </p>
              </div>
              <div>
                <h6 className="theme-font">Shared 2 new devices</h6>
                <p className="fs-7 text-muted theme-font">
                  Sent by Mollie Dixon
                </p>
                <div className="d-flex">
                  <p className="fs-7">App Guidelines</p>
                  <p className="fs-7 ms-3">Testing Results</p>
                </div>
              </div>
              <div>
                <h6 className="theme-font">Project status updated</h6>
                <p className="fs-7 text-muted theme-font">
                  WooCommerce iOS App Completed
                </p>
              </div>
            </div> */}
            <h5 className="mb-4 theme-font">Audit Activity</h5>
            <div className="d-flex flex-column h-100">
              {userActivity ? (
                userActivity?.user_logs?.map((item: any, index: any) => (
                  <div key={index}>
                    <h6 className="theme-font">{item?.module}</h6>
                    <div dangerouslySetInnerHTML={{ __html: item?.remarks }} />
                  </div>
                ))
              ) : (
                <Box sx={{ width: 300 }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box>
                // <p>Loading user activity...</p>
              )}
            </div>
          </Col>
        </Row>
        <h5></h5>
      </div>
    </div>
  );
};
export default TimelineComponent;
