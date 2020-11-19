import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import * as fs from "fs";
import { join } from "path";
import getConfig from "next/config";
import styles from "../styles/Home.module.css";

const { serverRuntimeConfig } = getConfig();

type StaticProps = {
  initialMarkdown: string;
};

export default function Home({ initialMarkdown }: StaticProps) {
  const [md, setMd] = useState(initialMarkdown);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.left}>
        <textarea
          className={styles.textarea}
          rows={20}
          value={md}
          onChange={(event) => {
            setMd(event.target.value);
          }}
        />
      </div>
      <div className={styles.right}>
        <ReactMarkdown plugins={[gfm]} children={md} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const initialMarkdown = fs
    .readFileSync(join(serverRuntimeConfig.PROJECT_ROOT, "markdown/example.md"))
    .toString("utf-8");
  return {
    props: {
      initialMarkdown,
    },
  };
};
