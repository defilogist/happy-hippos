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
          console.log(data)
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
      <h1 class="max-w-screen-lg m-auto text-center funny text-6xl mt-8 mb-8">
        Hippo #{hippoid}
      </h1>
      {isLoading ? <p>currently loading</p> : null}
      <div class="flex max-w-screen-sm m-auto bg-white text-black rounded-lg p-4">
        <Image
          class="rounded-lg grow w250 mr-2"
          src={`/metadata/${hippoid}.png`}
          alt="Hippo #{hippoid} picture"
          height="250"
          width="250"
        />
        <div class="ml-4 w-full">
          {(data.attributes || []).map(attribute => {
              return (
                <div class="flex border-b-2 mb-1">
                <span class="att-name w-1/4 border-r-2">{attribute.trait_type}</span>
                <span class="att-value ml-3">{attribute.value}</span>
                </div>
              )
          })}
        </div>
      </div>
    </div>
  );
}
export default Hippo;
