// import { getAverageColor } from "fast-average-color-node";
import useSWR from "swr";
import { useEffect } from "react";
const FastAverageColor = require("fast-average-color").FastAverageColor;
const fac = new FastAverageColor();

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = "/api/spotify";

const useAvgColor = () => {
  const { data } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (data?.isPlaying) {
      fac
        .getColorAsync(data?.albumImageUrl)
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
  }, [data]);
};

export default useAvgColor;
