const limiteIntentos = 6;
let intento = 1;
let pistas = 2;
let letras = 6;
let palabraSecreta = generarPalabraAleatoria();
console.log(palabraSecreta);

function leerIntentoActual() {
    palabra = '';
    for(let i=1; i<=letras; i++) {
        palabra += document.getElementById(`intento${intento}-letra${i}`).value.toUpperCase();
    }
    return palabra;
}
function adivinar() {
    let palabraUsuario = leerIntentoActual();
    console.log(palabraUsuario);
}
function generarPalabraAleatoria() {
    const banco = '"ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let palabra = '';
    for(let i=0; i<letras; i++) {
        palabra += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return palabra;
}
function crearEntradas() {
    let area = document.getElementById('entrada');
    area.innerHTML = '';
    for(let i=1; i<=limiteIntentos; i++) {
        fila = `<div id="intento${i}"> <span>intento #${i}<span>`;
        for(let j=1; j<=letras; j++) {
            fila += `<input class="casilla" id="intento${i}-letra${j}" maxlength="1" disabled>`;
        }
        fila += "</div";
        area.innerHTML += fila;
    }
    habilitarEntrada(1);
}
function habilitarEntrada(fila) {
    for(let i=1; i<=limiteIntentos; i++)
        document.getElementById(`intento${fila}-letra${i}`).removeAttribute('disabled');
}

crearEntradas();