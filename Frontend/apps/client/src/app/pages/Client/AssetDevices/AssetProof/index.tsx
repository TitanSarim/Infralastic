import {FiUsers} from "react-icons/fi";
import {AiOutlineSync} from "react-icons/ai";
import {IoIosAttach} from "react-icons/io";
import {BsBell} from "react-icons/bs";
import AssetProofComponent from "../../../../components/Client/AssetDevices/AssetProofComponent";
import {useState} from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {GoNote} from "react-icons/go";

const AssetProof = () => {
  const router = useNavigate();
  const [detail, setDetail] = useState(false)
  const [changes, setChanges] = useState(false)
  const [proof, setProof] = useState(true)
  const [notification, setNotification] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkinCheckout, setCheckinCheckout] = useState(false);

  const id: any = searchParams.get('asset_unique_id');
  return(
    <div>
      <div className="d-flex theme-font py-4">
        <button
          className={detail ?
            'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center':
            'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {router({
            pathname: '/asset-view',
            search: `?${createSearchParams({
              asset_unique_id: id
            })}`
          })}}
        ><FiUsers className='me-1' />Details
        </button>
        <button
          className={changes ?
            'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center':
            'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {router({
            pathname: '/asset-changes',
            search: `?${createSearchParams({
              asset_unique_id: id
            })}`
          })}}
        ><AiOutlineSync className='me-1' />Changes
        </button>
        <button
          className={proof ?
            'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center':
            'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {router({
            pathname: '/asset-proof',
            search: `?${createSearchParams({
              asset_unique_id: id
            })}`
          })}}
        ><IoIosAttach className='me-1' />Proof
        </button>
        <button
          className={notification ?
            'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center':
            'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {router({
            pathname: '/asset-notification',
            search: `?${createSearchParams({
              asset_unique_id: id
            })}`
          })}}
        ><BsBell className='me-1' />Notifications History
        </button>
        <button
          className={checkinCheckout?
            'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center':
            'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
          }
          onClick={() => {router({
            pathname:"/asset-checkin-checkout-tab",
            search: `?${createSearchParams({
              asset_unique_id: id
            })}`
          })}}
        ><GoNote className='me-1' />Checkin Checkout
        </button>
      </div>
      <div>
        <AssetProofComponent />
      </div>
    </div>
  )
}
export default AssetProof;
