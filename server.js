require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const connectDB = require("./db")
const routes = require("./routes")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan("dev"))

connectDB()

app.use("/api", routes)

app.get("/", (req,res) => {
    res.status(200).json({ message: "success" })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: "Internal Server Error" + err.message })
})

app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" })
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})