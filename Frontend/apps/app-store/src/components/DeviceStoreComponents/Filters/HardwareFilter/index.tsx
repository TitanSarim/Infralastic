import { Card } from 'react-bootstrap';
import { BiChevronDown } from 'react-icons/bi';
import { useState } from 'react';

const HardwareFilter = ({ onData }: { onData: any }) => {
  const [show, setShow] = useState(true);

  const sendDataToParent = (data: any) => {
    onData(data);
  };

  return (
    <div className="mb-3">
      <Card className="p-1">
        <Card.Body className="p-1">
          <span className="d-flex w-100">
            <h6 className="theme-font w-75 m-0">Hardware Category</h6>
            <span className="w-25 d-flex justify-content-end align-items-center">
              <BiChevronDown
                onClick={() => setShow(!show)}
                className="cursor"
              />
            </span>
          </span>
          {show && (
            <form className="mt-2">
              <div className="d-flex py-1">
                <input
                  onClick={(e: any) =>
                    e.target.checked
                      ? sendDataToParent('Other')
                      : sendDataToParent('')
                  }
                  type="checkbox"
                  className="form-check-input"
                />
                <label className=" fs-7 ms-2">Other</label>
              </div>
              <div className="d-flex py-1">
                <input
                  onClick={(e: any) =>
                    e.target.checked
                      ? sendDataToParent('Desktop')
                      : sendDataToParent('')
                  }
                  type="checkbox"
                  className="form-check-input"
                />
                <label className=" fs-7 ms-2">Desktop</label>
              </div>
              <div className="d-flex py-1">
                <input
                  onClick={(e: any) =>
                    e.target.checked
                      ? sendDataToParent('Laptop')
                      : sendDataToParent('')
                  }
                  type="checkbox"
                  className="form-check-input"
                />
                <label className=" fs-7 ms-2">Laptop</label>
              </div>
              <div className="d-flex py-1">
                <input
                  onClick={(e: any) =>
                    e.target.checked
                      ? sendDataToParent('Keyboard')
                      : sendDataToParent('')
                  }
                  type="checkbox"
                  className="form-check-input"
                />
                <label className=" fs-7 ms-2">Keyboard</label>
              </div>
              <div className="d-flex py-1">
                <input
                  onClick={(e: any) =>
                    e.target.checked
                      ? sendDataToParent('Mouse')
                      : sendDataToParent('')
                  }
                  type="checkbox"
                  className="form-check-input"
                />
                <label className=" fs-7 ms-2">Mouse</label>
              </div>
              <div className="d-flex py-1">
                <input
                  onClick={(e: any) =>
                    e.target.checked
                      ? sendDataToParent('Display')
                      : sendDataToParent('')
                  }
                  type="checkbox"
                  className="form-check-input"
                />
                <label className=" fs-7 ms-2">Display</label>
              </div>
            </form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default HardwareFilter;
