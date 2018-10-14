const shortid = require("shortid")
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

userSchema.pre("save", function(next) {
	const now = Date.now()
	// update every time document is saved
	this.updatedAt = now
	// only set time at the first time created
	if (!this.createdAt) {
		this.createdAt = now
	}
	// Call the next function in the pre-save chain
	next()
})

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
