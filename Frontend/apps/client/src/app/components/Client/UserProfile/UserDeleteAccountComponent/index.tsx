import { Card, Button } from "react-bootstrap";
import "./user-delete-account-component.scss"
import {deleteAdminUser, useGlobalSelector} from "@infralastic/global-state";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const UserDeleteAccountComponent = () => {
  const { userInfo } = useGlobalSelector((state) => state.user);
  const router = useNavigate()
  function handleDelete() {
      const formData = {
        user_id: userInfo?.result?.user_id
      }
      deleteAdminUser(formData).then((res: any) => {
        toast.success(res?.data?.result?.msg)
        setTimeout(() => {
          router('/login')
          localStorage.clear()
        }, 3000)
      })
    }
    return (
        <Card className="shadow border-0">
            <Card.Body>
                <div className="p-3">
                    <div>
                        <h5 className="theme-font">Delete Account</h5>
                        <div className="user-color p-3 rounded">
                        <h6 className="theme-font theme-danger">Are you sure you want to delete your account?</h6>
                        <p className="text-muted m-0">Once you delete your account, there is no going back. Please be certain.</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input me-2" />
                            I Confirm My Account Deactivation
                        </label>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                          className="bg-theme-danger border-0 px-3"
                          onClick={() => handleDelete()}
                        >Deactivate Account</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserDeleteAccountComponent;
