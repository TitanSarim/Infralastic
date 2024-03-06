import { Card, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getAllRoles, getUserById, updateAdminUser} from "@infralastic/global-state";
import {toast} from "react-toastify";

interface UserModal {
  show: any;
  hide: any;
  id: any;
}
const EditUserModal = (props:UserModal) => {
  const [roles, setRoles] = useState<any>('');
  const [roleData, setRoleData] = useState<any>([]);
  const [userName, setUserName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [phone, setPhone] = useState<any>('');
  const [password, setPassword] = useState<any>('');

  function fetchUserById(){
    const formData = {
      user_id: props.id
    }
    getUserById(formData).then((res: any) => {
      setUserName(res.data.result.user_name)
      setEmail(res.data.result.email)
      setPhone(res.data.result.phone)
    })
  }


  const fetchRoles = () => {
    const config = {}
    getAllRoles(config).then((res) => {
      setRoleData(res.data.result.role_details)
    })
  }
  function handleSubmit() {
    const formData = {
      name: userName,
      login: email,
      password: password,
      phone: phone,
      role_id: JSON.parse(roles),
      user_id: props.id
    }
    updateAdminUser(formData).then((res: any) => {
      toast.success(res.data.result.msg)
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    })
  }
  useEffect(() => {
    fetchRoles()
    if (props.id !== null) {
      fetchUserById()
    }
  }, [])
  return(
    <>
      <Modal show={props.show} onHide={props.hide} size='xl'>
        <Modal.Body>
          <div>
            <Card className='border-0'>
              <Card.Header className='bg-dark text-white theme-font'>
                <p className='m-0 p-2 fs-5'>Step 01: <span className='theme-danger'>Add User</span></p>
              </Card.Header>
              <Card.Body>
                <form action="" className='p-2'>
                  <div className='d-flex align-items-center py-2 w-100'>
                    <label className='w-25 fs-7' htmlFor="">User Name *</label>
                    <input
                      onChange={(e) => setUserName(e.target.value)}
                      className='w-75 form-control fs-7'
                      type="text"
                      value={userName}
                      placeholder='Enter Username'
                    />
                  </div>
                  <div className='d-flex align-items-center py-2 w-100'>
                    <label className='w-25 fs-7' htmlFor="">Role *</label>
                    <select
                      className='w-75 form-control fs-7'
                      value={roles}
                      onChange={(e) => setRoles(e.target.value)}
                    >
                      <option value="">none</option>
                      {roleData?.map((item: any) => (
                        <option value={item?.role_id}>{item?.role_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className='d-flex align-items-center py-2 w-100'>
                    <label className='w-25 fs-7' htmlFor="">Email *</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-75 form-control fs-7'
                      type="text"
                      value={email}
                      placeholder='Enter Email'
                    />
                  </div>
                  <div className='d-flex align-items-center py-2 w-100'>
                    <label className='w-25 fs-7' htmlFor="">Password *</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className='w-75 form-control fs-7'
                      type="password"
                      value={password}
                      placeholder='Enter Password'
                    />
                  </div>
                  <div className='d-flex align-items-center py-2 w-100'>
                    <label className='w-25 fs-7' htmlFor="">Phone *</label>
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      className='w-75 form-control fs-7'
                      type="text"
                      value={phone}
                      placeholder='Enter Phone'
                    />
                  </div>
                </form>
                <br/>
                <br/>
                <br/>
              </Card.Body>
            </Card>
            <Card className='border-0'>
              <Card.Header className='bg-dark text-white theme-font'>
                <p className='m-0 p-2 fs-5'>Step 02: <span className='theme-danger'>Define Scope</span></p>
              </Card.Header>
              <Card.Body>
                <form action="" className='d-flex w-100'>
                  <label className='w-25' htmlFor="">Devices to be managed</label>
                  <div className="d-flex align-items-center">
                    <div className='px-4'>
                      <input type="radio" name="role" />
                      <label className='px-1' htmlFor="html">All Devices</label>
                    </div>
                    <div className='px-4'>
                      <input type="radio" name="role" />
                      <label className='px-1' htmlFor="css">Selected Group(s)</label>
                    </div>
                  </div>
                </form>
                <br/>
                <br/>
                <div className="d-flex justify-content-end w-100">
                  <button
                    className='border-0 bg-gray text-white px-3 py-2 rounded mx-2'
                    onClick={props.hide}
                  >Cancel</button>
                  <button
                    className='border-0 bg-theme-danger text-white px-3 py-2 rounded mx-2'
                    onClick={() => handleSubmit()}
                    type='button'
                  >Update User</button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default EditUserModal;
