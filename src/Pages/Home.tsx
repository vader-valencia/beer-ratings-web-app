import { Grid, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as RatingsAPI from "../API/Ratings";
import Footer from '../Components/Footer';
import HeaderBar from '../Components/HeaderBar';
import CallableCarousel from '../Components/HomePageCarousel';
import QRSet from '../Components/QRSet';
import HappyHour from "../Images/HappyHour.png";
import { QRCodeOptions } from '../Models/QRCodeRequestQueryOptions';





const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

const homePage: QRCodeOptions = { webPath: '', altText: 'Home Page', fillColor: 'black', backgroundColor: 'gold' }
const newCategory: QRCodeOptions = { webPath: 'new-category', altText: 'New Category', fillColor: 'gold', backgroundColor: 'black' }
const newItem: QRCodeOptions = { webPath: 'new-item', altText: 'New Item', fillColor: 'gold', backgroundColor: 'black' }
const rateItem: QRCodeOptions = { webPath: 'rate-item', altText: 'Rate Item', fillColor: 'black', backgroundColor: 'gold' }
const QRArray = [homePage, newCategory, newItem, rateItem]

const theme = createTheme();

export default function Homepage() {


  return (
      <>
      <HeaderBar />
      <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                >

            <Grid item xs={3}>
            <img src={HappyHour}
              style={{
                width: 'auto',
                height: '25vh'
              }} 
              />
            </Grid>

            <Grid item xs={3}>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Have fun, and enjoy responsibly!
            </Typography>
            </Grid>

            <Grid item xs={3}>
            <QRSet
              portNumber={3000}
              QRCodesToGenerate={QRArray}
            />
            </Grid>

          <Grid item xs={3}>
            <CallableCarousel
              getFunction={RatingsAPI.getAllTopRated}
              getFunctionArguments={[10]}
            />
            </Grid>

          </Grid>


      <Footer/>
      </>
  );
}