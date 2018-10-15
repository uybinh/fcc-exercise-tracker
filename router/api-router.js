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

router.get("/log", (req, res) => {
	const { userId, from, to, limit } = req.query
	const fromDate = new Date(from)
	const toDate = new Date(to)
	Exercise.find({
		user: userId,
		date: {
			$gte: fromDate,
			$lte: toDate
		}
	})
		.populate("user")
		.limit(Number(limit))
		.exec((err, exercises) => {
			res.json(exercises)
		})
})

// Get all created users
router.get("/allusers", (req, res) => {
	User.find({}).then(docs => res.json(docs))
})

router.get("/allexercises", (req, res) => {
	Exercise.find({}).then(docs => res.json(docs))
})

router.get("/test", (req, res) => {
	Exercise.findOne({ user: "SZoGJy4NS" })
		.populate("user")
		.exec(function(err, exercise) {
			if (err) return res.json(err)
			res.json(exercise.user)
		})
})

module.exports = router
