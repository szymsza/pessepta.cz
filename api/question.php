<?php

$categories = $_GET["categories"];

$return = [];

for ($i=0; $i < 5; $i++) { 
	$query = $db->query("SELECT * FROM `records` WHERE `category` in ('".implode("', '", $categories)."') ORDER BY RAND() LIMIT 2");

	$result = [];

	$biggest = 0;
	foreach ($query->fetchAll() as $item) {
		if ($item["count"] > $biggest)
			$biggest = $item["count"];
		$result[] = [
			"text" => $item["text"],
			"image" => $item["image"],
			"count" => $item["count"],
			"countText" => number_format($item["count"], 0, ",", " ")." denně"
		];
	}

	$result["winner"] = $biggest;
	$return[] = $result;
}

header('Content-Type: application/json');
echo json_encode($return);