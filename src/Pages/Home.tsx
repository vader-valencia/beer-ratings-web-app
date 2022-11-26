import * as React from 'react';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ListItem } from '@mui/material';
import HomepageQRImg from '../Images/Beer_Ratings_Homepage.png';
import NewBeerQRImg from '../Images/New_Beer.png';
import RateABeerQRImg from '../Images/Rate_A_Beer.png';
import QRSet from '../Components/QRSet';
import Carousel from '../Components/Carousel';
import { QRCodeOptions } from '../Models/QRCodeRequestQueryOptions';
import LabeledImage from '../Models/LabeledImage';
import HomePageCarousel from '../Components/HomePageCarousel';
import * as RatingsAPI from "../API/Ratings";
import CallableCarousel from '../Components/HomePageCarousel';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright ©'}
      <Link color="inherit" href="https://github.com/vader-valencia/vader-valencia/">
        Joseph Valencia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

const homePage : QRCodeOptions = {webPath:'', altText: 'Home Page', fillColor:'black', backgroundColor:'gold'}
const newCategory : QRCodeOptions = {webPath:'new-category', altText:'New Category', fillColor:'gold', backgroundColor:'black'}
const newItem : QRCodeOptions = {webPath:'new-item', altText:'New Item', fillColor:'black', backgroundColor:'gold'}
const rateItem : QRCodeOptions = {webPath:'rate-item', altText:'Rate Item', fillColor:'gold', backgroundColor:'black'}
const QRArray = [homePage, newCategory, newItem, rateItem]

const theme = createTheme();

export default function Homepage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Happy Hour!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Have fun, and enjoy responsibly!
            </Typography>
            <QRSet
            portNumber={3000}
            QRCodesToGenerate={QRArray}
            />

            <CallableCarousel 
            getFunction={RatingsAPI.getAllTopRated} 
            getFunctionArguments={[10]} 
            />

          </Container>
        </Box>



      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Designed to help find good food, by those who love good food!
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}