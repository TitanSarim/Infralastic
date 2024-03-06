import { Card, Container, Form } from "react-bootstrap";
import { IoLogoGoogle } from "react-icons/io";
import { IoLogoMicrosoft } from "react-icons/io5";
import {useState} from "react";
import {addIncomingMail, addOutgoingMail} from "@infralastic/global-state";
import {toast} from "react-toastify";

const EmailConfiguration = () => {
  const [description , setDescription] = useState('')
  const [user , setUser] = useState('');
  const [password , setPassword] = useState('');
  const [incoming, setIncoming] = useState(false)
  const [outgoing, setOutgoing] = useState(false)

  function handleIncoming() {
    const formData = {
      description: description,
      smtp_user: user,
      smtp_pass: password
    }
    addIncomingMail(formData).then((res:any) => {
      toast.success(res?.data?.result?.msg)
    })
  }

  function handleOutgoing() {
    const formData = {
      description: description,
      smtp_user: user,
      smtp_pass: password
    }
    addOutgoingMail(formData).then((res:any) => {
      toast.success(res?.data?.result?.msg)
    })
  }
    return(
        <div className="">
          <br/>
          <br/>
            <Card className="rounded-4">
                <Card.Body>
                <br/>
                  <div className="px-3">
                    <h4 className="theme-font">Email Configuration</h4>
                    <h6 className="theme-font text-muted">Lorem ipsum dolor sit amet consectetur. Morbi amet ipsum facilisis.</h6>
                  </div>
                <br/>
                <br/>
                <Container>
                    <Form>
                    <div className="w-100 d-flex">
                      <div className="w-25">
                        <h6 className="theme-font">Description</h6>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Description"
                        onChange={(e: any) => setDescription(e.target.value)}
                      />
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                      <div className="w-25">
                        <h6 className="theme-font">SMTP User</h6>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter User E-mail"
                        onChange={(e: any) => setUser(e.target.value)}
                      />
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                      <div className="w-25">
                        <h6 className="theme-font">SMTP Password</h6>
                      </div>
                      <input
                        className="form-control"
                        type="Password"
                        placeholder="Enter Password Secret"
                        onChange={(e: any) => setPassword(e.target.value)}
                      />
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-25 theme-Danger">
                            <h6 className="theme-font theme-danger">Mail Server</h6>
                        </div>
                        <div className="w-25 d-flex align-items-center">
                            <div className="d-flex">
                                <input
                                  type="radio"
                                  name='mail'
                                  onClick={() => {
                                    setIncoming(true)
                                    setOutgoing(false)
                                  }}
                                />
                            </div>
                            <div className="d-flex align-items-center px-2">
                                <h6 className="m-0">Incoming</h6>
                            </div>
                        </div>
                        <div className="w-25 d-flex align-items-center">
                            <div className="d-flex">
                                <input
                                  type="radio"
                                  name='mail'
                                  onClick={() => {
                                    setIncoming(false)
                                    setOutgoing(true)
                                  }}
                                />
                            </div>
                            <div className="d-flex align-items-center px-2">
                                <h6 className="m-0">Outgoing</h6>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                    <div className="theme-danger">
                        <h5>Email Service</h5>
                        <br/>
                        <div className="">
                          <button
                            className="mx-1 p-2 user-color border-0 theme-danger">
                            <IoLogoMicrosoft className="user-color" size={35}/>
                          </button>
                          <button className="mx-3 p-2 user-color border-0 theme-danger">
                            <IoLogoGoogle className="user-color" size={35}/>
                          </button>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex justify-content-end">
                      <button className="btn btn-secondary mx-1">Cancel</button>
                      {incoming &&
                        <button
                          className="btn btn-primary bg-theme-danger border-0 mx-1"
                          type='button'
                          onClick={() => handleIncoming()}
                        >Incoming Save</button>
                      }
                      {outgoing &&
                        <button
                          className="btn btn-primary bg-theme-danger border-0 mx-1"
                          type='button'
                          onClick={() => handleOutgoing()}
                        >Outgoing Save</button>
                      }
                    </div>
                    </Form>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )

}
export default EmailConfiguration;
