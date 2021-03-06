import {
    Box,
    Container,
    Image,
    Text,
    Button,
    Flex,
    Spacer,
    Head,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/navbar";

const Detail = () => {
    const baseUrl = process.env.baseURL;
    const apiKey = process.env.apiKey;

    const router = useRouter();
    const { movie_id } = router.query;
    const [movieData, setMovieData] = useState([]);
    const [castData, setCastData] = useState([]);
    const [movieIsFavorite, setMovieIsFavorite] = useState([]);

    useEffect(() => {
        axios
            .get(`${baseUrl}/movie/${movie_id}?api_key=${apiKey}`)
            .then((res) => {
                setMovieData(res.data);
                checkMovieFavorite(res.data.id);
            })
            .catch((err) => console.log(err));
        axios
            .get(`${baseUrl}/movie/${movie_id}/credits?api_key=${apiKey}`)
            .then((res) => {
                setCastData(res.data.cast);
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
        <>
            <Navbar />
            <Box mt="64px">
                <Container maxW="container.lg">
                    <Flex justifyContent="space-between">
                        <Box>
                            <Image
                                borderRadius={5}
                                objectFit="cover"
                                maxWidth="300px"
                                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`}
                                alt={"image"}
                            />
                        </Box>
                        <Box ml={"80px"}>
                            <Flex mt="10px" alignItems="baseline">
                                <Flex>
                                    <Text
                                        fontSize="48px"
                                        color="gray.700"
                                        fontWeight="700"
                                    >
                                        {movieData.original_title}
                                    </Text>
                                </Flex>
                                <Flex ml={"19px"}>
                                    <Text fontSize="24px">
                                        {getYear(movieData.release_date)}
                                    </Text>
                                </Flex>
                                <Spacer />
                                <Flex>
                                    {movieIsFavorite ? (
                                        <Button
                                            colorScheme="white"
                                            variant="outline"
                                            width="100%"
                                            onClick={toggleFavorite}
                                        >
                                            Dalam list favoritmu
                                        </Button>
                                    ) : (
                                        <Button
                                            colorScheme="blue"
                                            width="100%"
                                            onClick={toggleFavorite}
                                        >
                                            Favoritkan
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>
                            <Box mt={"36px"}>
                                <Text>{movieData.tagline}</Text>
                            </Box>
                            <Box mt={"36px"}>
                                <Text>{movieData.overview}</Text>
                            </Box>
                        </Box>
                    </Flex>
                    <Box mt={"90px"}>
                        <Box>
                            <Text
                                fontSize="30px"
                                color="gray.700"
                                fontWeight="700"
                            >
                                Cast
                            </Text>
                        </Box>
                        <Flex justifyContent="space-between">
                            {castData.slice(0, 6).map((cast) => {
                                return (
                                    <Container key={cast.id}>
                                        <Box
                                            maxW="sm"
                                            height="280px"
                                            borderWidth="1px"
                                            borderRadius="lg"
                                            overflow="hidden"
                                        >
                                            <Image
                                                src={`https://www.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`}
                                                alt={"image"}
                                            />
                                            <Text fontWeight="700">
                                                {cast.name}
                                            </Text>
                                            <Text>{cast.character}</Text>
                                        </Box>
                                    </Container>
                                );
                            })}
                        </Flex>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Detail;
