// Función para eliminar tildes
function sacarTildes(texto) {
  const mapaTildes = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
    'ü': 'u', 'Ü': 'U'
  };
  return texto.replace(/[áéíóúÁÉÍÓÚüÜ]/g, letra => mapaTildes[letra] || letra);
}

// Función para eliminar comillas y limpiar el texto
const sacarComillas = (texto) => {
  return texto
    .replace(/"/g, '')  // Eliminar comillas
    .replace(/,\s*/g, ' ')  // Reemplazar comas y espacios posteriores con un solo espacio
    .trim();  // Eliminar espacios al principio y al final
}

// Función para extraer palabras clave
function extraerKeywords(texto) {
  const palabrasVacias = [
    "el", "la", "los", "las", "un", "una", "unos", "unas", "y", "o", "pero", 
    "si", "no", "en", "de", "a", "para", "por", "con", "sin", "que", "se", 
    "del", "al", "es", "son", "como", "más", "este", "esta", "estos", "estas",
    "hacia", "anuncio", "sobre", "entre", "durante", "hasta", "aún", "mientras", 
    "también", "así", "tan", "donde", "cual", "quien", "cuyo", "aunque", "siempre",
    "ni", "tampoco", "porque", "además", "ya", "muy", "mío", "tuyo", "suyo",
    "nuestro", "vuestro", "algo", "nada", "todo", "alguno", "ninguno", "cada", 
    "tanto", "demasiado", "poco", "algunos", "cualquier", "cualquiera", "tal", 
    "aquel", "aquella", "ese", "esa"
  ];

  texto = sacarTildes(texto);

  // Modificar el regex para incluir números, porcentajes y palabras
  let palabras = texto.toLowerCase().match(/[\w\d%]+/g) || [];

  // Filtrar palabras
  palabras = palabras.filter(palabra => !palabrasVacias.includes(palabra) && palabra.length > 3);

  // Unir palabras en una cadena
  let textoFiltrado = palabras.join(' ');

  // Aplicar transformaciones
  textoFiltrado = sacarComillas(textoFiltrado);

  return textoFiltrado;
}

// Array para almacenar tweets procesados
var contenidoPosta = new Set();

function buscarGoogle(tweet) {
  var myHeaders = new Headers();
  myHeaders.append("X-API-KEY", "c53d59c25876d584593b303eb26a81bd7579734c");
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
  "q": (tweet),
  "location": "Argentina",
  "gl": "ar",
  "hl": "es-419"
  });
  
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };
  
  fetch("https://google.serper.dev/search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

// Función para extraer texto del tweet
async function agarrarTexto(twit) {
  if (twit.children[0].children[0].children[1].children[1].children[1].textContent === "") {
    return twit.children[0].children[0].children[1].children[1].children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[1].src;
  }
  return twit.children[0].children[0].children[1].children[1].children[1].children[0].children[0].textContent;
}

// Función para agregar bordes y logos según el estado del tweet
function procesarTweetEstado(twit) {
  if (twit.getAttribute('estado') === "true") {
    twit.classList.add("verdadero"); // Agregar borde o estilo si es verdadero
  } else if (twit.getAttribute('estado') === "false") {
    twit.classList.add("falso"); // Agregar borde o estilo si es falso
  }

  // Agregar logo si no está ya presente
  if (!twit.querySelector(".logo")) {
    const logo = document.createElement("img");
    logo.setAttribute("src", "https://i.ibb.co/rHcZPqZ/logo-lupa.png");
    logo.setAttribute("class", "logo");
    twit.appendChild(logo); // Agregar el logo al tweet
  }
}

// Función para procesar los tweets
async function waitForTweets() {
  const tweets = Array.from(document.getElementsByTagName("article"));
  const contenidoPromesas = tweets.map(agarrarTexto);

  // Ejecuta todas las promesas y espera a que terminen
  const textos = await Promise.all(contenidoPromesas);

  // Filtra textos únicos y los guarda en el Set
  textos.forEach(texto => {
    if (texto) {
      contenidoPosta.add({
        texto: texto,
        buscado: false
      });  // El Set garantiza que no se dupliquen
    }
  });

  // Procesa los tweets y añade bordes/logos


  // Extrae keywords para cada tweet almacenado en contenidoPosta
  contenidoPosta.forEach(texto => {
    const keywords = extraerKeywords(texto.texto);
    console.log("Keywords:", keywords);
    
  });



  tweets.forEach(twit => {
    if (!twit.getAttribute('estado')) { // Solo asignar estado si aún no está definido
      const real = Math.random() < 0.5 ? "true" : "false";
      twit.setAttribute("estado", real);
    }
    procesarTweetEstado(twit); // Añadir bordes/logos según el estado
  });

  console.log("Contenido procesado:", contenidoPosta);
}

// Llama a la función periódicamente para obtener nuevos tweets
const interval = setInterval(waitForTweets, 5000);  // Verificar cada 5 segundos
