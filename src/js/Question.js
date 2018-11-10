import Page from "./Page.js"
import Hund from "./Hund.js"

class Question {
	constructor(data, page) {
		this.page = page;
		this.data = data;
		this.isGuessed = false;
	}

	render() {
		var firstName = this.data[0].text
		var secondName = this.data[1].text
		Hund.say([
			"Myslíš si, že je vyhledávanější "+firstName+", nebo "+secondName+"?",
			"Je podle tebe vyhledávanější "+firstName+", nebo "+secondName+"?",
			[ "Jaký dotaz lidé zadávají častěji?", firstName+", nebo "+secondName ]
		], true)

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
		if (this.data.winner == guessed.count) {
			Hund.play("right.mp3")
			Hund.say([
				"Máš pravdu, "+guessed.text+" je vyhledávanější.",
				"Je to tak. Jupí!",
				"Taky si myslím, dobrá práce.",
				"Přesně tak. Jen tak dál!"
			], true)
			window.game.points++
		} else {
			Hund.play("wrong.mp3")
			Hund.say([
				"Mrzí mě to, ale není to tak",
				"Bohužel tvá odpověď není správná",
				"Bylo to těsné, ale ne",
				"Příště se zadaří",
				"Tentovkát to bohužel "+guessed.text+" není",
				"Bohužel, "+guessed.text+" je méně vyhledávaný"
			], true)
		}
		
		this._updatePoints();

		this.page.find(".card-title, .button-wrapper").fadeIn(350);

		this.page.find(".button-wrapper").off().on("click", (function() {
			var page = new Page()

			if (window.game.questions.length)
				page.move("questions");
			else {
				page.move("finished")
				this._endGame();
			}
		}).bind(this));
	}

	_endGame() {
		var points = window.game.points;

		Hund.say(["Konec hry!", "Získal jsi "+points+" bod"+(points == 1 ? "" : (points > 4 || points == 0 ? "ů" : "y"))+" z "+($(".points_total")[0].innerText)+".", "Chceš hrát znovu?"]);
	}

	_updatePoints() {
		$(".points_received").text(window.game.points);
	}

	static loadQuestions() {
		$.ajax("api", {
			data: {
				type: "question",
				categories: window.selectedCategories,
				settings: window.gameSettings
			}
		}).done(function(d) {
			window.game = {
				questions: d,
				points: 0
			}

			$(".points_total").text(d.length);
			$(".points_received").text(0)

			var page = new Page()
			page.move("questions");
		});
	}
}

export { Question as default }