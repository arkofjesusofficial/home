$channelId = "UCOrYPL2OvJzY6g6qYKrIukg"

$xmlUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=$channelId"
$outputFile = "data.json"

Write-Host "Fetching XML..."

[xml]$xml = Invoke-WebRequest -Uri $xmlUrl -UseBasicParsing | Select-Object -ExpandProperty Content

$entries = $xml.feed.entry

$result = @()

foreach ($e in $entries) {

    $title = $e.title
    $videoId = $e.videoId
    $link = $e.link.href

    $category = "videos"

    if ($title -match "live") {
        $category = "live"
    }
    elseif ($link -match "shorts") {
        $category = "shorts"
    }

    $obj = [PSCustomObject]@{
        url = "https://www.youtube.com/watch?v=$videoId"
        category = $category
    }

    $result += $obj
}

$result | ConvertTo-Json -Depth 3 | Set-Content $outputFile -Encoding UTF8

Write-Host "Done → data.json created"