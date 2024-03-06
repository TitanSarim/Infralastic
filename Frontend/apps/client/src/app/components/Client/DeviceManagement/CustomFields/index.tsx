import {Card} from "react-bootstrap";

const CustomFields = ({ software }: { software: any[] }) => {
  return(
    <Card className='h-100 overflow-auto'>
      <Card.Body>
        <div className="p-2">
          <h5 className='theme-font mb-4'>Softwares</h5>
          <hr/>
          {software?.map((item: any) => (
            <p className='theme-font fs-7' key={item.id}>{item.name}: <span className='theme-danger'>{item.version}</span></p>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}
export default CustomFields;
