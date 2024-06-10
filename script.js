const url = "https://i.ibb.co/Mht5qh2/logo.png";
let index = 5;

function cambiarColor() {
  document.getElementsByTagName("body")[0].style.backgroundColor = "red";
  const h2 = document.createElement("h2");
  h2.textContent = "HOLAAAAA";
  document.getElementsByTagName("body")[0].appendChild(h2);
}

async function tweet(tweets) {
  const tweetsArray = Array.from(tweets);

  tweetsArray.forEach((twit) => {
    // Definir la propiedad 'estado' si no está definida
    console.log(twit.estado);

    if (twit.estado == true) {
        twit.classList.add("verdadero");
      } else {
        twit.classList.add("falso");
      }

    console.log(twit.children[0], "AAAAAAAA");
    const logo = document.createElement("img");
    logo.setAttribute("src", "https://i.ibb.co/Mht5qh2/logo.png");
    logo.setAttribute("class", "logo");
    twit.appendChild(logo); // Agregar el logo al artículo del tweet
  });
}

async function waitForTweets() {
  const tweets = document.getElementsByTagName("article");
  let tweetsArray = ""
  console.log(tweets);
    tweetsArray = Array.from(...tweetsArray, tweets);
  console.log(tweetsArray);
  if (tweets.length >= 5) {
    tweetsArray.forEach((twit) => {
      const real = Math.floor(Math.random() * 2 + 1);
      console.log(real);

    if (twit.estado === undefined) {
        twit.estado = false;
        twit.setAttribute("estado", false);
      }

      if (real == 1) {
        twit.estado = true;
        twit.setAttribute("estado", true);
      } else {
        twit.estado = false;
        twit.setAttribute("estado", false);
      }
      tweet(tweets);

    });
  }
  index += 5;
}

console.log("hola");
const interval = setInterval(waitForTweets, 5000); // Verificar cada 5 segundos

console.log("HOLAA");
