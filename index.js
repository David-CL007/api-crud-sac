const express = require("express")
const morgan = require("morgan")
const app = express()

//Middlewares
app.use(morgan("dev"))
app.use(express.json())

//ROUTES
app.use("/api/",require('./routes/estudiantes'))
app.use("/api/",require('./routes/materias'))

app.get("/", (req, res) => {
  res.send("API CRUD")
})


app.set("puerto", 9001)

app.listen(app.get("puerto"), () => {
  console.log(`Servidor escuchando en el puerto ${app.get("puerto")}`)
})