import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

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
      <h1 className="max-w-screen-lg m-auto text-center funny text-6xl mt-8">
        Welcome to the Happy Hippos!
      </h1>
    </div>
  );
};

export default Home;
