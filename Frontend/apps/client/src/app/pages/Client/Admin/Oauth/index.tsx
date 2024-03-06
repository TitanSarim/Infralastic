import { Card, Container, Form } from "react-bootstrap";
import { AiOutlineUpload } from "react-icons/ai";

const Oauth = () => {
    return(
       <div className="">
        <Card className="rounded-4">
            <Card.Body>
                <br/>
                <h5 className="mb-0 mx-4">0Auth Api Settings</h5>
                <h6 className="text-muted mx-4">Description written here</h6>
                <br/>
                <Container>
                    <Form>
                    <div className="w-100 d-flex">
                        <div className="w-25 theme-font">
                            <h5>0auth Intergreation</h5>
                        </div>
                        <div className="d-flex align-items-center">
                        <input  className="me-2"type="checkbox"/>
                        <div>
                            <h6 className="mb-0">0Auth Enabled</h6>                            
                        </div>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h5 className="w-25 theme-font">0Auth idp MetaData</h5>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="http://example.com/idp/metadata"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h5 className="w-25"></h5>
                            <button className="mx-1 p-2 border-0">< AiOutlineUpload size={35}/></button>
                            <button className="mx-1 p-2 border-0 bg-transparent theme-font">Select File</button>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h5 className="w-25 theme-font">Attributes Mapping-Username</h5>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-25 theme-font">
                            <h5>0Auth Force Login</h5>
                        </div>
                        <div className="d-flex align-items-center">
                        <input  className="me-2"type="checkbox"/>
                        <div>
                            <h6 className="mb-0">Make 0Auth the primary login</h6>                            
                        </div>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-25 theme-font">
                            <h5>0Auth Single Log Out</h5>
                        </div>
                        <div className="d-flex align-items-center">
                        <input  className="me-2"type="checkbox"/>
                        <div>
                            <h6 className="mb-0">Send a LogoutRequest to Idp on Logout</h6>                            
                        </div>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h5 className="w-25 theme-font">0Auth Custom Settings</h5>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="example.option=false
                            sp-x509cert=file:///
                            sp_private_key=file:///"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="w-100 d-flex justify-content-end">
                    <button className="btn btn-secondary mx-1">Cancel</button>
                    <button className="btn btn-primary bg-theme-danger border-0 mx-1">Save</button>
                    </div>
                    </Form>
                </Container>
            </Card.Body>
        </Card>
       </div>
    )

}
export default Oauth;