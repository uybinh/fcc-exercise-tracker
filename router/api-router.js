const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: true })
require("../db/database")
const User = require("../model/user")
// const Exercise = require("../model/exercise")

router.post("/new-user", urlencodedParser, (req, res) => {
	const { name } = req.body.user

	User.createAndSave(name)
		.then(user => res.json(user))
		.catch(err => res.type("txt").send(err))
})

// Get all created users
router.get("/getall", (req, res) => {
	User.find({}).then(docs => res.json(docs))
})

module.exports = router
