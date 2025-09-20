const playlist = [
  {
    title: "video_1",
    file: "videos/video_1.mp4",
    thumb: "thumbnails/video_1.jpg",
    duration: "10:48",
    date: "2 Eylül 2025",
  },
  {
    title: "video_2",
    file: "videos/video_2.mp4",
    thumb: "thumbnails/video_2.jpg",
    duration: "7:34",
    date: "2 Eylül 2025",
  },
  {
    title: "Svideo_3",
    file: "videos/Svideo_3.mp4",
    thumb: "thumbnails/Svideo_3.jpg",
    duration: "0:55",
    date: "3 Eylül 2025",
  },
  {
    title: "video_4",
    file: "videos/video_4.mp4",
    thumb: "thumbnails/video_4.jpg",
    duration: "9:50",
    date: "2 Eylül 2025",
  },
  {
    title: "video_5",
    file: "videos/video_5.mp4",
    thumb: "thumbnails/video_5.jpg",
    duration: "36:02",
    date: "3 Eylül 2025",
  },
];

const thumbsEl = document.getElementById("thumbs");
const mainVideo = document.getElementById("mainVideo");
const videoSource = document.getElementById("videoSource");
const videoTitle = document.getElementById("videoTitle");
const videoDuration = document.getElementById("videoDuration");
const videoViews = document.getElementById("videoViews");
const videoDate = document.getElementById("videoDate");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let current = 0;

playlist.forEach((p, i) => {
  const key = "views_" + i;
  if (!localStorage.getItem(key)) localStorage.setItem(key, 0);
});

function renderThumbs() {
  thumbsEl.innerHTML = "";
  playlist.forEach((p, i) => {
    const t = document.createElement("div");
    t.className = "thumb" + (i === current ? " selected" : "");
    t.dataset.index = i;
    t.innerHTML = `<img src="${p.thumb}" alt="${escapeHtml(
      p.title
    )}"><div class="meta"><div class="title">${escapeHtml(
      p.title
    )}</div><div class="time">${p.duration || ""}</div></div>`;
    t.addEventListener("click", () => {
      loadIndex(i);
      playVideo();
    });
    thumbsEl.appendChild(t);
  });
}

function loadIndex(i) {
  if (i < 0) i = playlist.length - 1;
  if (i >= playlist.length) i = 0;
  current = i;
  const p = playlist[current];
  videoSource.src = p.file;
  mainVideo.load();
  videoTitle.textContent = p.title;
  videoDuration.textContent = p.duration || "-";
  videoDate.textContent = p.date || "-";

  // localStorage’dan görüntülenme
  const views = localStorage.getItem("views_" + current) || 0;
  videoViews.textContent = views + " görüntülenme";

  document
    .querySelectorAll(".thumb")
    .forEach((el) => el.classList.remove("selected"));
  const selected = document.querySelector(
    '.thumb[data-index="' + current + '"]'
  );
  if (selected) selected.classList.add("selected");
}

function playVideo() {
  // Görüntülenmeyi artır
  const key = "views_" + current;
  let views = parseInt(localStorage.getItem(key) || 0);
  views++;
  localStorage.setItem(key, views);
  videoViews.textContent = views + " görüntülenme";

  mainVideo.play().catch(() => {});
}

function prev() {
  loadIndex(current - 1);
  playVideo();
}
function next() {
  loadIndex(current + 1);
  playVideo();
}

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
mainVideo.addEventListener("ended", () => {
  next();
});

function escapeHtml(text) {
  return text.replace(
    /[&<>\"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m])
  );
}

if (playlist.length === 0) {
  thumbsEl.innerHTML =
    '<div style="color:var(--muted)">Playlist boş. playlist dizisine video ekle.</div>';
} else {
  renderThumbs();
  loadIndex(0);
}
