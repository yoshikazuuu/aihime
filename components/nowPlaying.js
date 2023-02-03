import Image from "next/image";
import swr from "swr";

const useNowPlaying = ({ data }) => (
  <a className="a" href={data?.isPlaying ? data.songUrl : "/random"}>
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
  </a>
);

export const getServerSideProps = async () => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = swr("/api/spotify", fetcher);
  return {
    props: {
      data,
    },
  };
};

export default useNowPlaying;
