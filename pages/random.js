import Head from "next/head";
import Image from "next/image";
import RandomLinks from "@/components/random";

export default function Random() {
  return (
    <>
      <Head>
        <title>MEME BRUTAL (offensive)</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="HandheldFriendly" content="true" />
        <meta
          name="viewport"
          content="width=device-width, maximum-scale=1.0, user-scalable=yes"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎀</text></svg>"
        />
      </Head>
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n* {\n  padding: 0;\n  margin: 0;\n}\n.fit {\n  max-width: 100%;\n  max-height: 100%;\n}\n.center {\n  display: block;\n  margin: auto;\n}\n",
          }}
        />
        <RandomLinks num={1} />
      </div>
    </>
  );
}
