import Hund from "./Hund.js"
import Question from "./Question.js"

class Page {
	constructor() {
		this.afterMove = {
			login: function(pageElement) {
				pageElement.find("button").off().on("click", function() {
					var page = new Page()

					if ($(this).data("type") == "single")
						Hund.say([
							"tak fajn, budeme si hrát spolu", 
							"přizpůsob si hru podle svých představ"
						])
					else
						Hund.say([
							"tohle napíšeme, až budeme mít singleplejer"
						])

					page.move("settings")
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
						return Hund.say("vyber něco, debile");

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
						rounds: $("input[name=rounds]:checked").val(),
					}

					var page = new Page();
					page.move("categories")
				})
			},

			finished: function(pageElement) {
				pageElement.find("button").off().on("click", function() {
					var page = new Page();
					page.move("login")
				})
			},
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
			$(".points").toggleClass("hide", (pageName != "questions"));

			var afterMove = that.afterMove[pageName]
			if (afterMove)
				afterMove(pageElement)
		})
	}
}

export { Page as default}