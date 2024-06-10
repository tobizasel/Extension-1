const url = "https://i.ibb.co/Mht5qh2/logo.png"
let index = 5;
let tweets = []

function cambiarColor() {
    document.getElementsByTagName("body")[0].style.backgroundColor = "red";
    const h2 = document.createElement("h2");
    h2.textContent = "HOLAAAAA"
    document.getElementsByTagName("body")[0].appendChild(h2)
}



// function cambiarBoton() {
//     const boton = document.getElementsByClassName("RNmpXc");
//     console.log(boton);
//     boton[1].setAttribute("value", "HOLA")
// }   

async function tweet() {

    const tweetsArray = Array.from(tweets)

    tweetsArray.forEach(twit => {
        const real =  Math.floor((Math.random() * 2) + 1)
        console.log(real);
        if (real == 1) {
            twit.classList.add("verdadero")
        } else {
            twit.classList.add("falso")
        }

        console.log(twit);
        console.log(twit.children[0], "AAAAAAAA");
        const logo = document.createElement("img");
        logo.setAttribute("src", "https://i.ibb.co/Mht5qh2/logo.png");
        logo.setAttribute("class", "logo");
        twit.appendChild(logo); // Agregar el logo al artículo del tweet
    });
}

async function waitForTweets() {
            tweets = document.getElementsByTagName("article");
            console.log("hola");
            if (tweets.length >= index) {
                tweet();
            }
            index+=5
}

console.log("hola");
const interval = setInterval(waitForTweets, 5000); // Verificar cada 5 segundos



// cambiarColor();
// cambiarBoton();
console.log("HOLAA");
