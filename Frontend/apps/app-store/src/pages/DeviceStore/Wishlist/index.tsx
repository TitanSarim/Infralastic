import {
  addToCartList,
  getWishListById,
  useGlobalDispatch,
  useGlobalSelector,
  wishRemove,
} from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const WishList = () => {
  const dispatch = useGlobalDispatch();
  const [wishData, setWishData] = useState<any>(null);
  const { deviceUser } = useGlobalSelector((state) => state.deviceUser);
  const router = useNavigate();
  const getWish = () => {
    const formData: any = {
      wishlist_no: deviceUser,
    };
    dispatch(getWishListById(formData)).then((res: any) => {
      setWishData(res?.payload?.wishlist_details);
      console.log(res?.payload?.wishlist_details);
    });
  };
  useEffect(() => {
    getWish();
  }, []);
  const handleWishRemove = async (id: any) => {
    const formData: any = {
      wishlist_no: deviceUser,
      product_id: id,
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
        setWishData((prevCartItems: any) =>
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
        console.log(res);
        if (wish) {
          handleWishRemove(id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card>
        <div className="position-absolute back-btn">
          <button
            className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
            onClick={() => router(-1)}
          >
            <BiArrowBack />
          </button>
        </div>
        <Card.Body>
          <h5 className="theme-font my-3">Wish List</h5>
          <Table striped className="custom-table" id="departmentTable">
            <thead className="p-3">
              <tr className="fs-7">
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">PRODUCT ID</p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">NAME</p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">PRICE</p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-end">ACTION</p>
                </th>
              </tr>
            </thead>
            {wishData?.map((item: any) => (
              <tbody>
                <tr>
                  <td>
                    <h6 className="text-muted fs-7 m-0">{item?.product_id}</h6>
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">
                      {item?.product_name}
                    </h6>
                  </td>

                  <td>
                    <h6 className="text-muted fs-7 m-0">{item?.price} $</h6>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end">
                      <button
                        className="mx-2 bg-primary border-0 w-auto rounded text-white"
                        type="button"
                        onClick={() => handleAddCart(item?.product_id, true)}
                      >
                        <AiOutlinePlus />
                      </button>
                      <button
                        className="mx-2 bg-theme-danger border-0 w-auto rounded text-white"
                        type="button"
                        onClick={() => handleWishRemove(item?.product_id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
export default WishList;
