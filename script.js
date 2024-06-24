const url = "https://i.ibb.co/Mht5qh2/logo.png";
let index = 5;
let tweetsArray = [];

function cambiarColor() {
  document.getElementsByTagName("body")[0].style.backgroundColor = "red";
  const h2 = document.createElement("h2");
  h2.textContent = "HOLAAAAA";
  document.getElementsByTagName("body")[0].appendChild(h2);
}

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
      logo.setAttribute("src", url);
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
  console.log(index, "index");

  console.log(".length:" + tweetsArray.length, "/ index:" + index);

  if (tweetsArray.length <= index) {
    tweetsArray.forEach((twit) => {

      if (twit.getAttribute('estado') === null ) { // Only assign estado if it hasn't been set yet
        const real = Math.floor(Math.random() * 2) + 1;
        if (real === 1) {
          twit.setAttribute("estado", "true");
        } else if (real === 2) {
          twit.setAttribute("estado", "false");
        }
      }
      agarrarTexto(twit)
    });
    tweet(tweetsArray); // Call tweet with the correct array
    index += 5;
  }
}

async function agarrarTexto(twit){
  console.log(twit.children);
}


const interval = setInterval(waitForTweets, 5000); // Verificar cada 3 segundos

