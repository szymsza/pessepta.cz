<?php

$categories = $_GET["categories"];

$return = [];

for ($i=0; $i < 5; $i++) { 
	$query = $db->query("SELECT * FROM `records` WHERE `category` in ('".implode("', '", $categories)."') ORDER BY RAND() LIMIT 2");

	$result = [];

	$biggest = 0;
	foreach ($query->fetchAll() as $item) {
		if ($item["year"] > $biggest)
			$biggest = $item["year"];
		$result[] = [
			"text" => $item["text"],
			"image" => $item["image"],
			"count" => $item["year"],
			"countText" => number_format($item["year"], 0, ",", " ")." denně"
		];
	}

	$result["winner"] = $biggest;
	$return[] = $result;
}

header('Content-Type: application/json');
echo json_encode($return);