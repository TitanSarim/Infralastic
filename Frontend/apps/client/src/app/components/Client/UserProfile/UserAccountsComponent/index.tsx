import { Card, Col, Form, Row } from "react-bootstrap";
import { BsMicrosoft } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";
import { IoLogoGoogle } from "react-icons/io";
import { IoLogoMicrosoft } from "react-icons/io5";

const UserAccountsComponent =() =>{

    return(
    <Card className="shadow border-0">
        <Card.Body>
            <div className="w-100">
                <h5 className="theme-font">Connected Accounts</h5>
                <p className="text-muted">Display Content ftom your connected accounts on your site</p>
            </div>
            <div className="w-100 d-flex">
                <div className="w-100 d-flex">
                    <div className="h-100 d-flex align-items-center mx-2 theme-danger"><IoLogoGoogle size={26}/></div>
                <div className="w-75">
                    <h5 className="theme-font">Google</h5>
                    <h6 className="text-muted">Calander and Contacts</h6>
                </div>
                <div className="w-25"></div>
                <Form.Check
                type="switch"
                id="custom-switch"
                label=""
                />
                </div>
            </div>
            <div className="w-100 d-flex">
                <div className="w-100 d-flex">
                <div className="h-100 d-flex align-items-center mx-2 theme-danger"><FiFacebook size={26}/></div>
                <div className="w-75">
                    <h5 className="theme-font">Facebook</h5>
                    <h6 className="text-muted">Communication</h6>
                </div>
                <div className="w-25"></div>
                <Form.Check
                type="switch"
                id="custom-switch"
                label=""
                />
                </div>
            </div>
            <div className="w-100 d-flex">
                <div className="w-100 d-flex">
                <div className="h-100 d-flex align-items-center mx-2 theme-danger"><IoLogoMicrosoft size={26}/></div>
                <div className="w-75">
                    <h5 className="theme-font">Microsoft 360</h5>
                    <h6 className="text-muted">Manage your git resporitries</h6>
                </div>
                <div className="w-25"></div>
                <Form.Check
                type="switch"
                id="custom-switch"
                label=""
                />
                </div>
            </div>
        </Card.Body>
    </Card>
    )
}
export default UserAccountsComponent;