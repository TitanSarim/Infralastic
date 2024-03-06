import { Card, Modal, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
  getRoleById,
  updateRoleControl,
  useGlobalSelector,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface RoleModal {
  show: any;
  hide: any;
  id: any;
}
const EditRoleModal = (props: RoleModal) => {
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const { userInfo } = useGlobalSelector((state) => state.user);
  console.log(userInfo);
  console.log('role id ', props.id);
  const router = useNavigate();
  function handleSubmit() {
    const formData: any = {
      role_id: props.id,
      role_name: role,
      description: description,
      user_id: userInfo?.result?.user_id
        ? userInfo?.result?.user_id
        : userInfo?.user_id,

      access_control: [
        {
          model_id: 419,
          read: 'False',
          write: 'True',
          create: 'True',
          delete: 'True',
        },
        {
          model_id: 420,
          read: 'False',
          write: 'True',
          create: 'True',
          delete: 'True',
        },
      ],
    };
    updateRoleControl(formData).then((res: any) => {
      toast.success(res?.data?.result?.msg);
      props.hide();

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
  console.log(props.show);
  function fetchRoleById() {
    const formData = {
      role_id: props.id,
    };
    getRoleById(formData).then((res: any) => {
      setRole(res.data.result.role_name);
      setDescription(res.data.result.description);
    });
  }
  useEffect(() => {
    if (props.id !== null) {
      fetchRoleById();
    }
  }, []);
  return (
    <>
      <Modal show={props.show} onHide={props.hide} size="xl">
        <Modal.Body>
          <div>
            <Card className="border-0">
              <Card.Header className="bg-dark text-white theme-font">
                <p className="m-0 p-2 fs-5">
                  Step 01: <span className="theme-danger">Define Role</span>
                </p>
              </Card.Header>
              <Card.Body>
                <form action="" className="p-2">
                  <div className="d-flex align-items-center py-2 w-100">
                    <label className="w-25 fs-7" htmlFor="">
                      Role Name *
                    </label>
                    <input
                      onChange={(e) => setRole(e.target.value)}
                      className="w-75 form-control fs-7"
                      type="text"
                      value={role}
                      placeholder="Auditor"
                    />
                  </div>
                  <div className="d-flex align-items-center py-2 w-100">
                    <label className="w-25 fs-7" htmlFor="">
                      Role *
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      className="w-75 form-control fs-7"
                      rows={4}
                      cols={50}
                    >
                      Has Access to All Things
                    </textarea>
                  </div>
                </form>
                <br />
                <br />
              </Card.Body>
            </Card>
            <Card className="border-0">
              <Card.Header className="bg-dark text-white theme-font">
                <p className="m-0 p-2 fs-5">
                  Step 02: <span className="theme-danger">Select Control</span>
                </p>
              </Card.Header>
              <Card.Body>
                <p className="fs-7 theme-font m-0">
                  Configure permissions to access and manage different modules.
                </p>
                <hr className="mb-0" />
                <Table striped className="theme-font p-2" id="departmentTable">
                  <thead className="p-3">
                    <tr className="fs-7">
                      <th>
                        <p className="py-2 m-0 fs-13 text-uppercase">
                          Module Name
                        </p>
                      </th>
                      <th>
                        <p className="py-2 m-0 fs-13 text-uppercase">
                          Full Control
                        </p>
                      </th>
                      {/* <th>
                        <p className="py-2 m-0 fs-13 text-uppercase">Write</p>
                      </th>
                      <th>
                        <p className="py-2 m-0 fs-13 text-uppercase">Read</p>
                      </th> */}
                      <th>
                        <p className="py-2 m-0 fs-13 text-uppercase">
                          No Access
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h6 className="text-muted fs-7 m-0">Enrollment</h6>
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      {/* <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td> */}
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="text-muted fs-7 m-0">
                          Profile Management
                        </h6>
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      {/* <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td> */}
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="text-muted fs-7 m-0">App Management</h6>
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      {/* <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td> */}
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="text-muted fs-7 m-0">
                          Content Management
                        </h6>
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      {/* <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td> */}
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="text-muted fs-7 m-0">
                          Group Management
                        </h6>
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      {/* <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td> */}
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="text-muted fs-7 m-0">Inventory</h6>
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      {/* <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td> */}
                      <td>
                        <input type="checkbox" className="form-check" />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <br />
                <br />
                <div className="d-flex justify-content-end w-100">
                  <button className="border-0 bg-gray text-white px-3 py-2 rounded mx-2">
                    Cancel
                  </button>
                  <button
                    className="border-0 bg-theme-danger text-white px-3 py-2 rounded mx-2"
                    onClick={() => handleSubmit()}
                    type="button"
                  >
                    Update Role
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditRoleModal;
