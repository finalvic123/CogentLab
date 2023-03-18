export type Photo = {
  prefix: string,
  suffix: string
}

type Category = {
  name: string,
  icon: Photo
}

interface Card {
  fsq_id: string,
  categories: Category[],
  geocodes: {
    latitude: number,
    longitude: number
  },
  location: {address: string},
  name: string,
  photos: Photo[],
  rating: string
}

export default Card;