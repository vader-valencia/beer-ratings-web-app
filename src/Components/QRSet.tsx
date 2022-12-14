import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import * as RatingsApi from "../API/Ratings";
import { QRCodeOptions } from "../Models/QRCodeRequestQueryOptions";
import { Container } from '@mui/system';
import QRCodeRequestQueryOptions from "../Models/QRCodeRequestQueryOptions";

interface QRSetProps {
    portNumber: number;
    QRCodesToGenerate: QRCodeOptions[];
}

interface QRResults {
    image: string;
    altText: string;
}

export default function QRSet(props: QRSetProps) {
    const [QRArray, setQRArray] = React.useState<QRResults[]>([]);

    React.useEffect(() => {
        props.QRCodesToGenerate.map((qrOptions) => {
            const qrQuery: QRCodeRequestQueryOptions = {
                webPath: qrOptions.webPath,
                fillColor: qrOptions.fillColor,
                backgroundColor: qrOptions.backgroundColor
            }

            RatingsApi.getCreateItemQRCode(props.portNumber, qrQuery)
                .then((response) => {
                    setQRArray(oldArr => [...oldArr,
                    {
                        image: response.toString(),
                        altText: qrOptions.altText
                    }
                    ]);
                })
                .catch(
                    error =>
                        console.log(error.message)
                )
        })
    }, [])

    return (
        <Grid 
        container 
        rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
        justifyContent="center">
        {
                QRArray.map((qr) => {
                    return (
                        <Grid item key={qr.altText}>
                            <img src={qr.image} className="App-logo" />
                            <Typography align={'center'}>{qr.altText}</Typography>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}