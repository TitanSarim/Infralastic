import React, { useEffect, useState } from 'react';
import { Card, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { HiChevronUpDown } from 'react-icons/hi2';
import { AiOutlineDownload } from 'react-icons/ai';
import { BiDotsHorizontalRounded, BiDotsVerticalRounded } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { Pagination, Box } from '@mui/material';
import {
  fetchAssetReportByCompany,
  getAllAssets,
  useGlobalDispatch,
} from '@infralastic/global-state';

const ActivityReportComponent = () => {
  const dispatch = useGlobalDispatch();
  const router = useNavigate();
  const [assetInfo, setAssetInfo] = useState([]);
  const [count, setcount] = useState<any>('');
  const [page, setpage] = useState<any>(1);
  const [lastpage, setlastpage] = useState<any>();
  // function fetchAssetInfo() {
  //   const formData = {
  //     company_id: 1,
  //     page_no: 1
  //   };
  //   dispatch(fetchAssetReportByCompany(formData)).then((res: any) => {
  //     setAssetInfo(res?.payload?.asset_details);
  //   });
  // }
  function fetchAssetInfo() {
    const formData = {
      company_id: 1,
      page_no: page,
    };
    getAllAssets(formData).then((res: any) => {
      console.log(res, 'res');
      setAssetInfo(res?.data?.result?.asset_details);
      setcount(res.data.result.asset_lenght);
    });
  }
  console.log('gtyfuygy', assetInfo);
  useEffect(() => {
    fetchAssetInfo();
    setlastpage(Math.ceil(count / 10));
  }, [page]);

  function downloadCSV() {
    const csvData = assetInfo.map((item) => Object.values(item).join(','));
    const csvContent = csvData.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'activity_report.csv');
  }
  function downloadSingleCSV(id: any) {
    // Convert assetInfo to CSV format
    const csvData = assetInfo
      .filter((res: any) => res.asset_unique_id === id)
      .map((item) => Object.values(item).join(','));
    const csvContent = csvData.join('\n');

    // Create a Blob object and trigger file download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${id}.csv`);
  }

  const calculateTotalCost = (data: any) => {
    let totalCost = 0;
    data?.forEach((item: any) => {
      totalCost += parseFloat(item.cost);
    });
    return totalCost.toFixed(2);
  };
  //handler to change the page, this is passed as a props to CustomPagination.
  const pageChangeHandler = (event: any, pageNumber: any) => {
    // fetchAssetInfo();
    // fetchAssetInfo();
    // console.log('page', pageNumber);
    // dispatch(fetchCustomers(limit * (pageNumber - 1)));
    setpage(pageNumber);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="d-flex w-100 p-2">
            <div className="d-flex align-items-center w-25">
              <h5 className="m-0 theme-font">Activity Report</h5>
              <h5 className="ms-5 mb-0 theme-font">
                Total:{' '}
                <span className="theme-danger">
                  ${calculateTotalCost(assetInfo)}
                </span>
              </h5>
            </div>
            <div className="w-75 d-flex justify-content-end">
              <div>
                <input
                  placeholder="Search"
                  type="search"
                  className="form-control"
                />
              </div>
              <button
                className="bg-transparent border-0 mx-3 theme-font"
                onClick={downloadCSV}
              >
                Download Report
              </button>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
                    <BiDotsHorizontalRounded size={20} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="theme-font">
                    <Dropdown.Item
                      className="py-2"
                      onClick={() => router('/inventory-reports')}
                    >
                      Inventory Report
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="py-2"
                      onClick={() => router('/purchase-reports')}
                    >
                      Purchase Report
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="py-2"
                      onClick={() => router('/employee-reports')}
                    >
                      Employee Report
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="py-2"
                      onClick={() => router('/costing-reports')}
                    >
                      Costing Report
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="py-2"
                      onClick={() => router('/license-reports')}
                    >
                      License Report
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="py-2"
                      onClick={() => router('/audit-reports')}
                    >
                      Audit Log Report
                    </Dropdown.Item>
                    <Dropdown.Item className="py-2">
                      Executive Reports
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="py-2"
                      onClick={() => router('/accessory-reports')}
                    >
                      Accessory Reports
                    </Dropdown.Item>
                    <Dropdown.Item className="py-2">
                      App Installation Summary
                    </Dropdown.Item>
                    <Dropdown.Item className="py-2">
                      Devices by Model
                    </Dropdown.Item>
                    <Dropdown.Item className="py-2">
                      Location Details & History
                    </Dropdown.Item>
                    <Dropdown.Item className="py-2">
                      Geo Location Report
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <hr className="m-0 mt-3" />
          <Table striped className="theme-font" id="departmentTable">
            <thead className="p-3">
              <tr className="fs-7">
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    Item
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    Date
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    ACTION
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    Serial Number
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    Site
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    Department
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13 text-uppercase">
                    Assigned to
                    <HiChevronUpDown size={18} className="ms-1" />
                  </p>
                </th>
                <th>
                  <p className="py-2 m-0 fs-13">Cost</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {assetInfo?.map((item: any) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item?.image_url}
                        alt=""
                        width="38"
                        height="38"
                        className="rounded"
                      />
                      <div className="d-flex flex-column">
                        <p className="m-0 ms-2 fs-7">{item?.asset_name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">{item?.date_added}</h6>
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">
                      {item?.asset_tracking}
                    </h6>
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">
                      {item?.serial_number}
                    </h6>
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">
                      {item?.company_name}
                    </h6>
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">
                      {item?.department_name}
                    </h6>
                  </td>
                  <td>
                    {item?.employee_id ? (
                      <div className="d-flex align-items-center">
                        <img
                          src={item?.employee_image}
                          alt=""
                          width="32"
                          height="32"
                          className="rounded-circle"
                        />
                        <p className="m-0 ms-2 fs-7 text-muted">
                          {item?.employee_name}
                        </p>
                      </div>
                    ) : (
                      <button className="bg-danger fs-7 text-white border-0 rounded px-2">
                        un-assigned
                      </button>
                    )}
                  </td>
                  <td>
                    <h6 className="text-muted fs-7 m-0">{item?.cost}$</h6>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end align-items-center">
                      <button
                        className="bg-transparent border-0"
                        onClick={() => downloadSingleCSV(item?.asset_unique_id)}
                      >
                        <AiOutlineDownload className="me-2 mt-1" size={20} />
                      </button>
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
            {/* <div className="w-50">
              <h6 className="fs-8 theme-font text-muted m-0">
                Showing {page} to of {count} entries
              </h6>
            </div> */}
            {/* <div className="w-100 d-flex justify-content-end">
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
            </div> */}
            <div className="w-100 d-flex justify-content-end">
              <Pagination
                size="large"
                siblingCount={1}
                count={Math.ceil(count / 10)}
                page={page}
                onChange={pageChangeHandler}
                shape="rounded"
                variant="outlined"
                color="secondary"
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ActivityReportComponent;
