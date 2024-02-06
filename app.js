let intentos = 6;
let pistas = 2;
let letras = 6;

function crearEntradas() {
    let area = document.getElementById('entrada');
    area.innerHTML = '';
    for(let i=0; i<intentos; i++) {
        fila = `<div id="intento${i}">`;
        for(let j=0; j<letras; j++) {
            fila += `<input id="intento${i}-letra${j}" maxlength="1">`;
        }
        fila += "</div";
        area.innerHTML += fila;
    }
}

crearEntradas();