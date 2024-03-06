import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import './department-table-component.scss';
import laptopIcon from '../../../../../assets/laptop.png';
import mouseIcon from '../../../../../assets/mouse.png';
import computerIcon from '../../../../../assets/computer.png';
import { AiOutlineEye } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiChevronUpDown } from 'react-icons/hi2';
import {
  fetchAllDepartment,
  useGlobalDispatch,
} from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { deleteDepartment } from '@infralastic/global-state';
import { toast } from 'react-toastify';

interface filterProps {
  searchFilter: any;
  companyFilter: any;
}

const DepartmentTableComponent = (props: filterProps) => {
  const dispatch = useGlobalDispatch();
  const router = useNavigate();
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState<any>([]);
  const [originalData, setOriginalData] = useState<any>([]);
  const allCategories = ['Laptop', 'Mouse', 'Computer'];

  const getDepartment = () => {
    setLoading(true);
    const config: any = {};
    try {
      dispatch(fetchAllDepartment(config)).then(async (res: any) => {
        const departments = res?.payload?.departments_details || [];
        setOriginalData(departments);
        setDepartment(departments);
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const delDepartment = async (id: any) => {
    const formData: any = {
      department_id: id,
    };
    await deleteDepartment(formData)
      .then((res: any) => {
        toast.info(res.data.result.msg);
      })
      .finally(() => {
        getDepartment();
      });
  };
  const editDepartment = async (id: any) => {
    router({
      pathname: '/add-department',
      search: `?${createSearchParams({
        department_id: id,
      })}`,
    });
  };

  const getCategoryCount = (department: any, category: string) => {
    return department.asset_categorys.filter(
      (cat: any) => cat.category_name === category
    ).length;
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Laptop':
        return laptopIcon;
      case 'Mouse':
        return mouseIcon;
      case 'Computer':
        return computerIcon;
      default:
        return;
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);
  console.log('department', department);
  const applyFilters = () => {
    let filteredData = [...originalData];
    if (props.searchFilter !== '') {
      const searchLetter = props.searchFilter.toLowerCase();

      filteredData = filteredData?.filter((res: any) => {
        const departmentName = res.department_name.toLowerCase();
        return departmentName.includes(searchLetter);
      });
    }
    if (props.companyFilter !== '') {
      filteredData = filteredData?.filter(
        (res: any) => res.company_name === props.companyFilter
      );
    }
    setDepartment(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [props.searchFilter, props.companyFilter, originalData]);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped className="theme-font" id="departmentTable">
          <thead className="p-3">
            <tr className="fs-7">
              <th>
                <p className="p-2 m-0 fs-13">
                  DEPARTMENT NAME
                  {/* <HiChevronUpDown size={18} className="ms-1" /> */}
                </p>
              </th>
              <th>
                <p className="p-2 m-0 fs-13 text-center">
                  DEPARTMENT HEAD
                  {/* <HiChevronUpDown size={18} className="ms-1" /> */}
                </p>
              </th>
              <th>
                <p className="p-2 m-0 fs-13 text-center">
                  WORKING ASSETS
                  {/* <HiChevronUpDown size={18} className="ms-1" /> */}
                </p>
              </th>
              <th>
                <p className="p-2 m-0 fs-13 text-cnter">
                  TOTAL ASSETS
                  {/* <HiChevronUpDown size={18} className="ms-1" /> */}
                </p>
              </th>
              <th>
                <p className="p-2 m-0 fs-13 text-end">ACTION</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {department?.map((item: any) => (
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image_url}
                      alt=""
                      width="38"
                      height="38"
                      className="rounded"
                    />
                    <p className="m-0 ms-2 fs-7 text-center">
                      {item.department_name}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    {item?.manager_name ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          src={item?.manager_image}
                          alt=""
                          width="34"
                          height="34"
                          className="rounded-circle"
                        />
                        <p className="m-0 ms-2 fs-7 text-muted">
                          {item.manager_name}
                        </p>
                      </div>
                    ) : (
                      <button className="bg-danger fs-7 text-white border-0 rounded px-2">
                        un-assigned
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center h-100">
                    <div className="d-flex align-items-center">
                      {allCategories.map((category: string) => {
                        const categoryCount = getCategoryCount(item, category);
                        if (categoryCount > 0 || item.department_id !== 0) {
                          return (
                            <div
                              key={category}
                              className="d-flex align-items-center px-3 br-1"
                            >
                              <div className="position-absolute mb-3 me-3">
                                <span className="rounded-circle px-1 fs-13 text-white bg-theme-danger">
                                  {categoryCount}
                                </span>
                              </div>
                              <img
                                src={getCategoryIcon(category)}
                                height="30"
                                width="30"
                                alt=""
                              />
                              <p className="m-0 ms-1 fs-7 text-muted">
                                {category}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </td>
                <td className="text-center">{item?.asset_categorys.length}</td>
                <td>
                  <div className="d-flex justify-content-end align-items-center">
                    <button
                      className="bg-transparent border-0"
                      onClick={() =>
                        router({
                          pathname: '/department-member',
                          search: `?${createSearchParams({
                            department_id: item.department_id,
                          })}`,
                        })
                      }
                    >
                      <AiOutlineEye className="me-2 mt-1" size={20} />
                    </button>
                    <DropdownButton
                      className="bg-transparent custom-btn"
                      id="dropdown-item-button"
                      title={
                        <BiDotsVerticalRounded className="me-2" size={20} />
                      }
                    >
                      <Dropdown.Item
                        onClick={() => editDepartment(item.department_id)}
                        className="theme-font fs-7"
                        as="button"
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => delDepartment(item.department_id)}
                        className="theme-font fs-7"
                        as="button"
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item className="theme-font fs-7" as="button">
                        De Active
                      </Dropdown.Item>
                      <Dropdown.Item className="theme-font fs-7" as="button">
                        Active
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default DepartmentTableComponent;
