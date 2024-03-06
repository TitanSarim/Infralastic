import Carousel from 'react-bootstrap/Carousel';
import animation from '../../../assets/animation.png'

function CarouselComponent() {
    return (
        <Carousel
            slide={true}
            nextIcon=''
            prevIcon=''
            className='h-100 d-flex align-items-center'
        >
            <Carousel.Item>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <img
                        className="d-block w-75 h-100"
                        src={animation}
                        alt="First slide"
                    />
                </div>
                <div className='text-white text-center align-items-center d-flex flex-column'>
                    <div className="login-width fs-7">
                        <h3 className='py-2 theme-font'>The perfect Assets tool for your Employees</h3>
                        <p className='theme-font'>Lorem ipsum dolor sit amet consectetur. Amet sagittis vitae vitae ultricies donec lacus at viverra. Pellentesque semper sed vel cursus maecenas eget. Aliquet semper aenean.</p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <img
                        className="d-block w-75 h-100"
                        src={animation}
                        alt="First slide"
                    />
                </div>
                <div className='text-white text-center align-items-center d-flex flex-column'>
                    <div className="login-width fs-7">
                        <h3 className='py-2 theme-font'>The perfect Assets tool for your Employees</h3>
                        <p className='theme-font'>Lorem ipsum dolor sit amet consectetur. Amet sagittis vitae vitae ultricies donec lacus at viverra. Pellentesque semper sed vel cursus maecenas eget. Aliquet semper aenean.</p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <img
                        className="d-block w-75 h-100"
                        src={animation}
                        alt="First slide"
                    />
                </div>
                <div className='text-white text-center align-items-center d-flex flex-column'>
                    <div className="login-width fs-7">
                        <h3 className='py-2 theme-font'>The perfect Assets tool for your Employees</h3>
                        <p className='theme-font'>Lorem ipsum dolor sit amet consectetur. Amet sagittis vitae vitae ultricies donec lacus at viverra. Pellentesque semper sed vel cursus maecenas eget. Aliquet semper aenean.</p>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;
