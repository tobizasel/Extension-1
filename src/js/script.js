console.log("script");

const botonESTEA = document.getElementById("boton")
const body = document.getElementsByTagName("body")

botonESTEA.addEventListener('click', agregar)

function agregar() {

    const p = document.createElement('p')
    p.textContent = "AAAAAAAAAAA"
    body.appendChild(p)
}