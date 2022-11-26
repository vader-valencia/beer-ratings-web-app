import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as RatingsAPI from "../API/Ratings";
import CallableCarousel from '../Components/HomePageCarousel';
import QRSet from '../Components/QRSet';
import HappyHour from "../Images/HappyHour.png";
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

const homePage: QRCodeOptions = { webPath: '', altText: 'Home Page', fillColor: 'black', backgroundColor: 'gold' }
const newCategory: QRCodeOptions = { webPath: 'new-category', altText: 'New Category', fillColor: 'gold', backgroundColor: 'black' }
const newItem: QRCodeOptions = { webPath: 'new-item', altText: 'New Item', fillColor: 'black', backgroundColor: 'gold' }
const rateItem: QRCodeOptions = { webPath: 'rate-item', altText: 'Rate Item', fillColor: 'gold', backgroundColor: 'black' }
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
            {/*<Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Happy Hour!
            </Typography>
            */}
            <img src={HappyHour}
              style={{
                width: '70%',
                height: '70%'
              }} />
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