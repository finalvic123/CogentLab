import React, { useEffect, useRef, useState } from "react";

import { 
  styled, 
  alpha,
  CssBaseline,
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { listSearch, detailSearch } from "../../utils/apis";
import { Card, DetailCard } from "../../models";

type Props = {
  setDetailInfo: Function,
  detailInfo?: DetailCard
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavComponent:React.FC<Props> = ({setDetailInfo, detailInfo}) => {

  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [cardList, setCardList] = useState<Card[]>();
  const [randomData, setRandomData] = useState<Card>();
  const [status, setStatus] = useState<boolean>(false);

  const searchRestaurant = async (e:any) => {
    if(e.keyCode == 13) {
      getData(searchRef.current.value);
      !searchRef.current.value ? setStatus(false) : setStatus(true);
    }
  }

  const getData = async (query: string) => {
    const list: any = await listSearch(query);
    const { results } = list;
    setCardList(results);
  }

  const randomGetData = async (query: string) => {
    const list : any = await listSearch(query);
    if(list) {
      const {results} = list && list;
      const result = results && results[Math.floor(Math.random() * results.length)];
      const detailData = await detailSearch(result.fsq_id);
      setRandomData(result)
      setDetailInfo(detailData)
    }
  }

  const selectRestaurant = async (id: string) => {
    const data = await detailSearch(id);
  }

  useEffect(() => {randomGetData("")}, []);

  return (
    <Box sx={{ flexGrow: 1, width: '500px', height: '100vh', overflow: 'scroll'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6"
            noWrap
            component={"div"}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Restaurant Search
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase 
              inputRef={searchRef}
              onKeyDown={searchRestaurant}
              placeholder="Search..."
              inputProps={{ 'aria-label' : 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <List sx={{ mb: 2 }}>
          {(randomData) && 
          <>
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
              Recommand Restaurant
            </ListSubheader>
            <React.Suspense fallback={<div>Loading...</div>}>
              <ListItem onClick={() => selectRestaurant(randomData.fsq_id)} button selected={detailInfo?.fsq_id === randomData.fsq_id && true}>
                <ListItemAvatar>
                  <Avatar alt="Image" src={ 
                    randomData.photos.length ? 
                    `${randomData.photos[0].prefix}width300${randomData.photos[0].suffix}` : 
                    'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                    } />
                </ListItemAvatar>
                <ListItemText primary={randomData.name} secondary={randomData.location.address} />
              </ListItem>
            </React.Suspense>
          </>
          }
          { (status && cardList) &&
          cardList.map((data, index) => (
            <React.Fragment key={index}>
              {(index === 0) && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Search Result...
                </ListSubheader>
              )}
              <ListItem onClick={() => selectRestaurant(data.fsq_id)} button selected={detailInfo?.fsq_id === data.fsq_id && true}>
                <ListItemAvatar>
                  <Avatar alt="image" src={ 
                    data.photos.length ? 
                    `${data.photos[0].prefix}width300${data.photos[0].suffix}` : 
                    'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                    } />
                </ListItemAvatar>
                <ListItemText primary={data.name} secondary={data.location.address} />
              </ListItem>
            </React.Fragment>
          ))}
          {(!status || cardList?.length == 0) && 
          <>
              <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                Search Result...
              </ListSubheader>
              <ListItem>
                <ListItemText primary={"No Result"} />
              </ListItem>
          </>}
        </List>
      </Paper>
    </Box>
  )
}

export default NavComponent;