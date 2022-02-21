import Head from "next/head";
import Link from "next/link";
import Movie from "./Movie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    SimpleGrid,
    Center,
    FormControl,
    Input,
    Flex,
    Button,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";

export default function Home() {
    const baseURL = process.env.baseURL;
    const apiKey = process.env.apiKey;

    const [sessionId, setSessionId] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${baseURL}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`
            )
            .then((res) => {
                setMovies(res.data.results);
                setSessionId(getSessionId());
            });
    }, [sessionId]);

    const getSessionId = () => {
        return window.localStorage.getItem("session_id");
    };

    return (
        <>
            <Head>
                <title>BNCC Movies</title>
                <meta name="description" content="BNCC Movies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Navbar />

                <Box pl="20" pr="20" pt="10" pb="10" bg={"blue.600"}>
                    <Text fontSize={"30px"} fontWeight={"bold"} color="white">
                        Populer Sekarang
                    </Text>
                    <Box marginBottom="5"></Box>

                    <SimpleGrid
                        minChildWidth={{
                            base: "100%",
                            md: "15%",
                            lg: "15%",
                            xl: "15%",
                        }}
                        spacing="12px"
                    >
                        {movies.length > 0 &&
                            movies
                                .slice(0, 5)
                                .map((movie) => (
                                    <Movie key={movie.id} {...movie} />
                                ))}
                    </SimpleGrid>
                </Box>

                <Center mt="30px">
                    <Box>
                        <Center>
                            <Text fontSize={"20px"}>Cari Film</Text>
                        </Center>
                        <Flex>
                            <FormControl>
                                <Input id="search" type="text" />
                            </FormControl>
                            <Button colorScheme="blue" ml="5px">
                                Cari
                            </Button>
                        </Flex>
                    </Box>
                </Center>
            </main>
        </>
    );
}
