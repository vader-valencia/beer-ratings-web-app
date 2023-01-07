import React from "react";
import { useParams } from "react-router-dom";
import Carousel from "../Components/Carousel";
import * as RatingsAPI from "../API/Ratings";
import LabeledImage from "../Models/LabeledImage";
import { CircularProgress, Grid, Typography } from "@mui/material";
import CallableCarousel from "../Components/HomePageCarousel";
import { Container } from "@mui/system";
import HeaderBar from "../Components/HeaderBar";
import Footer from "../Components/Footer";
import { CategoryIdResponse } from "../Models/Category";
import { DrinkItems } from "../Models/DrinkItem";


export default function Category() {
    const numitems = 10;
    const [displayString, setDisplayString] = React.useState<string>('')
    const [images, setImages] = React.useState<LabeledImage[]>([])
    const [message, setMessage] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isLoadingError, setIsLoadingError] = React.useState<boolean>(false)
    const { id } = useParams<{ id: string }>()
    const categoryId = parseInt(id as string)

    React.useEffect(() => {
        if (categoryId !== null) {
            setIsLoading(true)
            RatingsAPI.getCategoryById(categoryId)
                .then((response) => {
                    setDisplayString(`${response.name} + Top ${numitems}!`)
                    setIsLoadingError(false)
                })
                .catch((error: any) => {
                    setIsLoadingError(true)
                    setMessage(error.request + error.toString() + error.response.toString())
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [categoryId])

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
                    <Container>
                        <Typography>
                            {displayString}
                        </Typography>

                        <CallableCarousel
                            getFunction={RatingsAPI.getCategoryTopRated}
                            getFunctionArguments={{ numItems: 10, categoryId: categoryId }}
                        />
                    </Container>
                </Grid>
            </Grid>
            <Footer />
        </>

    )
}