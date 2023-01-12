import { CircularProgress, Grid, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { PropertySignature } from "typescript";
import * as RatingsAPI from "../API/Ratings";
import { DisplayLocations } from "../Models/DisplayLocation";
import DrinkItem, { DrinkItems } from "../Models/DrinkItem";
import LabeledImage from "../Models/LabeledImage";
import HappyHourTheme from "../Styles/HappyHourTheme";
import Carousel from "./Carousel";

interface CallableCarouselProps {
    carouselTitle: string;
    getFunction(...args: any[]): Promise<DrinkItems>;
    getFunctionArguments: any;
    labelDisplayLocation: DisplayLocations;
}

export default function CallableCarousel(props: CallableCarouselProps) {
    const [images, setImages] = React.useState<LabeledImage[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isError, setIsError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')

    React.useEffect(() => {
        props.getFunction(props.getFunctionArguments)
            .then((response: DrinkItems) => {
                const labeledImageList: LabeledImage[] =
                    response.items.map((item: DrinkItem) => {
                        const labeledImage: LabeledImage = {
                            label: item.name,
                            imageSource: item.image ? item.image : '',
                            rating: item.rating ? item.rating : null,
                            numRatings: item.numRatings ? item.numRatings : 0
                        }
                        return labeledImage
                    })
                setImages(labeledImageList)
                setIsError(false)
            })
            .catch((error: { message: any; }) => {
                setIsError(true)
                setErrorMessage(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <ThemeProvider theme={HappyHourTheme}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                {
                    isLoading ?
                        <CircularProgress />
                        :
                        (isError ?
                            <Typography>{errorMessage}</Typography> :
                            <>
                                <Typography variant="h1">
                                    {props.carouselTitle}
                                </Typography>
                                {(
                                    images.length === 0 ?
                                        <></>
                                        :
                                        <Carousel
                                            images={images}
                                            isMobileStepperActive={false}
                                            labelDisplayLocation={props.labelDisplayLocation}
                                        />

                                )}
                            </>
                        )
                }
            </Grid>
        </ThemeProvider>
    )

}