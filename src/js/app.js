import Page from "./Page.js"
import Hund from "./Hund.js"

function greet() {
	Hund.say([
		"haf haf!",
		"ahoj seznamáku!",
		"vítej ve hře Pes se ptá, neboli já, Krasty, se ptám",
		"chceš si hrát sám, nebo s přáteli?"
	]);
}

$(document).ready(function() {
	var page = new Page()
	page.move("login")

	setTimeout(function() {
		// sound won't play until document has focus
		if (document.hasFocus())
			greet()
		else
			$(window).one("focus", greet);
	}, 500);

	$(".hund>img").click(function() {
		Hund.say("haf haf")
	});

	window.sound = true;
	$(".hund>span>img").click(Hund.toggleSound);
});