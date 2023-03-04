const express = require("express");
// con esto en vez de usar infoCursos.programacion, podemos usar programacion
const {programacion} = require('../datos/cursos').infoCursos;
const routerProgramacion = express.Router();

routerProgramacion.get("/", (req, res) => {
    res.send(JSON.stringify(programacion));
  });
  routerProgramacion.get("/:lenguaje", (req, res) => {
    const lenguaje = req.params.lenguaje;
  
    const resultados = infoCursos.programacion.filter(
      (curso) => curso.lenguaje === lenguaje
    );
  
    if (resultados.length === 0) {
      return res.status(404).send(`No hay cursos de ${lenguaje}`);
    }
    res.send(JSON.stringify(resultados));
  });

  module.exports = routerProgramacion;