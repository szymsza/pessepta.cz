import Page from "./Page.js"

var page = new Page()
page.move("login")

setInterval(function() {
	$(".hund img").attr("src", $(".hund img").attr("src") == "imgs/seznam_hund.gif" ? "imgs/seznam_hund.png" : "imgs/seznam_hund.gif")
}, 2000);