import React, { useEffect, useState } from "react";
import { Box, Text, Link, Flex, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Navbar() {
    const baseURL = process.env.baseURL;
    const apiKey = process.env.apiKey;
    const router = useRouter();

    const [sessionId, setSessionId] = useState([]);

    useEffect(() => {
        setSessionId(window.localStorage.getItem("session_id"));
    }, [sessionId]);

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

    const showProfile = () => {
        router.push("/profile");
    };

    return (
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
                <Link href="/">
                    <Text
                        fontSize={"20px"}
                        fontWeight={"bold"}
                        color={"blue.600"}
                    >
                        BNCC X Tiket Movies
                    </Text>
                </Link>
            </Box>
            <Box>
                {!sessionId ? (
                    <Link href="/login">Login</Link>
                ) : (
                    <>
                        <Link onClick={showProfile} mr="5">
                            Profile
                        </Link>
                        <Link onClick={logout} ml="5">
                            Logout
                        </Link>
                    </>
                )}
            </Box>
        </Box>
    );
}
