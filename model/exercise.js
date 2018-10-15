const shortid = require("shortid")
const createTimestamp = require("../lib/mongo-timestamp")
const mongoose = require("mongoose")
const schema = mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	duration: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
})

module.exports = mongoose.model("Exercise", schema)
