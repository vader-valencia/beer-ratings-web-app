import { Button, Grid, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as RatingsAPI from "../API/Ratings";
import HeaderBar from "../Components/HeaderBar";
import Category, { CategoryResponse } from "../Models/Category";



export default function Categories() {
    const [categories, setCategories] = React.useState<Category[]>([])
    const [message, setMessage] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [isLoadingError, setIsLoadingError] = React.useState<boolean>(false)
    const navigate = useNavigate();
    const handleSubmit = (categoryPageId: number) => {
        navigate(`/categories/${categoryPageId}`)
    }
    React.useEffect(() => {
        RatingsAPI.getCategories()
            .then((response: CategoryResponse) => {
                setCategories(response.items)
            })
            .catch((error: any) => {
                setIsLoadingError(true)
                setMessage(error.request + error.toString() + error.response.toString())
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])

    return (
        <>
            <HeaderBar />

            {isLoadingError ?

                <Typography>
                    {message}
                </Typography>

                :

                <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {
                        categories.map((category) => (
                            <>
                                <Grid item xs={6}>
                                    <Button
                                        variant='contained'
                                        value={category.id}
                                        key={category.id + '-key'}
                                        onClick={() => {
                                            handleSubmit(category.id as number);
                                        }}                        >
                                        {category.name}
                                    </Button>
                                </Grid>
                            </>
                        ))
                    }
                </Grid>
            }
        </>
    )
}