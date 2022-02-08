import {
	Box,
	Center,
	Stack,
	VStack,
	FormControl,
	FormLabel,
	Input,
	Button,
	Text,
	useToast,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import axios from 'axios';
import sessionId from '../configs';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
	const router = useRouter();
	const toast = useToast();
	const toastStatuses = ['success', 'error'];
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const baseUrl = 'https://api.themoviedb.org/3';
	const apiKey = 'f2f499786a0550c8e14677f17079dee1';

	useEffect(() => {
		if (sessionId) {
			router.push('/')
		}
	}, [])

	const generateRequestToken = async () => {
		const response = await axios.get(
			`${baseUrl}/authentication/token/new?api_key=${apiKey}`,
		);
		if (response.data.success) {
			return response.data.request_token;
		} else {
			return null;
		}
	};

	const generateTokenWithLogin = async () => {
		if (username.trim() === '' || password.trim() === '') {
			showToast('error');
			return;
		}
		let token = await generateRequestToken();
		if (token === null) {
			showToast('error');
			return;
		}
		await axios
			.post(
				`${baseUrl}/authentication/token/validate_with_login?api_key=${apiKey}`,
				{
					username: username,
					password: password,
					request_token: token,
				},
			)
			.then((response) => {
				token = response.data.request_token;
				return generateLoginSession(token);
			})
			.catch(function (error) {
				showToast('error');
			});
	};

	const generateLoginSession = async (token) => {
		await axios
			.post(`${baseUrl}/authentication/session/new?api_key=${apiKey}`, {
				request_token: token,
			})
			.then((response) => {
				let data = response.data;
				if (data.success) {
					sessionId = data.session_id;
					showToast('success');
					router.push('/');
				}
			})
			.catch(function (error) {
				console.log(error);
				showToast('error');
			});
	};

	const showToast = (status) => {
		toast({
			title: status === toastStatuses[0] ? 'Login Berhasil' : `Login Gagal`,
			description:
				status === toastStatuses[0]
					? 'Selamat datang di BNCC Movies'
					: 'Username atau password salah',
			status: status,
			isClosable: true,
		});
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
					{/* <Link href='/'> */}
					<Button
						colorScheme='white'
						variant='link'
						pos={'absolute'}
						top={'50'}
						left={'50'}
					>
						<ChevronLeftIcon w={'8'} h={'8'} />
						<Text display={{ base: 'none', sm: 'block' }}>
							Kembali ke Beranda
						</Text>
					</Button>
					{/* </Link> */}
					<VStack align={{ base: 'center', sm: 'start' }}>
						<Text fontSize={'24px'}>Login ke akun</Text>
						<Text fontSize={'24px'} fontWeight={'bold'}>
							BNCC X Tiket Movies
						</Text>
					</VStack>
				</Center>
			</Box>
			<Box flex='1' className='box' bg={'white'}>
				<Center height={'100%'}>
					<VStack width={'320px'}>
						<FormControl>
							<FormLabel htmlFor='username'>Username</FormLabel>
							<Input
								id='username'
								type='text'
								onChange={(e) => setUsername(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<Input
								id='password'
								type='password'
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
						<Button
							colorScheme='blue'
							width='100%'
							onClick={generateTokenWithLogin}
						>
							Login
						</Button>
					</VStack>
				</Center>
			</Box>
		</Stack>
	);
};

export default Login;
