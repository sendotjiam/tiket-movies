import {
    Box,
    Container,
    Grid,
    GridItem,
    Image,
    Text,
    Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const detail = () => {
    const baseUrl = "https://api.themoviedb.org/3";
    const apiKey = "f2f499786a0550c8e14677f17079dee1";

    const router = useRouter();
    const { movie_id } = router.query;
    const [movieData, setMovieData] = useState([]);
    const [movieIsFavorite, setMovieIsFavorite] = useState([]);

    useEffect(() => {
        axios
            .get(`${baseUrl}/movie/${movie_id}?api_key=${apiKey}`)
            .then((res) => {
                console.log(res.data);
                setMovieData(res.data);
                checkMovieFavorite(res.data.id);
            })
            .catch((err) => console.log(err));
    }, [router.isReady]);

    const getYear = (date) => {
        // Jelek sekali boy caranya
        try {
            return date.split("-")[0];
        } catch {
            return null;
        }
    };

    const checkMovieFavorite = (movie_id) => {
        // ini bukan pure punction
        if (!getSessionId()) {
            setMovieIsFavorite(false);
        }
        axios
            .get(
                `${baseUrl}/movie/${movie_id}/account_states?api_key=${apiKey}&session_id=${getSessionId()}`
            )
            .then((res) => {
                setMovieIsFavorite(res.data.favorite);
            })
            .catch((err) => console.log(err));
    };

    const getSessionId = () => {
        return window.localStorage.getItem("session_id");
    };

    const toggleFavorite = () => {
        if (!getSessionId()) {
            router.push("/login");
        }
        axios
            .post(
                `${baseUrl}/account/${null}/favorite?api_key=${apiKey}&session_id=${getSessionId()}`, // account id opsional
                {
                    media_type: "movie",
                    media_id: movieData.id,
                    favorite: !movieIsFavorite,
                }
            )
            .then((res) => {
                checkMovieFavorite(movieData.id);
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <Grid gridTemplateColumns={"2fr 3fr"} height={"100vh"}>
                <GridItem bg="tomato">
                    <Image
                        borderRadius={5}
                        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`}
                        // Ini load nya lama banget
                    />
                </GridItem>
                <GridItem bg="papayawhip">
                    <Grid></Grid>
                    <Text fontSize="48px" color="gray.700" fontWeight="600">
                        {movieData.original_title}
                    </Text>
                    <Text>{getYear(movieData.release_date)}</Text>
                    <Text>{movieData.tagline}</Text>
                    <Text>{movieData.overview}</Text>
                    <Button
                        colorScheme="blue"
                        width="100%"
                        onClick={toggleFavorite}
                    >
                        {movieIsFavorite
                            ? "Remove from favorite"
                            : "Add to Favorite"}
                    </Button>
                </GridItem>
            </Grid>
        </Container>
    );
};

export default detail;
