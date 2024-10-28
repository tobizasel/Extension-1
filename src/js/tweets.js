const contenidoPosta = new Map();
const verificaciones = [];
var iteradorTwits = 0;
const boton = document.createElement("button");


async function agarrarTexto(twit) {
    const autorUrl = twit.children?.[0]?.children?.[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[1]?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[0]?.textContent;
    const url = twit.children?.[0]?.children?.[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[0]?.children?.[1]?.children?.[0]?.children?.[2]?.children?.[0]?.href;

    const tweetId = url ? url.split('/').pop() : 2;
    const autor = autorUrl || "@yo";
    const texto = twit.children[0]?.children[0]?.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.textContent || "";

    return {
        texto,
        autor,
        id: tweetId,
        analizado: false, // Añadir estado de análisis
        estado: null // Añadir estado inicial
    };
}

function procesarTweetEstado(twit, veredicto) {
    if (veredicto.includes("verdadero") || (twit.getAttribute('estado') === "true")) {
        twit.classList.add("verdadero");
    } else if (veredicto.includes("falso") || (twit.getAttribute('estado') === "false")) {
        twit.classList.add("falso");
    } else {
        twit.classList.add("inconcluso");
    }

    if (!twit.querySelector(".logo")) {
        const logo = document.createElement("img");
        logo.setAttribute("src", "https://i.ibb.co/rHcZPqZ/logo-lupa.png");
        logo.setAttribute("class", "logo");
        twit.appendChild(logo);
    }
}

const ponerBoton = (tweets) => {
  tweets.forEach(tweet => {
    if (!tweet.querySelector(".boton-analizar")) {
      boton.textContent = "Analizar"
      boton.setAttribute("class", "boton-analizar");
      tweet.appendChild(boton);
    }
  })
}

const analizar = () => {

}

boton.addEventListener("click", () => analizar)

async function waitForTweets() {
    const tweets = Array.from(document.getElementsByTagName("article"));
    const contenidoPromesas = tweets.map(agarrarTexto);
    const textos = await Promise.all(contenidoPromesas);
    ponerBoton(tweets)

    textos.forEach(contenidoTwit => {
        if (contenidoTwit && contenidoTwit.texto && contenidoTwit.texto !== "vacio") {
            const clave = `${contenidoTwit.texto}|${contenidoTwit.autor}`;
            if (!contenidoPosta.has(clave)) {
                contenidoPosta.set(clave, { ...contenidoTwit, buscado: false });
            }
        }
    });

    const port = chrome.runtime.connect({ name: "search" });
    const tweetsValores = Array.from(contenidoPosta.values()).filter(tweet => !tweet.analizado); // Filtrar solo los no analizados

    // Verificar que el iterador no exceda el número de tweets disponibles
    if (iteradorTwits < tweetsValores.length) {
        const tweetToAnalyze = tweetsValores[iteradorTwits];
        port.postMessage({
            tweet: tweetToAnalyze.texto,
            autor: tweetToAnalyze.autor,
            id: tweetToAnalyze.id
        });

        // Marcar como analizado
        tweetsValores[iteradorTwits].analizado = true;
        iteradorTwits++; // Incrementar el iterador
    }

    port.onMessage.addListener((response) => {
        contenidoPosta.forEach(tweet => {
            if (tweet.texto === response.resultado.tweet) {
                // Guardar el estado del tweet basado en la respuesta
                tweet.estado = response.resultado.resultado.toLowerCase(); // Guardar el estado (ej. "verdadero" o "falso")

                tweets.forEach(tweetART => {
                    if (tweetART.children[0]?.children[0]?.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.textContent === response.resultado.tweet) {
                        procesarTweetEstado(tweetART, tweet.estado);
                    }

                    textos.forEach(tweetPreExistente => {
                      if (tweetART.children[0]?.children[0]?.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.textContent === tweetPreExistente.texto) {
                        if (tweetPreExistente.analizado) {
                          procesarTweetEstado(tweetART, tweetPreExistente);
                        }
                      }
                    })

                  });


            }
        });
    });

    console.log("Contenido procesado:", Array.from(contenidoPosta.values()));
}

// Llama a la función periódicamente para obtener nuevos tweets
const interval = setInterval(waitForTweets, 5000);
