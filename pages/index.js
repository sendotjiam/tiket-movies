import Head from 'next/head';
import Link from 'next/link';
import { ChakraProvider } from '@chakra-ui/react'
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
	LinkOverlay
} from '@chakra-ui/react';

export default function Home() {
	return (
		<>
			<Head>
				<title>BNCC Movies</title>
				<meta name='description' content='BNCC Movies' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

      <main>
        <Box d="flex" alignItems="center" justifyContent="space-between" pl='20' pr='20' pt='5' pb='5'>
			<Box>
				<Text fontSize={'20px'} fontWeight={'bold'} color={'blue.600'}>
					BNCC X Tiket Movies
				</Text>
			</Box>
			<Box>
				<Link href="/login">
				<a>Login</a></Link>
			</Box>
		</Box>
		
		<Box pl='20' pr='20' pt='10' pb='10' bg={'blue.600'}>
			<Text fontSize={'30px'} fontWeight={'bold'} color='white'>
				Populer Sekarang
			</Text>
			<Box marginBottom='5'></Box>

			
			<SimpleGrid minChildWidth={{base: '100%', md: '15%', lg: '15%' , xl: '15%'}} spacing='12px'>

				<LinkBox>
					<LinkOverlay href = '#'>
						<Box>
							<Center>
								<Image src = 'https://bit.ly/dan-abramov' alt = 'kontol'></Image>
							</Center>
							<Center fontSize={'15px'} fontWeight={'bold'} color='white' mt='10px'>
								Film1
							</Center>
						</Box>
					</LinkOverlay>
				</LinkBox>

				<LinkBox>
					<LinkOverlay href = '#'>
						<Box>
							<Center>
								<Image src = 'https://bit.ly/dan-abramov' alt = 'kontol'></Image>
							</Center>
							<Center fontSize={'15px'} fontWeight={'bold'} color='white' mt='10px'>
								Film2
							</Center>
						</Box>
					</LinkOverlay>
				</LinkBox>

				<LinkBox>
					<LinkOverlay href = '#'>
						<Box>
							<Center>
								<Image src = 'https://bit.ly/dan-abramov' alt = 'kontol'></Image>
							</Center>
							<Center fontSize={'15px'} fontWeight={'bold'} color='white' mt='10px'>
								Film3
							</Center>
						</Box>
					</LinkOverlay>
				</LinkBox>

				<LinkBox>
					<LinkOverlay href = '#'>
						<Box>
							<Center>
								<Image src = 'https://bit.ly/dan-abramov' alt = 'kontol'></Image>
							</Center>
							<Center fontSize={'15px'} fontWeight={'bold'} color='white' mt='10px'>
								Film4
							</Center>
						</Box>
					</LinkOverlay>
				</LinkBox>

				<LinkBox>
					<LinkOverlay href = '#'>
						<Box>
							<Center>
								<Image src = 'https://bit.ly/dan-abramov' alt = 'kontol'></Image>
							</Center>
							<Center fontSize={'15px'} fontWeight={'bold'} color='white' mt='10px'>
								Film5
							</Center>
						</Box>
					</LinkOverlay>
				</LinkBox>
				
			</SimpleGrid>
			
		</Box>

		<Center mt='30px'>
			<Box>
				<Center>
					<Text fontSize={'20px'}>
						Cari Film
					</Text>
				</Center>
				<Flex>
					<FormControl>
						<Input
							id='search'
							type='text'
						/>
					</FormControl>
					<Button colorScheme='blue' ml='5px'>
						Cari
					</Button>
				</Flex>
			</Box>
		</Center>
        
      </main>
		</>
	);
}
