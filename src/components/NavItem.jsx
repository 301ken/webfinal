import { Button, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({ description, icon, path }) {
    return (
        <Tooltip
            label={description}
            placement={'right'}
            hasArrow
            fontSize={'xl'}
            borderRadius={'2xl'}
        >
            <Button
                p={7}
                borderRadius={'2xl'}
                fontSize={'3xl'}
                as={NavLink}
                to={path}
                color={'#0ff'}
                bg="#111"
                boxShadow="0 0 12px #0ff, 0 0 24px #0ff"
                _hover={{
                    boxShadow: '0 0 16px #0ff, 0 0 32px #0ff',
                    transform: 'scale(1.05)',
                    color: '#fff',
                }}
                _activeLink={{
                    boxShadow: '0 0 16px #0ff, 0 0 32px #0ff',
                    bg: '#000',
                }}
                rightIcon={icon}
                sx={{
                    textShadow: '0 0 6px #0ff, 0 0 12px #0ff',
                    transition: 'all 0.3s ease',
                }}
            >
                <Text as={'b'}>{description}</Text>
            </Button>
        </Tooltip>
    );
}

export default NavItem;
