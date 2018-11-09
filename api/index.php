<?php

require_once("../config.php");

$db = new PDO("mysql:host=".$dbCredentials["server"].";dbname=".$dbCredentials["database"].";charset=utf8", $dbCredentials["login"], $dbCredentials["password"]);

require_once $_GET["type"].".php";