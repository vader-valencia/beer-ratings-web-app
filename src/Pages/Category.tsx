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


export default function Category() {
    const numitems = 10;
    const [displayString, setDisplayString] = React.useState<string>('') 
    const [images, setImages] = React.useState<LabeledImage[]>([])
    const [message, setMessage] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const {categoryName} = useParams<{categoryName: string}>()

    React.useEffect(() =>{
        setDisplayString(`${categoryName} + Top ${numitems}!` )
    },[categoryName])

    return (
        <>
        <HeaderBar/>

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
                getFunctionArguments={{numItems: 10, categoryNameInUrl: categoryName}}
            />
        </Container>
        </Grid>
        </Grid>
        <Footer/>
        </>

    )
}