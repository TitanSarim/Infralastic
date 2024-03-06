import './product-catalogue.scss';
import { Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
  addToCartList,
  cartRemove,
  getCartList,
  getCartListById,
  useGlobalDispatch,
  useGlobalSelector,
  addToProductCatalogue,
  EmptyCart,
} from '@infralastic/global-state';
import { BsCart2 } from 'react-icons/bs';
import { FiBookOpen } from 'react-icons/fi';
import { AiOutlineDelete, AiOutlineFolderAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchAllDepartment } from '@infralastic/global-state';
import { nanoid } from '@reduxjs/toolkit';
// const ProductCatalogue = ({ onData }: { onData: any }) => {
const ProductCatalogue = ({ onData }: { onData: any }) => {
  const router = useNavigate();
  const [count, setCount] = useState(0);
  const dispatch = useGlobalDispatch();
  const [cartCount, setCartCount] = useState<any>(null);
  const [productCatalogueName, setProductCatalogueName] = useState<any>(null);
  const [department, setDepartment] = useState<any>([]);

  const [droppedProducts, setDroppedProducts] = useState<any[]>([]);
  const cart = useGlobalSelector((state) => state.cart.cartInfo);
  const user = useGlobalSelector((state) => state);
  const { deviceUser } = useGlobalSelector((state) => state.deviceUser);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const cartMappedItems = cart?.cartlist_details;
  console.log(cartMappedItems);
  // const product_ids = cartMappedItems?.product_data?.map((item: any) => ({
  //   product_id: item.product_id,
  //   quantity: item.product_qty,
  // }));
  const product_ids = cartMappedItems?.flatMap((item: any) =>
    item?.product_data?.map((product: any) => ({
      product_id: parseInt(product.product_id),
      quantity: parseInt(product.product_qty),
    }))
  );

  console.log(product_ids);
  const CartEmpty = () => {
    const formData: any = {
      cartlist_no: deviceUser,
    };
    console.log(formData, 'formData');
    dispatch(EmptyCart(formData)).then((res: any) => {
      console.log(res);
      // console.log(res.result.msg);
      if (res?.payload?.success === true) {
        toast.success(res?.payload?.msg);
      }
    });
  };
  const addProductCatalogue = (id: any) => {
    const formData: any = {
      productcatalogue_name: productCatalogueName,
      productcatalogue_number: productCatalogueName,
      productcatalogue_no: nanoid(),
      product_ids: product_ids,
      user_id: deviceUser,
    };
    console.log(formData, 'formData');
    dispatch(addToProductCatalogue(formData)).then((res: any) => {
      if (res?.payload?.success === true) {
        toast.success('Successfully Added to Product Catalogue');
        setOpen(false);
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const sendDataToParent = (data: any) => {
    onData(data);
  };
  console.log('cart', cart);
  // console.log('user', user);

  // console.log(product_ids, 'product');
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    async drop(item: any) {
      console.log(item.productProps);
      if (item.productProps) {
        const newDroppedProducts = [
          ...droppedProducts,
          { ...item.productProps, click: null },
        ];
        // console.log(newDroppedProducts, 'newDroppedProducts');
        setDroppedProducts(newDroppedProducts);
        // console.log('quantity', item.product_id);
        const product_id = item.product_id;

        const formData = {
          cartlist_no: deviceUser,
          user_id: 2,
          product_ids: [{ product_id: product_id, quantity: 1 }],
        };
        console.log(formData, 'formData');
        try {
          await dispatch(addToCartList(formData)).then((res: any) => {
            console.log(res);
          });
        } catch (error) {
          console.log(error);
        }
      }
      setCount((prevCount) => prevCount + 1);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });
  const getCart = () => {
    const formData: any = {
      cartlist_no: deviceUser,
    };
    dispatch(getCartListById(formData)).then(async (res: any) => {
      console.log(res);
      setCartCount(res?.payload?.cart_details);
    });
  };

  useEffect(() => {
    getCart();
  }, [cart?.message]);

  const isActive = canDrop && isOver;

  const handleRemove = async (id: any) => {
    const formData: any = {
      cartlist_no: deviceUser,
      product_id: id,
    };
    try {
      dispatch(cartRemove(formData)).then(() => {
        toast.success('Item Removed Successfully');
        getCart();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getDepartment = () => {
    const config: any = {};
    try {
      dispatch(fetchAllDepartment(config)).then(async (res: any) => {
        console.log(res, 'res');
        setDepartment(res?.payload?.departments_details);
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDepartment();
  }, []);
  console.log(cart, 'carttt');
  return (
    <div ref={drop} className="py-3">
      <Card>
        <Card.Body>
          <div className="d-flex w-100">
            <div className="w-75">
              <div className="d-flex ">
                <h5 className="theme-font">Product Catalogue</h5>
                {/* <h6 onClick={CartEmpty}>Empty Cart</h6> */}
              </div>

              <p className="theme-font fs-7 text-muted">
                Shop with Infralastic for all your needs
              </p>
            </div>
            <div className="d-flex justify-content-end w-25">
              <div>
                <Tooltip title="Add Product Catalogue">
                  <button
                    className="bg-theme-danger border-0 rounded px-2 py-1 margin-right-15px"
                    onClick={handleClickOpen}
                  >
                    <AiOutlineFolderAdd className="text-white " />
                  </button>
                </Tooltip>
              </div>
              <div>
                <Link to="/device-checkout">
                  <button className="bg-theme-danger border-0 rounded px-2 py-1">
                    <BsCart2 className="text-white" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              maxWidth="sm"
              fullWidth
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Add your Product Catalogue Name?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Row>
                    <div className="d-flex align-items-center py-2 w-100">
                      <label className="w-25 fs-7" htmlFor="">
                        <h6>Catalogue Name:</h6>
                      </label>
                      <input
                        className="w-75 form-control fs-7"
                        value={productCatalogueName}
                        onChange={(e) =>
                          setProductCatalogueName(e.target.value)
                        }
                        type="text"
                        placeholder="Enter your Product Catalogue Name"
                      />
                    </div>
                  </Row>
                  <div></div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="border-0 bg-theme-danger text-white px-3 py-2 rounded mx-2"
                  onClick={addProductCatalogue}
                  type="button"
                >
                  Create
                </button>
                <button
                  className="border-0   px-3 py-2 rounded mx-2"
                  onClick={handleClose}
                  type="button"
                >
                  Close
                </button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="d-flex align-items-center overflow-auto">
            {/*{droppedProducts?.map((item: any, index: number) => (*/}
            {/*  <div key={index} className='px-1 bg-transparent border-0'>*/}
            {/*    <img src={item?.image} width='152' height='80' alt="Top Deals" />*/}
            {/*    <p className='fs-7 mb-0 theme-font text-center py-2'>{item?.description}</p>*/}
            {/*  </div>*/}
            {/*))}*/}
            {cart?.cartlist_details?.map((item: any, index: number) => (
              <>
                {item?.product_data.map((count: any, index: number) => (
                  <div key={index} className="px-1 bg-transparent border-0">
                    <div className="d-flex w-100 product-catalogue">
                      <div className="w-50">
                        <button
                          className="bg-theme-danger border-0 w-auto rounded text-white"
                          type="button"
                          onClick={() => handleRemove(count?.product_id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                      <div className="w-50 d-flex justify-content-end">
                        <div className="">
                          <span className="rounded-circle px-2 py-1 fs-13 text-white bg-theme-danger">
                            {count?.product_qty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <img
                      src={count?.image}
                      width="152"
                      height="80"
                      alt="Top Deals"
                    />
                    <p className="fs-7 mb-0 theme-font text-center py-2">
                      {count?.product_name}
                    </p>
                  </div>
                ))}
              </>
            ))}
          </div>
          {isActive && (
            <div>
              <h6 className="theme-font text-center">Drop Items here</h6>
            </div>
          )}
          {cart?.cartInfo?.map((item: any) => (
            <>
              <button className="px-1 bg-transparent border-0">
                <img
                  src={item?.image}
                  width="152"
                  height="80"
                  alt="Top Deals"
                />
                <p className="fs-7 mb-0 theme-font text-center py-2">
                  {item?.product_name}
                </p>
              </button>
            </>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};
export default ProductCatalogue;
