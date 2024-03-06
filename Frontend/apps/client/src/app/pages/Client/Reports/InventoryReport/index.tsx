import {Button, Card, Dropdown, DropdownButton, Form, InputGroup, Table} from "react-bootstrap";
import {AiOutlineDownload} from "react-icons/ai";
import {HiChevronUpDown} from "react-icons/hi2";
import {BiDotsVerticalRounded, BiArrowBack} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
  fetchAllDepartment,
  fetchAssetReportByCompany,
  getAllAssets, getLocation,
  useGlobalDispatch
} from "@infralastic/global-state";
import {saveAs} from "file-saver";
import {HiFilter} from "react-icons/hi";
import {LuSettings2} from "react-icons/lu";
import {BsPlus} from "react-icons/bs";

const InventoryReport = () => {
  const router = useNavigate();
  const dispatch = useGlobalDispatch();
  const [assets, setAssets] = useState<any>([]);
  const [originalData, setOriginalData] = useState<any>([])
  const [department, setDepartment] = useState<any>([]);
  const [location, setLocation] = useState<any>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  function fetchAssetInfo() {
    const formData = {
      company_id: 1,
      page_no: 1
    };
    getAllAssets(formData).then((res: any) => {
      setOriginalData(res?.data?.result?.asset_details);
      setAssets(res?.data?.result?.asset_details);
    });
  }
  const getDepartment = () => {
    const config: any = {}
    try {
      dispatch(fetchAllDepartment(config)).then(async (res: any) => {
        setDepartment(res.payload.departments_details)
      });
    } catch (err: any) {
      console.error(err);
    }
  }
  const fetchLocation = () => {
    const config = {}
    getLocation(config).then((res: any) => {
      setLocation(res.data.result.location_details)
    })
  }

  useEffect(() => {
    fetchAssetInfo();
    getDepartment();
    fetchLocation()
  }, []);

  useEffect(() => {
    applyFilters();
  }, [locationFilter, departmentFilter]);

  function downloadCSV() {
    const csvData = assets.map((item: any) =>
      Object.values(item).join(",")
    );
    const csvContent = csvData.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "activity_report.csv");
  }
  function downloadSingleCSV(id: any) {
    // Convert assetInfo to CSV format
    const csvData = assets.filter((res: any) => res.asset_unique_id === id).map((item: any) =>
      Object.values(item).join(",")
    )
    const csvContent = csvData.join("\n");

    // Create a Blob object and trigger file download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${id}.csv`);
  }

  const calculateTotalCost = (data: any) => {
    let totalCost = 0;
    data?.forEach((item: any) => {
      totalCost += parseFloat(item.cost);
    });
    return totalCost.toFixed(2);
  };

  const applyFilters = () => {
    setAssets((prevAssets: any) => {
      let filteredData = [...originalData];

      if (locationFilter !== '') {
        filteredData = filteredData.filter((res) => res.location_name === locationFilter);
      }

      if (departmentFilter !== '') {
        filteredData = filteredData.filter((res) => res.department_name === departmentFilter && res.employee_id);
      }

      return filteredData;
    });
  };

  const filterLocation = (value: any) => {
    if (value === '') {
      setAssets(originalData)
    }
    setLocationFilter(value);
    applyFilters();
  };

  const filterDepartment = (value: any) => {
    if (value === '') {
      setAssets(originalData)
    }
    setDepartmentFilter(value);
    applyFilters();
  };
  return(
    <>
      <br/>
      <Card>
        <div className='position-absolute back-btn'>
          <button
            className='bg-theme-danger border-0 text-white d-flex align-items-center p-2 rounded-circle'
            onClick={() => router(-1)}
          >
            <BiArrowBack />
          </button>
        </div>
        <Card.Body>
          <div className='d-flex w-100 p-2'>
            <div className='d-flex align-items-center w-25'>
              <h5 className='m-0 theme-font'>Inventory Report</h5>
              <h5 className="ms-5 mb-0 theme-font">Total: <span className='theme-danger'>${calculateTotalCost(assets)}</span></h5>
            </div>
            <div className="w-75 d-flex justify-content-end">
              <Form.Group className="py-1 mx-2" controlId="location">
                <InputGroup className="py-1 w-50 float-end">
                  <InputGroup.Text id="basic-addon1" className='bg-transparent px-2'><HiFilter className='me-1 theme-danger'/></InputGroup.Text>
                  <Form.Select
                    className='py-1 ps-0 fs-7 theme-font text-muted border-start-0 '
                    aria-label="Default select example"
                    required={true}
                    value={locationFilter}
                    onChange={(e: any) => filterLocation(e.target.value)}
                  >
                    <option onClick={() => setAssets(originalData)} value=''>Select Location</option>
                    {location?.map((item: any) => (
                      <option value={item.location_name} className='theme-font fs-7'>{item?.location_name}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group className="py-1 mx-2" controlId="department">
                <InputGroup className="py-1">
                  <InputGroup.Text id="basic-addon3" className='bg-transparent px-2'><HiFilter className='me-1 theme-danger'/></InputGroup.Text>
                  <Form.Select
                    className='py-1 ps-0 fs-7 theme-font text-muted border-start-0 '
                    aria-label="Default select example"
                    required={true}
                    value={departmentFilter}
                    onChange={(e: any) => filterDepartment(e.target.value)}
                  >
                    <option onClick={() => setAssets(originalData)} value=''>Select Department</option>
                    {department?.map((item: any) => (
                      <option value={item.department_name} className='theme-font fs-7'>{item.department_name}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <div>
                <input placeholder='Search' type="search" className='form-control'/>
              </div>
              <div className='mx-2'>
                <Button
                  variant={"secondary"}
                  type='button'
                  onClick={downloadCSV}
                >
                  <AiOutlineDownload size={20} />
                </Button>
              </div>
            </div>
          </div>
          <hr className='m-0 mt-3'/>
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
                  Location
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
            {assets?.map((item: any) => (
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
                  <h6 className="text-muted fs-7 m-0">{item?.asset_tracking}</h6>
                </td>
                <td>
                  <h6 className="text-muted fs-7 m-0">
                    {item?.serial_number}
                  </h6>
                </td>
                <td>
                  <h6 className="text-muted fs-7 m-0">
                    {item?.location_name}
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
          <hr/>
          <div className="d-flex w-100">
            <div className='w-100'>
              <h6 className='fs-8 theme-font text-muted m-0'>Showing 1 to 7 of 100 entries</h6>
            </div>
            <div className='w-100 d-flex justify-content-end'>
              <button className='px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover'>Previous</button>
              <button className='px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover'>1</button>
              <button className='px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover'>2</button>
              <button className='px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover'>3</button>
              <button className='px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover'>4</button>
              <button className='px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover'>5</button>
              <button className='px-3 py-1 text-white border-0 bg-gray fs-7 h-34 rounded mx-1 pagination-hover'>Next</button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
export default InventoryReport
