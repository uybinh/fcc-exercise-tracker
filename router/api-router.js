const express = require("express")
const router = express.Router()

require("../db/database")
const User = require("../model/user")
const Exercise = require("../model/exercise")

router.post("/new-user", (req, res) => {
	const { name } = req.body.user

	User.createAndSave(name)
		.then(user => {
			if (user == "Document existed") {
				res.status(400).json({ error: "Document Existed" })
				return
			}
			res.json(user)
		})
		.catch(err => res.type("txt").send(err))
})

router.post("/add", (req, res) => {
	const { exercise } = req.body
	Exercise.createAndSave(exercise)
		.then(exercise => {
			if (exercise == "Document existed") {
				res.status(400).json({ error: "Document Existed" })
				return
			}
			res.json(exercise)
		})
		.catch(err => res.type("txt").send(err))
})

router.get("/log", (req, res) => {
	const { userId, from, to, limit } = req.query
	const fromTime = new Date(from)
	const toTime = new Date(to)
	User.findById(userId)
		.populate({
			path: "exercises",
			match: {
				date: {
					/*
					 * can't use !== comparison because fromTime and toTime are still
					 * Date type with value 'Invalid Date' and not a String type
					 */
					$gte: fromTime != "Invalid Date" ? fromTime : 0,
					$lte: toTime != "Invalid Date" ? toTime : Date.now()
				}
			},
			select: "-_id description duration date",
			options: { limit: limit }
		})
		.exec((err, user) => {
			if (err) return res.json(err)
			if (!user) return res.status(400).json({ error: "Invalid Id" })
			res.json({
				_id: user._id,
				username: user.username,
				/*
				 * can't use === comparison because fromTime and toTime are still
				 * Date type with value 'Invalid Date' and not a String type
				 */
				from: fromTime == "Invalid Date" ? undefined : fromTime.toDateString(),
				to: toTime == "Invalid Date" ? undefined : toTime.toDateString(),
				count: user.exercises.length,
				log: user.exercises
			})
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
