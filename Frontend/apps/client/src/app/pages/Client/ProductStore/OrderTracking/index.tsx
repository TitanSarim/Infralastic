import './order-tracking.scss';
import React from 'react';

const OrderTracking = () => {
  // <div className="h-100 py-3">
  //   <iframe src="https://infralastic-shop.infralastic.com/order-tracking" className='w-100 h-100' />

  // </div>
  const iframeUrl = 'https://infralastic-shop.infralastic.com/order-tracking';
  const iframeUrl2 = 'http://localhost:3001/order-tracking';
  return (
    <div className="h-100 py-3">
      <iframe src={iframeUrl} className="w-100 h-100" />
      {/* <Invoice /> */}
    </div>
  );
};
export default OrderTracking;
