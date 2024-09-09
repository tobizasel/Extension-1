// (async () => {
//   const script = await import(chrome.runtime.getURL('src/js/script.js'));
  
//   // Ahora puedes usar las funciones importadas
//   const keywords = script.extraerKeywords("Texto de ejemplo");
//   console.log(keywords);
// })();

const contenidoPromesas = []
var contenidoArrays = []
var contenido;
var contenidoPosta = [];

async function agarrarTexto(twit){
  return twit.children[0].children[0].children[1].children[1].children[1].children[0].children[0].textContent;
}

console.log("tweet");
   
   const url = "https://i.ibb.co/Mht5qh2/logo.png";
    const logo_normal = "https://i.ibb.co/yq25QXG/logo.png"
    const logo_borde = "https://i.ibb.co/tL8b3qZ/logo-con-borde.png"
    const logo_sinLupa = "https://i.ibb.co/rHcZPqZ/logo-lupa.png"
    let index = 5;
    let tweetsArray = [];


    function tweet(tweets) {
      tweets.forEach((twit) => {
        if (twit.getAttribute('estado') === "true") {
          twit.classList.add("verdadero");
        } else if (twit.getAttribute('estado') === "false") {
          twit.classList.add("falso");
        }

        // Check if logo is already appended
        if (!twit.querySelector(".logo")) {
          const logo = document.createElement("img");
          logo.setAttribute("src", logo_sinLupa);
          logo.setAttribute("class", "logo");
          twit.appendChild(logo); // Agregar el logo al artículo del tweet
        }
      });
    }

    async function waitForTweets() {
      const tweets = document.getElementsByTagName("article");
      const newTweetsArray = Array.from(tweets);
      
      const uniqueTweetsSet = new Set([...tweetsArray, ...newTweetsArray]);
      
      tweetsArray = Array.from(uniqueTweetsSet);
      console.log(tweetsArray);
      console.log(index, "index");

      console.log(".length:" + tweetsArray.length, "/ index:" + index);

      
        tweetsArray.forEach((twit) => {
          if (twit.getAttribute('estado') === null ) { // Only assign estado if it hasn't been set yet
            const real = Math.floor(Math.random() * 2) + 1;
            if (real === 1) {
              twit.setAttribute("estado", "true");
            } else if (real === 2) {
              twit.setAttribute("estado", "false");
            }
          }
          console.log(tweetsArray);
          console.log(agarrarTexto(twit));
          // const textos = await (agarrarTexto(twit))
          contenidoPromesas.push(agarrarTexto(twit))

          Promise.all(contenidoPromesas)
          .then(texto => {
            contenidoArrays = texto
            contenidoPosta = [...new Set(texto)]
          }
          )

        });
        // contenido = contenidoPosta.map(subArray => subArray[0])
        tweet(tweetsArray); // Call tweet with the correct array
        index += 5;
        console.log(contenidoPosta);

        if (contenidoPosta.length > 1) {
          
        }
        contenidoPosta.forEach(textoTwit => {
          console.log(extraerKeywords(textoTwit))
        });

    }




    const interval = setInterval(waitForTweets, 5000); // Verificar cada 3 segundos


    // 