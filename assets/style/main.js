/**
 * lấy giá trị --> properties
 * lắng nghe xự kiện --> event
 * hành động --> methods
 */

/**
 * 1. Render playlist
 * 2. Scroll top -> k có
 * 3. Play pause seek
 * 4. CD rotate
 * 5. Next prev
 * 6. Random
 * 7. Next, repeat ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 * 11. Volume
 * 12. Progress time
 * 13. play button
 */
/**
 * LỖI CHƯA FIX ĐC
 * 1. tua bị giật
 * 2. chưa css range
 * 3. nút play tương tác chưa chuẩn
 * 4. chưa đổi đc format thời gian -> đã fix nhưng k hiểu
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "setting_key";
const title = $(".title-music h4");
const img = $(".img-music");
const singer = $(".singer");
const audio = $(".audio");
const playBtn = $(".play-song");
const progress = $(".progress");
const next = $(".next-btn");
const prev = $(".prev-btn");
const repeat = $(".repeat-class");
const random = $(".random-class");
const playlist = $(".data-list");
const scroll = $(".option");
const playButton = $(".play-button");
const mute = $(".icon-mute");
const volumeChange = $(".volume");
const timeSong = $(".time-left");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isMute: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    app.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(app.config));
  },
  songs: [
    {
      name: "La La La",
      single: "Naughty Boy, Sam Smith",
      image: "./assets/image/la la la.jpg",
      music: "./assets/music/lalala.mp3",
    },
    {
      name: "That Girl",
      single: "Olly Murs 24HRS",
      image: "./assets/image/that girl.jpg",
      music: "./assets/music/thatgirl.mp3",
    },
    {
      name: "Counting Star",
      single: "ONEREPUBLIC",
      image: "./assets/image/counting stars.png",
      music: "./assets/music/countingstar.mp3",
    },
    {
      name: "Take Me To Your Heart",
      single: "ONEREPUBLIC",
      image: "./assets/image/takeme.jpg",
      music: "./assets/music/TakeMe.mp3",
    },
    {
      name: "Anywhere I go",
      single: "ONEREPUBLIC",
      image: "./assets/image/anywhereIgo.jpg",
      music: "./assets/music/anywhereIgo.mp3",
    },
    {
      name: "Infinity",
      single: "Jaymes Young",
      image: "./assets/image/infinity.jpg",
      music: "./assets/music/Infinity.mp3",
    },
    {
      name: "La La La",
      single: "Naughty Boy, Sam Smith",
      image: "./assets/image/la la la.jpg",
      music: "./assets/music/lalala.mp3",
    },
    {
      name: "That Girl",
      single: "Olly Murs 24HRS",
      image: "./assets/image/that girl.jpg",
      music: "./assets/music/thatgirl.mp3",
    },
    {
      name: "Counting Star",
      single: "ONEREPUBLIC",
      image: "./assets/image/counting stars.png",
      music: "./assets/music/countingstar.mp3",
    },
    {
      name: "Take Me To Your Heart",
      single: "ONEREPUBLIC",
      image: "./assets/image/takeme.jpg",
      music: "./assets/music/TakeMe.mp3",
    },
    {
      name: "Anywhere I go",
      single: "ONEREPUBLIC",
      image: "./assets/image/anywhereIgo.jpg",
      music: "./assets/music/anywhereIgo.mp3",
    },
    {
      name: "Infinity",
      single: "Jaymes Young",
      image: "./assets/image/infinity.jpg",
      music: "./assets/music/Infinity.mp3",
    },
  ],
  render: function () {
    const lists = this.songs.map((song, index) => {
      return `
                <tr class="song ${
                  index === app.currentIndex ? "option" : ""
                }" data-index="${index}">
                    <td class="info-data"><i class="ti-music-alt"></i></td>
                    <td class="info-data">
                        <div class="info-data-container">
                            <img class="info-img" src="${song.image}" alt="">
                            <div class="name-data">
                                <p class="name-music">${song.name}</p>
                                <p class="name-singer">${song.single}</p>
                            </div>
                            <div class="info-icon">
                                <i class="fa-solid fa-circle-play"></i>
                            </div>
                        </div>
                    </td>
                    <td class="info-data">
                        <div class="name-data">
                            <p class="name-album">Playlist by Lee_Yeon</p>
                        </div>
                    </td>
                    <td class="info-data">03:40</td>
                </tr>
                `;
    });
    $(".data-list").innerHTML = lists.join("");
  },
  defineProperties: function () {
    // trả về đối tượng cấu hình các thuộc tính, tên thuộc tính, đối tượng với định nghĩa thuộc tính
    Object.defineProperty(this, "currentSong", {
      // lấy ra bài hát đầu tiên
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    // xử lý play và pause
    audio.onplay = function () {
      app.isPlaying = true;
      playBtn.classList.add("played");
      cdPlay.play();
    };
    audio.onpause = function () {
      app.isPlaying = false;
      playBtn.classList.remove("played");
      cdPlay.pause();
    };
    playBtn.onclick = function () {
      if (app.isPlaying === true) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    playButton.onclick = function () {
      if (app.isPlaying === true) {
        playButton.classList.remove("paused");
        audio.pause();
      } else {
        playButton.classList.add("paused");
        audio.play();
      }
    };
    // tiến độ bài hát
    audio.ontimeupdate = function () {
      if (audio.duration) {
        progress.value = Math.floor(
          (audio.currentTime / audio.duration) * 1000
        );
      }
      // format thời gian
      timeSong.value = Math.floor(audio.currentTime);
      var minutes = Math.floor(timeSong.value / 60);

      var seconds = timeSong.value - minutes * 60;

      function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
      }

      var finalTime =
        str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
      timeSong.innerHTML = finalTime;
    };
    // tua
    progress.onchange = function () {
      const seekTime = (audio.duration / 1000) * progress.value;
      audio.currentTime = seekTime;
    };
    // tăng giảm âm lượng
    audio.volume = 0.5;
    volumeChange.onchange = function () {
      audio.volume = volumeChange.value;
    };
    // tắt tiếng
    mute.onclick = function () {
      audio.volume = 0;
      volumeChange.value = 0;
    };
    // quay cd khi play
    const cdPlay = img.animate([{ transform: "rotate(360deg)" }], {
      duration: 5000, // cd quay trong 5 giây sẽ hết 1 vòng
      iterations: Infinity, // quay vô hạn
    });
    cdPlay.pause();
    // xử lý next
    next.onclick = function () {
      if (app.isRandom) {
        app.playRandom();
      } else {
        app.nextSong();
      }
      audio.play();
      app.render();
      app.scrollView();
    };
    //xử lý prev
    prev.onclick = function () {
      if (app.isRandom) {
        app.playRandom();
      } else {
        app.prevSong();
      }
      audio.play();
      app.render();
      app.scrollView();
    };
    //xử lý bật tắt phát nhạc ngẫu nhiên
    random.onclick = function () {
      app.isRandom = !app.isRandom;
      app.setConfig("isRandom", app.isRandom);
      $(".random-btn").classList.toggle("active", app.isRandom);
    };
    // tự động chuyển bài hát khi hết bài đang phát / phát lại bài đó
    audio.onended = function () {
      if (app.isRepeat) {
        audio.play();
      } else {
        next.click();
      }
    };
    // xử lý bật tắt lặp lại bài hát
    repeat.onclick = function () {
      app.isRepeat = !app.isRepeat;
      app.setConfig("isRepeat", app.isRepeat);
      $(".repeat-btn").classList.toggle("active", app.isRepeat);
    };
    // xử lý click vào bài hát
    playlist.onclick = function (e) {
      const songNode = e.target.closest("tr:not(.option)");
      // chọn bài hát
      if (songNode) {
        app.currentIndex = Number(songNode.dataset.index);
        app.loadCurrentSong();
        audio.play();
        app.render();
      }
    };
  },
  // next - prev
  nextSong: function () {
    app.currentIndex++;
    if (app.currentIndex >= app.songs.length) {
      app.currentIndex = 0;
    }
    app.loadCurrentSong();
  },
  prevSong: function () {
    app.currentIndex--;
    if (app.currentIndex < 0) {
      app.currentIndex = app.songs.length - 1;
    }
    app.loadCurrentSong();
  },
  // phát bài hát ngẫu nhiên
  playRandom: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * app.songs.length);
    } while (newIndex === app.currentIndex);
    app.currentIndex = newIndex;
    app.loadCurrentSong();
  },
  scrollView: function () {
    setTimeout(() => {
      $(".option").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  },
  // load lại dữ liệu đc lưu
  loadConfig: function () {
    app.isRandom = app.config.isRandom;
    app.isRepeat = app.config.isRepeat;
  },
  // load bài hát
  loadCurrentSong: function () {
    title.textContent = this.currentSong.name;
    img.src = this.currentSong.image;
    singer.textContent = this.currentSong.single;
    audio.src = this.currentSong.music;
  },
  start: function () {
    this.loadConfig();
    // định nghĩa thuộc tính get cho object, mục đích lấy ra index
    app.defineProperties();

    // xử lý các sự kiện / hành động
    app.handleEvent();

    // load bài hát
    app.loadCurrentSong();

    app.render();

    $(".repeat-btn").classList.toggle("active", app.isRepeat);
    $(".random-btn").classList.toggle("active", app.isRandom);
  },
};
app.start();
