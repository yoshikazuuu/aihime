// import { getAverageColor } from "fast-average-color-node";
import useSWR from "swr";
import { useEffect } from "react";
const FastAverageColor = require("fast-average-color").FastAverageColor;
const fac = new FastAverageColor();

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = "/api/spotify";

const useAvgColor = () => {
  const { data } = useSWR(API, fetcher, {
    refreshInterval: 1,
  });

  useEffect(() => {
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
  }, [data]);
};

export default useAvgColor;
