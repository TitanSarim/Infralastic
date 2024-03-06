import './device-card.scss';
import {Card} from "react-bootstrap";

interface DeviceProps {
  background: string;
  image: any;
  name: string
  value: number;
}

const DeviceCard = (props:DeviceProps) => {
  return(
    <>
      <Card className='device-bg border-0 shadow h-165'>
        <Card.Body>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className={props.background}>
              <img src={props.image} alt=""/>
            </div>
            <p className='theme-font m-0 text-center fs-7 mt-1'>{props.name}</p>
            <p className='theme-font m-0 text-center fs-7 mt-1'>{props.value}</p>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
export default DeviceCard;
