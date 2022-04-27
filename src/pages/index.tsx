import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image"

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Happy Hippos Database</title>
        <meta
          name="description"
          content="The place where all Happy Hippos are referenced"
        />
      </Head>
        <div className="max-w-screen-lg m-auto text-center funny bg-white
        rounded-3xl p-16 text-base-100 mt-12 mb-12">
        <h1 className="text-6xl ">
          Welcome to the Happy Hippos!
        </h1>
        <h2 className="text-5xl mt-16">Discover our Lore</h2>
        <p className="mt-8">
          <Image
            className="rounded-lg shadow-xl"
            src="/lore/lore_01.png"
            alt="Hippo #{hippoid} picture"
            height="400"
            width="600"
          />
        </p>
        <p className="mt-8">
          <Image
            className="rounded-lg"
            src="/lore/lore_02.png"
            alt="Hippo #{hippoid} picture"
            height="400"
            width="600"
          />
        </p>
        <p className="text-2xl mt-8 mb-8">
          More coming soon...
        </p>
      </div>
    </div >
  );
};

export default Home;
