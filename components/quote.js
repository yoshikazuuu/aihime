import React from "react";

function CenteredQuote({ quote }) {
  return (
    <div className="quote-container">
      <div className="quote-header" style={{ textAlign: "center" }}>
        Quote generated from the lyric: <br />
        <p className="quote-body">{quote}</p>
      </div>
    </div>
  );
}

export default CenteredQuote;
