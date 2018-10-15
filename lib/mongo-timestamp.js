module.exports = function(next) {
	const now = Date.now()
	// update every time document is saved
	this.updatedAt = now
	// only set time at the first time created
	if (!this.createdAt) {
		this.createdAt = now
	}
	// Call the next function in the pre-save chain
	next()
}
