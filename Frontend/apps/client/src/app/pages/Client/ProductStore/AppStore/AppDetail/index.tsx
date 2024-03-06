import './app-detail.scss';
import {Card, Col, Row} from "react-bootstrap";
import fake from "../../../../../../assets/app-store/dropbox.png";
import dropbox from "../../../../../../assets/app-store/dropboxCard.png";
import avatar from "../../../../../../assets/Avatar.png";
import {useState} from "react";
import {BiDotsHorizontalRounded} from "react-icons/bi";

const AppDetail = () => {
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  return(
    <>
      <br/>
      <br/>
      <Card>
        <Card.Body>
          <div className="w-100 d-flex">
            <div className="d-flex w-50 p-2">
              <div className="p-3">
                <img src={fake} width='168' height='168' alt=""/>
              </div>
              <div className='d-flex flex-column justify-content-center'>
                <h4 className='theme-font'>Dropbox</h4>
                <p className='theme-font theme-danger mb-2'>https://www.dropbox.com</p>
                <p className='theme-font'>Dropbox is a cloud-based file hosting service.</p>
                <h5 className='theme-danger'>$1,499.99</h5>
              </div>
            </div>
            <div className="w-50 d-flex align-items-center justify-content-end">
              <div>
                <button className='bg-white border border-dark rounded py-2 mx-2 px-4'>
                  Create New Account
                </button>
                <button className='bg-theme-danger text-white border-0 rounded py-2 mx-2 px-4'>
                  Connect Account
                </button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <br/>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="p-2">
                <p className='theme-font theme-danger'>Dropbox Pricing</p>
                <p>Overall Rating 4.35</p>
                <p className='theme-danger text-decoration-underline theme-font'>Write a Review</p>
                <p></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <div className='p-2'>
                <div className="d-flex align-items-center w-100 theme-font">
                  <div
                    className={active1 ? 'px-3 bg-theme-danger text-white py-2' : 'px-3 py-2'}
                    onClick={() => {
                      setActive1(true);
                      setActive2(false);
                      setActive3(false);
                      setActive4(false);
                    }}
                  >
                    <h6 className='m-0'>Integration Description</h6>
                  </div>
                  <div
                    className={active2 ? 'px-3 bg-theme-danger text-white py-2' : 'px-3 py-2'}
                    onClick={() => {
                      setActive1(false);
                      setActive2(true);
                      setActive3(false);
                      setActive4(false);
                    }}
                  >
                    <h6 className='m-0'>Product Description</h6>
                  </div>
                  <div
                    className={active3 ? 'px-3 bg-theme-danger text-white py-2' : 'px-3 py-2'}
                    onClick={() => {
                      setActive1(false);
                      setActive2(false);
                      setActive3(true);
                      setActive4(false);
                    }}>
                    <h6 className='m-0'>Exclusive Offer</h6>
                  </div>
                  <div
                    className={active4 ? 'px-3 bg-theme-danger text-white py-2' : 'px-3 py-2'}
                    onClick={() => {
                     setActive1(false);
                     setActive2(false);
                     setActive3(false);
                     setActive4(true);
                    }}>
                    <h6 className='m-0'>Details</h6>
                  </div>
                </div>
                <p className='py-4 theme-font'>
                  Lorem ipsum dolor sit amet consectetur. Adipiscing praesent cras sit aliquam pellentesque netus nunc faucibus. Ac nibh tortor ultrices volutpat porttitor etiam at. Vitae vel vulputate arcu et morbi tortor dolor at. Nisl in maecenas dapibus auctor lorem gravida. Eros adipiscing accumsan nunc sagittis magna ut. Ullamcorper volutpat volutpat ipsum at. Urna ultrices ullamcorper accumsan nunc iaculis mauris etiam amet. Blandit commodo quam ac ultrices. Aliquam et scelerisque nisi dolor quis.
                  <br/>
                  <br/>
                  Pellentesque felis non montes quam pulvinar felis dictumst. Facilisi platea erat phasellus a netus felis natoque. Semper morbi vitae auctor leo adipiscing quam eu amet tempus. Dui id enim adipiscing dui. Id non urna risus et. Duis gravida et tincidunt ut in in etiam metus. Sollicitudin nisi consectetur eget faucibus consectetur. Risus mi facilisis vel nunc vulputate vulputate. Lectus lectus placerat enim tempus turpis malesuada. Diam integer nulla lectus diam eu. Tortor magnis lectus faucibus augue vestibulum in non sed. Tincidunt in at ac arcu arcu faucibus. Tortor sodales est hac id pellentesque ut turpis libero velit. Dis malesuada ac venenatis interdum aliquam tristique. Porttitor et aliquam mauris tortor faucibus montes non lobortis.
                  <br/>
                  <br/>
                  Integer adipiscing nisl aliquam leo. Sapien mi eget lacus lorem ut quis id. Nunc bibendum elementum molestie arcu vulputate in scelerisque. Sed purus neque euismod orci purus feugiat eget posuere. Sagittis nisi consequat nec et aliquam malesuada et tristique. Elit sapien feugiat auctor eu at.
                  <br/>
                  <br/>
                  Faucibus massa fermentum enim tincidunt sed. Sapien metus magna ridiculus praesent feugiat mattis dolor. Mi urna urna cursus morbi cursus. Semper elit viverra semper adipiscing elementum mattis quis maecenas. Gravida et ut venenatis vel.
                  Sapien sit imperdiet dui eget adipiscing libero. Nisi sit suspendisse montes viverra eget ultricies. Eget mauris egestas lacus magna pretium eget at egestas convallis. Libero ante cras eu sit sem. Mauris auctor risus sed sit gravida non morbi mauris venenatis. Nibh posuere nibh ullamcorper in est.
                </p>
                <button className='w-100 bg-theme-danger text-white border-0 rounded theme-font py-2'>
                  <BiDotsHorizontalRounded size={18} className='mx-1' />less
                </button>
              </div>
            </Card.Body>
          </Card>
          <br/>
          <Card className='p-0'>
            <Card.Body className='p-0'>
              <img src={dropbox} className='w-100' alt=""/>
            </Card.Body>
          </Card>
          <br/>
          <Card>
            <Card.Body>
              <div className="p-2 theme-font">
                <h5>Most Recent Reviews</h5>
                <br/>
                <Card>
                  <Card.Body>
                  <p className='theme-danger '>"Dropbox is very helpful for me as a musician"</p>
                  <div className="row">
                    <div className="col-md-1">
                      <div className="d-flex w-100 justify-content-end">
                        <img src={avatar} width='38' height='38' alt=""/>
                      </div>
                    </div>
                    <div className="col-md-11">
                      <h5 className='mb-2'>Peter C.</h5>
                      <p className='theme-font'>Dropbox is an excellent storage system and helps keep all of my documents intact, ready, and available for use. I can trust this service to store all my music and digital paperwork and expect it to be there later, which is important considering the information I lost due to a lack of protection from other services.</p>
                    </div>
                  </div>
                  <button className='w-100 bg-transparent theme-danger border-0 rounded theme-font py-2'>
                    <BiDotsHorizontalRounded size={18} className='mx-1' />Expand
                  </button>
                </Card.Body>
                </Card>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default AppDetail;
