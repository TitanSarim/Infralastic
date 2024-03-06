import {
  getOrderById,
  useGlobalDispatch,
  useGlobalSelector,
} from '@infralastic/global-state';
import { useEffect, useState, useRef } from 'react';

import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import './invoice.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../assets/logo.png';
// import html2canvas from 'html2canvas';

const Invoice = () => {
  const dispatch = useGlobalDispatch();
  const router = useNavigate();
  const [productData, setProductData] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loader, setloader] = useState<any>(false);
  const id: any = searchParams.get('orderId');
  const [InvoiceDate, setInvoiceDate] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');

  const [address, setaddress] = useState('');
  const [shipTo, setshipTo] = useState('');
  // Initialize state to store the data from the first object
  const [firstObjectData, setFirstObjectData] = useState(null);

  const cart = useGlobalSelector((state) => state.cart.cartInfo);
  console.log(cart, 'cart pdf page');
  const fetchOrderDetails = () => {
    const formData: any = {
      order_no: id,
    };
    dispatch(getOrderById(formData)).then((res: any) => {
      console.log('pdf', res?.payload?.result?.product_details);
      setProductData(res?.payload?.result?.product_details);
    });
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  console.log(productData);
  useEffect(() => {
    const fetchCurrentDate = () => {
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0]; // Format date as "YYYY-MM-DD"
      setInvoiceDate(formattedDate);
    };
    fetchCurrentDate();
    if (productData?.length > 0) {
      setFirstObjectData(productData[0]);
    }
  }, []);

  console.log(firstObjectData);
  const calculateTotalCost = () => {
    let total = 0;

    productData?.forEach((item: any) => {
      total += item.price * item.product_qty;
    });

    console.log(total);
    return total;
  };
  function handleSubmit(): void {
    router({
      pathname: '/checkout-complete',
      search: `?${createSearchParams({
        orderId: id,
      })}`,
    });
  }

  const pdfref: any = useRef();
  const handleGeneratePDF = () => {
    const capture = pdfref.current;

    setloader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4', true);
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      const imgwidth: any = canvas.width;
      const imgheight: any = canvas.height;
      const ratio: any = Math.min(
        componentWidth / imgwidth,
        componentHeight / imgheight
      );
      const imgX: any = ((componentWidth / imgwidth) * ratio) / 2;
      const imgY: any = 30;
      console.log(componentHeight, componentWidth);
      doc.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgwidth * ratio,
        imgheight * ratio
      );
      setloader(false);
      doc.save('receipt.pdf');
    });
  };

  // Helper function to sum an array of numbers
  const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

  console.log(productData);

  return (
    <Container>
      <Row>
        <Col className="btn-download">
          <Button
            onClick={() => handleGeneratePDF()}
            disabled={!(loader === false)}
            className="btn-pdf"
            // variant="primary"
          >
            {loader ? <>Downloading</> : <>Download Pdf</>}
          </Button>
        </Col>
      </Row>
      <div className="actual-pdf" ref={pdfref}>
        <div className="img-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="row">
          <div className="col-6">
            {' '}
            <div className="fw-light mtb-14 font-size-pdf">
              <b>Name:</b>{' '}
              <span>
                {productData?.[0]?.first_name + productData?.[0]?.last_name}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="fw-light mtb-14 font-size-pdf">
              <b>E-mail:</b> <span>{productData?.[0]?.email}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="fw-light mtb-14 font-size-pdf">
              <b>Address:</b> <span>{productData?.[0]?.address}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="fw-light mtb-14 font-size-pdf">
              <b>InvoiceDate:</b> <span>{InvoiceDate}</span>
            </div>
          </div>

          <div className="col-6">
            <div className="fw-light mtb-14 font-size-pdf">
              <b>Ship to:</b>{' '}
              <span>
                {productData?.[0]?.state_name +
                  ',' +
                  productData?.[0]?.zip_code}
              </span>
            </div>
          </div>
          {/* <h5 className="fw-light mtb-14"><b>Phone No:</b> <span>{productData?.[0]?.phone}</span></h5> */}
        </div>
        <Row>
          <Col>
            {/* Table new deisgn  */}
            <Table striped bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Item</th>
                  <th>Brand</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {productData?.map((item: any) => (
                  <tr key={item.product_id}>
                    <td>{item.product_id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.brand}</td>
                    <td>{item.product_qty}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="total-pdf">
            <h3>Total: ${calculateTotalCost()}</h3>
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="bg-theme-danger border-0 w-50 py-2 theme-font my-4 text-white rounded"
          type="button"
          onClick={() => handleSubmit()}
        >
          Proceed to checkout
        </button>
      </div>
    </Container>
  );
};

export default Invoice;
