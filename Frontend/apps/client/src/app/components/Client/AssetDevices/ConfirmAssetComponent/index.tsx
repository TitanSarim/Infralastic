import './confirm-asset-component.scss';
import { Card, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { HiChevronUpDown } from 'react-icons/hi2';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  confirmAllAssets,
  confirmAsset,
  getUnconfirmedAssets,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ConfirmAssetComponent = () => {
  const router = useNavigate();
  const [assets, setAssets] = useState<any>([]);

  const fetchAllUnconfirmedAssets = () => {
    const formData: any = {
      page_no: 1,
      company_id: 1,
    };
    getUnconfirmedAssets(formData).then((res: any) => {
      setAssets(res.data.result.asset_details);
    });
  };

  function handleConfirm(assetId: any, employeeId: any, employee_name: any) {
    const formData: any = {
      asset_unique_id: assetId,
      employee_id: employeeId,
    };
    confirmAsset(formData).then((res: any) => {
      toast.success(res.data.result.msg);
      Swal.fire({
        icon: 'success',
        title: `Asset Confirmed to${employee_name}`,
        confirmButtonText: 'Back',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
  }

  function handleConfirmAll() {
    assets?.map((item: any) => {
      const formData = {
        asset_ids: [
          {
            asset_unique_id: item.asset_unique_id,
            employee_id: item.employee_id,
          },
        ],
      };
      confirmAllAssets(formData).then((res: any) => {
        toast.success(res.data.result.msg);
        fetchAllUnconfirmedAssets();
        setTimeout(() => {
          router('/all-assets');
        }, 3000);
      });
    });
  }

  useEffect(() => {
    fetchAllUnconfirmedAssets();
  }, []);
  return (
    <>
      <Card>
        <Card.Body>
          <div className="d-flex w-100 align-items-center">
            <h5 className="theme-font p-4 w-50">
              Assets Currently Checkout to This User
            </h5>
            <div className="d-flex justify-content-end align-items-center w-50 h-fit p-4">
              <button
                onClick={() => handleConfirmAll()}
                className="bg-theme-danger theme-font rounded px-3 py-1 border-0 text-white"
              >
                Confirm All
              </button>
            </div>
          </div>
          <hr className="m-0 mt-3" />
          <Table striped className="theme-font" id="departmentTable">
            <thead className="p-3">
              <tr className="fs-7">
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    ASSETS
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    ASSETS ID
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    serial Number
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    confirm dEVICE
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {assets?.map((asset: any) => (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={asset?.image_url}
                        alt=""
                        width="38"
                        height="38"
                        className="rounded"
                      />
                      <div className="d-flex flex-column">
                        <p className="m-0 ms-2 fs-7">{asset.asset_name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">
                      {asset?.asset_unique_id}
                    </h6>
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">
                      {asset.serial_number}
                    </h6>
                  </td>
                  <td>
                    <button
                      className="theme-danger bg-transparent rounded fs-7 p-2 theme-border-danger rounded theme-border-danger"
                      onClick={() =>
                        handleConfirm(
                          asset.asset_unique_id,
                          asset.employee_id,
                          asset.employee_name
                        )
                      }
                    >
                      Confirm Asset
                    </button>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end align-items-center">
                      <DropdownButton
                        className="bg-transparent custom-btn"
                        id="dropdown-item-button"
                        title={
                          <BiDotsVerticalRounded className="me-2" size={20} />
                        }
                      >
                        <Dropdown.Item className="theme-font fs-7" as="button">
                          Archive
                        </Dropdown.Item>
                        <Dropdown.Item className="theme-font fs-7" as="button">
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item className="theme-font fs-7" as="button">
                          Letigation Hold
                        </Dropdown.Item>
                        <Dropdown.Item className="theme-font fs-7" as="button">
                          Cyber Investigation
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <div className="d-flex w-100">
            <div className="w-100">
              <h6 className="fs-8 theme-font text-muted m-0">
                Showing 1 to 7 of 100 entries
              </h6>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <button className="px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover">
                Previous
              </button>
              <button className="px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover">
                1
              </button>
              <button className="px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover">
                2
              </button>
              <button className="px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover">
                3
              </button>
              <button className="px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover">
                4
              </button>
              <button className="px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover">
                5
              </button>
              <button className="px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover">
                Next
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default ConfirmAssetComponent;
