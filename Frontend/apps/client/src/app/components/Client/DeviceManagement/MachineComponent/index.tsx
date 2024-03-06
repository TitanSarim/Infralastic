import { useState, useEffect } from 'react';
import '../device-managment-component.scss';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import DeviceCard from '../DeviceCard';
import image1 from '../../../../../assets/device-managment/hardware.png';
import image2 from '../../../../../assets/device-managment/disk.png';
import image3 from '../../../../../assets/device-managment/availability.png';
import image4 from '../../../../../assets/device-managment/perfomance.png';
import image5 from '../../../../../assets/device-managment/patches.png';
import image6 from '../../../../../assets/device-managment/general.png';
import { BsFileEarmarkArrowUp, BsArrowLeftCircleFill } from 'react-icons/bs';
import {
  executeSaltCommands,
  getChocsSoftware,
  getPatches,
  getSpecificAgentControl,
} from '@infralastic/global-state';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import SoftwareInstallationModal from '../SoftwareInstallationModal';
import PatchesModal from '../PatchesModal';


interface MachineComponentProps {
  item: any;
  minionId: any;
  agentId: string;
  checks: any
}

const MachineComponent = ({
  item,
  minionId,
  agentId,
  checks
}: MachineComponentProps) => {
  const router = useNavigate();
  const [isSoftwareInstallationModalOpen, setIsSoftwareInstallationModalOpen] = useState(false);
  const [allChocosSoftwares, setAllChocosSoftwares] = useState([]);
  const [patches, setPatches] = useState([]);
  const [isPatchesModalOpen, setIsPatchesModalOpen] = useState(false);

  const fetchAllChocosSoftwares =  () => {
    const config = {}
    getChocsSoftware(config).then((res)=>{
      setAllChocosSoftwares(res.data)
    })
  }


  const fetchAllPatches = async () => {
    try {
      if(agentId && agentId !== 'null' && agentId !== 'undefined') {
        const res = await getPatches(agentId);

        if(res.data?.data?.length) {
          setPatches(res.data.data)
        }
      }
    } catch (error) {
      console.log("Error getting patches", error)
    }
  }

  useEffect(() => {
    fetchAllChocosSoftwares()
    fetchAllPatches()
  }, [])

  const executeCommand = async (query: any) => {
    const formData: any = {
      minionId: minionId,
      command: query,
    };

    try {
      const res = await executeSaltCommands(formData)
      if(res.data.data) {
        toast.success("Command executed successfully!")
      }

    } catch (error) {
      toast.error("Failed to execute command!")
      console.error(`Error executing ${query}`, error)
    }

  }

  const handleConnectClick = async (type: string) => {
    try {
      if (item?.status !== 'online') {
        toast.success("Can't establish connection, target device is offline!");

        return;
      }
      if (agentId && agentId !== 'null' && agentId !== 'undefined') {
        const res = await getSpecificAgentControl(agentId, type);
        toast.success(
          'Connection established, It will be opened in a new tab!'
        );
        if (res?.data?.data?.[type]) {
          window.open(res.data.data[type], '_blank');
        }
      } else {
        toast.error(
          "Can't establish connection, Installers not installed properly!"
        );
      }
    } catch (error) {
      console.error(`Error while connecting ${type}:`, error);
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="bg-white p-3 position-relative">
          <IconButton
            className="position-absolute"
            style={{ top: '-28px', left: '-28px' }}
            size="large"
            aria-label="back"
            onClick={() => router(-1)}
          >
            <BsArrowLeftCircleFill size={35} />
          </IconButton>
          <div className="d-flex">
            <div className="w-50">
              <p className="m-0 theme-font text-uppercase fs-5">
                {item?.computer_name}
              </p>
              <div className="d-flex align-items-center">
                {item?.status === 'online' ? (
                  <>
                    <div className="status-ico bg-success me-2"></div>
                    <p className="theme-font m-0">{item?.status}</p>
                  </>
                ) : (
                  <>
                    <div className="status-ico bg-secondary me-2"></div>
                    <p className="theme-font m-0">{item?.status}</p>
                  </>
                )}
              </div>
            </div>
            <div className="w-50">
              <div className="d-flex align-items-center justify-content-end">
                <div className="">
                  <Tooltip title={item?.status === 'offline' ? "Can't perform connect operations as device is currently offline" : ""}>
                    <Dropdown>
                        <Dropdown.Toggle className="bg-transparent border-0 p-0" disabled={item?.status !== 'online'}>
                          <button className="bg-theme-danger text-white border-0 theme-font py-2 px-3 rounded">
                            <BsFileEarmarkArrowUp size={18} className="me-1" />{' '}
                            Connect
                          </button>
                        </Dropdown.Toggle>

                      <Dropdown.Menu className="theme-font text-muted">
                        <Dropdown.Item
                          onClick={() => handleConnectClick('remote_desktop')}
                        >
                          Remote Desktop
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleConnectClick('file_browsing')}
                        >
                          File Browsing
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleConnectClick('live_terminal')}
                        >
                          Live Terminal
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Tooltip>

                </div>
                <div className="mx-1">
                  <Tooltip title={item?.status === 'offline' ? "Can't perform manage operations as device is currently offline" : ""}>
                    <Dropdown>
                      <Dropdown.Toggle className="bg-transparent border-0" disabled={item?.status !== 'online'}>
                        <button className="theme-border-danger bg-transparent theme-danger theme-font py-2 px-3 rounded">
                          Manage
                        </button>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="theme-font text-muted">
                        {/* <Dropdown.Item href="#/action-1">Service Manager</Dropdown.Item> */}
                        <Dropdown.Item
                          onClick={() =>
                            router({
                              pathname: '/device-response',
                              search: `?${createSearchParams({
                                command: 'tasklist',
                                id: minionId,
                              })}`,
                            })
                          }
                        >
                          Task Manager
                        </Dropdown.Item>
                        {/* <Dropdown.Item
                        onClick={() => router({
                          pathname: '/software-inventory',
                          search: `?${createSearchParams({
                            id: minionId
                          })}`
                        })}
                      >Software Inventory</Dropdown.Item> */}
                        <Dropdown.Item
                          onClick={() =>
                            router({
                              pathname: '/device-response',
                              search: `?${createSearchParams({
                                command: 'net user',
                                id: minionId,
                              })}`,
                            })
                          }
                        >
                          Users
                        </Dropdown.Item>
                        {/* <Dropdown.Item
                          onClick={() =>
                            router({
                              pathname: '/device-response',
                              search: `?${createSearchParams({
                                command: 'Get-PhysicalDisk',
                                id: minionId,
                              })}`,
                            })
                          }
                        >
                          Disk Info
                        </Dropdown.Item> */}
                        <Dropdown.Item onClick={() => setIsSoftwareInstallationModalOpen(true)}>Software Installation</Dropdown.Item>
                        <Dropdown.Item onClick={() => setIsPatchesModalOpen(true)}>Patch Management</Dropdown.Item>
                        {/* <Dropdown.Item href="#/action-3">Event Viewer</Dropdown.Item> */}
                        {/* <Dropdown.Item>User Activity</Dropdown.Item> */}
                        <Dropdown.Item
                          onClick={() =>
                            router({
                              pathname: '/device-cmd',
                              search: `?${createSearchParams({
                                id: minionId,
                              })}`,
                            })
                          }
                        >
                          Command Prompt
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            router({
                              pathname: '/device-powershell',
                              search: `?${createSearchParams({
                                id: minionId,
                              })}`,
                            })
                          }
                        >
                          Power Shell
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="#/action-3">Run Script</Dropdown.Item> */}
                        {/* <Dropdown.Item href="#/action-3">File Transfer</Dropdown.Item> */}
                        {/* <Dropdown.Item href="#/action-3">Registry Editor</Dropdown.Item> */}
                        <Dropdown.Item
                          onClick={() => executeCommand('shutdown /r /t 0')}
                        >
                          Restart
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => executeCommand('shutdown /s /f /t 0')}
                        >
                          Shutdown
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="#/action-3">HelpDesk Agent</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Webroot</Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Tooltip>
                </div>
                {/* <div className='mx-1'>
                 <button className='bg-transparent border-0'>
                   <CiEdit size={28} className='theme-danger' />
                 </button>
               </div> */}
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-flex">
            <div className="w-25">
              <h6 className="m-0 mb-3 fs-7">
                <span className="fw-semibold">Machine Name: </span>
                <span className="theme-font text-muted">{item?.hostname}</span>
              </h6>
              <h6 className="m-0 mb-3 fs-7">
                <span className="fw-semibold">Domain/Workgorup: </span>
                <span className="theme-font text-muted">
                  {item?.hardware_vendor}
                </span>
              </h6>
              <h6 className="m-0 mb-3 fs-7">
                <span className="fw-semibold">Last Seen: </span>
                <span className="theme-font text-muted">
                  {item?.detail_updated_at}
                </span>
              </h6>
              <h6 className="m-0 mb-3 fs-7">
                <span className="fw-semibold">Last Reboot Time: </span>
                <span className="theme-font text-muted">
                  {item?.last_enrolled_at}
                </span>
              </h6>
              <h6 className="m-0 mb-3 fs-7">
                <span className="fw-semibold">IP Address: </span>
                <span className="theme-font text-muted">
                  {item?.primary_ip}
                </span>
              </h6>
            </div>
            <div className="w-75 px-3">
              <Row>
                {/* <Col md={2}>
                  <DeviceCard
                    background={'img-device-bg bg-dark'}
                    image={image1}
                    name={'Hardware Alerts'}
                    value={0}
                  />
                </Col> */}
                <Col md={2}>
                  <DeviceCard
                    background={'img-device-bg bg-warning'}
                    image={image2}
                    name={'Warning Alerts'}
                    value={checks?.warning || 0}
                  />
                </Col>
                <Col md={2}>
                  <DeviceCard
                    background={'img-device-bg bg-theme-danger'}
                    image={image4}
                    name={'Failing Alerts'}
                    value={checks?.failing || 0}
                  />
                </Col>
                <Col md={2}>
                  <DeviceCard
                    background={'img-device-bg bg-warning'}
                    image={image6}
                    name={'Info Alerts'}
                    value={checks?.info || 0}
                  />
                </Col>
                <Col md={3}>
                  <DeviceCard
                    background={'img-device-bg bg-dark'}
                    image={image3}
                    name={'Total Alerts'}
                    value={checks?.total || 0}
                  />
                </Col>
                <Col md={3}>
                  <DeviceCard
                    background={'img-device-bg bg-dark'}
                    image={image5}
                    name={'Total Patches'}
                    value={patches?.length || 0}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Card.Body>
      </Card>
      <SoftwareInstallationModal
        open={isSoftwareInstallationModalOpen}
        onClose={() => setIsSoftwareInstallationModalOpen(false)}
        list={allChocosSoftwares}
      />
      <PatchesModal
        open={isPatchesModalOpen}
        onClose={() => setIsPatchesModalOpen(false)}
        list={patches}
      />
    </>
  );
};
export default MachineComponent;
