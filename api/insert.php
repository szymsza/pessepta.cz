<?php

header('Content-Type: application/json');

$data = $_GET;
$insert = [
	"text" => mb_convert_case(trim($data["dotaz"]), MB_CASE_TITLE, "UTF-8"),
	"year" => (int)$data["rok"],
	"month" => (int)$data["mesic"],
	"day" => (int)$data["den"],
	"category" => trim($data["kategorie"]),
	"image" => trim($data["image"])
];

switch ($insert["category"]) {
	case 'celebrity':
		$insert["category"] = "celebrities";
		break;

	case 'mapy':
		$insert["category"] = "maps";
		break;

	case 'recepty':
		$insert["category"] = "recipe";
		break;

	case 'porno':
		$insert["category"] = "porn";
		break;
	
	default:
		$insert["category"] = "other";
		break;
}

// Query already exists
if ($db->query("SELECT * FROM `records` WHERE `text` = '".$insert["text"]."'")->fetchColumn())
	die(json_encode([
		"ok" => false,
		"message" => "already exists"
	]));

$db->prepare("INSERT INTO `records` (`text`, `year`, `month`, `day`, `category`, `image`) VALUES (:text, :year, :month, :day, :category, :image)")->execute($insert);


echo json_encode([
	"ok" => true
]);