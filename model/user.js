const shortid = require("shortid")
const createTimestamp = require("../lib/mongo-timestamp")
const mongoose = require("mongoose")
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
		unique: true
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
		.catch(err => {
			// only handle duplication error
			if (err.message.indexOf("duplicate key error") !== -1) {
				return "User existed"
			} else {
				return "Something went wrong"
			}
		})
}

module.exports = mongoose.model("User", userSchema)
