import React, { useState } from "react";
import {StepLabel, Stepper, Typography, Step, Radio, RadioGroup, FormControlLabel, FormControl, TextField } from "@mui/material";
import {Button, Col, Modal, Row, Spinner} from "react-bootstrap";

import {generateRmmInstaller, getFleetInstaller, getSaltInstaller} from "@infralastic/global-state";
import './agent-modal.scss';

interface AgentModal {
  show: boolean;
  hide: any;
}

const AgentModal = (props: AgentModal) => {
  const [activeStep, setActiveStep] = useState(0);
  const [installer, setInstaller] = useState<string>('');
  const [installerUrls, setInstallerUrls] = useState({
    fleetUrl: '',
    saltUrl: '',
    tacticalUrl: ''
  });
  const [installersLoading, setInstallersLoading] = useState(false);
  const [installerOsVersion, setInstallerOsVersion] = useState<string>('');
  const [clientId, setClientId] = useState<number | undefined>();
  const [siteId, setSiteId] = useState<number | undefined>();
  
  const steps = [
    {
      label: 'Select OS'
    },
    {
      label: 'Download'
    }
  ];

  const handleTacticalInstaller = async () => {
    try {
      const formData = {
        clientId: clientId,
        siteId: siteId,
        platform: installer,
        osType: installerOsVersion
      };
  
      const res = await generateRmmInstaller(formData)
      if(res.data.data.url) {
        setInstallerUrls(urls => ({ ...urls, tacticalUrl: res.data.data.url }))
      }
    } catch (error) {
      console.error('Error occurred during tactical generation:', error);
    }
  };  

  const handleSaltInstaller = async () => {
    try {
      let installerUrl: string;
      const res = await getSaltInstaller();
  
      if (installer === 'windows') {
        installerUrl = res.data.data.windows;
      } else if (installer === 'mac') {
        installerUrl = res.data.data.mac;
      }
  
      setInstallerUrls(urls => ({ ...urls, saltUrl: installerUrl }))
    } catch (error) {
      console.error('Error occurred during salt generation:', error);
    }
  };

  const handleFleetInstaller = async () => {
    try {
      let installerUrl: string;
      const res = await getFleetInstaller();
  
      if (installer === 'windows') {
        installerUrl = res.data.data.windows;
      } else if (installer === 'mac') {
        installerUrl = res.data.data.mac;
      }
      setInstallerUrls(urls => ({ ...urls, fleetUrl: installerUrl }))
    } catch (error) {
      console.error('Error occurred during fleet generation:', error);
    }
  };

  const fetchAllInstallersUrls = async () => {
    await handleFleetInstaller();
    await handleSaltInstaller();
    await handleTacticalInstaller();
  }

  const handleInstallerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstaller((event.target as HTMLInputElement).value);
  };

  const handleNextClick = async () => {
    setInstallersLoading(true)
    await fetchAllInstallersUrls()
    setInstallersLoading(false)
    setActiveStep(1)
  }

  const handleInstallerOsVersionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstallerOsVersion((event.target as HTMLInputElement).value);
  };

  const getOsVersionSelectionUI = () => {
    switch (installer) {
      case 'windows':
        return (
          <>
            <FormControlLabel value="amd64" control={<Radio size='small' className='theme-danger' />} label="Windows 64 bit" />
            <FormControlLabel value="386" className='ms-2' control={<Radio size='small' className='theme-danger' />} label="Windows 32 bit" />
          </>
        )
      case 'mac':
        return (
          <>
            <FormControlLabel value="amd64" control={<Radio size='small' className='theme-danger' />} label="Mac Intel 64 bit" />
            <FormControlLabel value="arm64" className='ms-2' control={<Radio size='small' className='theme-danger' />} label="Mac Apple silicon(M1,M2)" />
          </>
        )
      case 'linux':
        return (
          <>
            <FormControlLabel value="amd64" control={<Radio size='small' className='theme-danger' />} label="Linux 64 bit" />
            <FormControlLabel value="386" className='ms-2' control={<Radio size='small' className='theme-danger' />} label="Linux 32 bit" />
            <FormControlLabel value="arm64" className='ms-2' control={<Radio size='small' className='theme-danger' />} label="Linux ARM 64 bit" />
            <FormControlLabel value="arm" className='ms-2' control={<Radio size='small' className='theme-danger' />} label="Linux ARM 32 bit" />
          </>
        )
      default:
        return 'Installer Version not found !!!'
    }
  }

  return(
    <>
      <Modal show={props.show} onHide={props.hide} size='xl'>
        <Modal.Body>
          <div className="p-3">
            <h5 className='theme-font'>Download agent installer</h5>
          </div>
          <Row>
            <Col md={3}>
              <Stepper activeStep={activeStep} orientation="vertical" className='px-3'>
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 2 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Col>
            <Col md={9}>
              <div className="d-flex h-100">
                <div className="vr h-100"></div>
                {activeStep === 0 ? (
                  <div className='px-3'>
                    {installersLoading ? (
                      <div className='text-center theme-font text-muted px-3 my-3'>
                        <p className='me-2'>Preparing your downloads, please allow a few moments...</p>
                        <div className='d-flex w-100 justify-content-center'>
                          <Spinner size='sm' animation="grow" variant="danger" />
                          <Spinner className='mx-2' size='sm' animation="grow" variant="danger" />
                          <Spinner size='sm' animation="grow" variant="danger" />
                        </div>
                      </div>
                    ) : (
                      <>
                        {!installer ? (
                          <>
                            <h5 className='theme-font theme-danger mb-3 ms-3'>Select an OS</h5>
                            <FormControl className='ms-3'>
                              <RadioGroup
                                row
                                aria-labelledby="select-os"
                                name="select-os-group"
                                value={installer}
                                onChange={handleInstallerChange}
                              >
                                <FormControlLabel value="windows" control={<Radio size='small' className='theme-danger' />} label="Windows (.msi)" />
                                <FormControlLabel className='ms-2' value="mac" control={<Radio size='small' className='theme-danger' />} label="Mac (.pkg)" />
                                <FormControlLabel className='ms-2' value="linux" control={<Radio size='small' className='theme-danger' />} label="Linux (.bash)" />
                              </RadioGroup>
                            </FormControl>
                          </>
                        ) : !installerOsVersion ? (
                          <>
                            <h5 className='theme-font theme-danger mb-3 ms-3'>Select {installer} version</h5>
                            <FormControl className='ms-3'>
                              <RadioGroup
                                row
                                aria-labelledby="select-os-version"
                                name="select-os-version-group"
                                value={installerOsVersion}
                                onChange={handleInstallerOsVersionChange}
                              >
                                {getOsVersionSelectionUI()}
                              </RadioGroup>
                            </FormControl>
                          </>
                        ) : (
                          <>
                            <h5 className='theme-font theme-danger mb-3 ms-3'>Enter the following information</h5>
                            <FormControl className='ms-3 client-id-and-site-id-wrapper'>
                              <TextField type="number" id="client-id" label="Client Id" variant="outlined" value={clientId} onChange={(e) => setClientId(Number(e.target.value))} />
                              <TextField className="ms-3" type="number" id="site-id" label="Site Id" variant="outlined" value={siteId} onChange={(e) => setSiteId(Number(e.target.value))} />
                            </FormControl>
                          </>
                        )}
                      </>
                    )}
                    <hr className='ms-3'/>
                    <p className='theme-font text-muted px-3'>Download and install the agents on all the devices you wish to monitor</p>
                </div>
                ) : activeStep === 1 ?
                    <div className='px-3'>
                      <h5 className='theme-font theme-danger'>Download</h5>
                      <p className='theme-font'>Download all the agents installers</p>
                      {installerUrls.fleetUrl && (
                        <button
                          className='theme-font bg-theme-danger border-0 text-white py-2 px-3 rounded'
                        >
                          <a className='text-white' href={installerUrls.fleetUrl} download target='_blank'>
                            Fleet
                          </a>
                        </button>
                      )}
                      {installerUrls.saltUrl && (
                        <button
                          className='theme-font bg-theme-danger border-0 text-white py-2 px-3 rounded mx-3'
                        >
                          <a className='text-white' href={installerUrls.saltUrl} download target='_blank'>
                            Salt
                          </a>
                        </button>
                      )}
                      {installerUrls.tacticalUrl && (
                        <button
                          className='theme-font bg-theme-danger border-0 text-white py-2 px-3 rounded'
                        >
                          <a className='text-white' href={installerUrls.tacticalUrl} download target='_blank'>
                            Tactical
                          </a>
                        </button>
                      )}
                    </div>
                  : <></>
                }
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={props.hide}>
              Close
            </Button>
            {activeStep === 0 && (
              <Button
                variant={(!installer || !installerOsVersion || installersLoading) ? "light" : "danger"}
                className='mx-3'
                onClick={handleNextClick}
                disabled={!installer || !installerOsVersion || installersLoading}
              >
                Next
              </Button>
            )}
            {activeStep === 1 && (
              <Button variant="danger" className='mx-3' onClick={props.hide}>
                Done
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )

}
export default AgentModal;
