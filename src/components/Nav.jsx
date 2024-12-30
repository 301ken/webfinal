import {
    Box,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { BiHome } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import AuthContext from '../context/AuthContext';
import AddPost from '../pages/AddPost';
import NavItem from './NavItem';

function Nav() {
    const { user } = useContext(AuthContext);

    return (
        <Box
            top={{ lg: 4 }}
            zIndex={1}
            w={{ sm: "100%", lg: '30vh' }}
            position={{ sm: 'sticky', lg: 'fixed' }}
            px={5}
        >
            <Stack
                bg={useColorModeValue('linear-gradient(to right, #9B59B6, #8E44AD)', 'linear-gradient(to right, #9B59B6, #8E44AD)')}
                color={useColorModeValue('white', 'gray.200')}
                borderRadius="2xl"
                spacing={10}
                p="20px"
                pt={{ lg: '10vh' }}
                h={{ sm: 'auto', lg: '95vh' }}
                direction={{ sm: 'row', lg: 'column' }}
                boxShadow="xl"
                _hover={{
                    boxShadow: '2xl',
                    transform: 'scale(1.02)',
                    transition: 'all 0.3s ease',
                }}
            >
                {/* Navigation Item: Home */}
                <NavItem
                    description="Home"
                    icon={<BiHome />}
                    path="/home"
                    bgGradient="linear(to-r, #8E44AD, #9B59B6)"
                    hoverBg="purple.500"
                    textColor="white"
                    hoverColor="white"
                />

                {/* Navigation Item: Profile */}
                <NavItem
                    description="Profile"
                    icon={<CgProfile />}
                    path={`/profile/${user?.id}`}
                    bgGradient="linear(to-r, #8E44AD, #9B59B6)"
                    hoverBg="purple.600"
                    textColor="white"
                    hoverColor="white"
                />

                {/* Add Post Button */}
                <AddPost />
            </Stack>
        </Box>
    );
}

export default Nav;
