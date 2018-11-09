<?php

$query = $db->query("SELECT * FROM records_".$_GET["category"]." WHERE `subcategory` = '".$_GET["subcategory"]."' ORDER BY RAND() LIMIT 2");

$return = [];
foreach ($query->fetchAll() as $item)
	$return[] = [
		"text" => $item["text"],
		"image" => $item["image"],
		"count" => $item["count"],
		"subcategory" => $item["subcategory"]
	];

header('Content-Type: application/json');
echo json_encode($return);