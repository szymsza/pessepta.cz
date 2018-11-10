import Page from "./Page.js"
import Hund from "./Hund.js"

$(document).ready(function() {
	var page = new Page()
	page.move("login")

	Hund.say("ahoj pičo");
});