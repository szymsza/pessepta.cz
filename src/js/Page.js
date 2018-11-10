class Page {
	constructor() {
		console.log("scam");
		this.afterMove = {
			scam: "scam"
		};
	}

	move(pageName) {
		$("#pages>div").hide()
		$("#pages>#page-"+pageName).show()

		console.log(this.afterMove)
	}
}

export { Page as default}