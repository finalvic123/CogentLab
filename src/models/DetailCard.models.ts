import { Photo } from "./Card.models";

type DetailCard = {
  fsq_id: string,
  name: string,
  geocodes: {
    main: {
      latitude: number,
      longitude: number
    }
  },
  hours: {
    display: string,
    open_now: boolean
  },
  location: {
    address: string
  },
  photos: Photo[],
  rating: number,
  website: string,
  tel: string
}

export default DetailCard;