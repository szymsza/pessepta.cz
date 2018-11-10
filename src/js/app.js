import Page from "./Page.js"
import Hund from "./Hund.js"

$(document).ready(function() {
	var page = new Page()
	page.move("login")

	setTimeout(function() {
		Hund.say([
			"haf haf!",
			"ahoj seznamáku!",
			"vítej ve hře Pes se ptá, neboli já, Krasty, se ptám",
			"chceš si hrát sám, nebo s přáteli?"
		]);
	}, 500);

	$(".hund img").click(function() {
		Hund.say("haf haf")
	});
});