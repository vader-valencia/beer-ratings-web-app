import { CircularProgress } from "@mui/material";
import React from "react";
import { PropertySignature } from "typescript";
import * as RatingsAPI from "../API/Ratings";
import LabeledImage from "../Models/LabeledImage";
import Carousel from "./Carousel";

interface CallableCarouselProps{
    getFunction(...args: any[]) : Promise<LabeledImage[]>;
    getFunctionArguments : any[];
}

export default function CallableCarousel(props: CallableCarouselProps){
    const [images, setImages] = React.useState<LabeledImage[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() =>{
    props.getFunction(props.getFunctionArguments)
    .then((response: LabeledImage[]) =>{
        setImages(response)
        })
        .catch((error: { message: any; }) => console.log(error.message))
        .finally(() => {
        console.log('Experiment completed');
        setIsLoading(false)
        });
    },[])

    return (
        <div>
        {
            isLoading ? 
                <CircularProgress/> 
                    :
                <Carousel
                images={images}
                isMobileStepperActive={false}
                />
        }</div>
        )
}