import React, { useContext } from 'react';
import { Card, CardHeader, Box, Flex, Avatar, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProfileCard({ userName, userImage }) {
    const { logout } = useContext(AuthContext);

    return (
        <Flex
            position={{ base: 'relative', xl: 'fixed' }}
            alignItems={{ base: 'center', xl: 'flex-end' }}
            justifyContent={{ base: 'center', xl: 'flex-end' }}
            width={"100%"}
            right={{ xl: 12 }}
            top={{ base: 4, xl: 12 }}
        >
            <Card
                w={{ base: 'md', xl: 'sm' }}
                bgGradient="linear(to-r, #00b0ff, #8E44AD)" // Neon blue to pink gradient
                boxShadow="0 0 15px rgba(0, 176, 255, 0.6), 0 0 25px rgba(142, 68, 173, 0.6)" // Glowing shadows
                borderRadius="xl"
                color="white"
                _hover={{
                    boxShadow: '0 0 25px rgba(0, 176, 255, 1), 0 0 35px rgba(142, 68, 173, 1)', // Glow effect on hover
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease-in-out'
                }}
                transition="all 0.3s ease-in-out"
            >
                <CardHeader>
                    <HStack justifyContent={'center'} alignItems={'center'} spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={userName} src={userImage} border="2px solid #fff" boxSize="80px" />
                            <Box>
                                <Text color={'#B3B6B7'}>Logged in as:</Text>
                                <Heading size='sm' fontWeight="bold" textShadow="0 0 8px rgba(0, 176, 255, 0.8), 0 0 15px rgba(142, 68, 173, 0.8)">
                                    {userName}
                                </Heading>
                            </Box>
                        </Flex>
                        <Button
                            onClick={() => logout()}
                            colorScheme={'pink'}
                            variant="outline"
                            _hover={{ bg: 'pink.500', color: 'white' }}
                            borderRadius="full"
                            borderColor="pink.500"
                            textShadow="0 0 5px rgba(255, 20, 147, 1)" // Adding a pink glow to the button
                        >
                            Log out
                        </Button>
                    </HStack>
                </CardHeader>
            </Card>
        </Flex>
    );
}

export default ProfileCard;

