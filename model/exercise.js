const shortid = require("shortid")
const timestampPlugin = require("./plugins/timestamp")
const mongoose = require("mongoose")
const { handleErrorsOnCreate } = require("../lib/handle-erorrs")
const User = require("./user")
const exerciseSchema = mongoose.Schema({
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
	createdAt: {
		type: Date,
		unique: true
	}
})

schema.pre("save", createTimestamp)

schema.statics.createAndSave = function(exerciseParams) {
	const exercise = new this(exerciseParams)
	return Promise.resolve(exercise.save())
		.then(exercise => exercise)
		.catch(err => handleErrorsOnCreate(err))
}

module.exports = mongoose.model("Exercise", schema)
