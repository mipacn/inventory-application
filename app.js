import path from "node:path"
import express from "express"
import { fileURLToPath } from "node:url"
import router from "./routes/router.js"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))
app.use(express.urlencoded({ extended: true }))

app.use("/", router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`))
