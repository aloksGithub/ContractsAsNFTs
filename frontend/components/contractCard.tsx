import React, { FC, ReactElement, useEffect, useState } from 'react'
import {
    Heading,
    Checkbox,
    Box,
    Center,
    Spacer,
    Flex,
    Text,
    Stack,
    Input,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper
    
} from '@chakra-ui/react';

import {Formik, Field, Form} from 'formik';

export type Contract = {
    name: string;
    description: string;
    owner: string;
    address: string;
    onSale: boolean;
    price: number;
    link: string;
}

const ContractModal = (props: {contract: Contract; isOpen: boolean; onClose: ()=>void}) : ReactElement => {

    const {contract} = props
    
    function validateName(value: string) {
        let error
        if (!value) {
          error = "Name is required"
        }
        return error
    }
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{contract.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={{ 
                            name: contract.name, 
                            description: contract.description, 
                            address: contract.address, 
                            owner: contract.owner, 
                            price: contract.price,
                            onSale: contract.onSale,
                            url: contract.link
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            actions.setSubmitting(false)
                            }, 1000)
                        }}
                        >
                        {(props) => (
                            <Form>
                            <Field name="name" validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel htmlFor="name">First name</FormLabel>
                                    <Input {...field} id="name" placeholder="name" />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name="description" validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <Input {...field} id="description" placeholder="description" />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name="address" validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                    <FormLabel htmlFor="address">Contract address</FormLabel>
                                    <Input {...field} id="address" isDisabled/>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name="owner" validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                    <FormLabel htmlFor="owner">Owner address</FormLabel>
                                    <Input {...field} id="owner"/>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name="url" validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                    <FormLabel htmlFor="url">URL</FormLabel>
                                    <Input {...field} id="url" />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name="price" validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                    <FormLabel htmlFor="price">Price</FormLabel>
                                    <NumberInput {...field} id="price" min={0} max={Infinity}>
                                        <NumberInputField />
                                    </NumberInput>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name="onSale" validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                    <FormLabel htmlFor="onSale">Sale status</FormLabel>
                                    <Checkbox {...field} id="onSale" defaultChecked={contract.onSale}>On sale</Checkbox>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={props.onClose}>
                    Update NFT
                    </Button>
                    <Button onClick={props.onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export const ContractCard = (props: {contract: Contract}) : ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {contract} = props
    return (
        <>
            <Center py={10} width="25%" minWidth="400" onClick={onOpen}>
                <Box
                    maxW={'270px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}
                    _hover={{
                        background: "#ebebeb",
                        cursor: "pointer"
                    }}
                    >
                    <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={10}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'} mb={10}>
                        {contract.name}
                        </Heading>
                        <Text>{contract.description}</Text>
                    </Stack>

                    <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Text fontWeight={600}>{contract.price}</Text>
                        {contract.onSale ? <Text fontWeight={600} textColor="green">On sale</Text> : <Text fontWeight={600}>Not for sale</Text>}
                    </Stack>
                    </Box>
                </Box>
            </Center>
            <ContractModal contract={contract} isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
