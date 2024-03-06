import './stats-component.scss';
import icon1 from '../../../../../assets/icons/Icon.png';
import icon2 from '../../../../../assets/icons/Icon (1).png';
import icon3 from '../../../../../assets/icons/Icon (2).png';
import icon4 from '../../../../../assets/icons/Icon (3).png';

const StatsComponent = () => {
    return (
        <div className="shadow d-flex flex-column bg-white rounded p-3 h-100">
            <div className='d-flex w-100 mb-4'>
                <h5 className='theme-font w-100'>Statistics</h5>
                <h6 className='text-muted fs-7 fw-light'>Updated&nbsp;1&nbsp;month&nbsp;ago</h6>
            </div>
            <div className='mt-2'>
                <div className="row">
                    <div className="col-md-3">
                        <div className='d-flex'>
                            <img width='50' height='50' src={icon1} alt=""/>
                            <div className='px-3'>
                                <h5 className='mb-1'>60</h5>
                                <p className='fs-7 fw-light text-muted'>Total&nbsp;App&nbsp;License</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className='d-flex'>
                            <img width='50' height='50' src={icon2} alt=""/>
                            <div className='px-3'>
                                <h5 className='mb-1'>200</h5>
                                <p className='fs-7 fw-light text-muted'>Total&nbsp;Employees</p>
                            </div>
                        </div>
                    </div><div className="col-md-3">
                        <div className='d-flex'>
                            <img width='50' height='50' src={icon3} alt=""/>
                            <div className='px-3'>
                                <h5 className='mb-1'>37</h5>
                                <p className='fs-7 fw-light text-muted'>Total&nbsp;Apps</p>
                            </div>
                        </div>
                    </div><div className="col-md-3">
                        <div className='d-flex'>
                            <img width='50' height='50' src={icon4} alt=""/>
                            <div className='px-3'>
                                <h5 className='mb-1'>667</h5>
                                <p className='fs-7 fw-light text-muted'>Total&nbsp;Assets</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StatsComponent;
