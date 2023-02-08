import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useWordCloud from "../components/text";
import useAvgColor from "@/components/bgcolor";
import Album from "@/components/song";
import CopyLink from "../components/functions";

export default function About() {
  useAvgColor();
  useWordCloud();
  return (
    <>
      <Head>
        <title>About</title>
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
        <div className="center fade-in">
          <div className="text">
            Aihime (
            <ruby>
              <rb>愛</rb>
              <rp>(</rp>
              <rt>あい</rt>
              <rp>)</rp>
            </ruby>
            <ruby>
              <rb>姫</rb>
              <rp>(</rp>
              <rt>ひめ</rt>
              <rp>)</rp>
            </ruby>
            )
            <div className="small-text">
              In English means Love Princess. <br />
              <br />
              If you would like to play プロセカ with me,
              <br />
              you can either click on the ID I have provided
              <br />
              or manually copy it.
              <br />
              <br />
              <CopyLink href={6559519057129485} />
              <br />
              Thank you.
            </div>
          </div>
        </div>
        <span>
          <Link style={{ lineHeight: "30px" }} href="/">
            Home
          </Link>
          <br />
          Made with ❤️ for You 🎀
        </span>
      </div>
      <Album />
    </>
  );
}
