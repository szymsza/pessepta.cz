class Hund {
	static say(text) {
		responsiveVoice.speak(text, "Czech Female", {onstart: this._openMouth, onend: this._closeMouth});
	}

	static _openMouth() {
		$(".hund img").attr("src", "imgs/seznam_hund.gif")
	}

	static _closeMouth() {
		$(".hund img").attr("src", "imgs/seznam_hund.png")
	}
}

export { Hund as default }