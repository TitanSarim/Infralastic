import React from 'react';
import { useGlobalSelector } from '@infralastic/global-state';
// import Invoice from '../../../../../../../app-store/src/pages/DeviceStore/Invoice/index';
const DeviceStore = () => {
  const { userInfo } = useGlobalSelector((state) => state.user);

  //Condtion for ID
  // const id =${userInfo?.user_id ?userInfo?.user_id:userInfo?.result.user_id}

  // Generate the iframe URL with the user_id parameter
  const iframeUrl = `https://infralastic-shop.infralastic.com/device-store?user_id=${
    userInfo?.user_id ? userInfo?.user_id : userInfo?.result.user_id
  }`;
  const iframeUrl2 = `http://localhost:3001/device-store?user_id=${
    userInfo?.user_id ? userInfo?.user_id : userInfo?.result.user_id
  }`;

  return (
    <div className="h-100 py-3">
      <iframe src={iframeUrl2} className="w-100 h-100" />
      {/* <Invoice /> */}
    </div>
  );
};

export default DeviceStore;
