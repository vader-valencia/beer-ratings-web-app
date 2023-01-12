import { Backdrop, CircularProgress, CssBaseline, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoadingBackDropProps {
    isBackDropOpen: boolean;
    setIsBackDropOpen(newVal: boolean): void;
    isSubmitting: boolean;
    isSubmitError: boolean;
    errorMessage: string | null;
    successMessage: string | null;
}

export default function LoadingBackDrop(props: LoadingBackDropProps) {

    const navigate = useNavigate();

    const handleBackDropClose = () => {
        if (!props.isSubmitting) {
            props.setIsBackDropOpen(false);
        }
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.isBackDropOpen}
                onClick={handleBackDropClose}
            >
                {props.isSubmitting ?
                    <CircularProgress color="inherit" />
                    :
                    props.isSubmitError ?
                        <Typography>{props.errorMessage}</Typography>
                        :
                        <Typography>{props.successMessage}</Typography>
                }
            </Backdrop>
            <CssBaseline />
        </>
    )
}