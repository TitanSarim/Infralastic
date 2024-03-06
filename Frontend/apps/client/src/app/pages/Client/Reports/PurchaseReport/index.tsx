import {Button, Card, Dropdown, DropdownButton, Table} from "react-bootstrap";
import {AiOutlineDownload} from "react-icons/ai";
import {HiChevronUpDown} from "react-icons/hi2";
import {BiArrowBack, BiDotsVerticalRounded} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {fetchAllPurchaseReport, useGlobalDispatch, useGlobalSelector} from "@infralastic/global-state";
import {useEffect, useState} from "react";
import {saveAs} from "file-saver";

const PurchaseReport = () => {
  const router = useNavigate();
  const dispatch = useGlobalDispatch();
  const { userInfo } = useGlobalSelector((state) => state.user);
  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);
  const [data, setData] = useState<any>([])


  const fetchPurchase = () => {
    const formData = {
      company_id: 1,
      date_from: from,
      date_to: to
    }
      dispatch(fetchAllPurchaseReport(formData)).then((res: any) => {
        setData(res?.payload?.sale_details)
      })
  }
  function downloadCSV() {
    const csvData = data.map((item: any) =>
      Object.values(item).join(",")
    );
    const csvContent = csvData.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "activity_report.csv");
  }
  function downloadSingleCSV(id: any) {
    // Convert assetInfo to CSV format
    const csvData = data.filter((res: any) => res.product_id === id).map((item: any) =>
      Object.values(item).join(",")
    )
    const csvContent = csvData.join("\n");

    // Create a Blob object and trigger file download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${id}.csv`);
  }

  useEffect(() => {
    fetchPurchase()
  }, [from, to])
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
        <Card.Body className='overflow-hidden'>
          <div className='d-flex w-100 p-2'>
            <div className='d-flex align-items-center w-25'>
              <h5 className='m-0 theme-font'>Purchase Report</h5>
            </div>
            <div className="w-75 d-flex justify-content-end">
              <div className='mx-2 d-flex align-items-center'>
                <label htmlFor="" className='mx-1'>From:</label>
                <input
                  type="date"
                  className='form-control'
                  onChange={(e: any) => setFrom(e.target.value)}
                />
              </div>
              <div className='mx-2 d-flex align-items-center'>
                <label htmlFor="" className='mx-1'>To:</label>
                <input
                  type="date"
                  className='form-control'
                  onChange={(e: any) => setTo(e.target.value)}
                />
              </div>
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
          <div className="overflow-auto">
            <Table striped className='theme-font' id='departmentTable'>
              <thead className='p-3'>
              <tr className='fs-7'>
                <th><p className='py-2 m-0 fs-13 d-flex text-uppercase'>Product Name<HiChevronUpDown size={18} className='ms-1' /></p></th>
                <th><p className='py-2 m-0 fs-13 d-flex text-uppercase'>Name<HiChevronUpDown size={18} className='ms-1' /></p></th>
                <th><p className='py-2 m-0 fs-13 d-flex text-uppercase'>Email<HiChevronUpDown size={18} className='ms-1' /></p></th>
                <th><p className='py-2 m-0 fs-13 d-flex text-uppercase'>Order No<HiChevronUpDown size={18} className='ms-1' /></p></th>
                <th><p className='py-2 m-0 fs-13 d-flex text-uppercase'>Quantity<HiChevronUpDown size={18} className='ms-1' /></p></th>
                <th><p className='py-2 m-0 fs-13 d-flex text-uppercase'>Price<HiChevronUpDown size={18} className='ms-1' /></p></th>
              </tr>
              </thead>
              <tbody>
              {data?.map((item: any) => (
                <tr>
                  <td>
                    <h6 className='text-muted fs-7 m-0'>{item?.product_name}</h6>
                  </td>
                  <td>
                    <h6 className='text-muted fs-7 m-0'>{item?.username}</h6>
                  </td>
                  <td>
                    <h6 className='text-muted fs-7 m-0'>{item?.email}</h6>
                  </td>
                  <td>
                    <h6 className='text-muted fs-7 m-0'>{item?.order_no}</h6>
                  </td>
                  <td>
                    <h6 className='text-muted fs-7 m-0'>{item?.product_qty}</h6>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end align-items-center'>
                      <button
                        className='bg-transparent border-0'
                        type='button'
                        onClick={() => downloadSingleCSV(item?.product_id)}
                      >
                        <AiOutlineDownload className='me-2 mt-1' size={20} />
                      </button>
                      <DropdownButton
                        className="bg-transparent custom-btn"
                        id="dropdown-item-button"
                        title={<BiDotsVerticalRounded className='me-2' size={20} />}
                      >
                        <Dropdown.Item className='theme-font fs-7' as="button">Archive</Dropdown.Item>
                        <Dropdown.Item className='theme-font fs-7' as="button">Letigation Hold</Dropdown.Item>
                        <Dropdown.Item className='theme-font fs-7' as="button">Cyber Investigation</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </Table>
          </div>
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
export default PurchaseReport;
