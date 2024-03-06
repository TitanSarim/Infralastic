import './checkin.scss'
import {FiUsers} from "react-icons/fi";
import {AiOutlineSync} from "react-icons/ai";
import {IoIosAttach} from "react-icons/io";
import {useState} from "react";
import CheckInFormComponent from "../../../../components/Client/AssetDevices/CheckInFormComponent";

const CheckIn = () => {
    const [user, setUser] = useState(true)
    const [assets, setAssets] = useState(false)
    const [location, setLocation] = useState(false)
    return(
        <div>
            <br/>
            <div className="d-flex theme-font py-4">
                <button
                    className={user ?
                        'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center':
                        'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
                    }
                    onClick={() => {
                        setUser(true);
                        setAssets(false);
                        setLocation(false);
                    }
                    }
                ><FiUsers className='me-1' />User
                </button>
                <button
                    className={assets ?
                        'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center':
                        'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
                    }
                    onClick={() => {
                        setUser(false);
                        setAssets(true);
                        setLocation(false);
                    }
                    }
                ><AiOutlineSync className='me-1' />Assets
                </button>
                <button
                    className={location ?
                        'bg-theme-danger text-white rounded px-3 py-1 fs-7 border-0 mx-2 d-flex align-items-center':
                        'bg-transparent px-3 py-1 text-muted border-0 mx-2 fs-7 d-flex align-items-center'
                    }
                    onClick={() => {
                        setUser(false);
                        setAssets(false);
                        setLocation(true);
                    }
                    }
                ><IoIosAttach className='me-1' />Proof
                </button>
            </div>
            <CheckInFormComponent />
        </div>
    )
}
export default CheckIn;