import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './userauthentication.scss';
import {
  useGlobalSelector,
  enableTwoFactor,
  disableTwoFactor,
  getUserById,
  useGlobalDispatch,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';

interface UserAuthenticationComponent {
  user: any;
}

const UserAuthenticationComponent = (props: UserAuthenticationComponent) => {
  const [two_factor_auth, set_two_factor_auth] = useState<any>('');
  const [user_id_state, set_user_id] = useState<any>('');
  const dispatch = useGlobalDispatch();

  console.log(user_id_state, 'user_id');
  console.log(props.user.result.user_id);
  useEffect(() => {
    set_user_id(props.user.result.user_id);
  }, [two_factor_auth, user_id_state]);
  const hanldeEnable = () => {
    const user_id: any = user_id_state;
    enableTwoFactor({ user_id }).then((res: any) => {
      console.log(res?.data?.result?.two_factor_auth, 'res user activity');

      if (res?.data?.result?.two_factor_auth === true) {
        toast.success(res?.data?.result?.msg);
      }

      window.location.reload();

      // const user_logs = res.data.result;

      // if (user_logs) {
      //   setUserActivity(user_logs);
      // } else {

      //   setUserActivity([{ module: 'No Activity Found' }]);
      // }
    });
  };
  const hanldeDisable = () => {
    const user_id: any = user_id_state;
    disableTwoFactor({ user_id }).then((res: any) => {
      if (res?.data?.result?.two_factor_auth === false) {
        toast.warning('User Auth Disable');
      }

      window.location.reload();
    });
  };
  const getUser = () => {
    const formData = {
      user_id: props.user.result.user_id,
    };
    console.log(formData);
    getUserById(formData).then((res: any) => {
      set_two_factor_auth(res.data.result.two_factor_auth);

      console.log(res, 'dsfsdf');
    });
  };

  useEffect(() => {
    getUser();
  }, [user_id_state]);

  // console.log(two_factor_auth, 'statee');
  return (
    <Card className="shadow border-0">
      <Card.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          <h5 className="theme-font">Two-Step Verification</h5>
          <p className="">
            Two-factor Authentication is
            {two_factor_auth === true ? (
              <span className="two-factor-Enabled">Enabled</span>
            ) : (
              <span className="two-factor-disabled">Disabled</span>
            )}
          </p>
          {/* <p className="">
                        Two-factor Authentication adds a layer of security to your account by requiring more than a password to log in.
                        <a href="#">Learn more</a>
                    </p> */}
        </div>
        <div className="align-self-end">
          {two_factor_auth === true ? (
            <Button
              onClick={hanldeDisable}
              className="bg-theme-danger border-0 px-3"
            >
              Disable Two-Factor Authentication
            </Button>
          ) : (
            <Button
              onClick={hanldeEnable}
              className="bg-theme-danger border-0 px-3"
            >
              Enable Two-Factor Authentication
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserAuthenticationComponent;
