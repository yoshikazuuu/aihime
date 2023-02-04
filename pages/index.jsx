import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Album from "@/components/song";
import useWordCloud from "@/components/text";

export default function Home() {
  useWordCloud();
  return (
    <>
      <Head>
        <title>Aihime</title>
        <meta name="description" content="hi there!" />
        <meta name="HandheldFriendly" content="true" />
        <meta
          name="viewport"
          content="width=device-width, maximum-scale=1.0, user-scalable=yes"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎀</text></svg>"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>


      <div>
        <canvas id="c"></canvas>

        <div className="vertical-heading-2 center fade-in">
          <a style={{ fontSize: "5rem" }}>生きろ。</a>
        </div>

        <span>
          <Link style={{ lineHeight: "30px" }} href="/about">
            About
          </Link>
          <br />
          Made with ❤️ for You 🎀
        </span>

        <Album />
      </div>
    </>
  );
}
