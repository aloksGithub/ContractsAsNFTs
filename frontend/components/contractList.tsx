import React, { FC, ReactElement, useEffect, useState } from 'react'
import ContractConnection from '../web3/web3Repo'
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
  } from '@chakra-ui/react';

type Contract = {
    name: string;
    description: string;
    onSale: boolean;
    price: number;
    link: string;
}

const ContractCard: FC<Contract> = (props: Contract) : ReactElement => {
    return (
        <Center py={10} width="25%" minWidth="400">
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
                    {props.name}
                    </Heading>
                    <Text>{props.description}</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Text fontWeight={600}>{props.price}</Text>
                    {props.onSale ? <Text fontWeight={600} textColor="green">On sale</Text> : <Text fontWeight={600}>Not for sale</Text>}
                </Stack>
                </Box>
            </Box>
        </Center>
    )
}

const ContractList: FC<{contracts: Contract[]}> = (props: {contracts: Contract[]}) : ReactElement => {
    const [displayedContracts, setDisplayedContracts] = useState([{
        name: '',
        description: '',
        onSale: false,
        price: 0,
        link: ''
    }]);
    const [searchName, setSearcName] = useState('')
    const [onSale, setOnSale] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(Infinity)

    useEffect(() => {
        setDisplayedContracts(props.contracts)
    }, [])

    useEffect(() => {
        const nameFilteredContracts = props.contracts.filter(contract => contract.name.includes(searchName))
        const minPriceFilteredContracts = nameFilteredContracts.filter(contract => contract.price>=minPrice)
        const maxPriceFilteredContracts = minPriceFilteredContracts.filter(contract => contract.price<=maxPrice)
        let finalFilteredContracts = maxPriceFilteredContracts
        if (onSale) {
            finalFilteredContracts = maxPriceFilteredContracts.filter(contract => contract.onSale)
        }
        setDisplayedContracts(finalFilteredContracts)
    }, [searchName, onSale, minPrice, maxPrice])

    const onChangeSearch = (e:any) => {
        setSearcName(e.target.value)
    }

    const onChangeMinPrice = (e:any) => {
        if (isNaN(e.target.value) || e.target.value==='') {
            setMinPrice(0)
        } else {
            setMinPrice(+e.target.value)
        }
    }

    const onChangeMaxPrice = (e:any) => {
        if (isNaN(e.target.value) || e.target.value==='') {
            setMaxPrice(Infinity)
        } else {
            setMaxPrice(+e.target.value)
        }
    }

    const onSaleFilter = (e:any) => {
        setOnSale(e.target.checked)
    }

    return (
        <Box width="70%" margin="auto">
            <Flex direction="row" py={10} px={5}>
                <Input width="25%" placeholder="Search contracts" onChange={onChangeSearch}/>
                <Spacer/>
                <Checkbox alignItems="center" px="5">My Contracts</Checkbox>
                <Checkbox alignItems="center" px="5" onChange={onSaleFilter}>On sale</Checkbox>
                <Flex alignItems="center" pl="5" pr="2"><Text>Min Price (eth):</Text></Flex>
                <Input width="20" onChange={onChangeMinPrice}/>
                <Flex alignItems="center" pl="5" pr="2"><Text>Max Price (eth):</Text></Flex>
                <Input width="20" onChange={onChangeMaxPrice}/>
            </Flex>
            <Flex background="#dcf3f7" wrap="wrap" alignItems="center" justifyContent="space-between">{displayedContracts.map(contract => <ContractCard {...contract}></ContractCard>)}</Flex>
        </Box>
    )
}

export default ContractList