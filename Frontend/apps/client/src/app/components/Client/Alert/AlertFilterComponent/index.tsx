import {Form} from "react-bootstrap";

const AlertFilterComponent = () => {
  return(
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicManager">
          <Form.Label className='fs-7 mb-1 theme-font'>Sites</Form.Label>
          <Form.Select
            className='px-2 py-1 fs-7 theme-font text-muted'
            aria-label="Default select example"
          >
            <option value=''>All</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicManager">
          <Form.Label className='fs-7 mb-1 theme-font'>Severity</Form.Label>
          <Form.Select
            className='px-2 py-1 fs-7 theme-font text-muted'
            aria-label="Default select example"
          >
            <option value=''>All</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicManager">
          <Form.Label className='fs-7 mb-1 theme-font'>Status</Form.Label>
          <Form.Select
            className='px-2 py-1 fs-7 theme-font text-muted'
            aria-label="Default select example"
          >
            <option value=''>Open</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicManager">
          <Form.Label className='fs-7 mb-1 theme-font'>Category</Form.Label>
          <Form.Select
            className='px-2 py-1 fs-7 theme-font text-muted'
            aria-label="Default select example"
          >
            <option value=''>All</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicManager">
          <Form.Label className='fs-7 mb-1 theme-font'>Device type</Form.Label>
          <Form.Select
            className='px-2 py-1 fs-7 theme-font text-muted'
            aria-label="Default select example"
          >
            <option value=''>All</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicManager">
          <Form.Label className='fs-7 mb-1 theme-font'>SNMP Type</Form.Label>
          <Form.Select
            className='px-2 py-1 fs-7 theme-font text-muted'
            aria-label="Default select example"
          >
            <option value=''>All</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='text-muted'>
          <Form.Check
            type='checkbox'
            id={'cbx1'}
            label={'Display alerts with associated tickets only'}
          />

        </Form.Group>
      </Form>
    </div>
  )
}
export default AlertFilterComponent;
