import Page from "./Page.js"
import Hund from "./Hund.js"

class Question {
	constructor(data, page) {
		if (++window.game.currentPlayer >= window.game.players.length) {
			$(".round_wrapper .round").text(++window.game.round);
			window.game.currentPlayer = 0;
		}

		this.page = page;
		this.data = data;
		this.isGuessed = false;
	}

	render() {
		var firstName = this.data[0].text
		var secondName = this.data[1].text

		var phrases = [
		 	"Myslíš si, že je vyhledávanější "+firstName+", nebo "+secondName+"?",
			"Je podle tebe vyhledávanější "+firstName+", nebo "+secondName+"?",
			"Jaký dotaz lidé zadávají častěji? "+firstName+", nebo "+secondName
		]

		var phrase = phrases[Math.floor(Math.random()*phrases.length)]

		var prephrases = [
			"Nyní je na řadě ",
			"Teď bude hrát ",
			"Pozor pozor, přichází ",
			"Na řadu se dostává "
		]

		var prephrase = prephrases[Math.floor(Math.random()*prephrases.length)]

		if (window.game.players.length > 1) {
			$(".points .tab .active").removeClass("active");
			$(".points .tab:nth-child("+(parseInt(window.game.currentPlayer)+1)+") a").addClass("active");			

			Hund.say([
				prephrase+window.game.players[window.game.currentPlayer].name,
				phrase
			])
		} else {
			$(".points .tab a").addClass("active");
			Hund.say(phrase)
		}

		if (annyang)
			annyang.removeCommands()

		this._fillCard(this.page.find(".row .col:first-child .card"), this.data[0])
		this._fillCard(this.page.find(".row .col:nth-child(2) .card"), this.data[1])

		this.page.find(".button-wrapper").hide();
	}

	_fillCard(element, data) {
		element.find(".card-action").text(data.text)
		element.find("img").attr("src", data.image)
		element.find(".card-title").toggleClass("winning", data.count == this.data.winner).text(data.countText).hide();
		element.parent().find("a").attr("href", "https://search.seznam.cz/?q="+encodeURI(data.text))
		var that = this;

		if (annyang) {
			var commands = {};
			commands[data["text"]] = function() {
      			if (!that.isGuessed)
					that._makeGuess(data)
    		}
  			annyang.addCommands(commands);

  			annyang.start();
		}

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

			$("li:nth-child("+(parseInt(window.game.currentPlayer)+1)+") .points_received").text(++window.game.players[window.game.currentPlayer].points);
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
		window.game.players.sort(function(a,b) {
  			if (a.points > b.points)
	    		return -1;
  			if (a.points < b.points)
    			return 1;
  			return 0;
		})

		if (window.game.players.length > 1)
			var message = "Gratuluji hráči "+window.game.players[0].name+" k vítězství!"
		else {
			var points = window.game.players[0].points;
			var message = "Získal jsi "+points+" bod"+(points == 1 ? "" : (points > 4 || points == 0 ? "ů" : "y"))+" z "+($(".points .points_total")[0].innerText)+"."
		}

		Hund.say(["Konec hry!", message, "Chceš hrát znovu?"]);
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
			window.game.questions = d
			window.game.currentPlayer = -1;
			window.game.round = 1;

			$(".points li:nth-child(n+2)").remove()

			for (let index in window.game.players) {
				let player = window.game.players[index];

				if (!$(".points li:nth-child("+(parseInt(index)+1)+")").length) {
					var clone = $(".points li:first-child").clone();
					clone.appendTo($(".points ul"));
				}

				let wrapper = $(".points li:nth-child("+(parseInt(index)+1)+")");
				wrapper.find(".points_name").text(player.name);
			}

			$(".points_total, .round_wrapper .total").text(d.length / window.game.players.length);
			$(".points_received").text(0)
			$(".round_wrapper .round").text(1);

			var page = new Page()
			page.move("questions");
		});
	}
}

export { Question as default }