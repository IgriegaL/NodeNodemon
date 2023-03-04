const express = require("express");

const routerProgramacion = express.Router();

routerProgramacion.get("/", (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
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