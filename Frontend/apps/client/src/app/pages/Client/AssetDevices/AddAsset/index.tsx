import './add-asset.scss';
import { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineSync } from 'react-icons/ai';
import { IoIosAttach } from 'react-icons/io';
import { BsBell } from 'react-icons/bs';
import AssetFormComponent from '../../../../components/Client/AssetDevices/AssetFormComponent';
import AssetProofComponent from '../../../../components/Client/AssetDevices/AssetProofComponent';
import AssetChangeComponent from '../../../../components/Client/AssetDevices/AssetChangeComponent';
import AssetNotificationComponent from '../../../../components/Client/AssetDevices/AssetNotificationComponent';
import { useNavigate } from 'react-router-dom';
import { BiDotsVerticalRounded, BiArrowBack } from 'react-icons/bi';
const AddAsset = () => {
  const [detail, setDetail] = useState(true);
  const [changes, setChanges] = useState(false);
  const [proof, setProof] = useState(false);
  const [notification, setNotification] = useState(false);
  const router = useNavigate();

  return (
    <div>
      <div className=" back-btn">
        <button
          className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
          onClick={() => router(-1)}
        >
          <BiArrowBack />
        </button>
      </div>
      <div className="d-flex theme-font py-4">
        <button
          className={
            detail
              ? 'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center'
              : 'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {
            setDetail(true);
            setChanges(false);
            setProof(false);
            setNotification(false);
          }}
        >
          <FiUsers className="me-1" />
          Details
        </button>
        <button
          className={
            changes
              ? 'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center'
              : 'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {
            setDetail(false);
            setChanges(true);
            setProof(false);
            setNotification(false);
          }}
        >
          <AiOutlineSync className="me-1" />
          Changes
        </button>
        <button
          className={
            proof
              ? 'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center'
              : 'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {
            setDetail(false);
            setChanges(false);
            setProof(true);
            setNotification(false);
          }}
        >
          <IoIosAttach className="me-1" />
          Proof
        </button>
        <button
          className={
            notification
              ? 'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center'
              : 'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {
            setDetail(false);
            setChanges(false);
            setProof(false);
            setNotification(true);
          }}
        >
          <BsBell className="me-1" />
          Notifications History
        </button>
      </div>
      <div>
        {detail ? (
          <AssetFormComponent />
        ) : proof ? (
          <AssetProofComponent />
        ) : changes ? (
          <AssetChangeComponent />
        ) : notification ? (
          <AssetNotificationComponent />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default AddAsset;
