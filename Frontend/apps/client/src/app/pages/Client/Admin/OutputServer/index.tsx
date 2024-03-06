import { addOutgoingMail } from "@infralastic/global-state";
import { useState } from "react";
import { Card , Container, Form} from "react-bootstrap";
const OutputServer = () => {
const [descritption , setDescription] = useState('')
const [user , setUser] = useState('');
const [password , setPassword] = useState('');

function handleSubmit() {
    const formData = {
        description: descritption,
        smtp_user: user,
        smtp_pass: password
    }
    addOutgoingMail(formData).then((res:any) => {
        console.log(res)
    })
}
    return (
        <div className="">
            <br/>
            <Card className="shadow border-0">
                <Card.Body>
                    <br/>
                    <h4 className="Theme-font text-center">OutPut Server</h4>
                    <br/>
                    <br/>
                    <Container>
                    <Form>
                        <div className="w-100 d-flex">
                            <div className="w-25">
                                <h6 className="theme-font">Description:</h6>
                            </div>
                            <div className="w-75">
                            <input 
                                className="form-control" 
                                type="text" 
                                placeholder="Enter Description"
                                onChange={(e: any) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="w-100 d-flex">
                            <div className="w-25">
                                <h6 className="theme-font">SMTP User:</h6>
                            </div>
                            <div className="w-75">
                            <input 
                                className="form-control" 
                                type="text" 
                                placeholder="Enter User E-mail"
                                onChange={(e:any) => setUser(e.target.value)} 
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="w-100 d-flex">
                            <div className="w-25">
                                <h6 className="theme-font">SMTP Password:</h6>
                            </div>
                            <div className="w-75">
                            <input 
                                className="form-control" 
                                type="Password" 
                                placeholder="Enter Password Secreat"
                                onChange={(e:any) => setPassword(e.target.value)} 
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="w-100 d-flex justify-content-end">
                        <button className="btn btn-secondary mx-2">Cancel</button>
                        <button 
                        className="btn bg-theme-danger border-0 text-white" 
                        type="button"
                        onClick={()=> handleSubmit()}
                        >Save</button>
                        </div>
                    </Form>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}
export default OutputServer;