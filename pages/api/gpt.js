const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

const LYRICS_API = `https://aihi.me/api/lyrics`;
const LLM_MODEL = "gpt-3.5-turbo";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});
const openai = new OpenAIApi(configuration);

async function getAnswer(lyric) {
  const resp = await openai.createChatCompletion({
    model: LLM_MODEL,
    messages: [
      {
        role: "system",
        content:
          'You are a philosopher that makes a quote from a whole song—interpreting the complete lyrics into a single sentence (max 20 words), yet sounding so wise. Don\'t forget to add " (double quote) " Always turn the lyrics into English.',
      },
      {
        role: "user",
        content: `in 20 words or less make it a quote from this lyrics "${lyric}"`,
      },
    ],
  });

  return resp;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_, res) => {
  const { data } = await axios.get(LYRICS_API);
  if (data.lyric === "") {
    return res.status(200).json({
      quote: "No lyrics found.",
    });
  }

  const quoteAPI = await getAnswer(data.lyric);
  return res.status(200).json({
    quote: quoteAPI.data.choices[0].message.content,
  });
};
