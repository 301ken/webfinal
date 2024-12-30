import { Center, VStack } from '@chakra-ui/react';
import React from 'react';
import PostCard from './PostCard';

function Posts({ posts }) {
    const imageUrl = process.env.REACT_APP_API + "postimages/download/";

    return (
        <>
            <Center
                bg="#111"
                bgGradient="linear(to-r, #0F2027, #203A43, #2C5364)"
                p={5}
                minHeight="100vh"
                boxShadow="inset 0 0 50px #0ff"
            >
                <VStack marginTop={'50px'} spacing={5}>
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            description={post.description}
                            userName={post.userName + " " + post.userLastName}
                            postImage={imageUrl + post.id}
                            postId={post.id}
                            userId={post.userId}
                        />
                    ))}
                </VStack>
            </Center>
        </>
    );
}

export default Posts;
