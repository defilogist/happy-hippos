import type { NextPage } from "next";
import Head from "next/head";
import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { HomeView } from "../views";
import { HippoList } from '../components/HippoList';

const AUTHORITY_ADDRESS = "Cm8VhX861jnneSzziMquCYj5CK6t1kt6QFKkFcPGb72P";


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
      <h1 className="max-w-screen-lg m-auto text-center funny text-6xl mt-8 mb-8">
        Graveyard of the burned Hippos
      </h1>
      <HippoList hippos={hippos} isLoading={isLoading}></HippoList>
    </div>
  );
};

export default MyHippos;
