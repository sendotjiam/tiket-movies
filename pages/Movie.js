import React from "react";
import {
    Box,
    Text,
    SimpleGrid,
    Image,
    Center,
    FormControl,
    Input,
    Flex,
    Button,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Movie = ({ title, poster_path, id }) => (
    <div className="movie">
        <LinkBox>
            <LinkOverlay href={`/detail/${id}`}>
                <Box>
                    <Center>
                        <Image src={IMG_API + poster_path} alt={title}></Image>
                    </Center>
                    <Center
                        fontSize={"15px"}
                        fontWeight={"bold"}
                        color="white"
                        mt="10px"
                    >
                        {title}
                    </Center>
                </Box>
            </LinkOverlay>
        </LinkBox>
    </div>
);

export default Movie;
