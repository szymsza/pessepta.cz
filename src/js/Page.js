import Hund from "./Hund.js"
import Question from "./Question.js"

class Page {
	constructor() {
		this.afterMove = {
			login: function(pageElement) {
if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'test': function() {
      alert("test");
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}


				pageElement.find("button").off().on("click", function() {
					var page = new Page()

					if ($(this).data("type") == "single") {
						window.game = {
							players: [
								{
									name: "Skóre",
									points: 0
								}
							]
						}
						page.move("settings")
						Hund.say([
							"tak fajn, budeme hrát spolu", 
							"přizpůsob si hru podle svých představ"
						])
					} else
						page.move("multiplayer");
				});
			},

			categories: function(pageElement) {
				Hund.say([
					"vyber si své soutěžní otázky"
				]);

				pageElement.find("input[type=checkbox]").off().on("change", function() {
					var next = $(this).parent().next();
					if (!next.hasClass("subcategories"))
						return false

					next.find("input").prop("checked", this.checked);
				});

				pageElement.find(".subcategories input[type=checkbox]").off().on("change", function() {
					var subcategories = $(this).parent().parent()
					var parentCheckbox = subcategories.prev().find("input")[0]
					if (this.checked)
						return parentCheckbox.checked = true;

					if (subcategories.find("input:checked").length)
						return false

					parentCheckbox.checked = false;

				});

				pageElement.find("button").off().on("click", function() {
					if (!pageElement.find("input[type=checkbox]:checked").length)
						return Hund.say("vyber si prosím kategorie, se kterými chceš hrát");

					var categories = [];
					pageElement.find(".col input:checked").each(function() {
						categories.push($(this).data("value"));
					});

					window.selectedCategories = categories;

					Question.loadQuestions();
				});
			},

			questions: function(pageElement) {
				var question = new Question(window.game.questions[0], pageElement)
				question.render();

				window.game.questions.shift();
			},

			settings: function(pageElement) {
				pageElement.find("button").off().on("click", function() {
					window.gameSettings = {
						difficult: $("input[name=difficult]:checked").val(),
						period: $("input[name=period]:checked").val(),
						rounds: $("input[name=rounds]:checked").val() * window.game.players.length,
					}

					var page = new Page();
					page.move("categories")
				})
			},

			finished: function(pageElement) {
				var total = $(".points .points_total")[0].innerText;
				if (window.game.players.length > 1) {
					for (let index in window.game.players) {
						let player = window.game.players[index]

						$("#page-finished .multi-result ol").append("<li>"+player.name+" ("+player.points+" z "+total+")");
					}
					$("#page-finished .multi-result").show();
					$("#page-finished .single-result").hide();
				} else {
					$("#page-finished .single-result").find(".points_received").text(window.game.players[0].points);
					$("#page-finished .single-result").find(".points_total").text(total);

					$("#page-finished .multi-result").hide();
					$("#page-finished .single-result").show();
				}

				pageElement.find("button").off().on("click", function() {
					var page = new Page();
					page.move("login")
				})
			},

			multiplayer: function(pageElement) {
				Hund.say([
					"zadej prosím jména jednotlivých hráčů"
				])

				$(document).on("click", ".remove-row", function() {
					$(this).closest(".row").remove();
				});

				pageElement.find(".add-row").off().on("click", function() {
					var newRow = $("#page-multiplayer .container .row:first-child").clone();

					newRow.find("input").val("")

					newRow.insertAfter($("#page-multiplayer .container .row:nth-last-child(2)"));

					newRow.find("input").focus();
				});

				pageElement.find(".continue-button").off().on("click", function() {
					var names = [];
					pageElement.find("input[type=text]").each(function() {
						var value = $(this).val().trim();

						if (value == "") {
							Hund.say("Vyplň prosím jména všech hráčů.");
							names = false;
							return false;
						}

						names.push({ 
							name: value,
							points: 0
						});
					});

					if (names) {
						window.game = {
							players: names
						}
						var page = new Page();
						page.move("settings");
					}
				});
			}
		};
	}

	move(pageName) {
		var that = this

		if (!$("#pages>div:visible").length)
			return this._showPage(pageName);

		$("#pages>div:visible").fadeOut(200, function() {
			that._showPage(pageName)
		})
	}

	_showPage(pageName) {
		var pageElement = $("#pages>#page-"+pageName);
		var that = this;

		pageElement.fadeIn(200, function() {
			$(".points, .round_wrapper").toggleClass("hide", (pageName != "questions"));

			var afterMove = that.afterMove[pageName]
			if (afterMove)
				afterMove(pageElement)
		})
	}
}

export { Page as default}