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
  const { connection } = useConnection();
  const wallet = useWallet();
  const publicKey = wallet.publicKey;

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicKey,
    connection,
  });
  const hippos = nfts.filter(nft => nft.updateAuthority === AUTHORITY_ADDRESS)

  return (
    <div>
      <Head>
        <title>My Happy Hippos</title>
        <meta
          name="description"
          content="The hippos available in my wallet."
        />
      </Head>
      <HomeView />
      <h1>My Happy Hippos</h1>
      <p>{publicKey ? publicKey.toString() : 'no wallet connected'}</p>
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
