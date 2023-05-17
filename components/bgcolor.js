import { useEffect } from "react";
const FastAverageColor = require("fast-average-color").FastAverageColor;
const fac = new FastAverageColor();

const useAvgColor = (spotifyData) => {
  useEffect(() => {
    if (spotifyData?.isPlaying) {
      fac
        .getColorAsync(spotifyData?.albumImageUrl)
        .then((color) => {
          document.documentElement.style.setProperty(
            "--primary-color",
            color.hex
          );
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      document.documentElement.style.setProperty("--primary-color", "#ffffff");
    }
  }, [spotifyData]);
};

export default useAvgColor;
