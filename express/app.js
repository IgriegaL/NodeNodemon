const express = require("express");
// Llamar una app de tipo express
const app = express();

const { infoCursos } = require("./datos/cursos");

// Routers
//app.use('/api/cursos/programacion', routerProgramacion);

// Declaramos que el router de matematicas y lo usamos
const routerMatematicas = require('./routers/matematicas')
app.use('/api/cursos/matematicas', routerMatematicas);

// Routing

// Metodo
app.get("/", (req, res) => {
  res.send("Mi primer servidor 💻");
});
app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

// Matemática

// :xxxx simboliza que puede ser una variable dinamica
app.get("/api/cursos/programacion/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;

  const resultados = infoCursos.programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );

  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }
  // Para: localhost:3000/api/cursos/programacion/python?ordenar=vistas
  if (req.query.ordenar === 'vistas') {
    return res.send(JSON.stringify(resultados.sort((a,b)=>{
        b.vistas - a.vistas
    })))
  }
  res.send(JSON.stringify(resultados));
  
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor escuchado ${PUERTO}`);
});
