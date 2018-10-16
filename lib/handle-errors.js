function handleErrorsOnCreate(err) {
	// only handle duplication error
	switch (true) {
	case err === "Invalid Id":
		return "Invalid Id"

	case err.message.indexOf("duplicate key error") !== -1:
		return "Document existed"

	case Object.keys(err.errors).length > 0:
		return Object.keys(err.errors).map(path => ({
			path: path,
			message: err.errors[path].message
		}))

	default:
		return "Something went wrong!"
	}
}

module.exports = { handleErrorsOnCreate }
