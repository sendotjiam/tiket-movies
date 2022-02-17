import React, { useState, useEffect } from 'react';
import { Box, Button, Center, FormControl, FormLabel, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react'
const Profile = () => {

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
					
                    <Image
                        borderRadius='full'
                        boxSize='300px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
				</Center>
			</Box>
			<Box flex='1' className='box' bg={'white'}>
				<Center height={'100%'}>
					<VStack  width={'320px'} align={{ base: 'center', sm: 'start' }}>
                        <Text fontSize='xl'>ID : </Text>
                        <Text fontSize='xl'>Iso_639_1 : </Text>
                        <Text fontSize='xl'>Iso_3166_1 :</Text>
                        <Text fontSize='xl'>Name: </Text>
                        <Text fontSize='xl'>Include_adult : </Text>
                        <Text fontSize='xl'>Username : </Text>
					</VStack>
				</Center>
			</Box>
		</Stack>
	);
};




export default Profile;

