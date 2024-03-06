import {
  addToCartList,
  getWishListById,
  useGlobalDispatch,
  useGlobalSelector,
  wishRemove,
  getProductListById,
  RemoveProductCataloguebyId,
  fetchAllProductsData,
} from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import './productCatalouge.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AOS from 'aos';
import 'aos/dist/aos.css';
const ProductCatalouge = () => {
  const dispatch = useGlobalDispatch();
  const [productCatalogueData, setProductCatalogue] = useState<any>(null);
  const { deviceUser } = useGlobalSelector((state) => state.deviceUser);
  const router = useNavigate();
  const getProductcatalogue = () => {
    const data: any = {};
    dispatch(fetchAllProductsData(data)).then((res: any) => {
      setProductCatalogue(res?.payload?.productcatalogue_details);
      console.log(res?.payload?.productcatalogue_details, 'product details');
    });
  };
  console.log(deviceUser, 'deviceuser');
  console.log(productCatalogueData, 'Products Data');
  useEffect(() => {
    getProductcatalogue();
  }, []);

  const handleProductRemove = async (productcatalogue_no: any) => {
    console.log(productcatalogue_no);
    const formData: any = {
      productcatalogue_no: productcatalogue_no,
      // product_id: id,
    };
    try {
      dispatch(RemoveProductCataloguebyId(formData)).then(() => {
        toast.success('Item Deleted Successfully');
        dispatch((state: any) => ({
          ...state,
          cart: {
            ...state?.cart,
            ProductInfo: {
              ...state?.cart?.ProductInfo,
              productcatalogue_details:
                state?.cart?.ProductInfo?.productcatalogue_details.filter(
                  (item: any) =>
                    item?.productcatalogue_no !== productcatalogue_no
                ),
            },
          },
        }));
        setProductCatalogue((prevCartItems: any) =>
          prevCartItems.filter(
            (item: any) => item?.productcatalogue_no !== productcatalogue_no
          )
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  const ProductData = productCatalogueData?.map((item: any) => {
    <h1>{item.productcatalogue_no}</h1>;
  });
  const product = productCatalogueData?.map((item: any) =>
    item.product_data.map((item: any) => ({
      product_id: item.product_id,
      quantity: item.product_qty,
    }))
  );
  console.log('productCatalogueData', productCatalogueData);
  console.log(product);
  const handleAddCart = async (item: any) => {
    console.log(item, 'item');

    const productcatalogue_no = item.productcatalogue_no;
    const user_id = item.user_id;

    const product_ids = item.product_data.map((item: any) => ({
      product_id: item.product_id,
      quantity: item.product_qty,
    }));
    console.log(product_ids);

    const formData = {
      cartlist_no: deviceUser,
      product_ids: product_ids,
      user_id: user_id,
    };
    try {
      await dispatch(addToCartList(formData)).then((res: any) => {
        toast.success('Item Added Successfully');
        console.log(res);

        handleProductRemove(productcatalogue_no);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // Specify animation duration
      once: true, // Only play animations once
    });
  }, []);
  return (
    <div>
      <Card style={{ padding: '16px' }}>
        <div className="back-btn-product">
          <button
            className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
            onClick={() => router(-1)}
          >
            <BiArrowBack />
          </button>
        </div>
        {/* <Card.Body> */}
        <h5 className="theme-font my-3">Product Catalouge</h5>
        {/* <h6>Empty Cart</h6> */}
        {/* <Table striped className="custom-table" id="departmentTable">
          <thead className="p-3">
            <tr className="fs-7">
              <th>
                <p className="py-2 m-0 fs-13 text-uppercase">CATALOUGE NAME</p>
              </th>
             
              <th>
                <p className="py-2 m-0 fs-13 text-uppercase">NAME</p>
              </th>
              <th>
                <p className="py-2 m-0 fs-13 text-uppercase">PRICE</p>
              </th>
              <th>
                <p className="py-2 m-0 fs-13 text-uppercase">QUANTITY</p>
              </th>
              <th>
                <p className="py-2 m-0 fs-13 text-end">ACTION</p>
              </th>
            </tr>
          </thead>
          {productCatalogueData?.map((item: any) => (
            <tbody>
              <tr>
                <td>
                  <h6 className="text-muted fs-7 m-0 text-capitalize">
                    {item?.productcatalogue_name}
                  </h6>
                </td>
                <td>
                  {item.product_data?.map((item: any) => (
                    <>
                      <h6 className="text-muted fs-7 m-0">
                        {item?.product_name}
                      </h6>
                    </>
                  ))}
                </td>
                <td>
                  {item.product_data?.map((item: any) => (
                    <>
                      <h6 className="text-muted fs-7 m-0">${item?.price}</h6>
                    </>
                  ))}
                </td>
                <td>
                  {item.product_data?.map((item: any) => (
                    <>
                      <h6 className="text-muted fs-7 m-0 text-center">
                        {item?.product_qty}
                      </h6>
                    </>
                  ))}
                </td>
                <td>
                  <div className="d-flex justify-content-end">
                    <button
                      className="mx-2 bg-primary border-0 w-auto rounded text-white"
                      type="button"
                  
                    >
                      <AiOutlinePlus />
                    </button>

                    <button
                      className="mx-2 bg-theme-danger border-0 w-auto rounded text-white"
                      type="button"
                      onClick={() =>
                        handleProductRemove(item?.productcatalogue_no)
                      }
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </Table> */}
        <Row>
          {/* {productCatalogueData?.map((item: any) => (
              <>
                <h2>{item?.productcatalogue_name}</h2>
                {item.product_data?.map((item: any) => (
                  <>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.product_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <div> Product name:{item.product_name}</div>
                          <div> Qunatity:{item.product_qty}</div>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </>
                ))}
              </>
            ))} */}
          {productCatalogueData?.map((item: any) => (
            <Col md={4}>
              <div key={item.productcatalogue_id}>
                <h4 className="text-capitalize">
                  {item?.productcatalogue_name}
                </h4>
                <Card data-aos="fade-up" className="card-br ">
                  <CardContent>
                    {item.product_data?.map((productItem: any, index: any) => (
                      <div key={productItem.product_id}>
                        {index === 0 && (
                          <CardActions>
                            <Button
                              size="small"
                              className="mx-2 bg-primary border-0 w-auto rounded text-white"
                              onClick={() => {
                                handleAddCart(item);
                              }}
                            >
                              <AiOutlinePlus />
                            </Button>
                            <Button
                              size="small"
                              className="mx-2 bg-black theme-danger border-0 w-auto rounded text-white"
                              onClick={() => {
                                handleProductRemove(item?.productcatalogue_no);
                              }}
                            >
                              <AiOutlineDelete />
                            </Button>
                          </CardActions>
                        )}
                        {/* <Typography gutterBottom variant="h5" component="div">
                          {productItem.product_name}
                        </Typography> */}
                        <Typography>
                          <div>
                            <strong>Name: </strong>
                            {productItem.product_name} |
                          </div>
                          <div>
                            <strong> Quantity:</strong>
                            {productItem.product_qty}
                          </div>
                        </Typography>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        {/* </Card.Body> */}
      </Card>
    </div>
  );
};
export default ProductCatalouge;
