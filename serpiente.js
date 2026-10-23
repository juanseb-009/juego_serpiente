
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 22;

const serpiente = [
  {x:7,y:7},
  {x:6,y:7},
  {x:5,y:7},
  {x:4,y:7},
  {x:4,y:8},
  {x:4,y:9}
];

let intervaloSerpiente = null;
let direccionActual = "derecha";
let juegoTerminado = false;
let velocidad = 300;

const columnas = Math.floor(canvas.width / TAMANIO_CELDA);
const filas = Math.floor(canvas.height / TAMANIO_CELDA);

// Objeto para guardar la posición actual de la comida
let comida = { x: 0, y: 0 };
let puntaje = 0;
let comidas = 0;

// Primera pintura del juego al cargar la página
generarComida();
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}

function dibujarTablero() {
  ctx.strokeStyle = "#0000004f";

  // Líneas verticales
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Líneas horizontales
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;

  // Configurar color de relleno y pintar el cuadrado
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  // Configurar color del borde y dibujar el borde
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    let parte = serpiente[i];

    if (i === 0) {
      ctx.fillStyle = "rgb(1, 179, 255)";
    }
    else {
      ctx.fillStyle = "#22c55e";
    }

    pintarParte(parte.x, parte.y);
  }
}

// =========================
// FUNCIONES DE MOVIMIENTO
// =========================

function moverDerecha(crecer = false) {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza);

  if (!crecer) {
    serpiente.pop();
  }
}

function moverIzquierda(crecer = false) {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x - 1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza);

  if (!crecer) {
    serpiente.pop();
  }
}

function moverArriba(crecer = false) {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y - 1
  };

  serpiente.unshift(nuevaCabeza);

  if (!crecer) {
    serpiente.pop();
  }
}

function moverAbajo(crecer = false) {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y + 1
  };

  serpiente.unshift(nuevaCabeza);

  if (!crecer) {
    serpiente.pop();
  }
}

function cambiarDireccion(direccion) {
   if (
    (direccionActual === "derecha" && direccion === "izquierda") ||
    (direccionActual === "izquierda" && direccion === "derecha") ||
    (direccionActual === "arriba" && direccion === "abajo") ||
    (direccionActual === "abajo" && direccion === "arriba")
  ) {
    return;
  }

  direccionActual = direccion;
}

function moverSerpiente() {
  // Si el juego terminó, no continuar
  if (juegoTerminado) {
    return;
  }

  // Comprobar si la cabeza está en la comida
  let comio = atrapaComida();

  if (direccionActual === "derecha") {
    moverDerecha(comio);
  }
  else if (direccionActual === "izquierda") {
    moverIzquierda(comio);
  }
  else if (direccionActual === "arriba") {
    moverArriba(comio);
  }
  else if (direccionActual === "abajo") {
    moverAbajo(comio);
  }

  // Comprobar si la serpiente salió del tablero
  let cabeza = serpiente[0];

  if (
    cabeza.x < 0 ||
    cabeza.x >= columnas ||
    cabeza.y < 0 ||
    cabeza.y >= filas
  ) {
    juegoTerminado = true;

    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;

    document.getElementById("estado").textContent = "GAME OVER";
    document.getElementById("mensaje").textContent =
      "¡Fin del juego! Presiona Reiniciar para jugar otra vez.";

    return;
  }

  // Sumar puntos cuando come
  if (comio) {
    puntaje += 10;
    document.getElementById("puntaje").textContent = puntaje;
    console.log("Puntaje:", puntaje);
    console.log("Comidas:",comidas);

  if (comida % 5 === 0){
    velocidad -= 50;

    clearInterval(intervaloSerpiente);
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);
  }

    generarComida();
  }

  // Actualizar el dibujo después del movimiento
  dibujarTodo();
}

// =========================
// INICIAR, PAUSAR Y REINICIAR
// =========================

function iniciarJuego() {
  if (juegoTerminado) {
    return;
  }

  generarComida();

  if (intervaloSerpiente !== null) {
    return;
  }

  intervaloSerpiente = setInterval(moverSerpiente, velocidad);

  document.getElementById("estado").textContent = "Jugando";
  document.getElementById("mensaje").textContent =
    "¡La serpiente está en movimiento!";
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;

  if (!juegoTerminado) {
    document.getElementById("estado").textContent = "Pausado";
    document.getElementById("mensaje").textContent =
      "Juego pausado. Presiona Iniciar para continuar.";
  }
}

function reiniciarJuego() {
  // Detener el movimiento actual
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;

  // Restaurar la posición inicial de la serpiente
  serpiente.splice(0, serpiente.length);

  serpiente.push(
    {x:7,y:7},
    {x:6,y:7},
    {x:5,y:7},
    {x:4,y:7},
    {x:4,y:8},
    {x:4,y:9}
  );

  // Restaurar la dirección y el estado del juego
  direccionActual = "derecha";
  juegoTerminado = false;

  // Reiniciar el puntaje
  puntaje = 0;
  comidas = 0;
  velocidad = 300;
  document.getElementById("puntaje").textContent = puntaje;

  // Actualizar los mensajes
  document.getElementById("estado").textContent = "Listo";
  document.getElementById("mensaje").textContent =
    "Presiona iniciar para comenzar.";

  // Generar comida nueva y dibujar el juego
  generarComida();
  dibujarTodo();
}

// =========================
// FUNCIONES DE LA COMIDA
// =========================

function pintarComida() {
  let x = comida.x * TAMANIO_CELDA;
  let y = comida.y * TAMANIO_CELDA;

  ctx.fillStyle = "#ef4444";
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function atrapaComida() {
  // Obtener la posición actual de la cabeza
  let cabeza = serpiente[0];

  // Comparar las coordenadas con la comida
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;
  }

  return false;
}

function generarComida() {
  comida.x = Math.floor(Math.random() * columnas);
  comida.y = Math.floor(Math.random() * filas);
}
