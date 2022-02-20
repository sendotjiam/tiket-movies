import React, { useState, useEffect } from 'react';
import {
	Box,
	Center,
	Stack,
	Text,
	VStack,
	Button,
	Flex,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from "next/router";

const Profile = () => {
	const [userData, setUserData] = useState([]);

	const baseUrl = process.env.baseURL;
	const apiKey = process.env.apiKey;
    const router = useRouter();
	useEffect(() => {
		axios
			.get(`${baseUrl}/account?api_key=${apiKey}&session_id=${getSessionId()}`)
			.then((res) => {
				console.log(res.data.avatar.tmdb.avatar_path);
				console.log(getSessionId());
				setUserData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const getSessionId = () => {
		return window.localStorage.getItem('session_id');
	};

	const getAvatarPath = () => {
		try {
			const avatarPath = userData.avatar.tmdb.avatar_path;
			if (avatarPath) {
				return `https://www.themoviedb.org/t/p/w150_and_h150_face${userData.avatar.tmdb.avatar_path}`;
			} else {
				return 'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png';
			}
		} catch {
			return 'https://101red.com/prime/wp-content/uploads/2021/03/24-Error-404-Not-Found-Apa-Artinya-serta-Gimana-Metode-Mengatasinya.jpg';
		}
	};

	return (
		<Stack
			className={'stack'}
			direction={['column', 'row']}
			height={'100vh'}
			width={'100vw'}
		>
			<Box flex='1' className='box' bg={'#2B6CB0'}>
				<Center color={'white'} height={'100%'}>
					<Button
						colorScheme='white'
						variant='link'
						pos={'absolute'}
						top={'50'}
						left={'50'}
						onClick={() => router.back()}
					>
						<ChevronLeftIcon w={'8'} h={'8'} />
						<Text display={{ base: 'none', sm: 'block' }}>Kembali</Text>
					</Button>

					<Image
						borderRadius='full'
						boxSize='300px'
						src={getAvatarPath()}
						alt='Dan Abramov'
					/>
				</Center>
			</Box>
			<Box flex='1' className='box' bg={'white'}>
				<Center height={'100%'}>
					<VStack width={'320px'} align={{ base: 'center', sm: 'start' }}>
						<Text fontSize='xl'>ID : {userData.id} </Text>

						{userData.name ? (
							<Text fontSize='xl'>Name :{userData.name}</Text>
						) : (
							<Flex>
								<Text fontSize='xl'>Name : </Text>
								<Text fontSize='xl' color='red'>
									{" Name haven't been set"}
								</Text>
							</Flex>
						)}
						<Text fontSize='xl'>Username : {userData.username} </Text>
					</VStack>
				</Center>
			</Box>
		</Stack>
	);
};

export default Profile;
