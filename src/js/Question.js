import Page from "./Page.js"
import Hund from "./Hund.js"

class Question {
	constructor(data, page) {
		this.page = page;
		this.data = data;
		this.isGuessed = false;
	}

	render() {
		Hund.say("Myslíš si, že je vyhledávanější "+this.data[0].text+", nebo "+this.data[1].text+"?")

		this._fillCard(this.page.find(".row .col:first-child .card"), this.data[0])
		this._fillCard(this.page.find(".row .col:nth-child(2) .card"), this.data[1])

		this.page.find(".button-wrapper").hide();
	}

	_fillCard(element, data) {
		element.find(".card-action").text(data.text)
		element.find("img").attr("src", data.image)
		element.find(".card-title").text(data.countText).hide();

		element.off().on("click", (function() {
			if (!this.isGuessed)
				this._makeGuess(data)
		}).bind(this))
	}

	_makeGuess(guessed) {
		this.isGuessed = true;
		// TODO - zvuk výhry/prohry
		if (this.data.winner == guessed.count)
			Hund.say("Máš pravdu, "+guessed.text+" je vyhledávanější")
		else
			Hund.say("Ani píču kámo, "+guessed.text+" je méně vyhledávaný")
		
		this.page.find(".card-title, .button-wrapper").fadeIn(350);

		this.page.find(".button-wrapper").off().on("click", (function() {
			var page = new Page()

			if (window.questions.length)
				page.move("questions");
			else {
				page.move("login")
				this._endGame();
			}
		}).bind(this));
	}

	_endGame() {
		Hund.say("Konec kokote!");
	}

	static loadQuestions() {
		$.ajax("api", {
			data: {
				type: "question",
				categories: window.selectedCategories
			}
		}).done(function(d) {
			window.questions = d;
			var page = new Page()
			page.move("questions");
		});
	}
}

export { Question as default }