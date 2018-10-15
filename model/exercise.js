const shortid = require("shortid")
const createTimestamp = require("../lib/mongo-timestamp")
const mongoose = require("mongoose")
const { handleErrorsOnCreate } = require("../lib/handle-erorrs")
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
	},
	updatedAt: Date,
	createdAt: Date
})

schema.pre("save", createTimestamp)

schema.statics.createAndSave = function()

module.exports = mongoose.model("Exercise", schema)
