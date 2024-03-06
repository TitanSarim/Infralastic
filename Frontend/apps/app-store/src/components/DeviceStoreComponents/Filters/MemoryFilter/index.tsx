import { Card, Form } from 'react-bootstrap';
import { BiChevronDown } from 'react-icons/bi';
import { useState } from 'react';

const MemoryFilter = ({ onData }: { onData: any }) => {
  const [show, setShow] = useState(false);

  const sendDataToParent = (data: any) => {
    onData(data);
  };

  return (
    <div className="mb-3">
      <Card className="p-1 ">
        <Card.Body className="p-1">
          <span className="d-flex w-100">
            <h6 className="theme-font w-75 m-0">Memory</h6>
            <span className="w-25 d-flex justify-content-end align-items-center">
              <BiChevronDown onClick={() => setShow(!show)}   className="cursor"/>
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
                  <option value="">Select Memory</option>
                  <option value="500 Gb">500 GB</option>
                  <option value="1 TB">1 TB</option>
                  <option value="2 TB">2 TB</option>
                  <option value="3 TB">3 TB</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default MemoryFilter;
