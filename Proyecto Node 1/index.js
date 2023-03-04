const http = require("http");
const cursos = require("./cursos"); //se puede agregar .js

const servidor = http.createServer((req, res) => {
  const { method } = req; // Extraemos de req el metodo
  switch (method) {
    case "GET":
      return manejarSolicitudGet(req, res);
    case "POST":
      return manejarSolicitudPost(req, res);
    default:
      res.statusCode = 501;
      res.end(`El metodo ${method} no puede ser manejado x el servidor..`);
      break;
  }
});

function manejarSolicitudGet(req, res) {
  const path = req.url;
  console.log(res.statusCode);

  if (path === "/") {
    res.writeHead(200, { "contet-type": "application/json" }); // writeHead(CodigoDeEstado, TypoObjeto)
    return res.end("Sevidor y api Node");
  } else if (path === "/cursos") {
    return res.end(JSON.stringify(cursos.infoCursos)); //Devolvemos los cursos como Json
  } else if (path === "/cursos/programacion") {
    return res.end(JSON.stringify(cursos.infoCursos.programacion));
  } else {
    res.statusCode = 404;
    return res.end(JSON.stringify("no existe"));
  }
}
function manejarSolicitudPost(req, res) {
  const path = req.url;

  if (path === "/cursos/programacion") {
    let cuerpo = "";
    req.on("data", (contenido) => {
      // con on y 'data', obtenemos el contenido de la solicitud y lo convertimos en una cadena
      cuerpo += contenido.toString();
    });
    req.on("end", (contenido) => {
      console.log(cuerpo); // luego se muestra ese cuerpo
      console.log(typeof cuerpo);
      cuerpo = JSON.parse(cuerpo); // Convertir en un obj de Js
      console.log(typeof cuerpo);
      res.end("Sevidor recibió tu solicitud Post");
    });

    //return res.end('Sevidor recibió tu solicitud Post')
  }
}

const PUERTO = 3000;

servidor.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el Puerto: ${PUERTO}`);
});
