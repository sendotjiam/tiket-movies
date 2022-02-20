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

export default function Home() {
    const baseURL = "https://api.themoviedb.org/3";
    const apiKey = "f2f499786a0550c8e14677f17079dee1";

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
                console.log(res.data.results);
            });
    }, [sessionId]);

    const getSessionId = () => {
        return window.localStorage.getItem("session_id");
    };

    const deleteSessionId = () => {
        window.localStorage.removeItem("session_id");
        setSessionId(null);
    };

    const logout = () => {
        console.log("Logging Out!");
        axios
            .delete(`${baseURL}/authentication/session?api_key=${apiKey}`, {
                data: {
                    session_id: sessionId,
                },
            })
            .then((res) => {
                console.log(res);
                deleteSessionId();
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Head>
                <title>BNCC Movies</title>
                <meta name="description" content="BNCC Movies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Box
                    d="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pl="20"
                    pr="20"
                    pt="5"
                    pb="5"
                >
                    <Box>
                        <Text
                            fontSize={"20px"}
                            fontWeight={"bold"}
                            color={"blue.600"}
                        >
                            BNCC X Tiket Movies
                        </Text>
                    </Box>
                    <Box>
                        {!sessionId ? (
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        ) : (
                            <a onClick={logout}>Logout</a>
                        )}
                    </Box>
                </Box>

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
