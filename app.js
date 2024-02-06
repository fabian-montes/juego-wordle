let intentos = 6;
let pistas = 2;
let letras = 6;

function crearEntradas() {
    let area = document.getElementById('entrada');
    area.innerHTML = '';
    for(let i=1; i<=intentos; i++) {
        fila = `<div id="intento${i}"> <span>intento #${i}<span>`;
        for(let j=1; j<=letras; j++) {
            fila += `<input class="casilla" id="intento${i}-letra${j}" maxlength="1" disabled>`;
        }
        fila += "</div";
        area.innerHTML += fila;
    }
}
function habilitarEntrada(fila) {
    for(let i=1; i<=intentos; i++)
        document.getElementById(`intento${fila}-letra${i}`).removeAttribute('disabled');
}

crearEntradas();
habilitarEntrada(1);