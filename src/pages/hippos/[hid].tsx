import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'

import { HomeView } from "../../views";
import Link from "next/link";

const HippoRow = ({ id }: any) => {
  id = id + 1
  return (
  <Link href={`/hippo/${id}`}>
    <a>
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
    </a>
  </Link>
  )
}

const Hippos: NextPage = (props) => {
  const router = useRouter()
  let query = router.query
  let hid = parseInt(query.hid + '') || 1
  if (hid < 1) hid = 1
  if (hid > 44) hid = 44
  hid = hid - 1

  const pages = [...Array(44)].map((x, i) => i)
  const hippos = [...Array(100)].map((x, i) => i)
  return (
    <div>
      <Head>
        <title>All Happy Hippos</title>
        <meta
          name="description"
          content="The home of the Happy Hippos community"
        />
      </Head>
      <h1 className="max-w-screen-lg m-auto text-center funny text-6xl mt-8 mb-8">
        All Happy Hippos
      </h1>
      <div className="flex flex-wrap max-w-screen-lg m-auto">
        { pages.map(i =>
          <Link key={'page-' + i} href={`/hippos/${i + 1}`}>
            <a className="btn btn-square btn-ghost rounded-btn pointer mr-1">
              {i + 1}
            </a>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-5 gap-4 p-3 max-w-screen-lg m-auto">
        {hippos.map(i =>
          <HippoRow key={i + 100 * hid} id={i + 100 * hid}></HippoRow>
        )}
      </div>
    </div >
  );
};

export default Hippos;
