import { Stack, Typography } from "@mui/material";
import React from "react";
import * as RatingsApi from "../API/Ratings";
import QRCodeQueryOptions from "../Models/QRCodeQueryOptions";
import { Container } from '@mui/system';



export default function QRSet(){
    const [homePageQRImage, setHomePageQRImage] = React.useState<string>()
    const [newItemQRImage, setNewItemQRImage] = React.useState<string>()
    const [rateItemQRImage, setRateItemQRImage] = React.useState<string>()

    React.useEffect(() => {
        const homePage : QRCodeQueryOptions = {path:''}
        const qr = RatingsApi.getCreateItemQRCode(3000,homePage)
        .then((response ) => {
            console.log(response)
            setHomePageQRImage(response.toString())
        })
        .catch(
            error =>
            console.log(error.message)
        )
        RatingsApi.getCreateItemQRCode(3000,homePage)
        .then((response) => {
            console.log(response)

            setNewItemQRImage(response.toString())
        })
        .catch(
            error =>
            console.log(error.message)
        )
        RatingsApi.getCreateItemQRCode(3000,homePage)
        .then((response) => {
            console.log(response)

            setRateItemQRImage(response.toString())
        })
        .catch(
            error =>
            console.log(error.message)
        )
    },[])

    return(
        <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        <Container>
            <img src={homePageQRImage} className="App-logo" alt="Homepage QR Code" />
            <Typography align={'center'}>Homepage</Typography>
        </Container>
        
        <Container>
            <img src={newItemQRImage} className="App-logo" alt="New Beer QR Code" />
            <Typography align={'center'}>New Item</Typography>
        </Container>
        
        <Container>
            <img src={rateItemQRImage} className="App-logo" alt="Rate an Item QR Code" />
            <Typography align={'center'}>Rate an Item</Typography>
        </Container>

      </Stack>
    )
}