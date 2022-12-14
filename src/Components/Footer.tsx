import { Box, Link, Typography } from "@mui/material";

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

export default function Footer() {
return (<>
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
</>
);
}