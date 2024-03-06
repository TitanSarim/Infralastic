import {Card, Dropdown, DropdownButton, Table} from "react-bootstrap";
import {HiChevronUpDown} from "react-icons/hi2";
import {BiDotsVerticalRounded} from "react-icons/bi";
import {useEffect, useState} from "react";
import { getChocsSoftware } from "@infralastic/global-state";

const SoftwareInventory = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<any>(0)

  async function fetchAllSoftware() {
    const formData: any = { page }

    const res = await getChocsSoftware(formData);
    setData(res?.data?.data)
  }

  useEffect(() => {
    fetchAllSoftware()
  }, [])

  return(
    <>
      <br/>
      <Card className='border-0'>
        <Card.Body>
          <div className="p-2">
            <div className="w-100 d-flex">
              <div className="w-50">
                <h4 className='theme-font theme-danger text-uppercase'>Software Inventory</h4>
              </div>
              <div className="w-50 d-flex justify-content-end">
                <input type="text" className='form-control w-50' />
              </div>
            </div>
            <br/>
            <Table striped className='theme-font' id='departmentTable'>
              <thead className='p-3'>
              <tr className='fs-7'>
                <th><p className='py-2 m-0 fs-13 text-uppercase'>ID<HiChevronUpDown size={18} className='ms-1' /></p></th>
                <th><p className='py-2 m-0 fs-13 text-uppercase'>Name<HiChevronUpDown size={18} className='ms-1' /></p></th>
                <th><p className='py-2 m-0 fs-13 text-end'>ACTION</p></th>
              </tr>
              </thead>
              {data?.map((index: any, res: any) => (
                <tbody>
                <tr>
                  <td>
                    <h6 className='text-muted fs-7 m-0'>{index}</h6>
                  </td>
                  <td>
                    <h6 className='text-muted fs-7 m-0'>{res?.name}</h6>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end align-items-center'>
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
                </tbody>
              ))}
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
export default SoftwareInventory;
