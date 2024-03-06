import {Button, Col, Form, Row} from "react-bootstrap";
import logo from '../../../../assets/logo.png';
import resetPic from '../../../../assets/change-password.png';
import {useState} from "react";
import './change-password.scss';
import {userChangePassword} from "@infralastic/global-state";
import {toast} from "react-toastify";
import {useGlobalDispatch} from "@infralastic/global-state";


const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useGlobalDispatch();

        const handleSubmit = () => {
            const formData: any = {
                login: email,
                new_password: password,
            };
            try {
                dispatch(userChangePassword(formData)).then(async (res:any) => {
                    if (res.payload.success === true) {
                        toast.success(res.payload.msg);
                    } else {
                        toast.error(res.payload.msg);
                    }
                });
            } catch (err: any) {
                console.error(err);
                toast.error('Access Denied');
            }
        }

    return (
        <div className='h-100vh'>
            <Row className='h-100vh'>
                <Col md={6}>
                    <div className='d-flex justify-content-center h-100 p-4 w-100'>
                        <div className='login-width d-flex flex-column h-100'>
                            <img src={logo} className='w-50' alt=""/>
                            <div className='d-flex flex-column justify-content-center h-100'>
                                <h3 className='theme-font '>Change your password</h3>
                                <h6 className='pb-4 fs-7 theme-font'>for <span className='theme-danger'>user@gmail.com</span></h6>
                                <Form>
                                    <Form.Group className="pb-4" controlId="formBasicEmail">
                                        <label className='fs-7 pb-1 theme-font'>Email</label>
                                        <Form.Control
                                            className='fs-7 theme-font'
                                            type="text"
                                            placeholder="Enter Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="pb-4" controlId="formBasicEmail">
                                        <label className='fs-7 pb-1 theme-font'>New Password</label>
                                        <Form.Control
                                            className='fs-7 theme-font'
                                            type="password"
                                            placeholder="Enter New Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button
                                        className='bg-theme-danger border-0 w-100 theme-font fs-7'
                                        type="button"
                                        onClick={() => handleSubmit()}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                            <div className='text-center text-muted fs-7'>
                                <p>
                                    By clicking “Login”  you agree to <span className='theme-danger'>infralastic’s</span> user Terms of Services and <span className='theme-danger'>Privacy Policy</span></p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='login-bg h-100'>
                        <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                            <img src={resetPic} className='w-75' alt=""/>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default ChangePassword;
