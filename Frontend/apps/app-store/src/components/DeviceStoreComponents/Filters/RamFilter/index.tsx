import { Card, Form } from 'react-bootstrap';
import { BiChevronDown } from 'react-icons/bi';
import { useState } from 'react';

const RamFilter = ({ onData }: { onData: any }) => {
  const [show, setShow] = useState(false);

  const sendDataToParent = (data: any) => {
    onData(data);
  };

  return (
    <div className="mb-3">
      <Card className="p-1">
        <Card.Body className="p-1">
          <span className="d-flex w-100">
            <h6 className="theme-font w-75 m-0">Ram</h6>
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
                  <option value="">Select Ram</option>
                  <option value="8 GB">8 GB</option>
                  <option value="16 GB">16 GB</option>
                  <option value="32 GB">32 GB</option>
                  <option value="64 GB">64 GB</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default RamFilter;
