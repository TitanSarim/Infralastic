import './asset-proof-component.scss';
import {Card, Col, Row} from "react-bootstrap";
import {BsPlus} from "react-icons/bs";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {deleteAssetImage, getAssetImages} from "@infralastic/global-state";
import {useCallback, useEffect, useState} from "react";
import {IoTrashBinSharp} from "react-icons/io5";
import {toast} from "react-toastify";

const AssetProofComponent = () => {
    const router = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [images, setImages] = useState<any>([])
    const id: any = searchParams.get('asset_unique_id');
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState([]), []);

    const fetchImages = () => {
        const formData: any = {
            asset_unique_id: id
        }
        getAssetImages(formData).then((res: any) => {
            setImages(res.data.result.image_urls)
        })
    }

    useEffect(() => {
        if (id) {
            fetchImages()
        }
    }, [])
    const handleDelete = (index: any) =>  {
      const formData: any = {
        image_id: index
      }
      deleteAssetImage(formData).then((res: any) => {
        toast.success(res?.data?.result?.msg)
        fetchImages()
      })
    }
    return(
        <div>
            <Card>
              <Card.Body>
                  <div className='d-flex justify-content-end w-100 py-3'>
                      <button
                          className='px-2 pe-3 py-1 text-white border-0 bg-theme-danger h-34 rounded d-flex align-items-center'
                          onClick={() => router({
                              pathname: '/add-asset-attachment',
                              search: `?${createSearchParams({
                                  asset_unique_id: id
                              })}`
                          })}>
                          <BsPlus size={20} className='me-2' />Add New Photos
                      </button>
                  </div>
                  <Row className='py-3 w-100 justify-content-center'>
                      {images?.map((value: any) => (
                          <Col md={3}>
                            <div className='d-flex flex-column'>
                              <img
                                className='mb-2 p-1 rounded'
                                src={value?.image_url}
                                height='320'
                                width='320'
                                alt=""
                              />
                              <div className='d-flex justify-content-end custom-del'>
                                <button
                                  className='bg-theme-danger pb-1 text-white rounded border-0'
                                  onClick={() => handleDelete(value?.image_id)}
                                >
                                  <IoTrashBinSharp />
                                </button>
                              </div>
                            </div>
                          </Col>
                      ))}
                  </Row>
              </Card.Body>
          </Card>
        </div>
  )
}
export default AssetProofComponent;
