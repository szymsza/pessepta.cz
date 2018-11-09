<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
		<link rel="stylesheet" type="text/css" href="dist/main.css">
		<title>Seznamácká hra</title>
	</head>
	<body>

		<div id="pages">
		<?php
		foreach (glob('src/views/*.{php,html}', GLOB_BRACE) as $file) {
			require_once $file;
		}
		?>
		</div>

		<?php
		foreach (glob('src/views/general/*.{php,html}', GLOB_BRACE) as $file) {
			require_once $file;
		}
		?>

		<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
		<script src="dist/app.js"></script>
	</body>
</html>