const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const NOW_DEVICE_ENDPOINT = `https://api.spotify.com/v1/me/player/devices`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }).toString(),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getNowDevice = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_DEVICE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_, res) => {
  const response = await getNowPlaying();
  const response_device = await getNowDevice();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json();
  const bruh = await response_device.json();

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const progress = song.progress_ms;
  const duration = song.item.duration_ms;

  let active_device = null;
  let device_type = null;
  for (let i = 0; i < bruh.devices.length; i++) {
    if (bruh.devices[i].is_active) {
      active_device = bruh.devices[i].name;
      device_type = bruh.devices[i].type;
    }
  }

  return res.status(200).json({
    isPlaying,
    album,
    albumImageUrl,
    artist,
    progress,
    duration,
    songUrl,
    title,
    active_device,
    device_type,
  });
};
