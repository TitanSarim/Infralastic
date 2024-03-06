import fake from '../../../../../assets/app-store/faxplus.png'
import {Rating} from "@mui/material";
import {useState} from "react";
import {createSearchParams, useNavigate} from "react-router-dom";

interface CardProps {
  image: any;
  name: string;
  description: string;
  price: string;
  reviews: number;
}

const SoftwareCard = (props: CardProps) => {
  const router = useNavigate()
  const [rating, setRating] = useState<any>(5);
  function handleDetail() {
    router({
      pathname: '/app-detail',
      search: `?${createSearchParams({
        appId: '1',
      })}`
    })
  }
  return(
    <>
      <div
        className='d-flex align-items-center flex-column my-4'
        onClick={() => handleDetail()}>
        <img src={props.image} width='104' height='104' className='border rounded-4' alt=""/>
        <h5 className='theme-font text-center mt-1'>{props.name}</h5>
        <p className='fs-7 text-muted mb-2'>{props.description}</p>
        <h5 className='theme-danger text-center'>{props.price}</h5>
        <div className="d-flex">
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <h5 className='mx-2'>{props.reviews}</h5>
        </div>
      </div>
    </>
  )
}
export default SoftwareCard;
