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
	user: {
		type: String,
		required: true,
		ref: "User"
	}
})

exerciseSchema.plugin(timestampPlugin)

exerciseSchema.post("save", function(exercise, next) {
	User.findById(exercise.user)
		.then(user => {
			user.exercises.push(exercise._id)
			user.save()
		})
		.catch(error => error)
	next()
})

exerciseSchema.statics.createAndSave = function(exerciseParams) {
	const userId = exerciseParams.user
	return new Promise((resolve, reject) => {
		User.findById(userId, (err, user) => {
			if (user) {
				const exercise = new this(exerciseParams)
				resolve(exercise.save())
			} else {
				reject("Invalid Id")
			}
			if (err) {
				reject(err)
			}
		})
	})
		.then(exercise => exercise)
		.catch(err => {
			return handleErrorsOnCreate(err)
		})
}

module.exports = mongoose.model("Exercise", exerciseSchema)
