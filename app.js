const limiteIntentos = 6;
const letras = 6;
let intento = 1;
let pistas = 2;
let palabraSecreta = '';

function revisarIntentoActual() {
    let palabra = '';
    for(let i=1; i<=letras; i++) {
        let elemento = document.getElementById(`intento${intento}-letra${i}`);
        let letra = elemento.value.toUpperCase();
        if(letra == '') letra = ' '; // espacio no utilizado
        
        if(letra == palabraSecreta[i-1]) {
            elemento.style.backgroundColor = 'green';
        } else if(palabraSecreta.includes(letra)) {
            elemento.style.backgroundColor = 'yellow';
        } else {
            elemento.style.backgroundColor = '#333333';
        }
        palabra += letra;
    }
    return palabra;
}
function adivinar() {
    let palabra = revisarIntentoActual();
    
    if(palabra == palabraSecreta) {
        document.getElementById('mensaje').innerText = `felicidades has ganado! en ${intento} intento${intento==1 ? '' : 's'}`;
        juegoTerminado();
    } else if(intento < limiteIntentos) {
        deshabilitarEntrada(intento++);
        habilitarEntrada(intento);
    } else {
        document.getElementById('mensaje').innerText = "se terminaron los intentos";
        juegoTerminado();
    }
}
function generarPalabraAleatoria() {
    const banco = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
        fila = `<div id="intento${i}"><span>intento #${i}</span><div class="casillas">`;
        for(let j=1; j<=letras; j++) {
            fila += `<input class="casilla" id="intento${i}-letra${j}" maxlength="1" disabled>`;
        }
        fila += "</div></div>";
        area.innerHTML += fila;
    }
    habilitarEntrada(1);
}
function deshabilitarEntrada(fila) {
    for(let i=1; i<=letras; i++)
        desactivarElemento(`intento${fila}-letra${i}`);
}
function habilitarEntrada(fila) {
    for(let i=1; i<=letras; i++)
        activarElemento(`intento${fila}-letra${i}`);
}

function nuevoJuego() {
    palabraSecreta = generarPalabraAleatoria();
    intento = 1;
    pistas = 2;
    inicializar();
    console.log(palabraSecreta);
}
function juegoTerminado() {
    if(intento < limiteIntentos) {
        deshabilitarEntrada(intento);
    }
    activarElemento('nuevo-juego');
    desactivarElemento('adivinar');
    desactivarElemento('pista');
}
function pista() {
    console.log('quiero una pista')
}

function desactivarElemento(id) {
    document.getElementById(id).setAttribute('disabled', 'true');
}
function activarElemento(id) {
    document.getElementById(id).removeAttribute('disabled');
}
function inicializar() {
    crearEntradas();
    desactivarElemento('nuevo-juego');
    activarElemento('adivinar');
    activarElemento('pista');
    document.getElementById('mensaje').innerText = 'adivina la palabra';
}

nuevoJuego();