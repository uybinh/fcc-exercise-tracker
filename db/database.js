require("dotenv").config()
const mongoose = require("mongoose")

class Database {
	constructor() {
		this._connect()
	}

	/*eslint no-console: ['off'] */
	_connect() {
		return mongoose
			.connect(
				process.env.MONGO_URI,
				{ useNewUrlParser: true }
			)
			.then(() => console.log("Database connection successful!"))
			.catch(() => console.error("Database connection error!"))
	}
}

module.exports = new Database()
