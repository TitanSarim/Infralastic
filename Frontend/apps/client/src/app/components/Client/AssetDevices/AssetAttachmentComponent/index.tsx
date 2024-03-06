import './asset-attachment-component.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { FileUploader } from 'react-drag-drop-files';
import { useCallback, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../../services/config/firebase';
import { toast } from 'react-toastify';
import { IoTrashBinSharp } from 'react-icons/io5';
import { addAssetImages } from '@infralastic/global-state';

const AssetAttachmentComponent = () => {
  const router = useNavigate();
  const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG'];
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('asset_unique_id');
  const [image, setImage] = useState<any>([]);
  const [files, setFiles] = useState<any>([]);
  const [, updateState] = useState([]);
  const forceUpdate = useCallback(() => updateState([]), []);
  let completedCount = 0;
  let imgList: any = [];

  function readFile(index: any, data: any) {
    let reader = new FileReader();

    if (index >= data.length) return;
    setFiles([...files, data]);
    let file: any = data[index];
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage((arr: any) => [...arr, reader.result]);
      }
    };
    reader.readAsDataURL(file);
    return;
  }

  const imageHandler = async (data: any) => {
    for (let i = 0; i < data.length; i++) {
      readFile(i, data);
    }
  };

  const uploadImages = (list: any) => {
    const formData = {
      asset_unique_id: id,
      image_urls: list,
    };
    addAssetImages(formData).then((res) => {
      toast.success(res.data.result.msg);
      setTimeout(() => {
        router(-1);
      }, 3000);
    });
  };

  const handleSubmit = () => {
    if (!files) return;
    console.log(files);
    const urlArray: any = Array.from(files[files.length - 1]);
    try {
      for (let i = 0; i < urlArray.length; i++) {
        const storageRef = ref(storage, `files/${urlArray[i].name}`);
        const uploadTask = uploadBytesResumable(storageRef, urlArray[i]);
        uploadTask.on(
          'state_changed',
          () => {},
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (image_url) => {
              imgList.unshift({ image_url });
              console.log(imgList);
              toast.success('Image Uploaded Successfully');
              completedCount += 1;
              if (completedCount == urlArray.length) {
                await uploadImages(imgList);
              }
            });
          }
        );
      }
    } catch (error) {}
  };

  const handleDelete = (index: any, value: any) => {
    image.splice(index, 1);
    forceUpdate();
  };

  return (
    <div className="h-100vh">
      <div className="d-flex justify-content-center align-items-center flex-column h-100vh">
        <FileUploader
          handleChange={(e: any) => imageHandler(e)}
          name="file"
          types={fileTypes}
          multiple={true}
        >
          <div className="d-flex align-items-center h-100 dragdrop justify-content-center flex-column">
            <i className="bg-theme-secondary p-2 rounded">
              <FiUpload className="text-muted" size={28} />
            </i>
            <p className="mt-4 fs-5 theme-font text-muted mb-2">Drop files here or click to upload</p>
            <p className="theme-font fs-7 text-muted">Select the images of the device from your Desktop.</p>
          </div>
        </FileUploader>
        <Row className="w-100 d-flex justify-content-center">
          {image.map((value: any, index: any) => (
            <Col md={3} className="mt-3" key={index}>
              <div className="d-flex flex-column">
                <img className="w-100 rounded" height="210" src={value} alt="" />
                <div className="d-flex justify-content-end custom-del">
                  <button
                    className="bg-theme-danger pb-1 text-white rounded border-0"
                    onClick={() => handleDelete(index, value)}
                  >
                    <IoTrashBinSharp />
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="mt-4">
          <button
            className="text-white bg-theme-danger border-0 rounded px-3 py-1"
            onClick={() => handleSubmit()}
          >
            <FiUpload className="text-white" />
            Upload Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetAttachmentComponent;
