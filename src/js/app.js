import Page from "./Page.js"
import Hund from "./Hund.js"

$(document).ready(function() {
	var page = new Page()
	page.move("login")

	setTimeout(function() {
		Hund.say([
			"ahoj píčo!",
			"vítej ve hře Pes se ptá, teda já se ptám, haha",
			"vyber, jestli jsi osamělá kunda, nebo máš nějaký kámoše, se kterýma chceš hrát"
		]);
	}, 500);

	$(".hund img").click(function() {
		Hund.say("haf haf")
	});
});