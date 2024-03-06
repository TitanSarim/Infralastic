import { Breadcrumb, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import creditCard from '../../../assets/payment/credit-card.png';
import debitCard from '../../../assets/payment/debit-card.png';
import paypalCard from '../../../assets/payment/paypal.png';
import { CiShoppingCart } from 'react-icons/ci';
import './devicecheckout.scss';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  addToCartList,
  cartDelete,
  cartRemove,
  checkoutOrder,
  deleteCartList,
  getLocation,
  useGlobalDispatch,
  useGlobalSelector,
  wishRemove,
  cartSubQuantity,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { connect } from 'tls';

const DeviceCheckout = () => {
  const router = useNavigate();
  const dispatch = useGlobalDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState<any>(null);
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState<any>(null);
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState<any>(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const cartInfo = useGlobalSelector((state) => state.cart.cartInfo);
  const { deviceUser } = useGlobalSelector((state) => state.deviceUser);
  const userInfo = useGlobalSelector((state) => state.user.userInfo);

  const wishInfo = useGlobalSelector((state) => state.cart.wishInfo);

  const totalCost =
    cartInfo?.cart_details?.reduce(
      (total: number, item: any) => total + item?.price,
      0
    ) || 0;

  const id: any = searchParams.get('productId');
  console.log(cartInfo);
  // const product = cartInfo?.cartlist_details?.map((item: any) =>
  //   item.product_data.map((item: any) => ({
  //     product_id: JSON.parse(item.product_id),
  //     quantity: JSON.parse(item.product_qty),
  //   }))
  // );
  const product = cartInfo?.cartlist_details?.flatMap((item: any) =>
    item.product_data.map((productItem: any) => {
      console.log(typeof productItem.product_id); // Log the product_id
      console.log(typeof productItem.product_qty); // Log the product_id
      const product_id: Number = productItem.product_id;
      const quantity: Number = productItem.product_qty;
      // return {
      //   product_id: prod_id,
      //   quantity: prod_qty,
      // };
      return { product_id, quantity };
    })
  );

  console.log(product);
  // const quantity = cartInfo?.cart_details?.map((item: any) => ({
  //   quantity: item.product_qty,
  // }));

  useEffect(() => {
    if (cartInfo && cartInfo?.cartlist_details) {
      setCartItems(cartInfo?.cartlist_details);
    }
    if (wishInfo && wishInfo?.wishlist_details) {
      setWishItems(wishInfo?.wishlist_details);
    }
  }, [cartInfo, wishInfo]);
  console.log(cartItems, 'cart Items');
  const createDownloadableTxtFile = (orderNo: any) => {
    const content = `Order Number: ${orderNo}`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = `order_${orderNo}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmit = () => {
    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: userName,
      address: address,
      address_2: address2,
      zip_code: zip,
      country_id: JSON.parse(country),
      state_id: state,
      user: parseInt(deviceUser),
      product_ids: product,

      // quantity: quantity,
      company_id: 1,
      company_name: 'My Company',
      cartlist_no: parseInt(deviceUser),
    };
    console.log('faewrfewr', formData);
    checkoutOrder(formData).then((res: any) => {
      console.log(res, 'ress');
      if (res.data?.result?.success === true) {
        toast.success(res.data.result.msg);
        const orderNo = res.data.result.order_no;
        createDownloadableTxtFile(orderNo);
        setTimeout(() => {
          router({
            pathname: '/invoice',
            search: `?${createSearchParams({
              orderId: orderNo,
            })}`,
          });
        }, 3000);
      } else {
        toast.error(res.data.error.message);
      }
    });
  };

  const handleDelete = async (id: any) => {
    const formData: any = {
      cartlist_no: deviceUser,
      product_ids: [{ product_id: id, quantity: 1 }],
    };
    try {
      dispatch(cartSubQuantity(formData)).then(() => {
        toast.success('Item Removed Successfully');
        setCartItems((prevCartItems: any) =>
          prevCartItems.map((item: any) =>
            item.product_id === id
              ? { ...item, product_qty: item.product_qty - 1 }
              : item
          )
        );
        // dispatch((state: any) => ({
        //   ...state,
        //   cart: {
        //     ...state?.cart,
        //     cartInfo: {
        //       ...state?.cart?.cartInfo,
        //       cartlist_details: state?.cart?.cartInfo?.cartlist_detail.map((item: any) =>
        //         item?.product_id === id
        //           ? { ...item, product_qty: item?.product_qty - 1 }
        //           : item
        //       ).filter((item: any) => item?.product_qty > 0), // Filter out items with quantity 0
        //     },
        //   },
        // }));

        dispatch((state: any) => ({
          ...state,
          cart: {
            ...state?.cart,
            cartInfo: {
              ...state?.cart?.cartInfo,
              cartlist_details: state?.cart?.cartInfo?.cartlist_details.map(
                (item: any) => {
                  if (item?.product_data) {
                    // Find the product with the specified id in product_data
                    const updatedProductData = item.product_data.map(
                      (productItem: any) => {
                        if (productItem?.product_id === id) {
                          console.log(productItem); // Log the productItem here
                          return {
                            ...productItem,
                            product_qty: productItem?.product_qty - 1,
                          };
                        }
                        return productItem;
                      }
                    );

                    // Filter out products with quantity 0 from product_data
                    const filteredProductData = updatedProductData.filter(
                      (productItem: any) => productItem?.product_qty > 0
                    );

                    // Return the item with the updated product_data
                    return {
                      ...item,
                      product_data: filteredProductData,
                    };
                  }

                  // Return the item as-is if product_data is missing
                  return item;
                }
              ),
            },
          },
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log('Product', product);
  const handleRemove = async (id: any) => {
    const formData: any = {
      cartlist_no: deviceUser,
      product_id: id,
    };
    try {
      dispatch(cartRemove(formData)).then(() => {
        toast.success('Item Deleted Successfully');
        console.log(cartItems);
        setCartItems((prevCartItems: any) =>
          prevCartItems.filter((item: any) => item.product_id !== id)
        );

        dispatch((state: any) => ({
          ...state,
          cart: {
            ...state?.cart,
            cartInfo: {
              ...state?.cart?.cartInfo,
              cart_details: state?.cart?.cartInfo?.cart_details.filter(
                (item: any) => item?.product_id !== id
              ),
            },
          },
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cartItems);

  const handleWishRemove = async (id: any) => {
    const formData: any = {
      wishlist_no: deviceUser,
      product_id: id,
      user_id: 2,
    };
    try {
      dispatch(wishRemove(formData)).then(() => {
        toast.success('Item Deleted Successfully');
        dispatch((state: any) => ({
          ...state,
          cart: {
            ...state?.cart,
            wishInfo: {
              ...state?.cart?.wishInfo,
              wishlist_details: state?.cart?.wishInfo?.wishlist_details.filter(
                (item: any) => item?.product_id !== id
              ),
            },
          },
        }));
        setWishItems((prevCartItems: any) =>
          prevCartItems.filter((item: any) => item?.product_id !== id)
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCart = async (id: any, wish: boolean) => {
    const formData = {
      cartlist_no: deviceUser,
      product_ids: [{ product_id: id, quantity: 1 }],
      user_id: deviceUser,
    };
    try {
      await dispatch(addToCartList(formData)).then((res: any) => {
        toast.success('Item Added Successfully');
        console.log(res, 'res');
        if (wish) {
          handleWishRemove(id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLocation = () => {
    const config = {};
    getLocation(config).then((res: any) => {
      setLocationData(res.data.result.location_details);
    });
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  const calculateTotal = (cartItems: any) => {
    let total = 0;

    cartItems.forEach((item: any) => {
      item.product_data.forEach((productItem: any) => {
        total += productItem.price * productItem.product_qty;
      });
    });
    console.log(total);
    return total;
  };

  return (
    <div className="d-flex flex-column w-100 h-100vh overflow-y-scroll p-3">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="">Device Store</Breadcrumb.Item>
          <Breadcrumb.Item>
            Ausu Vivobook pro 16x (N7601,12th Gen Intel)
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <br />
      <Card>
        <div className="position-absolute back-btn">
          <button
            className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
            onClick={() => router(-1)}
          >
            <BiArrowBack />
          </button>
        </div>
        <Card.Body className="p-4">
          <Row>
            <Col md={12}>
              <Card className="p-3 shadow">
                <Card.Body>
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex w-100">
                      <div className="w-50 d-flex justify-content-start">
                        <h2 className="theme-font">Your cart</h2>
                      </div>

                      <div className="w-50 d-flex justify-content-end">
                        <span className="theme-font">
                          <CiShoppingCart size={22} />
                          <span className="ms-1 m-0">
                            {cartItems?.length} item
                          </span>
                        </span>
                      </div>
                    </div>
                    <Row>
                      <Col md={6}>
                        <div className="d-flex justify-content-start w-50">
                          <h4>Item</h4>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex justify-content-end ">
                          <h4>Quantity</h4>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="d-flex justify-content-end">
                          <h4>Price</h4>
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex  w-100"></div>
                    <div className="py-3">
                      {cartItems?.map((item: any, index: any) => (
                        <>
                          {item.product_data.map((productItem: any) => {
                            if (productItem.product_qty === 0) {
                              handleRemove(productItem.product_id);
                              return null;
                            }
                            return (
                              <div
                                className="d-flex w-100"
                                key={productItem.product_id}
                              >
                                <div className="d-flex justify-content-start w-25">
                                  <img
                                    src={productItem?.image}
                                    width="60"
                                    height="60"
                                    alt=""
                                  />
                                  <div className="position-absolute d-flex justify-content-end">
                                    <button
                                      className="del-color border-0 w-auto rounded text-white"
                                      type="button"
                                      onClick={() =>
                                        handleRemove(productItem?.product_id)
                                      }
                                    >
                                      <AiOutlineDelete />
                                    </button>
                                  </div>
                                </div>
                                <div className="d-flex flex-column h-100 ms-2 justify-content-center w-50">
                                  <p className="theme-font mb-1">
                                    {productItem?.product_name}
                                  </p>
                                  <p className="theme-font fs-7 text-muted">
                                    Brief description
                                  </p>
                                </div>
                                <div className="d-flex flex-column w-25">
                                  <div className="d-flex">
                                    <button
                                      className="m-0 border-0 bg-transparent"
                                      onClick={() =>
                                        handleDelete(productItem?.product_id)
                                      }
                                    >
                                      -
                                    </button>
                                    <span>{productItem?.product_qty}</span>
                                    <button
                                      className="m-0 border-0 bg-transparent"
                                      onClick={() =>
                                        handleAddCart(
                                          productItem?.product_id,
                                          false
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="d-flex flex-column">
                                  <h5 className="m-0 fw-semibold theme-danger text-end">
                                    {productItem?.price *
                                      productItem?.product_qty}
                                  </h5>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ))}

                      <div className="d-flex w-100 p-2 redeem theme-danger rounded">
                        <div className="d-flex justify-content-start align-items-center w-75">
                          <div className="d-flex flex-column h-100 ms-2  justify-content-center">
                            <p className="theme-font mb-1">Promo code</p>
                            <p className="theme-font fs-7 text-muted">
                              EXAMPLECODE
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center w-25">
                          <h5 className="m-0 fw-semibold  theme-danger text-end">
                            $0
                          </h5>
                        </div>
                      </div>
                      <div className="mt-4 d-flex w-100">
                        <div className="w-50">
                          <h5 className="theme-font">Total</h5>
                        </div>
                        <div className="w-50 text-end">
                          <h5 className="theme-font theme-danger m-0">
                            ${calculateTotal(cartItems)}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <br />
              <Card className="p-2 shadow">
                <Card.Body>
                  <InputGroup>
                    <Form.Control
                      placeholder="Promo code"
                      className="fs-7 theme-font"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text
                      className="bg-theme-danger text-white theme-font border-0"
                      id="basic-addon2"
                    >
                      Redeem
                    </InputGroup.Text>
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div>
                <h3 className="theme-font mb-4 mt-4 text-center">
                  Billing address
                </h3>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          First Name *
                        </Form.Label>
                        <Form.Control
                          type="name"
                          value={firstName}
                          placeholder="First Name"
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          onChange={(e) => setFirstName(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Last Name *
                        </Form.Label>
                        <Form.Control
                          type="name"
                          value={lastName}
                          placeholder="Last Name"
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          onChange={(e) => setLastName(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          User Name*
                        </Form.Label>
                        <Form.Control
                          type="name"
                          placeholder="Username"
                          value={userName}
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          onChange={(e) => setUserName(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Email <span className="text-muted">(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          onChange={(e) => setEmail(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Address
                        </Form.Label>
                        <Form.Control
                          type="name"
                          placeholder="1234 Main St"
                          value={address}
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          onChange={(e) => setAddress(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Address 2{' '}
                          <span className="text-muted">(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          type="name"
                          placeholder="Apartment or suite"
                          value={address2}
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          onChange={(e) => setAddress2(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="country">
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Country
                        </Form.Label>
                        <Form.Select
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          aria-label="Default select example"
                          required={true}
                          onChange={(e: any) => setCountry(e.target.value)}
                        >
                          <option value="">Select Country</option>
                          {locationData.map((item: any) => (
                            <option value={item?.location_id}>
                              {item?.location_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="state">
                        <Form.Label className="fs-7 mb-1 theme-font">
                          State
                        </Form.Label>
                        <Form.Control
                          type="name"
                          value={state}
                          placeholder="State"
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          onChange={(e) => setState(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="country">
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Zip
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={zip}
                          className="bg-white shadow fs-7 theme-font p-2 px-3"
                          onChange={(e) => setZip(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Form.Check
                    type="checkbox"
                    id={`default-checkbox`}
                    className="theme-font mb-3"
                    label="Shipping address is the same as my billing address"
                  />
                  <Form.Check
                    type="checkbox"
                    id={`default-checkbox-2`}
                    className="theme-font mb-3"
                    label="Save this information for next time "
                  />
                </Form>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <h3 className="theme-font py-3 mt-4 text-center">Payment</h3>
                <Row>
                  <Col md={4}>
                    <div className="p-1">
                      <img
                        src={creditCard}
                        alt="credit Image"
                        className="w-100"
                      />
                      <p className="mt-2 theme-font px-3">Credit Card</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-1">
                      <img
                        src={debitCard}
                        alt="debit Image"
                        className="w-00 debit-card"
                      />
                      <p className="mt-2 theme-font px-3">Debit Card</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-1">
                      <img
                        src={paypalCard}
                        alt="paypal Image"
                        className="w-100 paypal-img"
                      />
                      <p className="mt-2 theme-font px-3">Paypal Card</p>
                    </div>
                  </Col>
                </Row>
                <br />
                <br />
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Name on card{' '}
                          <span className="theme-font fs-8">
                            Full name as displayed on card
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="name"
                          value={nameOnCard}
                          className="bg-white shadow"
                          onChange={(e) => setNameOnCard(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Credit card number
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={creditCardNumber}
                          className="bg-white shadow"
                          onChange={(e) => setCreditCardNumber(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          Expiration
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={exp}
                          className="bg-white shadow"
                          onChange={(e) => setExp(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicFirstName"
                      >
                        <Form.Label className="fs-7 mb-1 theme-font">
                          CVV
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={cvv}
                          className="bg-white shadow"
                          onChange={(e) => setCvv(e.target.value)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>

            <br />
            {/* <Card className='p-3 shadow'>
                <Card.Body>
                  <div className='d-flex flex-column w-100'>
                    <div className="d-flex w-100">
                      <div className='w-50 d-flex justify-content-start'>
                        <p className='theme-font'>Your Wishlsit</p>
                      </div>
                      <div className='w-50 d-flex justify-content-end'>
                        <span className='theme-font'><CiShoppingCart size={22} /><span className='ms-1 m-0'>{wishItems?.length} item</span></span>
                      </div>
                    </div>
                    <div className="py-3">
                      {wishItems?.map((item: any, index: any) => (
                        <>
                          <div className="d-flex w-100">
                            <div className="d-flex justify-content-start w-75">
                              <img src={item?.image} width='60' height='60' alt=""/>
                              <div className='position-absolute d-flex justify-content-end'>
                                <button
                                  className='bg-theme-danger border-0 w-auto rounded text-white'
                                  type='button'
                                  onClick={() => handleRemove(item?.product_id)}
                                ><AiOutlineDelete /></button>
                              </div>
                              <div className='d-flex flex-column h-100 ms-2 justify-content-center'>
                                <p className='theme-font mb-1'>{item?.product_name}</p>
                                <p className='theme-font fs-7 text-muted'>Brief description </p>
                              </div>
                            </div>
                            <div className="d-flex flex-column w-25">
                              <div className='d-flex justify-content-end'>
                                <button
                                  className='m-0 border-0 bg-theme-danger text-white rounded fs-7 mb-2'
                                  onClick={() => handleAddCart(item?.product_id, true)}
                                >Add To Cart</button>
                              </div>
                              <div className="d-flex flex-column justify-content-end">
                                <h5 className='m-0 fw-semibold  theme-danger text-end'>{item?.price * item?.product_qty}</h5>
                              </div>
                            </div>
                          </div>
                          <hr/>
                        </>
                      ))}
                    </div>
                  </div>
                </Card.Body>
              </Card> */}
            <br />
            <div className="d-flex justify-content-center margin-auto w-50">
              <button
                className="bg-theme-danger border-0 w-100 py-2 theme-font my-4 text-white rounded text-center btn-size"
                type="button"
                onClick={() => handleSubmit()}
              >
                Continue to checkout
              </button>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DeviceCheckout;
