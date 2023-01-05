import { Backdrop, Button, CircularProgress, Container, CssBaseline, Dialog, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import * as RatingsAPI from "../API/Ratings";
import Footer from "../Components/Footer";
import HeaderBar from "../Components/HeaderBar";
import LoadingBackDrop from "../Components/LoadingBackDrop";


export default function NewCategory() {
    const [name, setName] = React.useState<string>('');
    const [submittedBy, setSubmittedBy] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [isSubmitError, setIsSubmitError] = React.useState<boolean>(false);
    const [backDropIsOpen, setBackDropIsOpen] = React.useState(false);


    React.useEffect(() => {
    }, [])

    const createNewCategory = () => {

        const newCategory = {
            name: name,
            submittedBy: submittedBy,
        }

        setIsSubmitting(true)
        setBackDropIsOpen(true)
        RatingsAPI.postNewCategory(newCategory)
            .then((response) => {
                setSuccessMessage(response.successMessage)
                setIsSubmitting(false)
            })
            .catch((error) => {
                console.log(error.message)
                setErrorMessage(error.message)
                setIsSubmitting(false)
                setIsSubmitError(true)
            })
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmittedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubmittedBy(event.target.value);
    };

    const handleSubmit = () => {
        createNewCategory()
    }

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
                    <Stack
                        component="form"
                        sx={{
                            width: '25ch',
                        }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField
                            id="input-name"
                            label="Category Name"
                            multiline
                            required
                            maxRows={4}
                            value={name}
                            onChange={handleNameChange}
                        />

                        <TextField
                            id="input-submitted-by"
                            label="Submitted By"
                            multiline
                            required
                            maxRows={4}
                            value={submittedBy}
                            onChange={handleSubmittedByChange}
                        />

                        <Button
                            disabled={name === '' || submittedBy === ''}
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Submit
                        </Button>

                        <LoadingBackDrop
                            backDropIsOpen={false}
                            setBackDropIsOpen={function (newVal: boolean): void {
                                throw new Error("Function not implemented.");
                            }}
                            isSubmitting={false}
                            isSubmitError={false}
                            errorMessage={null}
                            successMessage={null}
                        />




                    </Stack>

                </Grid>

            </Grid>


            <Footer />
        </>
    );
}