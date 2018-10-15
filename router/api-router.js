const express = require("express")
const router = express.Router()

require("../db/database")
const User = require("../model/user")
const Exercise = require("../model/exercise")
// const Exercise = require("../model/exercise")

router.post("/new-user", (req, res) => {
	const { name } = req.body.user

	User.createAndSave(name)
		.then(user => res.json(user))
		.catch(err => res.type("txt").send(err))
})

router.post("/add", (req, res) => {
	const { exercise } = req.body
	Exercise.createAndSave(exercise)
		.then(exercise => res.json(exercise))
		.catch(err => res.type("txt").send(err))
})

// Get all created users
router.get("/getall", (req, res) => {
	User.find({}).then(docs => res.json(docs))
})
module.exports = router
