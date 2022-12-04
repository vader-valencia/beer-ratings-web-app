import React from "react";
import { useParams } from "react-router-dom";
import Carousel from "../Components/Carousel";
import * as RatingsAPI from "../API/Ratings";
import LabeledImage from "../Models/LabeledImage";
import { CircularProgress, Typography } from "@mui/material";
import CallableCarousel from "../Components/HomePageCarousel";
import { Container } from "@mui/system";


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
        <Container>
            <Typography>
            {displayString}
            </Typography>
            
            <CallableCarousel
                getFunction={RatingsAPI.getCategoryTopRated}
                getFunctionArguments={{numItems: 10, categoryNameInUrl: categoryName}}
            />
        </Container>
    )
}