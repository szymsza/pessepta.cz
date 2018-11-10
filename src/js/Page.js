import Hund from "./Hund.js"

class Page {
	constructor() {
		this.afterMove = {
			login: function(pageElement) {
				pageElement.find("button").on("click", function() {
					var page = new Page()

					if ($(this).data("type") == "single")
						Hund.say("Ty osamělá mrdko, ok")
					else
						Hund.say("No jo, pán má kámoše")

					page.move("categories")
				});
			},

			categories: function(pageElement) {
				pageElement.find("input[type=checkbox]").on("change", function() {
					var next = $(this).parent().next();
					if (!next.hasClass("subcategories"))
						return false

					next.find("input").prop("checked", this.checked);
				});

				pageElement.find(".subcategories input[type=checkbox]").on("change", function() {
					var subcategories = $(this).parent().parent()
					var parentCheckbox = subcategories.prev().find("input")[0]
					if (this.checked)
						return parentCheckbox.checked = true;

					if (subcategories.find("input:checked").length)
						return false

					parentCheckbox.checked = false;

				});

				pageElement.find("button").on("click", function() {
					if (!pageElement.find("input[type=checkbox]:checked").length)
						return Hund.say("vyber něco, debile");

					var categories = {};
					pageElement.find(".col > label input:checked").each(function() {
						var subcategories = [];

						if ($(this).parent().next().hasClass("subcategories"))
							$(this).parent().next().find("input:checked").each(function() {
								subcategories.push($(this).data("value"))
							});

						categories[$(this).data("value")] = subcategories;
					});

					window.selectedCategories = categories;

					var page = new Page()
					page.move("questions");
				});
			},

			questions: function(pageElement) {
				console.log(window.selectedCategories);
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
			var afterMove = that.afterMove[pageName]
			if (afterMove)
				afterMove(pageElement)
		})
	}
}

export { Page as default}