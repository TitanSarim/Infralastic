import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { HiChevronUpDown } from 'react-icons/hi2';
import fakeUsr from '../../../../../assets/Avatar.png';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { deleteRoleControl, getAllRoles } from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EditRoleModal from '../../../Modals/EditRoleModal';
type AdminRole = {
  search: any;
};
const AdminRoleTable = (props: AdminRole) => {
  const [roleData, setRoleData] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const fetchRoles = () => {
    const config = {};
    getAllRoles(config).then((res) => {
      setRoleData(res.data.result.role_details);
    });
  };

  const filteredData = roleData.filter(
    (item: any) =>
      (item.role_name &&
        item.role_name.toLowerCase().includes(props?.search.toLowerCase())) ||
      (item.creator_name &&
        item.creator_name
          .toLowerCase()
          .includes(props?.search.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(props?.search.toLowerCase()))
  );
  const removeRoles = (id: any) => {
    const formData = {
      role_id: id,
    };
    deleteRoleControl(formData).then((res) => {
      if (res?.data.error) {
        toast.error(res.data.error.message);
      }
      toast.success(res.data.result?.msg);
      fetchRoles();
    });
  };

  const handleEdit = (id: any) => {
    setEditId(id);
    setShow(!show);
  };

  useEffect(() => {
    fetchRoles();
  }, []);
  console.log('role', roleData);
  return (
    <div>
      <Table striped className="theme-font p-2" id="departmentTable">
        <thead className="p-3">
          <tr className="fs-7">
            <th>
              <p className="py-2 m-0 fs-13 text-uppercase">
                User ROLE
                <HiChevronUpDown size={18} className="ms-1" />
              </p>
            </th>
            <th>
              <p className="py-2 m-0 fs-13 text-uppercase">
                Description
                <HiChevronUpDown size={18} className="ms-1" />
              </p>
            </th>
            <th>
              <p className="py-2 m-0 fs-13 text-uppercase">
                Created By
                <HiChevronUpDown size={18} className="ms-1" />
              </p>
            </th>
            <th>
              <p className="py-2 m-0 fs-13 text-end">ACTION</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item: any) => (
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={fakeUsr}
                    alt=""
                    width="38"
                    height="38"
                    className="rounded"
                  />
                  <div className="d-flex flex-column">
                    <p className="m-0 ms-2 fs-7">{item.role_name}</p>
                  </div>
                </div>
              </td>
              <td>
                <h6 className="text-muted fs-7 m-0">{item.description}</h6>
              </td>
              <td>
                <h6 className="text-muted fs-7 m-0">{item.creater_name}</h6>
              </td>
              <td>
                <div className="d-flex justify-content-end align-items-center">
                  <DropdownButton
                    className="bg-transparent custom-btn"
                    id="dropdown-item-button"
                    title={<BiDotsVerticalRounded className="me-2" size={20} />}
                  >
                    <Dropdown.Item
                      onClick={() => handleEdit(item?.role_id)}
                      className="theme-font fs-7"
                      as="button"
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => removeRoles(item?.role_id)}
                      className="theme-font fs-7"
                      as="button"
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {show && (
        <EditRoleModal show={show} hide={() => setShow(false)} id={editId} />
      )}
    </div>
  );
};
export default AdminRoleTable;
