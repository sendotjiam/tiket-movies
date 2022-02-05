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
import Link from 'next/link';

const Login = () => {
	const toast = useToast();
	const toastStatuses = ['success', 'error'];

	const generateSessionWithLogin = () => {
		showToast('error');
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
							<Input id='username' type='text' />
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<Input id='password' type='password' />
						</FormControl>
						<Button
							colorScheme='blue'
							width='100%'
							onClick={generateSessionWithLogin}
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
