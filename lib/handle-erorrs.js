function handleErrorsOnCreate(err) {
	// only handle duplication error
	if (err.message.indexOf("duplicate key error") !== -1) {
		return "Document existed"
	} else if (err.errors) {
		// paths are fields of document
		const paths = Object.keys(err.errors)
		return paths.map(path => ({
			path: path,
			message: err.errors[path].message
		}))
	} else {
		return "Something went wrong!"
	}
}

module.exports = { handleErrorsOnCreate }
