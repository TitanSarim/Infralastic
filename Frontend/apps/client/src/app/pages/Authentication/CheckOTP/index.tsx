import { Button, Col, Form, Row } from 'react-bootstrap';
import logo from '../../../../assets/logo.png';
import resetPic from '../../../../assets/change-password.png';
import { useState } from 'react';
import './checkotp.scss';
// import { loginWithSecurityCode } from '@infralastic/global-state';
// import {
//   useGlobalDispatch,
//   useGlobalSelector,
//   userLogin,
// } from '@infralastic/global-state';
import { toast } from 'react-toastify';
import {
  useGlobalDispatch,
  useGlobalSelector,
  resendSecurityCode,
  userCheckOtp,
} from '@infralastic/global-state';
import { useNavigate } from 'react-router-dom';
const Checkotp = () => {
  const [otp, setotp] = useState('');
  const router = useNavigate();

  const dispatch = useGlobalDispatch();
  const { userInfo } = useGlobalSelector((state) => state.user);
  console.log(userInfo);
  const handleSubmit = () => {
    const formData: any = {
      user_id: userInfo?.result?.user_id
        ? userInfo?.result?.user_id
        : userInfo.user_id,
      security_code: otp,
    };
    try {
      // const dispatchData = loginWithSecurityCode(formData);
      // console.log({ dispatchData });

      dispatch(userCheckOtp(formData)).then(async (res: any) => {
        console.log(res, 'res  check');
        if (res?.payload?.result.success === true) {
          toast.success(res?.payload?.msg);
          setTimeout(() => {
            router({
              pathname: '/',
            });
          }, 3000);
        } else if (res?.result?.success === true) {
          toast.success(res?.data?.result?.msg);
          setTimeout(() => {
            router({
              pathname: '/',
            });
          }, 3000);
        } else if (res?.data?.result?.success === false) {
          toast.error(res?.data?.result?.msg);
        } else {
          toast.error(res?.payload?.msg);
        }
      });
    } catch (err: any) {
      console.error(err);
      toast.error('Access Denied');
    }
  };
  const handleResend = () => {
    const user_id: any = {
      user_id: userInfo?.result?.user_id
        ? userInfo?.result?.user_id
        : userInfo.user_id,
    };
    try {
      resendSecurityCode(user_id).then(async (res: any) => {
        if (res?.payload?.success === true) {
          toast.success(res?.payload?.msg);
        } else if (res?.data?.result?.success === true) {
          toast.success(res?.data?.result?.msg);
        } else if (res?.data?.result?.success === false) {
          toast.error(res?.data?.result?.msg);
        } else {
          toast.error(res?.payload?.msg);
        }
      });
    } catch (err: any) {
      console.error(err);
      toast.error('Access Denied');
    }
    resendSecurityCode;
  };
  console.log(otp);
  return (
    <div className="h-100vh">
      <Row className="h-100vh">
        <Col md={6}>
          <div className="d-flex justify-content-center h-100 p-4 w-100">
            <div className="login-width d-flex flex-column h-100">
              <img src={logo} className="w-50" alt="" />
              <div className="d-flex flex-column justify-content-center h-100">
                <h3 className="theme-font ">Enter your OTP</h3>
                <h6 className="pb-4 fs-7 theme-font">
                  for{' '}
                  <span className="theme-danger"> Please check your email</span>
                </h6>
                <Form>
                  <Form.Group className="pb-4" controlId="formBasicEmail">
                    <label className="fs-7 pb-1 theme-font">OTP</label>
                    <Form.Control
                      className="fs-7 theme-font"
                      type="number"
                      value={otp}
                      placeholder="Enter  your OTP"
                      onChange={(e) => setotp(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    className="bg-theme-danger border-0 w-100 theme-font fs-7"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Send
                  </Button>
                </Form>
                <div className="text-center text-muted fs-1">
                  <div onClick={handleResend} className="resend-otp">
                    Resend your OTP
                  </div>
                </div>
              </div>

              <div className="text-center text-muted fs-7">
                <p>
                  By clicking “Login” you agree to{' '}
                  <span className="theme-danger">infralastic’s</span> user Terms
                  of Services and{' '}
                  <span className="theme-danger">Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="login-bg h-100">
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
              <img src={resetPic} className="w-75" alt="" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Checkotp;
