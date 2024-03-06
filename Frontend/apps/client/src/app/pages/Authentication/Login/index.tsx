import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/logo.png';
import google from '../../../../assets/Google.png';
import facebook from '../../../../assets/Facebook.png';
import CarouselComponent from '../../../components/Slider';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './login.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import {
  useGlobalDispatch,
  useGlobalSelector,
  userLogin,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<any>(false);

  const router = useNavigate();
  const dispatch = useGlobalDispatch();
  const { loginWithRedirect } = useAuth0();
  const user = useGlobalSelector((state) => state.user);
  console.log({ user });
  if (user) {
    const { userInfo } = user;
    console.log({ userInfo });
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // const checkFleet = () => {
  //   axios.get('http://fleet.flashcitytours.com/user').then((res: any)  => {
  //     console.log(res)
  //   })
  // }
  //
  // useEffect(() => {
  //   checkFleet();
  // }, [])
  const handleSubmit = () => {
    const formData: any = {
      login: email,
      password: password,
    };
    try {
      console.log({ dispatch });
      const dispatchData = userLogin(formData);
      console.log({ dispatchData });
      dispatch(dispatchData).then(async (res: any) => {
        console.log({ userLoginSuccess: res });
        if (res?.payload?.result?.success === true) {
          if (res.payload.result.two_factor_auth === true)
            setTimeout(() => {
              router('/check-otp');
            }, 3000);
          else {
            toast.success(res.payload?.result?.msg);
            setTimeout(() => {
              router('/');
            }, 3000);
          }
        } else if (res.payload.result.two_factor_auth === true) {
          setTimeout(() => {
            router('/check-otp');
          }, 3000);
        } else {
          toast.error(res?.payload?.result?.msg);
        }
      });
    } catch (err: any) {
      console.log({ userLoginFailure: err });
      console.error(err);
      toast.error('Access Denied');
    }
  };

  return (
    <div className="h-100vh">
      <Row className="h-100vh">
        <Col md={6}>
          <div className="d-flex justify-content-center align-items-center h-100 p-4 w-100">
            <div className="login-width d-flex flex-column">
              <img src={logo} className="w-50" alt="" />
              <h2 className="theme-font py-5">
                Welcome to <span className="theme-danger">Infralastic!</span> 👋
              </h2>
              <h3 className="theme-font pb-3">Login to your account</h3>
              <Form>
                <Form.Group className="pb-3" controlId="formBasicEmail">
                  <label className="fs-7 pb-1 theme-font">Email</label>
                  <Form.Control
                    className="fs-7 theme-font"
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="pb-3" controlId="formBasicPassword">
                  <label className="fs-7 pb-1 theme-font">Password</label>
                  <div className="input-group">
                    <Form.Control
                      className="fs-7 theme-font"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="input-group-text cursor"
                      onClick={() => handleTogglePasswordVisibility()}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}{' '}
                    </span>
                  </div>
                </Form.Group>

                <Form.Group className="pb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    className="fs-7 theme-font"
                    type="checkbox"
                    label="Remember Me"
                  />
                </Form.Group>
                <Button
                  className="bg-theme-danger border-0 w-100 theme-font"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Login
                </Button>
              </Form>
              <div className="text-center py-3">
                <a
                  className="text-black text-muted fs-7"
                  onClick={() => router('/reset-password')}
                >
                  Reset Password?
                </a>
              </div>
              <hr />
              <div className="d-flex justify-content-center py-2">
                <div className="px-2">
                  <img src={facebook} className="w-75" alt="" />
                </div>
                <div className="px-2">
                  <img src={google} className="w-75" alt="" />
                </div>
              </div>
              <button
                className="bg-theme-danger border-0 text-white py-1 theme-font my-2 rounded"
                onClick={() => loginWithRedirect()}
              >
                Authorize Using 0Auth
              </button>
              <div>
                <p className="fs-7 text-center py-3">
                  By clicking <span className="fw-bold">“Login”</span> you agree
                  to <span className="theme-danger">Infralastic’s</span> user
                  Terms of Services and{' '}
                  <span className="theme-danger">Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="login-bg h-100">
            <CarouselComponent />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
