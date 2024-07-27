require ("dotenv").config()
const {connectToMongoDB} = require("./database")
const express = require("express")
const cors = require('cors');
const path = require("path")

const app = express()
// create middleware
app.use(cors({
    origin: 'https://tasktracker-frontend.onrender.com'
  }));

app.use(express.json())

app.use(express.static(path.join(__dirname, "build")))
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "build/index.html"))
})


const router = require("./routes")
app.use("/api", router)

const port = process.env.PORT || 5000

async function startServer(){
    await connectToMongoDB()
    app.listen(port, ()=>{
        console.log(`Server is listening on http://localhost:${port}`)
    })
}
startServer()


