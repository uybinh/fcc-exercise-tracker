require("dotenv").config()
const path = require("path")
const express = require("express")
const app = express()
const router = require("./router/api-router")
const PORT = process.env.PORT || 5000
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const jsonencodeParser = bodyParser.json()
/*eslint no-console: ["off"] */
app
	.use(express.static(path.resolve(__dirname, "public")))
	.use(urlencodedParser)
	.use(jsonencodeParser)
	.listen(PORT, () => console.log(`App is listening on port ${PORT}`))

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public/index.html"))
})

app.use("/api/exercise", router)

app.use((err, req, res, next) => {
	let errCode, errMessage

	if (err.errors) {
		// mongoose validation error
		errCode = 400 // bad request
		const keys = Object.keys(err.errors)
		// report the first validation error
		errMessage = err.errors[keys[0]].message
	} else {
		// generic or custom error
		errCode = err.status || 500
		errMessage = err.message || "Internal Server Error"
	}
	res
		.status(errCode)
		.type("txt")
		.send(errMessage)
})
