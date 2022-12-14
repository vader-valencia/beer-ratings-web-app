import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { CssBaseline } from '@mui/material';

export default function HeaderBar() {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  return (
    <>
    <AppBar position="relative">
    <Toolbar>
      <IconButton
        onClick={routeChange}>
        <HomeIcon fontSize="large" />
      </IconButton>
    </Toolbar>
  </AppBar>
  <Box
          sx={{
            bgcolor: 'background.paper',
            pb: 6,
          }}
        />
  <CssBaseline/>

  </>
  );
}
