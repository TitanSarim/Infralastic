import './global-setting-table.scss';
import { Card, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import AdminUserTable from '../AdminUserTable';
import AdminRoleTable from '../AdminRoleTable';
import AdminUserForm from '../AdminUserForm';
import AdminRoleForm from '../AdminRoleForm';
import { BiArrowBack } from 'react-icons/bi';
import { LuSettings2 } from 'react-icons/lu';

const GlobalSettingTable = () => {
  const [user, setUser] = useState(true);
  const [role, setRole] = useState(false);
  const [search, setsearch] = useState('');

  const [userForm, setUserForm] = useState(false);
  const [roleForm, setRoleForm] = useState(false);
  const handleSearch = (event: any) => {
    setsearch(event.target.value);
  };
  return (
    <div>
      <Card>
        {user ? (
          <div className="position-absolute back-btn">
            <button
              className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
              onClick={() => setUserForm(false)}
            >
              <BiArrowBack />
            </button>
          </div>
        ) : role ? (
          <div className="position-absolute back-btn">
            <button
              className="bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle"
              onClick={() => setRoleForm(false)}
            >
              <BiArrowBack />
            </button>
          </div>
        ) : (
          <></>
        )}
        {userForm && (
          <>
            <AdminUserForm />
          </>
        )}
        {roleForm && (
          <>
            <AdminRoleForm />
          </>
        )}
        {!userForm && !roleForm && (
          <Card.Body>
            <div className="d-flex theme-font p-2">
              <div className="d-flex align-items-center">
                <span className="pe-3 cursor">
                  <h5
                    className={user ? 'theme-danger m-0' : 'm-0'}
                    onClick={() => {
                      setUser(true);
                      setRole(false);
                    }}
                  >
                    USER
                  </h5>
                </span>
                <span className="px-3 bs-1 cursor">
                  <h5
                    className={role ? 'theme-danger m-0' : 'm-0'}
                    onClick={() => {
                      setUser(false);
                      setRole(true);
                    }}
                  >
                    ROLE
                  </h5>
                </span>
              </div>
              <input
                type="text"
                className="form-control p-2 px-3 fs-7 mx-2"
                placeholder="Search"
                value={search}
                onChange={(event) => handleSearch(event)}
              />
              <Dropdown>
                <Dropdown.Toggle
                  className="bg-transparent border-0 p-0 me-2"
                  id="dropdown-basic"
                >
                  <button className="px-3 py-1 text-white border-0 bg-gray h-34 rounded mx-2">
                    <LuSettings2 size={20} />
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className="theme-font fs-7">
                    Request
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {user ? (
                <button
                  className="px-2 pe-3 text-white border-0 bg-theme-danger rounded d-flex h-34 align-items-center"
                  onClick={() => setUserForm(true)}
                >
                  <BsPlus size={20} className="me-2" />
                  Add&nbsp;New&nbsp;User
                </button>
              ) : role ? (
                <button
                  className="px-2 pe-3 text-white border-0 bg-theme-danger rounded d-flex h-34 align-items-center"
                  onClick={() => setRoleForm(true)}
                >
                  <BsPlus size={20} className="me-2" />
                  Add&nbsp;New&nbsp;Role
                </button>
              ) : (
                <></>
              )}
            </div>
            <hr className="mt-3 mb-0" />
            {user ? (
              <AdminUserTable search={search} />
            ) : role ? (
              <AdminRoleTable search={search} />
            ) : (
              <></>
            )}
          </Card.Body>
        )}
      </Card>
    </div>
  );
};
export default GlobalSettingTable;
