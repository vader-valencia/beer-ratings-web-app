import * as React from 'react';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imagePath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imagePath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imagePath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imagePath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const homePage : QRCodeOptions = {path:'', altText: 'Home Page', fillColor:'blue', backgroundColor:'white'}
const newItem : QRCodeOptions = {path:'new-item', altText:'New Item', fillColor:'red', backgroundColor:'white'}
const rateItem : QRCodeOptions = {path:'rate-item', altText:'Rate Item', fillColor:'blue', backgroundColor:'white'}

const QRArray = [homePage, newItem, rateItem]

const theme = createTheme();

export default function Homepage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            @valencianofilter
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
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

          <Carousel
          images={images}
          isMobileStepperActive={false}
          />
          </Container>



        </Box>



      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}