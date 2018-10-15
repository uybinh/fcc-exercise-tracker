const shortid = require("shortid")
const createTimestamp = require("../lib/mongo-timestamp")
const mongoose = require("mongoose")
const { handleErrorsOnCreate } = require("../lib/handle-erorrs")
mongoose.set("useCreateIndex", true)

const userSchema = mongoose.Schema({
	/*
   * default mongodb _id is a very long string
	 * use shortid to generate shorter string
	 * but can't overide _id with "index: true"
   */
	_id: {
		type: String,
		default: shortid.generate
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	createdAt: Date,
	updatedAt: Date
})

userSchema.pre("save", createTimestamp)

userSchema.statics.createAndSave = function(name) {
	const user = new this({
		username: name
	})
	return Promise.resolve(user.save())
		.then(user => user)
		.catch(err => handleErrorsOnCreate(err))
}

module.exports = mongoose.model("User", userSchema)
