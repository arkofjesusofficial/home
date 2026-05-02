let allVideos = [];
let currentCategory = "all";

/* =========================
   LOAD LOCAL JSON (yt-dlp output)
========================= */
async function loadVideos(){
  try{
    const res = await fetch("data/json/data.json");
    const data = await res.json();

    allVideos = data;

    console.log("✅ Videos Loaded:", allVideos.length);

    renderVideos();

  } catch(err){
    console.log("❌ Error loading JSON:", err);
  }
}

/* =========================
   EXTRACT VIDEO ID
========================= */
function getVideoId(url){
  if(!url) return "";
  return url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
}

/* =========================
   RENDER VIDEOS (IMPROVED UI)
========================= */
function renderVideos(){
  const container = document.getElementById("videoContainer");
  const search = document.getElementById("search").value.toLowerCase();

  container.innerHTML = "";

  const filtered = allVideos
    .filter(v => currentCategory === "all" || v.category === currentCategory)
    .filter(v => (v.title || "").toLowerCase().includes(search));

  if(filtered.length === 0){
    container.innerHTML = "<p style='text-align:center;'>No videos found</p>";
    return;
  }

  filtered.forEach(v => {

    const id = getVideoId(v.url);
    const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

    container.innerHTML += `
      <div class="video-card" onclick="openVideo('${id}')">

        <div class="thumb">
          <img src="${thumbnail}" loading="lazy">

          <span class="badge ${v.category}">
            ${v.category}
          </span>
        </div>

        <div class="info">
          <h3>${v.title || "Untitled Video"}</h3>
        </div>

      </div>
    `;
  });
}

/* =========================
   OPEN VIDEO (VP PAGE)
========================= */
function openVideo(id){
  window.location.href = `vp.html?video=${id}`;
}

/* =========================
   CATEGORY FILTER
========================= */
function filterCategory(cat, btn){
  currentCategory = cat;

  document.querySelectorAll(".cat-btn")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  renderVideos();
}

/* =========================
   SEARCH SYSTEM
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const searchBox = document.getElementById("search");

  searchBox.addEventListener("input", renderVideos);

  searchBox.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      renderVideos();
    }
  });

  loadVideos();
});