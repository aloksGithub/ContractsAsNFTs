import React, { FC, ReactElement, useEffect, useState } from 'react'
import {
    Checkbox,
    Box,
    Spacer,
    Flex,
    Text,
    Input,
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import styles from './contractList.module.css'

import {Contract, ContractCard} from './contractCard'

const ContractList: FC<{contracts: Contract[]}> = (props: {contracts: Contract[]}) : ReactElement => {
    const [displayedContracts, setDisplayedContracts] = useState([{
        name: '',
        description: '',
        owner: '',
        address: '',
        onSale: false,
        price: 0,
        link: ''
    }]);
    const [loadedContracts, setLoadedContracts] = useState([{
        name: '',
        description: '',
        owner: '',
        address: '',
        onSale: false,
        price: 0,
        link: ''
    }]);
    const [searchName, setSearcName] = useState('')
    const [onSale, setOnSale] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(Infinity)
    const [currentPage, setCurrentPage] = useState(0)
    const [cardsPerPage, setCardsPerPage] = useState(6)

    useEffect(() => {
        setLoadedContracts(props.contracts)
        setDisplayedContracts(props.contracts.slice((currentPage)*cardsPerPage, (currentPage)*cardsPerPage+cardsPerPage))
    }, [])

    useEffect(() => {
        const nameFilteredContracts = props.contracts.filter(contract => contract.name.includes(searchName))
        const minPriceFilteredContracts = nameFilteredContracts.filter(contract => contract.price>=minPrice)
        const maxPriceFilteredContracts = minPriceFilteredContracts.filter(contract => contract.price<=maxPrice)
        let finalFilteredContracts = maxPriceFilteredContracts
        if (onSale) {
            finalFilteredContracts = maxPriceFilteredContracts.filter(contract => contract.onSale)
        }
        setLoadedContracts(finalFilteredContracts)
        const paginationFilteredContracts = finalFilteredContracts.slice((currentPage)*cardsPerPage, (currentPage)*cardsPerPage+cardsPerPage)
        setDisplayedContracts(paginationFilteredContracts)
    }, [searchName, onSale, minPrice, maxPrice, currentPage])

    const onChangeSearch = (e:any) => {
        setSearcName(e.target.value)
        setCurrentPage(1)
    }

    const onChangeMinPrice = (e:any) => {
        if (isNaN(e.target.value) || e.target.value==='') {
            setMinPrice(0)
        } else {
            setMinPrice(+e.target.value)
        }
        setCurrentPage(1)
    }

    const onChangeMaxPrice = (e:any) => {
        if (isNaN(e.target.value) || e.target.value==='') {
            setMaxPrice(Infinity)
        } else {
            setMaxPrice(+e.target.value)
        }
        setCurrentPage(1)
    }

    const onSaleFilter = (e:any) => {
        setOnSale(e.target.checked)
        setCurrentPage(1)
    }

    const handlePageChange = (data:{selected: number}) => {
        setCurrentPage(data.selected)
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
            <Flex background="#dcf3f7" wrap="wrap" alignItems="center" justifyContent="space-between">{displayedContracts.map(contract => <ContractCard contract={contract}></ContractCard>)}</Flex>
            <Flex className={styles.pagination} justifyContent="end" py={10}>
                <ReactPaginate 
                pageCount={Math.ceil(loadedContracts.length/cardsPerPage)} 
                pageRangeDisplayed={6} 
                marginPagesDisplayed={2} 
                onPageChange={handlePageChange}/>
            </Flex>
        </Box>
    )
}

export default ContractList