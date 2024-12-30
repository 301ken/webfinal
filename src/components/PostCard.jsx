import { Flex, Card, CardHeader, CardBody, CardFooter, Button, Avatar, Box, Heading, Text, Image } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import LikeService from '../services/LikeService';
import CommentModal from './CommentModal';

function PostCard({ userName, userImage, description, postImage, postId, userId }) {
    const likeService = new LikeService();
    const { user } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    const handleLike = async () => {
        try {
            await likeService.add(user.id, postId, localStorage.getItem("token"));
            getLikes();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnlike = async () => {
        try {
            await likeService.delete(user.id, postId, localStorage.getItem("token"));
            getLikes();
        } catch (error) {
            console.log(error);
        }
    };

    const checkIsLiked = useCallback(async () => {
        try {
            const result = await likeService.isLiked(user.id, postId, localStorage.getItem("token"));
            setIsLiked(result.data);
        } catch (error) {
            console.log(error);
        }
    }, [user.id, postId, likes.length]);

    const getLikes = useCallback(async () => {
        try {
            const result = await likeService.getLikesByPost(postId, localStorage.getItem("token"));
            setLikes(result.data);
        } catch (error) {
            console.log(error);
        }
    }, [postId]);

    useEffect(() => {
        checkIsLiked();
        getLikes();
    }, [checkIsLiked, getLikes]);

    return (
        <Card
            maxW="lg"
            bg="#111"
            borderRadius="2xl"
            boxShadow="0 0 20px #0ff, 0 0 30px #0ff"
            _hover={{
                transform: "scale(1.05)",
                boxShadow: "0 0 25px #0ff, 0 0 40px #0ff",
                transition: "all 0.3s ease-in-out",
            }}
        >
            <CardHeader as={Link} to={`/profile/${userId}`} _hover={{ textDecoration: "none" }}>
                <Flex spacing="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Avatar
                            name={userName}
                            src={userImage}
                            borderColor="#0ff"
                            borderWidth="2px"
                            boxShadow="0 0 10px #0ff"
                        />
                        <Box>
                            <Heading size="sm" color="#0ff" textShadow="0 0 8px #0ff">
                                {userName}
                            </Heading>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text color="#0ff" textShadow="0 0 5px #0ff">
                    {description}
                </Text>
            </CardBody>
            {postImage && (
                <Image
                    maxW="md"
                    maxH="sm"
                    objectFit="contain"
                    src={postImage}
                    fallback={null}
                    borderRadius="lg"
                    boxShadow="0 0 12px #0ff"
                />
            )}

            <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                    "& > button": {
                        minW: "136px",
                    },
                }}
            >
                {isLiked ? (
                    <Button
                        onClick={handleUnlike}
                        flex="1"
                        color="#0ff"
                        bg="#111"
                        border="1px solid #0ff"
                        leftIcon={<BiLike />}
                        boxShadow="0 0 12px #0ff"
                        _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "0 0 20px #0ff, 0 0 30px #0ff",
                        }}
                    >
                        Like {likes.length}
                    </Button>
                ) : (
                    <Button
                        onClick={handleLike}
                        flex="1"
                        variant="outline"
                        color="#0ff"
                        borderColor="#0ff"
                        leftIcon={<BiLike />}
                        _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "0 0 20px #0ff, 0 0 30px #0ff",
                        }}
                    >
                        Like {likes.length}
                    </Button>
                )}

                <CommentModal postId={postId} />
                <Button
                    flex="1"
                    variant="outline"
                    color="#0ff"
                    borderColor="#0ff"
                    leftIcon={<BiShare />}
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0 0 20px #0ff, 0 0 30px #0ff",
                    }}
                >
                    Share
                </Button>
            </CardFooter>
        </Card>
    );
}

export default PostCard;

