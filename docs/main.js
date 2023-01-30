function copyURL(evt) {
  evt.preventDefault();
  navigator.clipboard.writeText(evt.target.getAttribute('href'))
      .then(
          () => {
            /* clipboard successfully set */
            alert('Copied the text: ' + evt.target.getAttribute('href'));
          },
          () => {
            /* clipboard write failed */
            alert('Copy failed.');
          });
}

window.onload = function() {
  var lyric =
      '「死にたいなんて言うなよ。」 「諦めないで生きろよ。」 そんな歌が正しいなんて 馬鹿げてるよな 実際自分は死んでもよくて 周りが死んだら悲しくて 「それが嫌だから」っていう エゴなんです 他人が生きてもどうでもよくて 誰かを嫌うこともファッションで それでも「平和に生きよう」なんて 素敵なことでしょう 画面の先では誰かが死んで それを嘆いて誰かが歌って それに感化された少年が ナイフを持って走った 僕らは命に嫌われている 価値観もエゴも押し付けて いつも誰かを殺したい歌を 簡単に電波で流した 僕らは命に嫌われている 軽々しく死にたいだとか 軽々しく命を見てる 僕らは命に嫌われている お金がないので今日も 一日中惰眠を謳歌する 生きる意味なんて見出せず 無駄を自覚して息をする 寂しいなんて言葉で この傷が表せていいものか そんな意地ばかり抱え 今日も一人ベッドに眠る 少年だった僕たちは いつか青年に変わっていく 年老いていつか 枯れ葉のように 誰にも知られず朽ちていく 不死身の身体を手に入れて 一生死なずに生きていく そんなSFを妄想してる 自分が死んでもどうでもよくて それでも周りに生きて欲しくて 矛盾を抱えて生きてくなんて 怒られてしまう 「正しいものは正しくいなさい。」 「死にたくないなら生きていなさい。」 悲しくなるならそれでもいいなら ずっと一人で笑えよ 僕らは命に嫌われている 幸福の意味すらわからず 産まれた環境ばかり憎んで 簡単に過去ばかり呪う 僕らは命に嫌われている さよならばかりが好きすぎて 本当の別れなど知らない 僕らは命に嫌われている 幸福も別れも 愛情も友情も 滑稽な夢の戯れで 全部カネで買える代物 明日、死んでしまうかもしれない すべて、無駄になるかもしれない 朝も夜も春も秋も 変わらず誰かがどこかで死ぬ 夢も明日も何もいらない 君が生きていたならそれでいい そうだ 本当はそういうことが歌いたい 命に嫌われている 結局いつかは死んでいく 君だって僕だって いつかは枯れ葉のように朽ちてく それでも僕らは必死に生きて 命を必死に抱えて生きて 殺してあがいて笑って抱えて 生きて、生きて、生きて、生きて、生きろ!';

  var words = {};
  var words_attr = [];
  string_handle(lyric);

  var canvas = document.getElementById('c');
  window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    var c = canvas.getContext('2d'), w = canvas.width, h = canvas.height;

    c.strokeStyle = 'red';
    c.fillStyle = 'white';
    c.lineWidth = 5;

    // constructor
    Word = function(key) {
      this.text = key;
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.font = (70 / (key.length * 0.5)) + 'px MS Gothic';
      // console.log(key + ' ' + this.font);
      this.speed = (20 / key.length);
    };
    for (key in words) {
      words_attr.push(new Word(key));
    }

    function animation() {
      for (var i = 0; i < words_attr.length; i++) {
        c.save();
        c.translate(words_attr[i].x + 15, words_attr[i].y + 15);
        c.rotate(Math.PI / 2);
        c.font = words_attr[i].font;
        c.fillText(words_attr[i].text, 0, 0);
        words_attr[i].width = c.measureText(words_attr[i].text).width;
        c.stroke();
        c.restore();
        c.fillStyle = 'rgba(0,0,0,0.4)';
      }

      move();
    }

    function move() {
      w = canvas.width;
      h = canvas.height;
      for (var i = 0; i < words_attr.length; i++) {
        if (words_attr[i].y > h) {
          words_attr[i].x = Math.random() * w;
          words_attr[i].y = -words_attr[i].width;
        } else {
          words_attr[i].y += words_attr[i].speed;
        }
      }
    }

    setInterval(function() {
      c.clearRect(0, 0, w, h);
      animation();
    }, 20);
  }

  function string_handle(str) {
    var split_str = str.split(' ');
    var word_array = [];
    var word_count = [];
    for (var i = 0; i < split_str.length; i++) {
      check = true;
      for (var j = 0; j <= word_array.length; j++) {
        if (split_str[i] == word_array[j]) {
          word_count[j]++;
          check = false;
          break;
        }
      }
      if (check) {
        word_array.push(split_str[i]);
        word_count.push(1);
      }
    }
    for (var i = 0; i < word_array.length; i++) {
      words[word_array[i]] = word_count[i];
    }
    return words;
  }
}
