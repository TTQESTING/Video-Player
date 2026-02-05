<?php
$data = json_decode(file_get_contents("data.json"), true) ?? [];

$id = uniqid();
$title = $_POST["title"];

$videoPath = "videos/" . $id . "_" . basename($_FILES["video"]["name"]);
$thumbPath = "thumbnails/" . $id . "_" . basename($_FILES["thumb"]["name"]);

move_uploaded_file($_FILES["video"]["tmp_name"], $videoPath);
move_uploaded_file($_FILES["thumb"]["tmp_name"], $thumbPath);

$data[] = [
  "id" => $id,
  "title" => $title,
  "video" => $videoPath,
  "thumb" => $thumbPath,
  "views" => 0,
  "date" => date("d.m.Y")
];

file_put_contents("data.json", json_encode($data, JSON_PRETTY_PRINT));
header("Location: index.php");
