const express = require("express");
// con esto en vez de usar infoCursos.programacion, podemos usar programacion
const { programacion } = require("../datos/cursos").infoCursos;
const routerProgramacion = express.Router();

/* esto es parte de : Middleware, despues de recibir una solcitud y antes de enviar una respuesta
también tiene acceso a next() una funcion que sirve para ejecutar el proximo middleware
*/

// permite usar el cuerpo de la solicitud en Json
routerProgramacion.use(express.json())

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



// POST
routerProgramacion.post('/', (req, res)=>{
  // extraemos el cuerpo de la solicitud
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo)
  // devolvemos el nuevo string
  res.send(JSON.stringify(programacion))

});

// PUT
routerProgramacion.put('/:id', (req, res)=>{
  // extraemos el cuerpo de la solicitud
  let cursoActualizado = req.body;
  // Accedemos a los parametros de request
  const id = req.params.id;
  // Encontrar un id en el objeto programacion, usamos == ya que en ese caso siempre devolverá false, por que estamos comparando un integer con una cadena
  // finIdenx, nos devolverá 1 si se encuentra y -1 si no se encuentra
  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    // buscamos con el indice en el objeto y reemplazamos por el curso actualizado.
    programacion[indice] = cursoActualizado;
  }
  res.send(JSON.stringify(programacion))

})

// PATCH
routerProgramacion.patch('/:id', (req, res)=>{
  // extraemos el cuerpo de la solicitud
  let infoActualizada = req.body;
  // Accedemos a los parametros de request
  const id = req.params.id;
  // Encontrar un id en el objeto programacion, usamos == ya que en ese caso siempre devolverá false, por que estamos comparando un integer con una cadena
  // finIdenx, nos devolverá 1 si se encuentra y -1 si no se encuentra
  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    // Asign nos permite cambiar las propiedades de un objeto con uno que le asignemos luego de la coma
    Object.assign(cursoAModificar, infoActualizada)
  }
  res.send(JSON.stringify(programacion))

})

// DELETE
routerProgramacion.delete('/:id', (req, res)=>{
  // Accedemos a los parametros de request
  const id = req.params.id;
  // Encontrar un id en el objeto programacion, usamos == ya que en ese caso siempre devolverá false, por que estamos comparando un integer con una cadena
  // finIdenx, nos devolverá 1 si se encuentra y -1 si no se encuentra
  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    programacion.splice(indice, 1)
  }
  res.send(JSON.stringify(programacion))

})


module.exports = routerProgramacion;
