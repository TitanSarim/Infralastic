import logo from '../../../../assets/logo.png';
import logo2 from '../../../../assets/logo_mob.png';
import './sidebar.scss'
import {HiBars3, HiOutlineDocument, HiOutlineUsers, HiUser} from "react-icons/hi2";
import {RiHome6Line} from "react-icons/ri";
import {CiSettings, CiSquareAlert} from "react-icons/ci";
import {AiOutlineAppstoreAdd} from "react-icons/ai";
import {IoIosBasket} from "react-icons/io";
import {MdOutlineDevices} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {BiChevronDown} from "react-icons/bi";
import {FiCircle} from "react-icons/fi";
import {BsFillBuildingFill} from "react-icons/bs";
import {useGlobalSelector} from "@infralastic/global-state";

const SideBarComponent = () => {
    const router = useNavigate();
    const [show, setShow] = useState(false);
    const [people, setPeople] = useState(false);
    const [assets, setAssets] = useState(false);
    const [store, setStore] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [security, setSecurity] = useState(false);
    const { userInfo } = useGlobalSelector((state) => state.user);

  return(
      <div className='px-2'>
          {!show &&
              <>
                  <div className='d-flex'>
                      <div className="w-100 py-4">
                        <img src={logo} width='164' alt=""/>
                      </div>
                      <div className='d-flex align-items-center px-2'>
                          <HiBars3 onClick={() => setShow(!show)} />
                      </div>
                  </div>
                  <div className='px-2'>
                      <Link to='/'>
                        <p className='theme-font m-0 hover d-flex align-items-center mb-3 p-1 fs-7'><RiHome6Line className='me-2' size={18} />Dashboard</p>
                      </Link>
                      <p className={people ? 'bg-theme-danger theme-font text-white m-0 rounded d-flex align-items-center mb-2 p-1 fs-7' :'theme-font m-0 hover d-flex align-items-center mb-2 p-1 fs-7'} onClick={() => setPeople(!people)}><span className="w-50"><HiOutlineUsers className='me-2' size={18} />People</span><span className='w-50 d-flex justify-content-end'><BiChevronDown /></span></p>
                      {people && <>
                          <Link to='/employees'>
                            <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Staff</p>
                          </Link>
                          <Link to='/department'>
                            <p className='theme-font m-0 hover d-flex align-items-center mb-2 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Department</p>
                          </Link>
                      </>}
                      <p className={assets ? 'bg-theme-danger theme-font text-white m-0 rounded d-flex align-items-center mb-2 p-1 fs-7' :'theme-font m-0 hover d-flex align-items-center mb-2 p-1 fs-7'} onClick={() => setAssets(!assets)}><span className="w-50"><MdOutlineDevices className='me-2' size={18} />Assets</span><span className='w-50 d-flex justify-content-end'><BiChevronDown /></span></p>
                      {assets && <>
                          <Link to='/assets'>
                              <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Sites</p>
                          </Link>
                          <Link to='/all-assets'>
                              <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Inventory</p>
                          </Link>
                          <Link to='/check-in'>
                              <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Check In</p>
                          </Link>
                          <Link to='/check-out'>
                              <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Check Out</p>
                          </Link>
                      </>}
                    <p className={security ? 'bg-theme-danger theme-font text-white m-0 rounded d-flex align-items-center mb-2 p-1 fs-7 w-100' :'theme-font m-0 hover d-flex align-items-center mb-2 p-1 fs-7 w-100'} onClick={() => setSecurity(!security)}><span className="d-flex w-50"><CiSquareAlert className='me-2' size={18} />Security </span><span className='w-50 d-flex justify-content-end'><BiChevronDown /></span></p>
                      {security && <>
                        <Link to='/device-management'>
                          <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Device Management</p>
                        </Link>
                      </>}
                      <p className={store ? 'bg-theme-danger theme-font text-white m-0 rounded d-flex align-items-center mb-2 p-1 fs-7' :'theme-font m-0 hover d-flex align-items-center mb-2 p-1 fs-7'} onClick={() => setStore(!store)}><span className="d-flex"><AiOutlineAppstoreAdd className='me-2' size={18} />Procurement</span><span className='w-50 d-flex justify-content-end'><BiChevronDown /></span></p>
                      {store && <>
                        <Link to='/app-store'>
                          <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />App Store</p>
                        </Link>
                        <Link to='/device-store'>
                          <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Device Store</p>
                        </Link>
                        <Link to='/order-tracking'>
                          <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Order Tracking</p>
                        </Link>
                      </>}
                      <p className={admin ? 'bg-theme-danger theme-font text-white m-0 rounded d-flex align-items-center mb-2 p-1 fs-7' :'theme-font m-0 hover d-flex align-items-center mb-2 p-1 fs-7'} onClick={() => setAdmin(!admin)}><span className="d-flex w-50"><HiUser  className='me-2' size={18} />Admin</span><span className='w-50 d-flex justify-content-end'><BiChevronDown /></span></p>
                      {admin && <>
                        <Link to='/admin'>
                          <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Admin</p>
                        </Link>
                        <Link to='/reports'>
                          <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Reports</p>
                        </Link>
                        <Link to='/alerts'>
                          <p className='theme-font m-0 hover d-flex align-items-center mb-1 p-1 fs-7'><FiCircle className='mx-2 theme-danger hover-white' size={8} />Alerts</p>
                        </Link>
                      </>}
                  </div>
              </>
          }
          {show &&
              <>
                  <div>
                      <div className="w-100 py-3 justify-content-center d-flex">
                        <img src={logo2} width='24' alt=""/>
                      </div>
                      <div className='d-flex align-items-center justify-content-center py-3 w-100'>
                          <HiBars3 onClick={() => setShow(!show)} />
                      </div>
                  </div>
                  <div className='px-2'>
                      <p onClick={() => router('/')} className='theme-font m-0 hover d-flex justify-content-center align-items-center mb-3 p-1 fs-7'><RiHome6Line size={18} /></p>
                      <p onClick={() => router('/assets')} className='theme-font m-0 hover d-flex align-items-center justify-content-center mb-2 p-1 fs-7'><MdOutlineDevices size={18} /></p>
                      <p onClick={() => router('/employees')} className='theme-font m-0 hover d-flex align-items-center mb-2 p-1 fs-7'><HiOutlineUsers size={18} /></p>
                      <p onClick={() => router('/department')} className='theme-font m-0 hover d-flex align-items-center justify-content-center mb-2 p-1 fs-7'><BsFillBuildingFill size={18} /></p>
                      <p className='theme-font m-0 hover d-flex align-items-center justify-content-center mb-2 p-1 fs-7'><AiOutlineAppstoreAdd size={18} /></p>
                      <p className='theme-font m-0 hover d-flex align-items-center justify-content-center mb-2 p-1 fs-7'><IoIosBasket size={18} /></p>
                      <p className='theme-font m-0 hover d-flex align-items-center justify-content-center mb-2 p-1 fs-7'><CiSettings size={18} /></p>
                      <p className='theme-font m-0 hover d-flex align-items-center justify-content-center mb-2 p-1 fs-7'><HiOutlineDocument size={18} /></p>
                      <p className='theme-font m-0 hover d-flex align-items-center justify-content-center mb-2 p-1 fs-7'><HiUser size={18} /></p>
                  </div>
              </>
          }
      </div>
  )
}
export default SideBarComponent;
