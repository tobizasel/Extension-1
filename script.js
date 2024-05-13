function cambiarColor() {
    document.getElementsByTagName("body")[0].style.backgroundColor = "red";
    const h2 = document.createElement("h2");
    h2.textContent = "HOLAAAAA"
    document.getElementsByTagName("body")[0].appendChild(h2)
}

function cambiarBoton() {
    const boton = document.getElementsByClassName("RNmpXc");
    console.log(boton);
    boton[1].setAttribute("value", "HOLA")
}   

cambiarColor();
cambiarBoton();
