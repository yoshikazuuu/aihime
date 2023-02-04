import { Song } from "@/components/song";
import axios from "axios";

const LYRICS_ENDPOINT = `https://spotify-lyric-api.herokuapp.com/?url=`;
const API = `https://aihi.me/api/spotify`;

const getLyrics = async () => {
  const { data } = await axios.get(API);
  const response = await fetch(
    LYRICS_ENDPOINT +
      new URLSearchParams({
        url: data.songUrl,
      })
  );

  return response.json();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_, res) => {
  const lyricsAPI = await getLyrics();
  let lyric = "";
  if (lyricsAPI.error) {
    lyric = "";
  } else {
    for (let i = 0; i < lyricsAPI.lines.length; i++) {
      lyric += lyricsAPI.lines[i].words + " ";
    }
  }

  return res.status(200).json({
    lyric,
  });
};
