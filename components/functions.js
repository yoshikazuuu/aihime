import React, { useState } from "react";

const CopyLink = ({ href }) => {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(href);
      setCopySuccess("Copied the text: " + href);
    } catch (err) {
      setCopySuccess("Copy failed.");
    }
  };

  return (
    <a className="link" href={href} onClick={handleCopy}>
      {href}
    </a>
  );
};

export default CopyLink;
