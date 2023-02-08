import { useEffect } from "react";
import useSWR from "swr";

function string_handle(str, words) {
  var split_str = str.split(" ");
  var word_array = [];
  var word_count = [];
  for (var i = 0; i < split_str.length; i++) {
    var check = true;
    for (var j = 0; j <= word_array.length; j++) {
      if (split_str[i] === word_array[j]) {
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

function animation(canvas, c, words_attr) {
  for (var i = 0; i < words_attr.length; i++) {
    c.save();
    c.translate(words_attr[i].x + 15, words_attr[i].y + 15);
    c.rotate(Math.PI / 2);
    c.font = words_attr[i].font;
    c.fillText(words_attr[i].text, 0, 0);
    words_attr[i].width = c.measureText(words_attr[i].text).width;
    c.stroke();
    c.restore();
    c.fillStyle = "rgba(0,0,0,0.4)";
  }

  move(canvas, words_attr);
}

function move(canvas, words_attr) {
  let w = canvas.width;
  let h = canvas.height;
  for (var i = 0; i < words_attr.length; i++) {
    if (words_attr[i].y > h) {
      words_attr[i].x = Math.random() * w;
      words_attr[i].y = -words_attr[i].width;
    } else {
      words_attr[i].y += words_attr[i].speed;
    }
  }
}

const useWordCloud = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/lyrics", fetcher, {
    refreshInterval: 1000,
    refreshWhenHidden: false,
    revalidateOnFocus: true,
  });

  useEffect(() => {
    if (!data?.isPlaying) return;

    var canvasContainer = document.querySelector(".canvas-container");
    canvasContainer.classList.add("fade-out");

    setTimeout(() => {
      canvasContainer.classList.add("fade-in");
    }, 1000);

    setTimeout(() => {
      canvasContainer.classList.remove("fade-out");
      canvasContainer.classList.remove("fade-out");

      var lyric = data.lyric;

      var words = {};
      var words_attr = [];
      string_handle(lyric, words);

      var canvas = document.getElementById("c");

      window.onresize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (canvas.getContext) {
        var c = canvas.getContext("2d"),
          w = canvas.width,
          h = canvas.height;

        const Word = function (key) {
          this.text = key;
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.font = 40 / (key.length * 0.5) + "px";
          this.speed = 20 / key.length;
        };

        Object.keys(words).forEach(function (key) {
          words_attr.push(new Word(key));
        });

        function animate() {
          c.clearRect(0, 0, w, h);
          animation(canvas, c, words_attr);
          requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
      }
    }, 1000);
  }, [data]);
};

export default useWordCloud;
