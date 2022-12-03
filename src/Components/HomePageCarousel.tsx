import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { PropertySignature } from "typescript";
import * as RatingsAPI from "../API/Ratings";
import DrinkItem, { DrinkItems } from "../Models/DrinkItem";
import LabeledImage from "../Models/LabeledImage";
import Carousel from "./Carousel";

interface CallableCarouselProps {
    getFunction(...args: any[]): Promise<DrinkItems>;
    getFunctionArguments: any[];
}

export default function CallableCarousel(props: CallableCarouselProps) {
    const [images, setImages] = React.useState<LabeledImage[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isError, setIsError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')

    React.useEffect(() => {
        props.getFunction(props.getFunctionArguments)
            .then((response: DrinkItems) => {
                const labeledImageList : LabeledImage[] = 
                    response.items.map((item: DrinkItem)=>{
                        const labeledImage : LabeledImage = {
                            label: item.name,
                            imageSource: item.image ? item.image : ''
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
        <div>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    (isError ?
                        <Typography>{errorMessage}</Typography> :
                        (
                            images.length === 0 ?
                                <></>
                                    : 
                                    <Carousel
                                    images={images}
                                    isMobileStepperActive={false}
                                />
                                    
                        )
                    )
            }</div>
    )

}