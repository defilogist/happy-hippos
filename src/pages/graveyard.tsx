import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import Image from "next/image";
import Link from "next/link";

const HIPPO_MINT_ADDRESS = "Ckiu82pLoj6mQdPUxuvvWzhWrZEpaVjbyQwcmNfRLwZW";
const AUTHORITY_ADDRESS = "Cm8VhX861jnneSzziMquCYj5CK6t1kt6QFKkFcPGb72P";


const HippoRow = ({ id }: any) => {
  return (
    <div class="bg-white rounded-md shadow-md text-black">
      <Link href={`/hippo/${id}`}>
        <Image
          class="rounded-t-md"
          src={`/metadata/${id}.png`}
          alt="Hippo #{id} picture"
          height="200"
          width="200"
        />
      </Link>
      <span class="text-center">#{id}</span>
    </div>
  )
}

const MyHippos: NextPage = (props) => {
  const publicKey = 'hippoi8ksKEVAdEYLYgmEJ18VxuBnY3bv8eNuMMXj5q'
  const { connection } = useConnection();
  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicKey,
    connection,
  });
  const hippos = nfts
    .filter(nft => nft.updateAuthority === AUTHORITY_ADDRESS)
    .sort((a, b) => {
        const aname = a.data.name.substring("happy hippo #".length)
        const bname = b.data.name.substring("happy hippo #".length)
        return aname.padStart(4, '0').localeCompare(bname.padStart(4, '0'))
     })

  return (
    <div>
      <Head>
        <title>Hippo Graveyard</title>
        <meta
          name="description"
          content="The hippos burned by the community."
        />
      </Head>
      <HomeView />
      <h1>Burned Hippos</h1>
      <div class="grid grid-cols-5 gap-4 p-3 max-w-screen-lg m-auto">
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
