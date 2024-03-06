import './reports-component.scss'
import ReportChart from "../../../Charts/ReportChart";
import { Dropdown, Form } from 'react-bootstrap';
import {useState} from "react";

const ReportsComponent = () => {
  const [filter, setFilter] = useState<any>('')
  return(
      <div>
          <div className="shadow bg-white rounded p-3">
            <div className="w-100">
              <div className="d-flex w-100">
                <div className="d-flex flex-column w-50">
                  <h5 className='theme-font mb-1 w-50'>Reports for all things</h5>
                  <p className='fs-7 fw-light text-muted w-50'>Monthly Overview</p>
                </div>
                <div className='d-flex justify-content-end w-50'>
                  <div className="">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e: any) => setFilter(e.target.value)}
                    >
                      <option value="">Select Filter</option>
                      <option value="0">Assets</option>
                      <option value="1">Department</option>
                      <option value="2">Employee</option>
                    </Form.Select>
                  </div>
                </div>
              </div>
              <div className='chart-height'>
              <ReportChart filter={filter} />
            </div>
            </div>
          </div>
      </div>
  )
}
export default ReportsComponent;
