import { Song } from "@/components/song";
import axios from "axios";

const LYRICS_ENDPOINT = `https://spotify-lyric-api.herokuapp.com/?url=`;
const API = `https://aihi.me/api/spotify`;

const getLyrics = async (data) => {
  if (data?.isPlaying) {
    const response = await fetch(
      LYRICS_ENDPOINT +
        new URLSearchParams({
          url: data.songUrl,
        })
    );
    return response.json();
  } else {
    return null;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_, res) => {
  const { data } = await axios.get(API);
  const lyricsAPI = await getLyrics(data);

  let lyric = "";
  if (lyricsAPI === null) {
    return res.status(200).json({ isPlaying: false });
  } else {
    for (let i = 0; i < lyricsAPI.lines.length; i++) {
      lyric += lyricsAPI.lines[i].words + " ";
    }
  }
  const isPlaying = data.isPlaying;

  return res.status(200).json({
    isPlaying,
    lyric,
  });
};
