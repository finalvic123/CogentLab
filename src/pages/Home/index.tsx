import React, {useState} from "react";
import { Box } from '@mui/material'
import { NavComponent } from "../../components";
import { DetailCard } from "../../models";

const HomePage = () => {
  const [detailInfo, setDetailInfo] = useState<DetailCard>()

  return (
    <Box>
      <NavComponent 
        setDetailInfo={setDetailInfo} 
        detailInfo={detailInfo} />
    </Box>
  )
}

export default HomePage