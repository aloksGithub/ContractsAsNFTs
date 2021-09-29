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

interface Props {
  nfts: Contract[];
}

const Home: NextPage<Props> = (props) => {

  return (
    <Box>
      {Navbar()}
      <ContractList contracts={props.nfts}></ContractList>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nfts = await getter.getAll()
  return {
    props: {nfts},
    revalidate: 10
  }
}

export default Home
