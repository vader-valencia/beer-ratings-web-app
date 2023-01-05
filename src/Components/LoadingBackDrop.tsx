import { Backdrop, CircularProgress, Typography } from "@mui/material";

interface LoadingBackDropProps {
    backDropIsOpen: boolean;
    setBackDropIsOpen(newVal: boolean): void; 
    isSubmitting: boolean;
    isSubmitError: boolean;
    errorMessage: string | null;
    successMessage: string | null;
  }
  
  export default function LoadingBackDrop(props: LoadingBackDropProps) {

    const handleBackDropClose = () => {
        if(!props.isSubmitting){
            props.setBackDropIsOpen(false);
        }
    };

    return(
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.backDropIsOpen}
        onClick={handleBackDropClose}
    >
        {props.isSubmitting ? 
            <CircularProgress color="inherit"/>
        :
            props.isSubmitError ? 
                <Typography>{props.errorMessage}</Typography>
                : 
                <Typography>{props.successMessage}</Typography>
        }
    </Backdrop>
    )
  }