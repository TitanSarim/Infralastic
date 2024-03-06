import './admin.scss';
import { Card, Col, Row } from 'react-bootstrap';
import SettingCard from '../../../components/Client/Admin/SettingCard';
import { AiOutlineSetting } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
  const router = useNavigate();
  return (
    <>
      <Card className="mt-5 shadow theme-font">
        <Card.Body>
          <div className="p-2">
            <h5>Account Settings</h5>
            <p className="text-muted">
              Manage account configurations and customizations for your service
              desk
            </p>
          </div>
          <Row className="mt-3">
            <Col md={3}>
              <SettingCard
                icon={<AiOutlineSetting size={20} />}
                name="Global Settings"
                description=""
                click={() => router('/user-table')}
              />
            </Col>
            <Col md={3}>
              <SettingCard
                icon={<AiOutlineSetting size={20} />}
                name="Plans & Billing"
                description=""
                click={() => router('/global-setting')}
              />
            </Col>
            <Col md={3}>
              <SettingCard
                icon={<AiOutlineSetting size={20} />}
                name="Email Configuration"
                description=""
                click={() => router('/email-configuration')}
              />
            </Col>
            <Col md={3}>
              <SettingCard
                icon={<AiOutlineSetting size={20} />}
                name="Audit Log"
                description=""
                click={() => router('/audit-log')}
              />
            </Col>
            {/* <Col md={3}>
              <SettingCard
                icon={<AiOutlineSetting size={20} />}
                name="LDAP"
                description=""
                click={() => router('/ldap')}
              />
            </Col> */}
            {/* <Col md={3}>
              <SettingCard
                icon={<AiOutlineSetting size={20} />}
                name="SAML"
                description=""
                click={() => router('/saml')}
              />
            </Col> */}
            {/* <Col md={3}>
              <SettingCard
                icon={<AiOutlineSetting size={20} />}
                name="0AUTH"
                description=""
                click={() => router('/0auth')}
              />
            </Col> */}
            {/*<Col md={3}>*/}
            {/*  <SettingCard*/}
            {/*    icon={<AiOutlineSetting size={20} />}*/}
            {/*    name='OUTPUT SERVER'*/}
            {/*    description='Lorem ipsum dolor sit amet consectetur. Fringilla ipsum amet turpis tempor.'*/}
            {/*    click={() => router('/output-server')}*/}
            {/*  />*/}
            {/*</Col>*/}
            {/*<Col md={3}>*/}
            {/*  <SettingCard*/}
            {/*    icon={<AiOutlineSetting size={20} />}*/}
            {/*    name='INCOMING SERVER'*/}
            {/*    description='Lorem ipsum dolor sit amet consectetur. Fringilla ipsum amet turpis tempor.'*/}
            {/*    click={() => router('/incoming-server')}*/}
            {/*  />*/}
            {/*</Col>*/}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default Admin;
