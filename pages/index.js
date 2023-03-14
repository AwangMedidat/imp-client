import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useQuery } from "react-query";
import ViewAll from "@/layouts/Pages/ViewAll";

export default function Home() {


  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query")
      .then
      // (res) => console.log(res.json(), "<<<< react query")
      ()
  );

  return (
    <>
      <Head>
        <title>Client IMP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ViewAll />
      </main>
    </>
  );
}
