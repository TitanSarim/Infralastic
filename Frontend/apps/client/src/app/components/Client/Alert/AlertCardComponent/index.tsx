import './alert-card-component.scss';
import {Card, Dropdown, DropdownButton} from "react-bootstrap";
import {BiDotsVerticalRounded} from "react-icons/bi";
import {PiHandPalmThin} from "react-icons/pi";
import {IoTrashBinOutline} from "react-icons/io5";
import {BsCheck2} from "react-icons/bs";

interface AlertProps {
  variant: any;
  text: any;
}
const AlertCardComponent = (props: AlertProps) => {
  return(
    <>
      <Card className={
        props.variant === 'danger' ?
          'alert-danger my-2' :
        props.variant === 'warning' ?
          'alert-warning my-2' :
        props.variant === 'low' ?
          'alert-low my-2' :
        ''
      }>
        <Card.Body className='py-2'>
          <div className='d-flex w-100'>
            <div className='w-75 d-flex align-items-center'>
              <p className='theme-font my-1'>{props.text}</p>
            </div>
            <div className='w-25 d-flex justify-content-end'>
              <DropdownButton
                className="bg-transparent custom-btn"
                id="dropdown-item-button"
                title={<BiDotsVerticalRounded className='me-2' size={20} />}
              >
                <Dropdown.Item className='fs-7' as="button"><IoTrashBinOutline className='me-2' />Delete</Dropdown.Item>
                <Dropdown.Item className='fs-7' as="button"><PiHandPalmThin className='me-2' />Snooze</Dropdown.Item>
                <Dropdown.Item className='fs-7' as="button"><BsCheck2 className='me-2' />Resolve</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
export default AlertCardComponent;
