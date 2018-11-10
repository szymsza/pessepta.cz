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

$difficultLimit = 0.15;
$easyLimit = 0.75;

while (count($return) < $settings["rounds"]) { 
	$query = $db->query("SELECT * FROM `records` WHERE `category` in ('".implode("', '", $categories)."') ORDER BY RAND() LIMIT 1");
	$items = [$query->fetch()];
	$count = $items[0][$settings["period"]];

	# difficult - difference is 0-10%; easy - difference is 10-50%
	if ($settings["difficult"])
		$condition = "(`".$settings["period"]."` > '".($count - $count*$difficultLimit)."' AND `".$settings["period"]."` < '".($count + $count*$difficultLimit)."')";
	else
		$condition = "((`".$settings["period"]."` < '".($count - $count*$difficultLimit)."' AND `".$settings["period"]."` > '".($count - $count*$easyLimit)."') OR 
					(`".$settings["period"]."` > '".($count + $count*$difficultLimit)."' AND `".$settings["period"]."` < '".($count + $count*$easyLimit)."'))";

	$query = $db->query("SELECT * FROM `records` WHERE `category` in ('".implode("', '", $categories)."') AND `id` != '".$items[0]["id"]."' AND ".$condition." ORDER BY RAND() LIMIT 1");

	if (!$query->fetch())
		continue;

	$items[] = $query->fetch();

	$result = [];

	$biggest = $count;
	foreach ($items as $item) {
		$count = $items[0][$settings["period"]];
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