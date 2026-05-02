import json
import subprocess

CHANNEL_URL = "https://www.youtube.com/@arkofjesusofficial/videos"
OUTPUT_FILE = "data.json"

print("🔄 Fetching full channel...")

cmd = [
    "yt-dlp",
    "--flat-playlist",
    "--dump-json",
    CHANNEL_URL
]

result = subprocess.run(cmd, capture_output=True, text=True)

videos = []

for line in result.stdout.splitlines():
    try:
        data = json.loads(line)

        video_id = data.get("id")
        title = data.get("title", "")

        if not video_id:
            continue

        category = "videos"

        t = title.lower()

        if "live" in t:
            category = "live"
        elif "shorts" in t or "short" in t:
            category = "shorts"

        videos.append({
            "url": f"https://www.youtube.com/watch?v={video_id}",
            "category": category,
            "title": title
        })

    except:
        pass

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(videos, f, indent=2, ensure_ascii=False)

print(f"✅ Done! {len(videos)} videos saved to {OUTPUT_FILE}")