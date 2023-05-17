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
    return res.status(200).json({
      isPlaying: data.isPlaying,
      lyric:
        "「死にたいなんて言うなよ」 「諦めないで生きろよ」 そんな歌が正しいなんて馬鹿げてるよな 実際自分は死んでもよくて 周りが死んだら悲しくて 「それが嫌だから」っていうエゴなんです 他人が生きてもどうでもよくて 誰かを嫌うこともファッションで それでも「平和に生きよう」 なんて素敵なことでしょう 画面の先では誰かが死んで それを嘆いて誰かが歌って それに感化された少年が ナイフを持って走った 僕らは命に嫌われている 価値観もエゴも押し付けて いつも誰かを殺したい歌を 簡単に電波で流した 僕らは命に嫌われている 軽々しく死にたいだとか 軽々しく命を見てる 僕らは命に嫌われている ♪ お金がないので今日も 一日中惰眠を謳歌する 生きる意味なんて見出せず 無駄を自覚して息をする 寂しいなんて言葉でこの傷が表せていいものか そんな意地ばかり抱え今日も一人ベッドに眠る 少年だった僕たちはいつか青年に変わってく 年老いていつか 枯れ葉のように 誰にも知られず朽ちていく 不死身の身体を手に入れて 一生死なずに生きていく そんなSFを妄想してる 自分が死んでもどうでもよくて それでも周りに生きて欲しくて 矛盾を抱えて生きてくなんて怒られてしまう 「正しいものは正しくいなさい」 「死にたくないなら生きていなさい」 悲しくなるならそれでもいいなら ずっと一人で笑えよ 僕らは命に嫌われている 幸福の意味すらわからず 産まれた環境ばかり憎んで 簡単に過去ばかり呪う 僕らは命に嫌われている さよならばかりが好きすぎて本当の別れなど知らない 僕らは命に嫌われている ♪ 幸福も別れも愛情も友情も 滑稽な夢の戯れで全部カネで買える代物 明日 死んでしまうかもしれない すべて 無駄になるかもしれない 朝も夜も春も秋も 変わらず誰かがどこかで死ぬ 夢も明日も何もいらない 君が生きていたならそれでいい そうだ 本当はそういうことが歌いたい 命に嫌われている 結局いつかは死んでいく 君だって僕だっていつかは 枯れ葉にように朽ちてく それでも僕らは必死に生きて 命を必死に抱えて生きて 殺してあがいて笑って抱えて 生きて 生きて 生きて 生きて 生きろ  ",
    });
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
