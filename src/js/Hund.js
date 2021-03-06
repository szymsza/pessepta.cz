class Hund {
	static say(text, random=false) {
		if (!window.sound && text != "")
			return false

		if (random && (typeof text == "array" || typeof text == "object"))
			return Hund.say(text[Math.floor(Math.random()*text.length)])


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
		$(".hund>img").attr("src", "assets/imgs/seznam_hund.gif")
	}

	static _closeMouth() {
		$(".hund>img").attr("src", "assets/imgs/seznam_hund.png")
	}

	static play(file) {
		if (!window.sound)
			return false

		var audio = new Audio('assets/audio/'+file);
		audio.play();
	}

	static toggleSound() {
		$(".hund>span>img").attr("src", "assets/imgs/sound-o"+(window.sound ? "ff" : "n")+".png")
		window.sound = !window.sound;

		if (!window.sound) {
			Hund.say("")
			setTimeout(Hund._closeMouth, 200);
		}
	}
}

export { Hund as default }