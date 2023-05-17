import axios from "axios";
import { useEffect, useState } from "react";
import useSWR, { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const QUOTE_API = "/api/gpt";

function Quote({ initialData }) {
  const { data } = useSWR(QUOTE_API, fetcher, {
    initialData,
    refreshInterval: 1000,
  });

  return (
    <div>
      <p>{data?.quote}</p>
    </div>
  );
}

export default function App({ initialData }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Quote initialData={initialData} />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const res = await fetch(API);
  const json = await res.json();

  return { props: { initialData: json } };
}
