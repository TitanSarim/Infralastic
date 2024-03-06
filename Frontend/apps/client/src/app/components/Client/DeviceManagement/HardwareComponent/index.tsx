import {Card} from "react-bootstrap";

const HardwareComponent = ({item}: {item: any}) => {
  function formatBytes(bytes:any, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  return(
    <Card className='h-100'>
      <Card.Body>
        <div className="p-2">
          <h5 className='theme-font mb-4'>Hardware</h5>
          <hr/>
          <div className="d-flex align-items-center">
            <p className='theme-font w-25'>Vendor:</p>
            <p className='theme-font fs-7 w-75'>{item?.hardware_vendor || 'N/A'}</p>
          </div>
          <div className="d-flex align-items-center">
            <p className='theme-font w-25'>Model:</p>
            <p className='theme-font fs-7 w-75'>{item?.hardware_model || 'N/A'}</p>
          </div>
          <div className="d-flex align-items-center">
            <p className='theme-font w-25'>Serial Number:</p>
            <p className='theme-font fs-7 w-75'>{item?.hardware_serial || 'N/A'}</p>
          </div>
          <div className="d-flex align-items-center">
            <p className='theme-font w-25'>Processor:</p>
            <p className='theme-font fs-7 w-75'>{item?.cpu_brand || 'N/A'}</p>
          </div>
          <div className="d-flex align-items-center">
            <p className='theme-font w-25'>Memory:</p>
            <p className='theme-font fs-7 w-75'>{formatBytes(item?.memory || 0)}</p>
          </div>
          <div className="d-flex align-items-center">
            <p className='theme-font w-25'>MAC Address:</p>
            <p className='theme-font fs-7 w-75'>{item?.primary_mac || 'N/A'}</p>
          </div>
          <div className="d-flex align-items-center">
            <p className='theme-font w-25'>CPU Type:</p>
            <p className='theme-font fs-7 w-75'>{item?.cpu_type || 'N/A'}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
export default HardwareComponent;
