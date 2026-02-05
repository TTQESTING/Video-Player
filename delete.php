<?php
$data = json_decode(file_get_contents("data.json"), true) ?? [];
$id = $_GET["id"] ?? "";

foreach ($data as $i => $v) {
  if ($v["id"] === $id) {
    @unlink($v["video"]);
    @unlink($v["thumb"]);
    unset($data[$i]);
    break;
  }
}

file_put_contents("data.json", json_encode(array_values($data), JSON_PRETTY_PRINT));
header("Location: index.php");
