const express = require("express");

// importamos un objeto con una propiedad infoCursos
const { matematicas } = require("../datos/cursos").infoCursos;

const routerMatematicas = express.Router();


routerMatematicas.get("/", (req, res) => {
  res.send(JSON.stringify(matematicas));
});
routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  const resultados = matematicas.filter((curso) => curso.tema === tema);
  if (resultados.length === 0) {
    return res.status(404).send(`No hay cursos de ${tema}`);
  }
  res.send(JSON.stringify(resultados));
});

module.exports = routerMatematicas;
