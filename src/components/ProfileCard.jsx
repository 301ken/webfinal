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
                bgGradient="linear(to-r, #8E44AD, #2C3E50)"
                boxShadow="xl"
                borderRadius="xl"
                color="white"
                _hover={{ boxShadow: '2xl' }}
                transition="all 0.3s ease-in-out"
            >
                <CardHeader>
                    <HStack justifyContent={'center'} alignItems={'center'} spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={userName} src={userImage} border="2px solid #fff" boxSize="80px" />
                            <Box>
                                <Text color={'#B3B6B7'}>Logged in as :</Text>
                                <Heading size='sm' fontWeight="bold">{userName}</Heading>
                            </Box>
                        </Flex>
                        <Button
                            onClick={() => logout()}
                            colorScheme={'pink'}
                            variant="outline"
                            _hover={{ bg: 'pink.500', color: 'white' }}
                            borderRadius="full"
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
