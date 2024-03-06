import './alert-component.scss';
import {Alert} from "react-bootstrap";
const AlertComponent = () => {
  return(
      <div className="shadow d-flex flex-column bg-white rounded p-3 h-100 overflow-hidden">
          <div className='overflow-auto'>
              <h5 className='theme-font'>Alerts</h5>
              {[
                  'primary',
                  'secondary',
                  'success',
                  'danger',
                  'warning',
                  'info',
                  'light',
                  'dark',
              ].map((variant) => (
                  <Alert key={variant} className='p-2 mb-1' variant={variant}>
                      This is a {variant} alert—check it out!
                  </Alert>
              ))}
          </div>
      </div>
  )
}
export default AlertComponent;