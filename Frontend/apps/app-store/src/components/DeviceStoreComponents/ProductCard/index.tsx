import './product-card.scss';

import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import warranty from '../../../assets/warranty.png';
import { Card, Col, Row } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';

import {
  AiFillHeart,
  AiFillPlusCircle,
  AiOutlineHeart,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { useState } from 'react';
import {
  addCartList,
  addToCartList,
  addToWishList,
  deleteWishList,
  useGlobalDispatch,
  wishDelete,
  addToProductCatalogue,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';
import { FiBookOpen } from 'react-icons/fi';
interface productProps {
  image: any;
  productId: any;
  description: string;
  inch: string;
  cost: string;
  click: any;
  purchase: any;
  userId: any;
}

const ProductCard = (props: productProps) => {
  const router = useNavigate();
  const dispatch = useGlobalDispatch();
  const [wish, setWish] = useState(false);
  const queryParameters = new URLSearchParams(window.location.search);
  const user_id = queryParameters.get('user_id');

  const [{ isDragging }, drag] = useDrag<any, any, { isDragging: boolean }>({
    item: {
      type: ItemTypes.BOX,
      productProps: props,
      product_id: props.productId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: ItemTypes.BOX,
  });

  const addWishlist = (id: any) => {
    const formData: any = {
      wishlist_no: props?.userId,
      product_id: id,
      user_id: props?.userId,
    };
    dispatch(addToWishList(formData)).then((res: any) => {
      if (res?.payload?.success === true) {
        toast.success('Successfully Added to WishList');
      }
    });
  };

  const removeFromWishlist = (id: any) => {
    const formData: any = {
      wishlist_no: user_id,
      product_id: id,
    };
    dispatch(wishDelete(formData)).then((res: any) => {
      if (res?.payload?.success === true) {
        toast.success('Successfully Removed From WishList');
      }
    });
  };
  const addCartList = (id: any) => {
    const formData: any = {
      cartlist_no: user_id,
      product_ids: [{ product_id: id, quantity: 1 }],
    };
    dispatch(addToCartList(formData)).then((res: any) => {
      if (res?.payload?.success === true) {
        toast.success('Successfully Added to CartList');
      }
    });
  };

  const handleWishList = () => {
    setWish(!wish);
    if (!wish) {
      addWishlist(props?.productId);
    } else if (wish) {
      removeFromWishlist(props?.productId);
    }
  };
  const handleCartList = () => {
    addCartList(props?.productId);
  };
  return (
    <div ref={drag}>
      {/* <Card className="product-card-bg mb-3">
        <Card.Body>
          <span className="theme-border-danger theme-danger fs-7 p-1 px-2 rounded text-uppercase">
            Deal
          </span>
          <div
            className="d-flex justify-content-center py-2"
            onClick={props.click}
          >
            <img src={props.image} width="200" alt="bogus" />
          </div>
          <div className="d-flex justify-content-center w-100 py-2">
            <img src={warranty} width="95" alt="" />
          </div>
          <p className="mb-1 fs-7 theme-font theme-danger">{props.inch}</p>
          <p className="theme-font">{props.description}</p>
          <hr className="theme-danger " />
          <p className="fs-7">Infralastic estore price</p>
          <h5 className="theme-font theme-danger">${props.cost}</h5>
          <span className="fs-7">
            <del>$1,699.99</del>
            <span className="ms-2 theme-danger">SAVE $200.00</span>
          </span>
          <p className="py-1 theme-font fs-7">
            This price may not refer to the specifications below.
          </p>
          <div className="d-flex w-100">
            <div className="d-flex justify-content-start w-50">
              <button
                onClick={() => handleCartList()}
                className="border-0 rounded px-1 py-1 bg-transparent"
              >
                <AiOutlinePlusCircle size={20} className="" />
              </button>
            </div>
            <div className="d-flex justify-content-end w-50">
              {!wish ? (
                <button
                  onClick={() => handleWishList()}
                  className="border-0 rounded px-1 py-1 bg-transparent"
                >
                  <AiOutlineHeart size={20} className="" />
                </button>
              ) : wish ? (
                <button
                  onClick={() => handleWishList()}
                  className="border-0 rounded px-1 py-1 bg-transparent"
                >
                  <AiFillHeart size={20} className="theme-danger" />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card.Body>
      </Card> */}
      <Card className="product-card-bg mb-3">
        <Card.Body>
          <Row>
            <Col md={6}>
              {' '}
              <div className=" theme-danger fs-7 p-1 py-1  bold w--44  deal-box">
                Deal
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-center w-100 py-2">
                <img src={warranty} width="75" alt="" />
              </div>
            </Col>
          </Row>

          <div
            className="d-flex justify-content-center py-1"
            onClick={props.click}
          >
            <img src={props.image} width="200" alt="bogus" />
          </div>

          <div className=" fs-7 theme-font theme-danger">{props.inch}</div>
          <div className="theme-font">{props.description}</div>
          <hr className="theme-danger hr-mr" />
          <div className="fs-7">Infralastic estore price</div>
          <h5 className="theme-font theme-danger mtb-10">${props.cost}</h5>
          <span className="fs-7">
            <del>$1,699.99</del>
            <span className="ms-2 theme-danger">SAVE $200.00</span>
          </span>
          <div className="py-1 theme-font fs-7">
            This price may not refer to the specifications below.
          </div>
          <div className="d-flex w-100">
            <div className="d-flex justify-content-start w-50">
              <button
                onClick={() => handleCartList()}
                className="border-0 rounded px-1 py-1 bg-transparent"
              >
                <AiOutlinePlusCircle size={20} className="" />
              </button>
            </div>
            <div className="d-flex justify-content-center w-50">
              <button
                onClick={() => handleCartList()}
                className="border-0 rounded px-1 py-1 bg-transparent"
              >
                {/* <Tooltip title="Add" placement="top-start">
                  <FiBookOpen
                    className=""
                    size={20}
                    onClick={handleClickOpen}
                  />
                </Tooltip> */}
              </button>
            </div>

            <div className="d-flex justify-content-end w-50">
              {!wish ? (
                <button
                  onClick={() => handleWishList()}
                  className="border-0 rounded px-1 py-1 bg-transparent"
                >
                  <AiOutlineHeart size={20} className="" />
                </button>
              ) : wish ? (
                <button
                  onClick={() => handleWishList()}
                  className="border-0 rounded px-1 py-1 bg-transparent"
                >
                  <AiFillHeart size={20} className="theme-danger" />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ProductCard;
