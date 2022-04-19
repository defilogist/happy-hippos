import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'

import { HomeView } from "../../views";
import React, { useState, useEffect } from "react";


const Hippo: NextPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = (hid) => {
    fetch(`/metadata/${hid}-meta.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data)
        setIsLoading(false);
      })
  }

  const router = useRouter()
  const { hid } = router.query
  let hippoid = parseInt(hid) | 1
  if (hippoid < 1) hippoid = 1
  if (hippoid > 4400) hippoid = 44

  useEffect(() => {
    getData(hippoid)
  }, [])

  return (
    <div>
      <Head>
        <title>Hippo #{hippoid}</title>
        <meta
          name="description"
          content="Description of the #{hippoid} hippo"
        />
      </Head>
      <HomeView />
      <h1 class="text-3xl p-3 max-w-screen-lg m-auto">Hippo #{hippoid}</h1>
      {isLoading ? <p>currently loading</p> : null}
      <div class="max-w-screen-lg m-auto">
        <Image
          class="rounded-t-md"
          src={`/metadata/${hippoid}.png`}
          alt="Hippo #{hippoid} picture"
          height="200"
          width="200"
        />
        <div>
          {JSON.stringify(data)}
        </div>
      </div>
    </div >
  );
}
export default Hippo;
