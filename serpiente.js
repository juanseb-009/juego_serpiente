
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

    // Primera pintura del juego al cargar la página
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
      pintarSerpiente();
    }

    function dibujarTablero() {
      ctx.strokeStyle = "#0000004f"; // Color de línea

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

      // Paso 2: Configurar color de relleno y pintar el cuadrado
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

      // Paso 3: Configurar color del borde y dibujar el borde
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

    function moverDerecha() {
      // 1. Obtener la posición de la cabeza actual
      let cabezaActual = serpiente[0];

      // 2. Crear una nueva cabeza una celda a la derecha
      let nuevaCabeza = {
        x: cabezaActual.x + 1,
        y: cabezaActual.y
      };

      // 3. Agregar la nueva cabeza al inicio
      serpiente.unshift(nuevaCabeza);

      // 4. Eliminar la última parte de la serpiente
      serpiente.pop();
    }

    function moverIzquierda() {
      let cabezaActual = serpiente[0];

      let nuevaCabeza = {
        x: cabezaActual.x - 1,
        y: cabezaActual.y
      };

      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function moverArriba() {
      let cabezaActual = serpiente[0];

      let nuevaCabeza = {
        x: cabezaActual.x,
        y: cabezaActual.y - 1
      };

      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function moverAbajo() {
      let cabezaActual = serpiente[0];

      let nuevaCabeza = {
        x: cabezaActual.x,
        y: cabezaActual.y + 1
      };

      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function cambiarDireccion(direccion) {
      direccionActual = direccion;
    }

    function moverSerpiente() {
      if (direccionActual === "derecha") {
        moverDerecha();
      }
      else if (direccionActual === "izquierda") {
        moverIzquierda();
      }
      else if (direccionActual === "arriba") {
        moverArriba();
      }
      else if (direccionActual === "abajo") {
        moverAbajo();
      }

      dibujarTodo();
    }

    // =========================
    // INICIAR Y PAUSAR EL JUEGO
    // =========================

    function iniciarJuego() {
      if (intervaloSerpiente !== null) {
        return;
      }

      intervaloSerpiente = setInterval(moverSerpiente, 200);

      document.getElementById("estado").textContent = "Jugando";
      document.getElementById("mensaje").textContent =
        "¡La serpiente está en movimiento!";
    }

    function pausarJuego() {
      clearInterval(intervaloSerpiente);
      intervaloSerpiente = null;

      document.getElementById("estado").textContent = "Pausado";
      document.getElementById("mensaje").textContent =
        "Juego pausado. Presiona Iniciar para continuar.";
    }
