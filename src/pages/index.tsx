import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image"

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Happy Hippos</title>
        <meta
          name="description"
          content="The home of the Happy Hippos community"
        />
      </Head>
      <div className="max-w-screen-lg m-auto text-center funny">
        <h1 className="text-6xl mt-24">
          Welcome to the Happy Hippos!
        </h1>
        <h2 className="text-5xl mt-16">Discover our Lore</h2>
        <p className="mt-8">
          <Image
            className="rounded-lg"
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
        <p className="mt-8 mb-8">
          More coming soon...
        </p>
      </div>
    </div >
  );
};

export default Home;
