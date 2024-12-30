import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    Input,
    InputRightElement,
    InputGroup,
    Card,
    CardBody,
    Heading,
    VStack,
} from '@chakra-ui/react';
import CommentService from '../services/CommentService';
import { useFormik } from 'formik';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function CommentModal({ postId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const getData = useCallback(async () => {
        const commentService = new CommentService();
        try {
            const result = await commentService.getAllByPost(postId, localStorage.getItem('token'));
            setComments(result.data);
        } catch (error) {
            console.log(error);
        }
    }, [postId]);

    useEffect(() => {
        getData();
    }, [getData]);

    const formik = useFormik({
        initialValues: {
            description: '',
            postId: postId,
            userId: user.id,
        },
        onSubmit: async (values) => {
            const commentService = new CommentService();
            try {
                await commentService.add(values, localStorage.getItem('token'));
                getData();
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <>
            <Button
                flex="1"
                variant="ghost"
                onClick={onOpen}
                _hover={{
                    bg: 'linear-gradient(90deg, #0ff 0%, #0f0 50%, #00f 100%)',
                    color: '#fff',
                    textShadow: '0 0 8px #0ff, 0 0 16px #0f0',
                    boxShadow: '0 0 12px #0ff',
                }}
                sx={{
                    color: '#fff',
                    textShadow: '0 0 8px #0ff, 0 0 16px #0f0',
                    boxShadow: '0 0 12px #0ff',
                }}
            >
                Comment {comments.length}
            </Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                scrollBehavior="inside"
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent
                    alignItems="center"
                    bg="#1a1a1a"
                    color="#0ff"
                    boxShadow="0 0 16px #0ff"
                    borderRadius="lg"
                    border="1px solid #0ff"
                >
                    <ModalHeader>
                        <Text fontSize="lg" textShadow="0 0 12px #0ff">
                            Comments
                        </Text>
                        <InputGroup as="form" onSubmit={formik.handleSubmit} size="md" mt={3}>
                            <Input
                                pr="4.5rem"
                                type="text"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="description"
                                placeholder="Share a Comment"
                                _placeholder={{ color: '#999' }}
                                bg="#111"
                                color="#0ff"
                                border="1px solid #0ff"
                                _focus={{
                                    borderColor: '#0ff',
                                    boxShadow: '0 0 8px #0ff',
                                }}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    h="1.75rem"
                                    size="sm"
                                    bg="#0ff"
                                    color="#000"
                                    _hover={{
                                        bg: '#0f0',
                                        boxShadow: '0 0 12px #0f0',
                                    }}
                                >
                                    Share
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="100%">
                        <VStack spacing={2}>
                            {comments.map((comment) => (
                                <Card
                                    as={Link}
                                    to={`/profile/${comment.userId}`}
                                    key={comment.id}
                                    width="100%"
                                    size="sm"
                                    bg="#1a1a1a"
                                    color="#0ff"
                                    boxShadow="0 0 8px #0ff"
                                    _hover={{
                                        bg: '#111',
                                        boxShadow: '0 0 12px #0ff',
                                    }}
                                >
                                    <CardBody>
                                        <Heading size="md" textShadow="0 0 8px #0ff">
                                            {comment.userName + ' ' + comment.userLastName}
                                        </Heading>
                                        <Text>{comment.description}</Text>
                                    </CardBody>
                                </Card>
                            ))}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CommentModal;
