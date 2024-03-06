import './device-managment.scss'
import {Card, Dropdown, DropdownButton, Form, InputGroup, Table, Spinner} from "react-bootstrap";
import {HiChevronUpDown} from "react-icons/hi2";
import {AiOutlineEye, AiOutlinePlus} from "react-icons/ai";
import {BiDotsVerticalRounded, BiSearch, BiTrash} from "react-icons/bi";
import bogus from '../../../../assets/Facebook.png'
import {createSearchParams, useNavigate} from "react-router-dom";
import AgentModal from "../../../components/Modals/AgentModal";
import {useEffect, useState} from "react";
import {
  acceptSaltMinion,
  getChocInstaller,
  getHosts,
  getSaltInstaller,
  getSaltMinion,
  getRmmClient,
  deleteHost
} from "@infralastic/global-state";
import {HiDownload} from "react-icons/hi";
import {LuSettings2} from "react-icons/lu";
import {BsFileEarmarkArrowUp} from "react-icons/bs";
import {toast} from "react-toastify";
import ConfirmationDialog from '../../../components/shared/confirmationDialog';

const DeviceManagement = () => {
  const router = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any>([]);
  const [allMinions, setAllMinions] = useState<string[]>([]);
  const [isHostsLoading, setIsHostsLoading] = useState<boolean>(false);
  const [removeHostConfirmationInfo, setRemoveHostConfirmationInfo] = useState({
    isOpen: false,
    id: undefined
  });
  const [isHostDeletionInProgress, setIsHostDeletionInProgress] = useState<boolean>(false);

  const fetchHosts = async () => {
    try {
      const res = await getHosts();
      if(res.data?.data?.hosts?.length) {
        setData(res.data.data.hosts);
      }
      setIsHostsLoading(false);
    } catch (error) {
      // Handle the error here, e.g., log it or display a message to the user.
      console.error("Error fetching hosts:", error);
      setIsHostsLoading(false);
    }
  };

  const fetchSaltMinion = async () => {
    const res = await getSaltMinion();
    if(res?.data?.data?.minions?.length) {
      setAllMinions(res.data.data.minions)
    }
  }

  useEffect(() => {
    setIsHostsLoading(true);
    fetchHosts();
    fetchRmmClient();
    fetchSaltMinion();
  }, [])

  const fetchRmmClient = async () => {
    // const res = await getRmmClient();
    // console.log({fetchRmmClient: res})
  }

  useEffect(() => {
    if(searchValue) {
      setFilteredData(data.filter((device: any) => device.status?.toLowerCase().includes(searchValue) || device.hostname?.toLowerCase().includes(searchValue) ))
    } else {
      setFilteredData([])
    }
  }, [searchValue])

  const handleInstaller = async (minionId: string) => {
    const formData: any = {
      minionId
    }
    const res = await getChocInstaller(formData);
    
    if(res?.data?.data?.message) {
      toast.success(res.data.data.message)
    }
  }

  const handleAccept = async (minionId: string) => {
    const formData: any = {
      minionId
    }
    const res = await acceptSaltMinion(formData);
    
    if(res?.data?.status) {
      toast.success('Connected Successfully')
    }
   }

  async function handleSubmit(minionId: string) {
    await handleInstaller(minionId);
    await handleAccept(minionId);
  }

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value?.toLowerCase())
  }

  const handleHostDeletion = async () => {
    setIsHostDeletionInProgress(true)
    try {
      if(removeHostConfirmationInfo.id) {
        const res = await deleteHost(removeHostConfirmationInfo.id)
        if(res.data?.message?.includes("Success")) {
          await fetchHosts()
          toast.success('Host removed successfully!');
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to remove host!')
    }

    setIsHostDeletionInProgress(false)
    setRemoveHostConfirmationInfo({ isOpen: false, id: undefined })
  }

  return(
    <>
      <br/>
      <br/>
      <Card>
        <Card.Body>
          <div className='d-flex w-100 p-2'>
            <div className='d-flex align-items-center w-25'>
              <h5 className='m-0 text-uppercase theme-font'>Devices</h5>
            </div>
            <div className="d-flex justify-content-end align-items-center w-75">
              <div className='custom-width'>
                <InputGroup className="shadow p-2 bg-white rounded">
                  <InputGroup.Text
                    className='bg-white border-0'
                    id="basic-addon1">
                    <BiSearch size={22} />
                  </InputGroup.Text>
                  <Form.Control
                    size='sm'
                    className='header-input border-0'
                    placeholder="Search"
                    aria-label="Username"
                    onChange={handleSearchChange}
                  />
                </InputGroup>
              </div>
              <div className='mx-1'>
                <Dropdown>
                  <Dropdown.Toggle className='bg-transparent border-0'>
                    <button className='theme-border-danger bg-transparent theme-danger theme-font p-2 rounded'>
                      <AiOutlinePlus size={18} className='me-1' /> Add New Device
                    </button>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='theme-font text-muted'>
                  <Dropdown.Item onClick={() => setShow(!show)}>Install Agent</Dropdown.Item>
                    {/* <Dropdown.Item href="#/action-1">SNMP</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">TCP</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">HTTP</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">GENERIC</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* <div className='mx-1'>
                <button
                  className='bg-theme-danger text-white border-0 theme-font p-2 px-3 rounded'
                  onClick={() => setShow(!show)}
                >
                  <HiDownload size={18} className='me-1' /> Install Agent
                </button>
              </div> */}
              {/* <div className='mx-1'>
                <Dropdown>
                  <Dropdown.Toggle className='bg-transparent border-0 p-0 me-2' id="dropdown-basic">
                    <button
                      className='px-3 py-1 text-white border-0 bg-gray h-34 rounded mx-2'
                    >
                      <LuSettings2 size={18} />
                    </button>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item className='theme-font fs-7'>Request</Dropdown.Item>
                    <Dropdown.Item className='theme-font fs-7'>Damage Report</Dropdown.Item>
                    <Dropdown.Item className='theme-font fs-7'>Perform Maintenance</Dropdown.Item>
                    <Dropdown.Item className='theme-font fs-7'>Assets Audit</Dropdown.Item>
                    <Dropdown.Item href='/confirm-assets' className='theme-font fs-7'>Confirmation</Dropdown.Item>
                    <Dropdown.Item className='theme-font fs-7'>Import Data</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div> */}
            </div>
          </div>
          <hr className='m-0 mt-3'/>
          <Table striped className='theme-font' id='departmentTable'>
            <thead className='p-3'>
            <tr className='fs-7'>
              <th><p className='py-2 m-0 fs-13 text-uppercase'>Name</p></th>
              {/* <HiChevronUpDown size={18} className='ms-1' /> */}
              <th><p className='py-2 m-0 fs-13 text-uppercase'>Availability</p></th>
              {/* <HiChevronUpDown size={18} className='ms-1' /> */}
              <th><p className='py-2 m-0 fs-13 text-uppercase'>Alerts</p></th>
              {/* <HiChevronUpDown size={18} className='ms-1' /> */}
              <th><p className='py-2 m-0 fs-13 text-uppercase'>Remote Access</p></th>
              {/* <HiChevronUpDown size={18} className='ms-1' /> */}
              <th><p className='py-2 m-0 fs-13 text-end'>ACTION</p></th>
            </tr>
            </thead>
            <tbody>
              {(!!filteredData?.length ? filteredData : data)?.map((item: any) => (
                <tr key={item.uuid}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <img src={bogus} alt="" width='38' height='38' className='rounded' />
                      <div>
                        <p className='m-0 ms-2 fs-7'>{item?.hostname}</p>
                        <p className='m-0 ms-2 fs-8 text-muted'>Last Login: {item?.label_updated_at}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      {(item?.status === 'online') ? <>
                        <div className='status-ico bg-success mx-2'></div>
                        <p className='theme-font m-0'>{item?.status}</p>
                        </>
                        :
                        <>
                          <div className='status-ico bg-secondary mx-2'></div>
                          <p className='theme-font m-0'>{item?.status}</p>
                        </>
                      }
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center h-100">
                      <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center px-3 br-1'>
                          <div className='action-ico bg-danger mx-2'>{item?.issues?.failing_policies_count}</div>
                          <p className='m-0 ms-1 fs-7 text-muted'>Critical</p>
                        </div>
                        <div className='d-flex align-items-center px-3 br-1'>
                          <div className='action-ico bg-warning mx-2'>{item?.issues?.total_issues_count}</div>
                          <p className='m-0 ms-1 fs-7 text-muted'>Warning</p>
                        </div>
                        <div className='d-flex align-items-center px-3'>
                          <div className='action-ico bg-info mx-2'>1</div>
                          <p className='m-0 ms-1 fs-7 text-muted'>Info</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      className={`${allMinions?.includes(item.minionId) ? 'bg-gray' : 'theme-border-danger theme-danger'} bg-transparent theme-font p-2 px-3 rounded`}
                      onClick={() => {
                        if(item.minionId && !allMinions?.includes(item.minionId)) {
                          handleSubmit(item.minionId)
                        } else {
                          toast.info("It looks like one of our installer isn't installed correctly, Please try again after installing all the installers correctly!")
                        }
                      }}
                      disabled={allMinions?.includes(item.minionId)}
                    >
                      <BsFileEarmarkArrowUp size={18} className='me-1' />
                      {allMinions?.includes(item.minionId) ? 'Connected' : 'Connect'}
                    </button>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end align-items-center'>
                      <button
                        className='bg-transparent border-0'
                        onClick={() => router({
                          pathname: '/device-detail',
                          search: `?${createSearchParams({
                            hostId: item.id,
                            minionId: item.minionId,
                            agentId: item.agentId
                          })}`
                        })}><AiOutlineEye className='me-2 mt-1' size={20} />
                      </button>
                      <button
                        className='bg-transparent border-0'
                        onClick={() => setRemoveHostConfirmationInfo({ isOpen: true, id: item.id})}
                      >
                        <BiTrash size={20} />
                      </button>
                      {/* <DropdownButton
                        className="bg-transparent custom-btn"
                        id="dropdown-item-button"
                        title={<BiDotsVerticalRounded className='me-2' size={20} />}
                      >
                        <Dropdown.Item className='theme-font fs-7' as="button" onClick={() => handleHostDeletion(item.id)}>Remove</Dropdown.Item>
                      </DropdownButton> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {isHostsLoading && (
            <div className='text-center theme-font text-muted px-3 my-5 w-100'>
              <p className='me-2'>Fetching Devices...</p>
              <div className='d-flex w-100 justify-content-center'>
                <Spinner size='sm' animation="grow" variant="danger" />
                <Spinner className='mx-2' size='sm' animation="grow" variant="danger" />
                <Spinner size='sm' animation="grow" variant="danger" />
              </div>
            </div>
          )}
          <hr/>
        </Card.Body>
      </Card>
      {show &&
        <AgentModal show={show} hide={() => setShow(false)} />
      }
      {removeHostConfirmationInfo.isOpen && (
        <ConfirmationDialog
          open={removeHostConfirmationInfo.isOpen}
          onClose={() => setRemoveHostConfirmationInfo({ isOpen: false, id: undefined })}
          onOkay={handleHostDeletion}
          closeButtonText='Cancel'
          okayButtonText='Remove'
          title='Are you sure you want to remove this host?'
          showLoaderOnOkay={isHostDeletionInProgress}
        />
      )}
    </>
  )
}
export default DeviceManagement;
