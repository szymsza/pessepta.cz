class Hund {
	static say(text) {
		if (typeof text == "string")
			return responsiveVoice.speak(text, "Czech Female", {
				onstart: this._openMouth, 
				onend: this._closeMouth
			});

		var that = this;
		responsiveVoice.speak(text[0], "Czech Female", {
			onstart: that._openMouth, 
			onend: function() {
				that._closeMouth()

				text.shift()

				if (!text.length)
					return false
				
				var delay = 100;
				if (typeof text[0] == "number")
					delay = text[0]

				setTimeout(function() {
					if (typeof text[0] == "number")
						text.shift()

					that.say(text)
				}, delay)
				
			}
		});
	}

	static _openMouth() {
		$(".hund img").attr("src", "imgs/seznam_hund.gif")
	}

	static _closeMouth() {
		$(".hund img").attr("src", "imgs/seznam_hund.png")
	}
}

export { Hund as default }