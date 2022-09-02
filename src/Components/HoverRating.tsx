import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
  0: 'Nah...',
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface HoverRatingProps{
  value: number | null;
  hover: any;
  handleOnChange(event: React.SyntheticEvent<Element, Event>, newValue: number | null): void;
  handleOnChangeActive(event: React.SyntheticEvent<Element, Event>, newHover: any): void;
}

export default function HoverRating(props: HoverRatingProps) {

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={props.value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={props.handleOnChange}
        onChangeActive={props.handleOnChangeActive}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {props.value !== null && (
        <Box sx={{ ml: 2 }}>{labels[props.hover !== -1 ? props.hover : props.value]}</Box>
      )}
    </Box>
  );
}
