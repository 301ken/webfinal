import { Button, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({ description, icon, path }) {
    return (
        <Tooltip
            label={description}
            placement={'right'}
            hasArrow
            direction='ltr'
            fontSize={'xl'}
            borderRadius={'2xl'}
        >
            <Button
                p={7}
                borderRadius={'2xl'}
                colorScheme={'purple'}
                bgGradient="linear(to-r, #8E44AD, #9B59B6)"
                color={'white'}
                fontSize={'3xl'}
                as={NavLink}
                to={path}
                _hover={{
                    boxShadow: '2xl',
                    transform: 'scale(1.05)',
                    bgGradient: 'linear(to-r, #9B59B6, #8E44AD)',
                    color: 'white',
                }}
                _activeLink={{
                    boxShadow: '2xl',
                    bgGradient: 'linear(to-r, #9B59B6, #8E44AD)',
                    color: 'white',
                }}
                rightIcon={icon}
            >
                <Text as={'b'}>{description}</Text>
            </Button>
        </Tooltip>
    );
}

export default NavItem;
