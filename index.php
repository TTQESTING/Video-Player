<?php
$data = json_decode(file_get_contents("data.json"), true) ?? [];

$index = isset($_GET["i"]) ? (int)$_GET["i"] : 0;
$video = $data[$index] ?? null;

if ($video) {
  $cookie = "viewed_" . $video["id"];
  if (!isset($_COOKIE[$cookie])) {
    $data[$index]["views"]++;
    setcookie($cookie, "1", time()+86400);
    file_put_contents("data.json", json_encode($data, JSON_PRETTY_PRINT));
  }
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>Video Player</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">

  <!-- SIDEBAR -->
  <div class="sidebar">
    <?php foreach ($data as $i => $v): ?>
      <a class="video-item" href="?i=<?= $i ?>">
        <img src="<?= $v["thumb"] ?>">
        <h4><?= htmlspecialchars($v["title"]) ?></h4>
        <small>👁 <?= $v["views"] ?> • <?= $v["date"] ?></small>
      </a>
    <?php endforeach; ?>
  </div>

  <!-- PLAYER -->
  <div class="player">
    <?php if ($video): ?>
      <div class="video-box">
        <video controls>
          <source src="<?= $video["video"] ?>">
        </video>
      </div>

      <div class="controls">
        <a href="?i=<?= max(0, $index-1) ?>"><button>⏮ Previous</button></a>
        <a href="?i=<?= min(count($data)-1, $index+1) ?>"><button>⏭ Next</button></a>
        <a href="delete.php?id=<?= $video["id"] ?>" onclick="return confirm('Silinsin mi?')">
          <button class="danger">🗑 Delete</button>
        </a>
      </div>
    <?php else: ?>
      Video yok
    <?php endif; ?>

    <!-- UPLOAD -->
    <form class="upload" action="upload.php" method="post" enctype="multipart/form-data">
      <h3>🎬 Upload New Video</h3>

      <input type="text" name="title" placeholder="Video Name" required>

      <div class="upload-row">
        <label class="file-btn">
          <span>📁 Select Video</span>
          <input type="file" name="video" accept="video/*" required>
        </label>

        <label class="file-btn">
          <span>🖼 Select Thumbnail</span>
          <input type="file" name="thumb" accept="image/*" required>
        </label>
      </div>

      <button>⬆️ Upload Video</button>
    </form>
  </div>

</div>

</body>
</html>
