import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Album from "@/components/song";
import useWordCloud from "@/components/text";
import useAvgColor from "@/components/bgcolor";

export default function Home() {
  useAvgColor();
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
      </Head>

      <div className="canvas-container">
        <canvas id="c"></canvas>
      </div>
      <div>
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
      </div>
      <Album />
    </>
  );
}
