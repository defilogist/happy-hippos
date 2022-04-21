import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

import { useWallet } from "@solana/wallet-adapter-react";
import { resolveToWalletAddress } from "@nfteyez/sol-rayz";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

const HIPPO_MINT_ADDRESS = "Ckiu82pLoj6mQdPUxuvvWzhWrZEpaVjbyQwcmNfRLwZW";
const AUTHORITY_ADDRESS = "Cm8VhX861jnneSzziMquCYj5CK6t1kt6QFKkFcPGb72P";

type HippoData = {
  name: string;
};

type HippoCard = {
  data: HippoData | null;
};


const getNfts = async (connection, wallet) => {
  const publicAddress = await resolveToWalletAddress({
    text: wallet.publicKey
  });
  const { nfts, isLoading, error } = await useWalletNfts({
    publicAddress,
    connection,
  });
  const hippos = nfts
    .filter(nft => nft.updateAuthority === AUTHORITY_ADDRESS)
    .sort((a, b) => {
        const aname = a.data.name.substring("happy hippo #".length)
        const bname = b.data.name.substring("happy hippo #".length)
        return aname.padStart(4, '0').localeCompare(bname.padStart(4, '0'))
     })

   return hippos
}

const HippoRow = ({ id }: any) => {
  return (
  <Link href={`/hippo/${id}`}>
    <div className="bg-white rounded-md shadow-md text-black cursor-pointer">
        <Image
          className="rounded-t-md"
          src={`/metadata/${id}.png`}
          alt="Hippo #{id} picture"
          height="200"
          width="200"
        />
        <div className="p-2 text-center">{id}</div>
    </div>
  </Link>
  )
}

const MyHippos: NextPage = (props) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const publicKey = wallet.publicKey;
  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicKey ? publicKey.toString() : '',
    connection,
  });
  const hippos = nfts
    .filter(nft => nft.updateAuthority === AUTHORITY_ADDRESS)
    .sort((a, b) => {
        const aname = a.data.name.substring("happy hippo #".length)
        const bname = b.data.name.substring("happy hippo #".length)
        return aname.padStart(4, '0').localeCompare(bname.padStart(4, '0'))
     })

  useEffect(() => {
  }, [])

  return (
    <div>
      <Head>
        <title>My Happy Hippos</title>
        <meta
          name="description"
          content="The hippos available in my wallet."
        />
      </Head>
      <h1 className="max-w-screen-lg m-auto text-center funny text-6xl mt-8 mb-8">
        My Happy Hippos
      </h1>
      <div className="grid grid-cols-5 gap-4 p-3 max-w-screen-lg m-auto">
        {hippos.map((hippo, i) => {
          const hid = hippo.data.name.substring("happy hippo #".length)
          return (
            <HippoRow key={hid} id={hid}></HippoRow>
          )
        })}
      </div>
    </div>
  );
};

export default MyHippos;
