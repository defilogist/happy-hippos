import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'

import { HomeView } from "../../views";
import Link from "next/link";

const HippoRow = ({ id }: any) => {
  id = id + 1
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
    </div >
  )
}

const Hippos: NextPage = (props) => {
  const router = useRouter()
  let query = router.query
  let hid = parseInt(query.hid) | 1
  if (hid < 1) hid = 1
  if (hid > 44) hid = 44
  hid = hid - 1

  return (
    <div>
      <Head>
        <title>All Happy Hippos</title>
        <meta
          name="description"
          content="The home of the Happy Hippos community"
        />
      </Head>
      <HomeView />
      <h1 class="text-3xl p-3 max-w-screen-lg m-auto">All Happy Hippos</h1>
      <div class="max-w-screen-lg m-auto">
        {[...Array(44)].map((x, i) =>
          <Link href={`/hippos/${i + 1}`}>
            <div class="inline"><a class="pointer">{i}</a><span> - </span></div>
          </Link>
        )}
      </div>
      <div class="grid grid-cols-5 gap-4 p-3 max-w-screen-lg m-auto">
        {[...Array(100)].map((x, i) =>
          <HippoRow key={i + 100 * hid} id={i + 100 * hid}></HippoRow>
        )}
      </div>
    </div >
  );
};

export default Hippos;
