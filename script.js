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

async function waitForTweets() {
    return new Promise(resolve => {
        let interval = setInterval(() => {
            tweets = document.getElementsByTagName("article");
            if (tweets.length >= 5) {
                clearInterval(interval);
                resolve();
            }
        }, 1000); // Verificar cada segundo
    });
}

async function tweet() {

    await waitForTweets();
    const tweets = document.getElementsByTagName("article");
    console.log(tweets);
    
    const tweetsArray = Array.from(tweets)

    tweetsArray.forEach(twit => {
        console.log(twit);
        const logo = document.createElement("img");
        logo.setAttribute("src", "data:image/png;base64,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");
        logo.setAttribute("class", "logo");
        twit.appendChild(logo); // Agregar el logo al artículo del tweet
    });
}



cambiarColor();
// cambiarBoton();
tweet();