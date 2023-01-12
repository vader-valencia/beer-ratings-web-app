import * as React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import LabeledImage from '../Models/LabeledImage';
import { DisplayLocations } from '../Models/DisplayLocation';
import { Grid, Rating } from '@mui/material';
import HappyHourTheme from '../Styles/HappyHourTheme';
import HoverRating from './HoverRating';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface CarouselProps {
  images: LabeledImage[];
  labelDisplayLocation: DisplayLocations;
  isMobileStepperActive: boolean;
}

export default function Carousel(props: CarouselProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <ThemeProvider theme={HappyHourTheme}>
      <Box sx={{ maxWidth: 400, flexGrow: 1, alignItems: 'center' }}>

        <Grid
          container
          spacing={2}
          padding={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >

          <Grid item xs={3}>
            {
              (props.labelDisplayLocation === DisplayLocations.Above) ?
                <Typography>
                  {`#${activeStep + 1} - ${props.images[activeStep].label}`}
                </Typography>
                :
                <></>
            }
          </Grid>
        </Grid>

        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {props.images.map((step, index) => (
            <div
              key={`${step.label}-${index}`}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.imageSource}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

        {
          props.isMobileStepperActive ?
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
            :
            <></>
        }
        <Grid
          container
          spacing={2}
          padding={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            {
              (props.labelDisplayLocation === DisplayLocations.Below) ?
                <Typography>
                  {`#${activeStep + 1} - ${props.images[activeStep].label}`}
                </Typography> :
                <></>
            }
          </Grid>
          <Grid
            item
            container
            wrap='nowrap'
            alignItems="center"
            justifyContent="center"
          >
            <Rating
              value={props.images[activeStep].rating}
              precision={0.1}
              readOnly={true}
            />
            <Typography>
              {`(${props.images[activeStep].numRatings})`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}