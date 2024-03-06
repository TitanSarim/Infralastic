import {Card} from "react-bootstrap";

const SoftwareComponent = ({item}: {item: any}) => {
  return(
    <Card>
      <Card.Body>
        <div className="p-2">
          <h5 className='theme-font mb-4'>Operating System</h5>
          <hr/>
          <div className="d-flex align-items-center">
            <h6 className='theme-font w-25'>OS Edition:</h6>
            <p className='theme-font fs-7 w-75'>{item?.code_name}</p>
          </div>
          <div className="d-flex align-items-center">
            <h6 className='theme-font w-25'>OS Version:</h6>
            <p className='theme-font fs-7 w-75'>{item?.os_version}</p>
          </div>
          <div className="d-flex align-items-center">
            <h6 className='theme-font w-25'>OS Build:</h6>
            <p className='theme-font fs-7 w-75'>{item?.build}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
export default SoftwareComponent;
