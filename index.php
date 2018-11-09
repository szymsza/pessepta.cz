<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="dist/main.css">
		<title>Seznamácká hra</title>
	</head>
	<body>

		<?php
		foreach (glob('src/views/*.{php,html}', GLOB_BRACE) as $file) {
			require_once $file;
		}
		?>
		
		<script src="dist/app.js"></script>
	</body>
</html>