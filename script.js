const url = "https://drive.google.com/file/d/1sQulZXA8hcyzzgA1-yJZ_WsnUQnOrann/view?usp=sharing"

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
        }, [1000, window.onscroll()]); // Verificar cada segundo
    });
}

async function tweet() {

    await waitForTweets();
    const tweets = document.getElementsByTagName("article");
    const tweetsArray = Array.from(tweets)

    tweetsArray.forEach(twit => {
        twit.classList.add("verdadero")
        console.log(twit);
        const logo = document.createElement("img");
        logo.setAttribute("src", {url});
        logo.setAttribute("class", "logo");
        twit.appendChild(logo); // Agregar el logo al artículo del tweet
    });
}




// cambiarColor();
// cambiarBoton();
tweet();