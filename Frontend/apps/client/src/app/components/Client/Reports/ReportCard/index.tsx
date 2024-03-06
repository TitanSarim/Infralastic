import './report-card.scss';
import {Card} from "react-bootstrap";
import {useState} from "react";

const ReportCard = (props: any) => {
  const [clicked, setClicked] = useState(false)
  return(
    <div className='theme-font'>
      <Card className={'mb-3 rounded-0 border-0 p-2 report-card-hover shadow theme-danger report-card-hover'}>
        <Card.Body>
          <div className='d-flex justify-content-center mb-2'>
            <i>{props.icon}</i>
          </div>
          <h4 className='text-center m-0 fs-6'>{props.name}</h4>
        </Card.Body>
      </Card>
    </div>
  )
}
export default ReportCard;
