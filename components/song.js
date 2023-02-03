import useSWR, { SWRConfig } from "swr";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = "/api/spotify";

function Repo({ initialData }) {
  const { data } = useSWR(API, fetcher, {
    initialData,
    refreshInterval: 1000,
    refreshWhenHidden: false,
    revalidateOnFocus: true,
  });

  return (
    <div>
      <div className="a" href={data?.isPlaying ? data.songUrl : "/random"}>
        <section className="content_section">
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
        </section>
      </div>
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
