import React, {useState} from "react";

import { 
  Typography,
  styled,
  Box,
  Rating,
  Link,
  ImageList,
  ImageListItem
 } from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"
import { DetailCard } from "../../models";
import MapComponent from "../MapComponent";

type Props = {
  detailInfo?: DetailCard
}

type ImageArr = {
  src: string,
  width: number,
  height: number,
  key: number
}

const Address = styled('div')(({ theme }) => ({
  marginTop: "10px",
  fontSize: "15px"
}));  
const Hours = styled('div')(({ theme }) => ({
  marginTop: "10px",
  fontSize: "15px"
}));

const Tel = styled('div')(({ theme }) => ({
  marginTop: "10px",
  fontSize: "15px"
}));

const DetailComponent:React.FC<Props> = ({detailInfo}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);

  const imgLightBoxSet = (index: number) => {
    setIndex(index);
    setOpen(true);
  }

  let imgArr: ImageArr[] = [];
  detailInfo?.photos.map((data, index) => {
    imgArr.push({
      key: index,
      src: `${data.prefix}width300${data.suffix}?w=248&fit=crop&auto=format`,
      width: 700,
      height: 500
    })
  })
  return(
    <Box sx={{ width: '70%', height: '100vh', overflow: 'scroll' }}>
      {detailInfo && 
        <>
          <MapComponent location={detailInfo?.geocodes.main} />
          <Box sx={{padding: '30px'}}>
            <Typography variant="h5">
              {`${detailInfo.name}`}
            </Typography>
            {detailInfo.rating && 
            <Box>
              <Rating name="read-only" value={detailInfo.rating/2} readOnly />
            </Box>}
            {detailInfo.website && 
            <Link href={detailInfo.website} variant="body2">
              {`${detailInfo.website}`}
            </Link>}
            <Address>
              <span>Address: </span>
              {detailInfo.location.address ? detailInfo.location.address : "No Address"}
            </Address>
            <Hours>
              { detailInfo.hours.display ? `${detailInfo.hours.display}` : "No Opening Hours"}
            </Hours>
            <Tel>
              {detailInfo.tel ? `${detailInfo.tel}` : "No tel number"}
            </Tel>
            <Box sx={{ width: '100%', }}>
              <ImageList variant="masonry" cols={3} gap={8}>
                {detailInfo.photos.map((item, index) => (
                  <ImageListItem key={index} cols={1} sx={{ cursor: 'pointer'}}>
                    <img
                      onClick={() => imgLightBoxSet(index)}
                      key={`${index}`}
                      src={`${item.prefix}width300${item.suffix}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.prefix}width300${item.suffix}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={detailInfo.name}
                      loading="lazy"
                    />
                  </ImageListItem>
                ) )}
              </ImageList>
            </Box>
            <Lightbox 
              open = {open}
              animation = {{ fade : 1000 }}
              close={() => setOpen(false)}
              index={index}
              slides={imgArr}
            />
          </Box>
        </>
      }
    </Box>
  )
}

export default DetailComponent;