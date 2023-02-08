import useSWR, { SWRConfig } from "swr";
import Image from "next/image";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = "/api/spotify";

const AVAILABLE_DEVICES = [
  "Computer",
  "Tablet",
  "Smartphone",
  "Speaker",
  "TV",
  "AVR",
  "STB",
  "AudioDongle",
  "GameConsole",
  "CastVideo",
  "CastAudio",
  "Automobile",
  "Unknown",
];
const DEVICES_ICON = [
  "computer",
  "tablet_android",
  "smartphone",
  "speaker",
  "tv",
  "speaker_group",
  "speaker_group",
  "cast_connected",
  "gamepad",
  "cast_connected",
  "cast_connected",
  "directions_car",
  "device_unknown",
];

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

function Repo({ initialData }) {
  const { data } = useSWR(API, fetcher, {
    initialData,
    refreshInterval: 1,
  });

  return (
    <div className="fade-in">
      <a className="a" href={data?.isPlaying ? data.songUrl : "/random"}>
        <section id="section-album" className="content_section">
          <div className="content_box">
            <Image
              className="right_img"
              src={
                data?.isPlaying
                  ? data?.albumImageUrl
                  : "https://media.tenor.com/AHISycRzhy0AAAAi/pjsekai-project-sekai.gif"
              }
              width={60}
              height={60}
              alt={data?.isPlaying ? data?.album : "mijuki"}
            />
            <div className="title_text">
              <p className="info_title">
                {data?.isPlaying
                  ? data.title
                  : "Well i'm not listening anything atm."}
              </p>
              <p className="info_sub">
                {data?.isPlaying ? data.artist : "hi! (pwease click me!)"}
              </p>
            </div>
          </div>
          <div id="seekbar-bg">
            <div
              id="seekbar-now"
              style={
                data?.isPlaying
                  ? { width: (data.progress / data.duration) * 100 + "%" }
                  : { width: "0%" }
              }
            ></div>
            <p id="activeicon" class="material-icons">
              {data?.isPlaying
                ? DEVICES_ICON[AVAILABLE_DEVICES.indexOf(data.device_type)]
                : ""}
            </p>
            <p id="device">
              {data?.isPlaying ? data.active_device : "not vibing rn..."}
            </p>
            <p id="time-class">
              {data?.isPlaying
                ? str_pad_left(Math.floor(data.progress / 1000 / 60), "0", 2) +
                  ":" +
                  str_pad_left(
                    Math.floor(data.progress / 1000) -
                      Math.floor(data.progress / 1000 / 60) * 60,
                    "0",
                    2
                  ) +
                  " · " +
                  str_pad_left(Math.floor(data.duration / 1000 / 60), "0", 2) +
                  ":" +
                  str_pad_left(
                    Math.floor(data.duration / 1000) -
                      Math.floor(data.duration / 1000 / 60) * 60,
                    "0",
                    2
                  )
                : ""}
            </p>
          </div>
        </section>
      </a>
    </div>
  );
}

export default function App({ initialData }) {
  return (
    <SWRConfig>
      <Repo initialData={initialData} />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`/api/spotify`);
  const json = await res.json();

  return { props: { initialData: json } };
}
