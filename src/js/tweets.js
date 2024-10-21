// Función para extraer texto del tweet
const contenidoPosta = new Map()


async function agarrarTexto(twit) {

  const autorUrl = twit.children[0].children[0].children[1].children[1].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[0].textContent;
  const idTweet = twit.children[0].children[0].children[1].children[1].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[2].children[0].href
  // const partes = autorUrl.split('/')
  const autor = autorUrl
  console.log(autor);

  if (twit.children[0].children[0].children[1].children[1].children[1].textContent === "") {
    // const urlImagen = twit.children[0].children[0].children[1].children[1].children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[1].src;
    return "vacio";
  }
  console.log(twit.children[0].children[0].children[1].children[1].children[1].children[0].children[0]);
  return {
    texto: twit.children[0].children[0].children[1].children[1].children[1].children[0].children[0].textContent,
    autor: autor,
    id: idTweet
  }
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

  // Filtra textos únicos y los guarda en el Map
  textos.forEach(contenidoTwit => {
    if (contenidoTwit && contenidoTwit.texto && contenidoTwit.texto !== "vacio") {
      const clave = contenidoTwit.texto + '|' + contenidoTwit.autor; // Crear clave única
      if (!contenidoPosta.has(clave)) {
        contenidoPosta.set(clave, { texto: contenidoTwit.texto, buscado: false, autor: contenidoTwit.autor });
      }
    }
  });

  const port = chrome.runtime.connect({ name: "search" });

  contenidoPosta.forEach((tweet) => {
    if (!tweet.texto || !tweet.autor) {
      console.error("El tweet no contiene la información necesaria:", tweet);
      return; // Evitar enviar mensajes si falta información
    }
    console.log(tweet);
  
    port.postMessage({
      tweet: tweet.texto,
      autor: tweet.autor,
      id: tweet.id
    });
  });

  port.onMessage.addListener((response) => {
    console.log("75TWEETS: ", response);
    if (response && response.resultado) {
      console.log("Respuesta del background script:", response.resultado);
      
    } else {
      console.error("No se recibió un resultado válido del background script.", response);
    }
  });

  // Procesa los tweets y añade bordes/logos
  tweets.forEach(twit => {
    if (!twit.getAttribute('estado')) {  // Solo asignar estado si aún no está definido
      const real = Math.random() < 0.5 ? "true" : "false";
      

      twit.setAttribute("estado", real);
    }
    procesarTweetEstado(twit);  // Añadir bordes/logos según el estado
  });


  console.log("Contenido procesado:", Array.from(contenidoPosta.values()));
}

// Llama a la función periódicamente para obtener nuevos tweets
console.log("HOLAAA");
const interval = setInterval(waitForTweets, 5000);  // Verificar cada 5 segundos
  