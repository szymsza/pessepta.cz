class Page {
	move(pageName) {
		$("#pages>div").hide()
		$("#pages>#page-"+pageName).show()
	}
}

export { Page as default}