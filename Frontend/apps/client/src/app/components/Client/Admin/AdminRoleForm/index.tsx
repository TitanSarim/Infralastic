import { Card, Table } from 'react-bootstrap';
import {
  addRoleControl,
  getAllModels,
  useGlobalSelector,
} from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const AdminRoleForm = () => {
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const { userInfo } = useGlobalSelector((state) => state.user);
  console.log(userInfo);
  const router = useNavigate();
  const [accessControl, setAccessControl] = useState([
    {
      model_id: 541,
      module_name: 'Enrollment',
      read: false,
      write: false,
      create: false,
      delete: false,
    },
    {
      model_id: 542,
      module_name: 'Profile Management',
      read: false,
      write: false,
      create: false,
      delete: false,
    },
  ]);

  const handleAccessControlChange = (moduleIndex: any, field: any) => {
    setAccessControl((prevAccessControl: any) => {
      const updatedControl = [...prevAccessControl];

      if (field === 'fullControl' && updatedControl[moduleIndex][field]) {
        updatedControl[moduleIndex].read = true;
        updatedControl[moduleIndex].write = true;
        updatedControl[moduleIndex].create = true;
        updatedControl[moduleIndex].delete = true;
        updatedControl[moduleIndex].no_access = false;
      } else if (field === 'no_access' && updatedControl[moduleIndex][field]) {
        updatedControl[moduleIndex].read = false;
        updatedControl[moduleIndex].write = false;
        updatedControl[moduleIndex].create = false;
        updatedControl[moduleIndex].delete = false;
        updatedControl[moduleIndex].fullControl = false;
      } else {
        updatedControl[moduleIndex][field] =
          !updatedControl[moduleIndex][field];

        if (
          !updatedControl[moduleIndex].read ||
          !updatedControl[moduleIndex].write ||
          !updatedControl[moduleIndex].create ||
          !updatedControl[moduleIndex].delete
        ) {
          updatedControl[moduleIndex].fullControl = false;
        }

        if (
          updatedControl[moduleIndex].read &&
          updatedControl[moduleIndex].write &&
          updatedControl[moduleIndex].create &&
          updatedControl[moduleIndex].delete
        ) {
          updatedControl[moduleIndex].fullControl = true;
        }

        if (
          updatedControl[moduleIndex].read ||
          updatedControl[moduleIndex].write ||
          updatedControl[moduleIndex].create ||
          updatedControl[moduleIndex].delete
        ) {
          updatedControl[moduleIndex].no_access = false;
        }
      }

      return updatedControl;
    });
  };

  function handleSubmit() {
    const formData: any = {
      role_name: role,
      description: description,
      user_id: userInfo?.result?.user_id
        ? userInfo?.result?.user_id
        : userInfo?.user_id,
      access_control: accessControl,
    };
    console.log(formData);
    addRoleControl(formData).then((res: any) => {
      toast.success(res?.data?.result?.msg);
      console.log(res.data);
      setTimeout(() => {
        router(-1);
      }, 3000);
    });
  }

  function fetchAllModels() {
    const config: any = {};
    getAllModels(config).then((res: any) => {
      const initialAccessControl = res?.data?.result?.model_details.map(
        (model: any) => ({
          model_id: model?.model_id,
          module_name: model?.model_name,
          read: false,
          write: false,
          create: false,
          delete: false,
        })
      );
      setAccessControl(initialAccessControl);
    });
  }

  useEffect(() => {
    fetchAllModels();
  }, []);
  return (
    <div>
      <br />
      <br />
      <br />
      <Card className="border-0">
        <div className="position-absolute back-btn">
          <button
            className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
            onClick={() => router(-1)}
          >
            <BiArrowBack />
          </button>
        </div>
        <Card.Header className="bg-theme-danger text-white theme-font">
          <p className="m-0 p-2 fs-5">
            Step 01: <span className="text-white">Define Role</span>
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
                placeholder="Auditor"
              />
            </div>
            <div className="d-flex align-items-center py-2 w-100">
              <label className="w-25 fs-7" htmlFor="">
                Role *
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="w-75 form-control fs-7"
                rows={4}
                cols={50}
                placeholder="Has Access to All Things"
              ></textarea>
            </div>
          </form>
          <br />
          <br />
        </Card.Body>
      </Card>
      <Card className="border-0">
        <Card.Header className="bg-theme-danger text-white theme-font">
          <p className="m-0 p-2 fs-5">
            Step 02: <span className="text-white">Select Control</span>
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
                  <p className="py-2 m-0 fs-13 text-uppercase">Module Name</p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">Full Control</p>
                </th>
                {/* <th><p className='py-2 m-0 fs-13 text-uppercase'>Write</p></th>
                <th><p className='py-2 m-0 fs-13 text-uppercase'>Read</p></th> */}
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">No Access</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {accessControl.map((module, index) => (
                <tr key={module.model_id}>
                  <td>
                    <h6 className="text-muted fs-7 m-0">
                      {module.module_name}
                    </h6>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check"
                      checked={module.write}
                      onChange={() => handleAccessControlChange(index, 'write')}
                    />
                  </td>
                  {/* <td>
                    <input
                      type="checkbox"
                      className="form-check"
                      checked={module.read}
                      onChange={() => handleAccessControlChange(index, 'read')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check"
                      checked={module.delete}
                      onChange={() =>
                        handleAccessControlChange(index, 'delete')
                      }
                    />
                  </td> */}
                  <td>
                    <input
                      type="checkbox"
                      className="form-check"
                      checked={!module.read && !module.write && !module.delete}
                      onChange={() => handleAccessControlChange(index, 'read')}
                    />
                  </td>
                </tr>
              ))}
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
              Add Role
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default AdminRoleForm;
