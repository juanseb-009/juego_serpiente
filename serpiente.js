
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMANIO_CELDA = 22;
    const serpiente = [
      {x:0,y:0},
      {x:1,y:0},
      {x:2,y:0}
    ];

    

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
    function pintarParte(lineaX, lineaY){
      let x = lineaX * TAMANIO_CELDA;
      let y = lineaY * TAMANIO_CELDA;

      // Paso 2: Configurar color de relleno y pintar el cuadrado
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

      // Paso 3: Configurar color del borde y dibujar el borde
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

    }

    function pintarSerpiente(){
      for (let i = 0; i < serpiente.length; i++) {
        let parte = serpiente[i];
        pintarParte(parte.x, parte.y);
      }
    }

