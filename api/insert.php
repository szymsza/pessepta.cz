<?php

header('Content-Type: application/json');
echo json_encode([
	"ok" => true,
	"post" => $_POST,
	"get" => $_GET,
	"request" => $_REQUEST
]);