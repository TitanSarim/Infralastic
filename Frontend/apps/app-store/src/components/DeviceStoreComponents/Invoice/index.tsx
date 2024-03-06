import React from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

const Invoice = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Invoice</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Product 1</td>
                <td>2</td>
                <td>$10.00</td>
                <td>$20.00</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Product 2</td>
                <td>1</td>
                <td>$15.00</td>
                <td>$15.00</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Total: $35.00</h3>
        </Col>
      </Row>
      <Row>
        <Col>{/* <Button variant="primary">Download Invoice</Button> */}</Col>
      </Row>
    </Container>
  );
};

export default Invoice;
