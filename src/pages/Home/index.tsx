import React, {useState} from "react";
import { Box } from '@mui/material'
import { NavComponent, DetailComponent } from "../../components";
import { DetailCard } from "../../models";

const HomePage = () => {
  const [detailInfo, setDetailInfo] = useState<DetailCard>()

  return (
    <Box  sx={{ display: 'flex' }}>
      <NavComponent 
        setDetailInfo={setDetailInfo} 
        detailInfo={detailInfo} />
      <DetailComponent 
        detailInfo={detailInfo}
      />
    </Box>
  )
}

export default HomePage