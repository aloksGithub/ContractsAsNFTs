import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box, Flex, Heading } from '@chakra-ui/react'
import Navbar from '../components/navbar'
import ContractList from '../components/contractList'

const Home: NextPage = () => {
  const contracts = [
    {
      name: "abcd",
      description: "A smart contract",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "dsaasd",
      description: "Another smart contract",
      price: 999,
      onSale: true,
      link: ""
    },
    {
      name: "dasfas",
      description: "Another smart contract",
      price: 500,
      onSale: true,
      link: ""
    },
    {
      name: "asdftfrtvcr",
      description: "Another smart contract",
      price: 9999,
      onSale: true,
      link: ""
    },
    {
      name: "dfsgrctcs",
      description: "Another smart contract",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "ercsdfgst",
      description: "Another smart contract",
      price: 9,
      onSale: false,
      link: ""
    }
  ]
  return (
    <Box>
      {Navbar()}
      <ContractList contracts={contracts}></ContractList>
    </Box>
  )
}

export default Home
