import {Button, Col, Form, Row} from "react-bootstrap";
import logo from '../../../../assets/logo.png';
import resetPic from '../../../../assets/reset-illustration.png';
import {useState} from "react";
import './reset-password.scss';
import {useNavigate} from "react-router-dom";
import {useGlobalDispatch, userReset} from "@infralastic/global-state";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const router = useNavigate();
    const dispatch = useGlobalDispatch()

    const handleSubmit = () => {
        const formData: any = {
            login: email,
            link: 'https://infralastic-capp.infralastic.com/change-password',
        };
        try {
            dispatch(userReset(formData)).then(async (res:any) => {
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
                                <h3 className='theme-font pb-3'>Reset Password 🔒</h3>
                                <Form>
                                    <Form.Group className="pb-3" controlId="formBasicEmail">
                                        <label className='fs-7 pb-1 theme-font'>Email</label>
                                        <Form.Control
                                            className='fs-7 theme-font'
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button
                                        className='bg-theme-danger border-0 w-100 theme-font fs-7'
                                        type="button"
                                        onClick={() => handleSubmit()}
                                    >
                                        Send Reset Link
                                    </Button>
                                </Form>
                                <div className='text-center py-3'>
                                    <a className='text-black text-muted fs-7' href="">Remeber your password? <span onClick={() => router('/')} className='theme-danger'>Back to Login</span></a>
                                </div>
                            </div>
                            <div className='text-center text-muted fs-7'>
                                <p>If you have any issue regarding resetting your password,
                                    please contact our <span className='theme-danger'>Customer Support</span> team for assistance.</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='login-bg h-100'>
                        <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                            <img src={resetPic} className='w-50' alt=""/>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default ResetPassword;
