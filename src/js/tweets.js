const contenidoPosta = new Map();
const verificaciones = [];
var iteradorTwits = 0;

async function agarrarTexto(twit) {
  const autorUrl =
    twit.children?.[0]?.children?.[0]?.children?.[1]?.children?.[1]
      ?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[0]
      ?.children?.[0]?.children?.[1]?.children?.[0]?.children?.[0]
      ?.children?.[0]?.children?.[0]?.textContent;
  const url =
    twit.children?.[0]?.children?.[0]?.children?.[1]?.children?.[1]
      ?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[0]
      ?.children?.[0]?.children?.[1]?.children?.[0]?.children?.[2]
      ?.children?.[0]?.href;

  const tweetId = url ? url.split("/").pop() : 2;
  const autor = autorUrl || "@yo";
  const textoChequear =
    twit.children[0]?.children[0]?.children[1]?.children[1]?.children[1]
      ?.children[0];
    var texto = ""
    if (textoChequear != undefined) {
      for (let index = 0; index < textoChequear.children.length; index++) {
      if (textoChequear.children[index].tagName == "SPAN") {
        texto += textoChequear.children[index].textContent
      }
    } 
  } 

  return {
    texto,
    autor,
    id: tweetId,
    analizado: false, // Añadir estado de análisis
    estado: null, // Añadir estado inicial
  };
}

function procesarTweetEstado(twit, veredicto) {

  if (!twit.querySelector(".logo")) {
    const logo = document.createElement("img");
    logo.setAttribute("src", "https://i.ibb.co/rHcZPqZ/logo-lupa.png");
    logo.setAttribute("class", "logo");
    twit.appendChild(logo);
  }

  if (
    veredicto.includes("verdadero") ||
    twit.getAttribute("estado") === "true"
  ) {
    const logo = twit.children[1];
    logo.setAttribute("src", "https://i.ibb.co/0C0fX9d/logo-verdadero.png");
    twit.classList.add("verdadero");
  } else if (
    veredicto.includes("falso") ||
    twit.getAttribute("estado") === "false"
  ) {
    twit.classList.add("falso");
    const logo = twit.children[1];
    logo.setAttribute("src", "https://i.ibb.co/Lvf4Thn/logo-falso.png");
  } else {
    twit.classList.add("inconcluso");
  }


}

const ponerBoton = (tweets, textos) => {
  tweets.forEach((tweet) => {
    console.log(tweet.children);
    if (!tweet.querySelector(".boton-analizar") &&  !tweet.querySelector(".boton-analizar--apretado") && tweet.children.length < 2) {
      const boton = document.createElement("button");
      boton.textContent = "Chequear";
      boton.setAttribute("class", "boton-analizar");
      boton.onclick = () => analizar(tweet, tweets, textos); // Usar onclick para llamar a analizar
      tweet.appendChild(boton);
    }
  });
};

const analizar = async (tweet, tweets, textos) => {
  const boton = tweet.children[1];
  console.log("ANALIZANDO ESTE TWEET:", tweet);
  const tweetAnalizar = await agarrarTexto(tweet);
  boton.classList.replace("boton-analizar", "boton-analizar--apretado")
  boton.textContent = "Chequeando..."
  const port = chrome.runtime.connect({ name: "search" });

  port.postMessage({
    tweet: tweetAnalizar.texto,
    autor: tweetAnalizar.autor,
    id: tweetAnalizar.id,
  });

  port.onMessage.addListener((response) => {


    contenidoPosta.forEach((tweet) => {

      if (tweet.id == response.resultado.id) {
        console.log("llego el iFAAA");
        // Guardar el estado del tweet basado en la respuesta
        tweet.estado = response.resultado.resultado.toLowerCase(); // Guardar el estado (ej. "verdadero" o "falso")

        tweets.forEach((tweetART) => {

          const url =
          tweetART.children?.[0]?.children?.[0]?.children?.[1]?.children?.[1]
            ?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[0]
            ?.children?.[0]?.children?.[1]?.children?.[0]?.children?.[2]
            ?.children?.[0]?.href

            console.log(url);
          const tweetId = url ? url.split("/").pop() : 2;
          console.log(tweetId, "/////////////", response.resultado.id);
          if (tweetId == response.resultado.id) {
            boton.remove()
            procesarTweetEstado(tweetART, tweet.estado);
          }

          textos.forEach((tweetPreExistente) => {
            if (
              tweetART.children[0]?.children[0]?.children[1]?.children[1]
                ?.children[1]?.children[0]?.children[0]?.textContent ===
              tweetPreExistente.texto
            ) {
              if (tweetPreExistente.analizado) {
                procesarTweetEstado(tweetART, tweetPreExistente);
              }
            }
          });
        });
      }
    });
  });
};

async function waitForTweets() {
  const tweets = Array.from(document.getElementsByTagName("article"));
  const contenidoPromesas = tweets.map(agarrarTexto);
  const textos = await Promise.all(contenidoPromesas);
  ponerBoton(tweets, textos);

  textos.forEach((contenidoTwit) => {
    if (
      contenidoTwit &&
      contenidoTwit.texto &&
      contenidoTwit.texto !== "vacio"
    ) {
      const clave = `${contenidoTwit.texto}|${contenidoTwit.autor}`;
      if (!contenidoPosta.has(clave)) {
        contenidoPosta.set(clave, { ...contenidoTwit, buscado: false });
      }
    }
  });

  console.log("Contenido procesado:", Array.from(contenidoPosta.values()));
}

// Llama a la función periódicamente para obtener nuevos tweets
const interval = setInterval(waitForTweets, 5000);
