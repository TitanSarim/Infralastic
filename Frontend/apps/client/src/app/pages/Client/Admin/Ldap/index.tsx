import { Card, Container, Form } from "react-bootstrap";

const Ldap = () => {
    return(
        <div className="">
            <Card className="rounded-4">
                <Card.Body>
                <h5 className="mb-0">LDAP/AD</h5>
                <h6 className="text-muted">description written here</h6>
                <br/>
                <Container>
                    <Form>
                        <div className="w-100 d-flex">
                        <div className="w-25">
                            <h6>LDAP Intergreation</h6>
                        </div>
                        <div className="d-flex align-items-center">
                        <input  className="me-2"type="checkbox"/>
                        <div>
                            <h6 className="mb-0">LDAP Enabled</h6>                            
                        </div>
                        </div>
                        </div>
                        <br/>
                        <div className="w-100 d-flex">
                        <div className="w-25">
                            <h6 className="mb-0">LDAP Password Sync</h6>
                        </div>
                        <div className="d-flex align-items-center">
                        <input  className="me-2"type="checkbox"/>
                        <div>
                            <h6 className="mb-0">Yes</h6>
                        </div>
                        </div>

                        </div>
                        <br/>
                        <div className="w-100 d-flex">
                        <div className="w-25">
                            <h6>Active Directory</h6>
                        </div>
                        <div className="d-flex align-items-center px-0">
                        <input  className=" me-2  "type="checkbox"/>
                        <div>
                            <h6 className="mb-0">This is an Active Directory Server</h6>
                        </div>
                        </div>
                        </div>
                        <br/>
                        <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">Active Directory Domain</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Client-Side TLS Key</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example-----BEGIN RSA PRIVATE KEY 123456789 ------END RSA KEY"
                            
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Client-Side TLS Certificate</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example-----BEGIN RSA PRIVATE KEY 123456789 ------END RSA KEY"
                            
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Server</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-25">
                            <h6>Use TSL</h6>
                        </div>
                        <div>
                            <h6>This Should be Check Only if you are running STARTTLS on you LDAP server</h6>
                        </div>
                        </div>
                        <br/>
                        <div className="w-100 d-flex">
                        <div className="w-25">
                            <h6>LDAP SSL certificate validation</h6>
                        </div>
                        <div>
                            <h6>Allow invalid SSL Certificate</h6>
                        </div>
                        </div>
                        <br/>
                        <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Bind Username</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Bind Password</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Bind DN</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Filter</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">Username Field</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">Last Name</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP First Name</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Authentication query</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Version</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Active Flag</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Employee Number</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Department</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Manager</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Email</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Telephone Number</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Job Title</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">LDAP Country</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="w-100 d-flex">
                        <div className="w-100 d-flex">
                            <h6 className="w-25">Custom Paaword Reset URL</h6>
                            <input
                            type="text"
                            className="text-muted w-75 form-control"
                            placeholder="Example:example.com"
                            ></input>
                        </div>
                    </div>
                    <br/>
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
export default Ldap;