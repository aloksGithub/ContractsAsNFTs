import { useRouter } from 'next/router'
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import {getter, metaMask} from '../../web3/web3Repo'
import {Contract} from '../../components/contractCard'
import { Box, Center, Heading, FormControl, FormLabel, FormErrorMessage, Input, NumberInput, NumberInputField, Checkbox,
    Textarea, Flex, Button
} from '@chakra-ui/react'
import Navbar from '../../components/navbar'
import {Formik, Field, Form} from 'formik';
import Link from 'next/link'

interface Props {
    nft: Contract;
}

const NFT: NextPage<Props> = (props) => {
    const router = useRouter()
    const {id} = router.query
    const {nft: contract} = props
        
    function validateName(value: string) {
        let error
        if (!value) {
          error = "Name is required"
        }
        return error
    }

    return (
        <Box>
        {Navbar()}
        <Box width="50%" margin="auto" background="#dcf3f7" padding={10} marginTop={20} borderRadius={25}>
            <Center>
            <Heading paddingBottom={10}>{contract.name} Ownership NFT</Heading>
            </Center>
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
                            {({ field, form }:any) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel htmlFor="name">Contract Name</FormLabel>
                                <Input background="white" {...field} id="name" placeholder="name" />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        <Field name="description" validate={validateName}>
                            {({ field, form }:any) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                <FormLabel htmlFor="description">Description</FormLabel>
                                <Textarea background="white" {...field} id="description" placeholder="description" />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        <Flex direction="row">
                            <Flex direction="column" width="50%" pr={5}>
                                <Field name="address" validate={validateName}>
                                    {({ field, form }:any) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                        <FormLabel htmlFor="address">Contract address</FormLabel>
                                        <Input background="white" {...field} id="address" isDisabled/>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name="owner" validate={validateName}>
                                    {({ field, form }:any) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                        <FormLabel htmlFor="owner">Owner address</FormLabel>
                                        <Input background="white" {...field} id="owner"/>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                            </Flex>
                            <Flex direction="column" width="50%" pl={5}>
                                <Field name="url" validate={validateName}>
                                    {({ field, form }:any) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                        <FormLabel htmlFor="url">URL</FormLabel>
                                        <Input background="white" {...field} id="url" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Flex direction="row">
                                    <Field name="price" validate={validateName}>
                                        {({ field, form }:any) => (
                                        <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                            <FormLabel htmlFor="price">Price</FormLabel>
                                            <NumberInput background="white" width="100px" {...field} id="price" min={0} max={Infinity}>
                                                <NumberInputField />
                                            </NumberInput>
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                        )}
                                    </Field>
                                    <Field name="onSale" validate={validateName}>
                                        {({ field, form }:any) => (
                                        <FormControl isInvalid={form.errors.name && form.touched.name} pt={5}>
                                            <FormLabel htmlFor="onSale">Sale status</FormLabel>
                                            <Checkbox iconColor="white" {...field} id="onSale" defaultChecked={contract.onSale}>On sale</Checkbox>
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                        )}
                                    </Field>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex pt={10} justifyContent="flex-end">
                            <Button colorScheme="blue" mr={5}>
                                Update NFT
                            </Button>
                            <Link href={`/`}>
                                <Button variant="outline" background="white" >
                                    Return
                                </Button>
                            </Link>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Box>
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async (params) => {
    const nft = await getter.getNFT(+(params?.params?.id || 1))
    return {
      props: {nft},
      revalidate: 20
    }
  }

export const getStaticPaths: GetStaticPaths = async () => {
    const nfts = await getter.getAll()
    const paths = nfts.map((nft: Contract) => ({
        params: { id: nft.id },
    }))
    console.log(paths)
    return { paths, fallback: false }
}

export default NFT