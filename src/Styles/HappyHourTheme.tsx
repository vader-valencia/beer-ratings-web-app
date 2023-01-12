import { createTheme } from "@mui/material";

const HappyHourTheme = createTheme();

HappyHourTheme.typography.h1 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [HappyHourTheme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

export default HappyHourTheme;