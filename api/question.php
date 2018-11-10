<?php

$categories = $_GET["categories"];

$settings = $_GET["settings"];

switch ($settings["period"]) {
	case 'day':
		$settings["czPeriod"] = "denně";
		break;
	
	case 'month':
		$settings["czPeriod"] = "měsíčně";
		break;

	default:
		$settings["czPeriod"] = "ročně";
}

$return = [];

for ($i=0; $i < $settings["rounds"]; $i++) { 
	$query = $db->query("SELECT * FROM `records` WHERE `category` in ('".implode("', '", $categories)."') ORDER BY RAND() LIMIT 2");

	$result = [];

	$biggest = 0;
	foreach ($query->fetchAll() as $item) {
		$count = $item[$settings["period"]];
		if ($count > $biggest)
			$biggest = $count;
		$result[] = [
			"text" => $item["text"],
			"image" => $item["image"],
			"count" => $count,
			"countText" => number_format($count, 0, ",", " ")." ".$settings["czPeriod"]
		];
	}

	$result["winner"] = $biggest;
	$return[] = $result;
}

header('Content-Type: application/json');
echo json_encode($return);