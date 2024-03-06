import { Card, Form } from 'react-bootstrap';
import { BiChevronDown } from 'react-icons/bi';
import { useState } from 'react';

const WarrantyFilter = ({ onData }: { onData: any }) => {
  const [show, setShow] = useState(false);

  const sendDataToParent = (data: any) => {
    onData(data);
  };

  return (
    <div className="mb-3">
      <Card className="p-1">
        <Card.Body className="p-1">
          <span className="d-flex w-100">
            <h6 className="theme-font w-75 m-0">Warranty</h6>
            <span className="w-25 d-flex justify-content-end align-items-center">
              <BiChevronDown
                onClick={() => setShow(!show)}
                className="cursor"
              />
            </span>
          </span>
          {show && (
            <Form>
              <Form.Group className="mt-3" controlId="country">
                <Form.Select
                  className="bg-white fs-7 theme-font p-2 px-3"
                  aria-label="Default select example"
                  required={true}
                  onChange={(e: any) => sendDataToParent(e.target.value)}
                >
                  <option value="">Select Warranty</option>
                  <option value="1 month">1 month</option>
                  <option value="3 month">3 month</option>
                  <option value="6 month">6 month</option>
                  <option value="1 year">1 year</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default WarrantyFilter;
