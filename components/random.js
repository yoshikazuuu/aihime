import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  "images/memes/1.jpg",
  "images/memes/2.jpg",
  "images/memes/3.webp",
  "images/memes/4.webp",
  "images/memes/5.jpg",
];

export default function RandomLinks({ num }) {
  const [randomLinks, setRandomLinks] = useState([]);

  const refreshRandomLinks = () => {
    let tempLinks = [];

    for (let i = 0; i < num; i++) {
      let randomIndex = Math.floor(Math.random() * links.length);
      tempLinks.push(links[randomIndex]);
    }

    setRandomLinks(tempLinks);
  };

  useEffect(() => {
    refreshRandomLinks();
  }, []);

  return (
    <div>
      {randomLinks.map((link, index) => (
        <Link href="/random" key={index}>
          <Image
            priority="true"
            id="the_pic"
            alt="wahahahahahaha!"
            src={`${link}`}
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              position: "absolute",
            }}
            onClick={refreshRandomLinks}
          />
        </Link>
      ))}
    </div>
  );
}
