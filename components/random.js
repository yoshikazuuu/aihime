import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  "https://i.pinimg.com/originals/59/03/e6/5903e6625cf8111d70aacff81f043470.jpg",
  "https://i.pinimg.com/736x/2f/f8/37/2ff83718701f766989a1cc542722b5d3.jpg",
  "https://i.pinimg.com/originals/e0/14/a6/e014a6c626036bd8757384ef10293543.jpg",
  "https://i.pinimg.com/736x/a7/69/be/a769be001fdda049a29aad6506a6a1c3.jpg",
  "https://i.imgflip.com/6ilcqo.jpg",
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
    <ul>
      {randomLinks.map((link, index) => (
        <li key={index}>
          <Link href="/random">
            <img
              id="the_pic"
              className="center fit"
              src={`${link}`}
              alt="wahahahahahaha!"
              onClick={refreshRandomLinks}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
