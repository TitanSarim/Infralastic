import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import ProductRoutes from '../routes/routes';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '@infralastic/loader';

import {
  getWishListById,
  useGlobalDispatch,
  useGlobalSelector,
  fetchUser,
} from '@infralastic/global-state';
import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IoBasketOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiSolidFolderOpen } from 'react-icons/bi';
import { Dropdown } from 'react-bootstrap';
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

function App() {
  const dispatch = useGlobalDispatch();
  const router = useNavigate();
  const userLoading = useGlobalSelector((state) => state.device.loading);
  const cartInfo = useGlobalSelector((state) => state.cart.cartInfo);
  const wishInfo = useGlobalSelector((state) => state.cart.wishInfo);
  const ProductInfo = useGlobalSelector((state) => state.cart.ProductInfo);

  const userDeviceLoading = useGlobalSelector(
    (state) => state.deviceUser.loading
  );
  const location = useLocation();
  const [totalProductQuantity, setTotalProductQuantity] = useState<number>(0);
  const [totalProductCatalogueQuantity, setTotalProductCatalogueQuantity] =
    useState<number>(0);

  const [wishCount, setWishCount] = useState<any>(null);
  const [cartCount, setCartCount] = useState<any>(null);
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get('user_id');

  const getWish = () => {
    const formData: any = {
      wishlist_no: id,
    };
    dispatch(getWishListById(formData)).then((res: any) => {
      setWishCount(res?.payload?.wishlist_details);
    });
  };

  const getUser = () => {
    const formData = {
      user_id: id,
    };
    dispatch(fetchUser(formData)).then((res: any) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getWish();
    getUser();
  }, []);
  console.log(ProductInfo, 'Product_Info');
  console.log(cartInfo, 'cart_Info');

  // const getTotalProductQuantity = (cartDetails: any[]): number => {
  //   let totalQuantity = 0;
  //   for (const cartItem of cartlist_details) {
  //     totalQuantity += cartItem.product_qty;
  //   }
  //   return totalQuantity;
  // };
  const handleTotalProductQuantity = () => {
    const cartDetails = cartInfo?.cartlist_details;
    if (cartInfo?.success === true) {
      for (const cart of cartDetails) {
        let productDetails = cart.product_data;
        let totalQuantity = 0;
        for (const cartItem of productDetails) {
          totalQuantity += cartItem.product_qty;
          console.log(totalQuantity);
        }
        setTotalProductQuantity(totalQuantity);
      }
    }
  };
  console.log(totalProductQuantity);
  useEffect(() => {
    // setTotalProductQuantity(
    //   getTotalProductQuantity(cartInfo?.cart_details || [])
    // );
    handleTotalProductQuantity();
  }, [cartInfo, ProductInfo]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles['bg-layout']}>
        {[`/device-store`, `/device-detail`, `/device-checkout`].includes(
          location.pathname
        ) && (
          <div className="d-flex justify-content-end px-3">
            <div className="shadow d-flex bg-white rounded p-2">
              <Dropdown>
                <Dropdown.Toggle
                  className="bg-transparent border-0 p-0 d-flex justify-content-center"
                  id="dropdown-basic"
                >
                  <button className="bg-transparent border-0">
                    <div className="position-absolute mb-3 me-3">
                      <span className="rounded-circle px-1 fs-13 text-white bg-theme-danger">
                        {totalProductQuantity}
                      </span>
                    </div>
                    <IoBasketOutline className="m-1" size={26} />
                  </button>
                </Dropdown.Toggle>
                <Dropdown.Menu className="m-0 p-0">
                  <div className="w-100">
                    <Link to="/device-checkout">
                      <button className="bg-theme-danger border-0 text-white rounded px-3 py-1 w-100">
                        View Cart
                      </button>
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  className="bg-transparent border-0 p-0 d-flex justify-content-center"
                  id="dropdown-basic"
                >
                  <button className="bg-transparent border-0">
                    <div className="position-absolute mb-3 me-3">
                      <span className="rounded-circle px-1 fs-13 text-white bg-theme-danger">
                        {wishInfo?.wishlist_details?.length
                          ? wishInfo?.wishlist_details?.length
                          : 0}
                      </span>
                    </div>
                    <AiOutlineHeart className="m-1" size={26} />
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu className="m-0 p-0">
                  <div className="w-100">
                    <Link to="/wishlist-page">
                      <button
                        className="bg-theme-danger border-0 text-white rounded px-3 py-1 w-100"
                        onClick={() =>
                          router({
                            pathname: '/wishlist-page',
                            search: `?${createSearchParams({
                              user_id: JSON.stringify(id),
                            })}`,
                          })
                        }
                      >
                        View WishList
                      </button>
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  className="bg-transparent border-0 p-0 d-flex justify-content-center"
                  id="dropdown-basic"
                >
                  <button className="bg-transparent border-0">
                    <div className="position-absolute mb-3 me-3">
                      <span className="rounded-circle px-1 fs-13 text-white bg-theme-danger">
                        {ProductInfo?.productcatalogue_details?.length
                          ? ProductInfo?.productcatalogue_details?.length
                          : 0}
                      </span>
                    </div>

                    <BiSolidFolderOpen className="m-1" size={26} />
                  </button>
                </Dropdown.Toggle>
                <Dropdown.Menu className="m-0 p-0">
                  <div className="w-btn">
                    <Link to="/ProductCatalouge">
                      <button
                        style={{ width: '180px' }}
                        className="w-btn bg-theme-danger border-0 text-white rounded px-3 py-1 "
                        onClick={() =>
                          router({
                            pathname: '/ProductCatalouge',
                            search: `?${createSearchParams({
                              user_id: JSON.stringify(id),
                            })}`,
                          })
                        }
                      >
                        Product Catalouge
                      </button>
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )}
        <ToastContainer autoClose={2000} />
        <Loader visible={userLoading || userDeviceLoading} />
        <ProductRoutes />
      </div>
    </DndProvider>
  );
}

export default App;
