import type { NextPage } from 'next'
import type { Contract } from '../components/contractCard'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box, Flex, Heading } from '@chakra-ui/react'
import Navbar from '../components/navbar'
import ContractList from '../components/contractList'
import { GetStaticProps } from 'next'
import {getter, metaMask} from '../web3/web3Repo'
import { useEffect } from 'react'

const Home: NextPage = (props: any) => {
  
  console.log(props)
  const contracts = [
    {
      name: "abcd",
      description: "A smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "dsaasd",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: true,
      link: ""
    },
    {
      name: "dasfas",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 500,
      onSale: true,
      link: ""
    },
    {
      name: "asdftfrtvcr",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9999,
      onSale: true,
      link: ""
    },
    {
      name: "dfsgrctcs",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "ercsdfgst",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9,
      onSale: false,
      link: ""
    },
    {
      name: "asdftfrtvcr",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9999,
      onSale: true,
      link: ""
    },
    {
      name: "dfsgrctcs",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "ercsdfgst",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9,
      onSale: false,
      link: ""
    },
    {
      name: "asdftfrtvcr",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9999,
      onSale: true,
      link: ""
    },
    {
      name: "dfsgrctcs",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "ercsdfgst",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9,
      onSale: false,
      link: ""
    },
    {
      name: "abcd",
      description: "A smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "dsaasd",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: true,
      link: ""
    },
    {
      name: "dasfas",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 500,
      onSale: true,
      link: ""
    },
    {
      name: "asdftfrtvcr",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9999,
      onSale: true,
      link: ""
    },
    {
      name: "dfsgrctcs",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "ercsdfgst",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9,
      onSale: false,
      link: ""
    },
    {
      name: "asdftfrtvcr",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9999,
      onSale: true,
      link: ""
    },
    {
      name: "dfsgrctcs",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "ercsdfgst",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9,
      onSale: false,
      link: ""
    },
    {
      name: "asdftfrtvcr",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9999,
      onSale: true,
      link: ""
    },
    {
      name: "dfsgrctcs",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 999,
      onSale: false,
      link: ""
    },
    {
      name: "ercsdfgst",
      description: "Another smart contract",
      owner: "0xF1aB51C8b69AFdC89A8Db16F7fe2632f8E26a18D",
      address: "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
      price: 9,
      onSale: false,
      link: ""
    }
  ]
  return (
    <Box>
      {Navbar()}
      <ContractList contracts={props.nfts}></ContractList>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nfts = await getter.getAll()
  console.log("CHECK HERE")
  return {
    props: {nfts},
    revalidate: 1
  }
}

export default Home
