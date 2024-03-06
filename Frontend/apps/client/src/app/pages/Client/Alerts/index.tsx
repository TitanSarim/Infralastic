import './alert.scss';
import {Card, Dropdown, Form} from "react-bootstrap";
import AlertCardComponent from "../../../components/Client/Alert/AlertCardComponent";
import {LuSettings2} from "react-icons/lu";
import AlertFilterComponent from "../../../components/Client/Alert/AlertFilterComponent";


const Alerts = () => {
  return(
    <div>
      <br/>
      <br/>
      <Card className='border-0 shadow rounded-3'>
        <Card.Body>
          <div className="d-flex w-100 theme-font px-2">
            <div className="w-50 d-flex align-items-center">
              <h5 className='m-0'>Alerts</h5>
            </div>
            <div className="w-50 d-flex justify-content-end">
              <Dropdown>
                <Dropdown.Toggle
                  className='bg-transparent border-0 p-0 me-2'
                  id="dropdown-basic"
                  size='lg'
                >
                  <button
                    className='px-3 py-1 text-white border-0 bg-gray h-34 rounded mx-2'
                  >
                    <LuSettings2 size={20} />
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu id='alertDropdown'>
                  <div className='d-block'>
                    <p className='float-start theme-font theme-danger m-0'>Filter</p>
                    <button className='float-end theme-font bg-transparent border-0'>Clear</button>
                  </div>
                  <br/>
                  <br/>
                  <AlertFilterComponent />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <br/>
          <div className='px-2'>
            <AlertCardComponent variant='danger' text='Jhone tries to access an unauthorized website or downloads a suspicious file,' />
            <AlertCardComponent variant='warning' text='Remo reports that their laptop is missing' />
            <AlertCardComponent variant='low' text='Alex tries to share confidential information with unauthorized parties' />
            <AlertCardComponent variant='danger' text='Jhone tries to access an unauthorized website or downloads a suspicious file,' />
            <AlertCardComponent variant='warning' text='Remo reports that their laptop is missing' />
            <AlertCardComponent variant='low' text='Alex tries to share confidential information with unauthorized parties' />
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
    </div>
  )
}
export default Alerts;
