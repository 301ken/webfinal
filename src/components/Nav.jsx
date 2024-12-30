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
                bg={useColorModeValue('black', 'black')}
                color="white"
                borderRadius="2xl"
                spacing={10}
                p="20px"
                pt={{ lg: '10vh' }}
                h={{ sm: 'auto', lg: '95vh' }}
                direction={{ sm: 'row', lg: 'column' }}
                boxShadow="0 0 15px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4)"
                _hover={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease',
                }}
            >
                {/* Navigation Item: Home */}
                <NavItem
                    description="Home"
                    icon={<BiHome />}
                    path="/home"
                    bgGradient="linear(to-r, #00FFFF, #39FF14)" // Neon cyan to neon green
                    hoverBg="#39FF14" // Neon green on hover
                    textColor="white"
                    hoverColor="black"
                />

                {/* Navigation Item: Profile */}
                <NavItem
                    description="Profile"
                    icon={<CgProfile />}
                    path={`/profile/${user?.id}`}
                    bgGradient="linear(to-r, #FF007F, #00FFFF)" // Neon pink to neon cyan
                    hoverBg="#FF007F" // Neon pink on hover
                    textColor="white"
                    hoverColor="black"
                />

                {/* Add Post Button */}
                <AddPost />
            </Stack>
        </Box>
    );
}

export default Nav;

