const {Router} = require("express")
const router = Router()
const fs = require("fs")
const materiasFile = fs.readFileSync("./materias.json", "utf-8")
const materiasJSON = JSON.parse(materiasFile) 


router.get("/materias", (req, res) => {
  res.json(materiasJSON)
})

router.get("/materias/:id", (req, res) => {
  let id = req.params.id
  let materiaEncontrada = materiasJSON.find(materia => materia.id == id)

  if(materiaEncontrada != undefined)
    res.json(materiaEncontrada)
  else
    res.send(`La materia no existe`)
})

router.post("/materias", (req, res) => {
  let {nombre, docente} = req.body
  let id = materiasJSON.length + 1 
  let nuevaMateria = {
    id : id,
    nombre : nombre,
    docente : docente
  }
 
  materiasJSON.push(nuevaMateria)

  fs.writeFileSync("./materias.json", JSON.stringify(materiasJSON), "utf-8")

  res.status(201).json(nuevaMateria)
})

router.put("/materias/:id", (req, res) => {
  let id = req.params.id
  let {nombre, docente} = req.body

  let materiaModificar = materiasJSON.find(materia => {
    if(materia.id == id){
      materia.nombre = nombre
      materia.docente = docente
      return materia
    }
  })

  if(materiaModificar != undefined){
      fs.writeFileSync("./materias.json", JSON.stringify(materiasJSON), "utf-8")
      res.status(201).json(materiaModificar)
  }else{
    res.json("La materia no existe")
  }
})

router.delete("/materias/:id", (req, res) => {
  res.send("Elimina una materia")
})


module.exports = router