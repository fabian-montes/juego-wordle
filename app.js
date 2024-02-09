const limiteIntentos = 6;
const letras = 6;
let intento = 1;
let pistas = 2;
let palabraSecreta = '';
let pistasPrevias = [];

function revisarIntentoActual() {
    let palabra = '';
    for(let i=1; i<=letras; i++) {
        let elemento = document.getElementById(`intento${intento}-letra${i}`);
        let letra = elemento.value.toUpperCase();
        if(letra == '') letra = ' '; // espacio no utilizado
        
        if(letra == palabraSecreta[i-1]) {
            elemento.classList.add('correcto');
        } else if(palabraSecreta.includes(letra)) {
            elemento.classList.add('modificar');
        } else {
            elemento.classList.add('incorrecto');
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
async function generarPalabraAleatoria() {
    let response = await fetch(`https://random-word-api.herokuapp.com/word?length=${letras}`);
    let arreglo = await response.json();
    let palabra = await arreglo[0];
    palabra = palabra.toUpperCase();
    //console.log(typeof palabra);
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

async function nuevoJuego() {
    palabraSecreta = await generarPalabraAleatoria();
    pistasPrevias = [];
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
    if(pistas <= 0) return;
    let indice = Math.floor(Math.random() * palabraSecreta.length);
    while(pistasPrevias.includes(indice)) {
        indice = Math.floor(Math.random() * palabraSecreta.length);
    }
    let pista = palabraSecreta.charAt(indice);
    
    document.getElementById(`intento${intento}-letra${indice+1}`).value = pista;
    desactivarElemento(`intento${intento}-letra${indice+1}`);
    pistas--;
    textoBotonPista();
}

function textoBotonPista() {
    document.getElementById('pista').innerText = `pistas: ${pistas}`;
}
function desactivarElemento(id) {
    document.getElementById(id).setAttribute('disabled', 'true');
}
function activarElemento(id) {
    document.getElementById(id).removeAttribute('disabled');
}
function inicializar() {
    crearEntradas();
    textoBotonPista();
    desactivarElemento('nuevo-juego');
    activarElemento('adivinar');
    activarElemento('pista');
    document.getElementById('mensaje').innerText = 'adivina la palabra';
}

nuevoJuego();