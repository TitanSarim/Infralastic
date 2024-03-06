import {Card} from "react-bootstrap";
import {getAntivirus} from "@infralastic/global-state";
import {useEffect} from "react";

const SecurityComponent = ({hostId}: {hostId: any}) => {

  const fetchAntivirus = () => {
    const formData: any = {
      hostId: JSON.parse(hostId)
    }
    getAntivirus(formData).then((res: any) => {
      console.log(res)
    })
  }

  useEffect(() => {
    // fetchAntivirus()
  }, [hostId])
  return(
    <div>
      <Card>
        <Card.Header className='bg-white p-2'>
          <h5 className='theme-font mb-0 p-2 py-3'>Security</h5>
        </Card.Header>
        <Card.Body className='bg-dark' style={{ borderBottomLeftRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}>
          <div className="row">
            <div className="col-4">
              <p className='text-white text-center theme-font'>Antivirus</p>
              <p className='theme-danger text-center theme-font'>Webroot SecureAnywhere</p>
              <p className='fs-7 text-center text-success'>Active</p>
            </div>
            <div className="col-4">
              <p className='text-white text-center theme-font'>Anti Spyware</p>
              <p className='theme-danger text-center theme-font'>Webroot SecureAnywhere</p>
              <p className='fs-7 text-center text-success'>Active and Update</p>
            </div>
            <div className="col-4">
              <p className='text-white text-center theme-font'>Firewall</p>
              <p className='theme-danger text-center theme-font'>Windows <br/>Firewall</p>
              <p className='fs-7 text-center text-success'>Active and Update</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
export default SecurityComponent;
