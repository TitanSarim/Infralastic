import { Card } from 'react-bootstrap';
import { BiChevronDown } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { quat } from 'mapbox-gl';

const PriceFilter = ({ onData }: { onData: any }) => {
  const [show, setShow] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    onData({ minPrice, maxPrice });
  }, [minPrice, maxPrice]);

  const handleSliderChange = (e: any) => {
    const min = e.target.value;
    setMinPrice(min);
  };

  const handleMaxPriceChange = (e: any) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="mb-3">
      <Card className="p-1 ">
        <Card.Body className="p-1">
          <span className="d-flex w-100">
            <h6 className="theme-font w-75 m-0">Price</h6>
            <span className="w-25 d-flex justify-content-end align-items-center">
              <BiChevronDown
                onClick={() => setShow(!show)}
                className="cursor"
              />
            </span>
          </span>
          {show && (
            <div>
              <Form.Range
                min="0"
                max="1000"
                step="10"
                value={minPrice !== '' ? minPrice : '0'}
                onChange={handleSliderChange}
              />
              <div className="d-flex w-100 align-items-center">
                <span className="w-50 m-2">
                  <input
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    type="number"
                    className="w-100"
                  />
                  <p className="m-0 theme-font fs-8 mt-1 ">MIN</p>
                </span>
                -
                <span className="w-50 m-2">
                  <input
                    className="w-100"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    type="number"
                  />
                  <p className="m-0 theme-font fs-8 mt-1 ">MAX</p>
                </span>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PriceFilter;
