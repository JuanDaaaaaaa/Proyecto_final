let contador = 0;

function animarAlCarrito(boton) {
  const carrito = document.getElementById('carrito');
  let contadorCarrito = document.getElementById('contador-carrito');

  // Crear el contador si no existe aún
  if (!contadorCarrito) {
    contadorCarrito = document.createElement('span');
    contadorCarrito.id = 'contador-carrito';
    carrito.parentElement.style.position = "relative";
    carrito.parentElement.appendChild(contadorCarrito);
    contadorCarrito.textContent = "0";
  }

  // Crear un puntico nuevo en cada clic
  const clon = document.createElement('div');
  clon.classList.add('elemento-volador');
  clon.style.width = "30px";
  clon.style.height = "30px";
  clon.style.borderRadius = "50%";
  clon.style.background = "red";
  document.body.appendChild(clon);

  // Posiciones iniciales y finales
  const rectBoton = boton.getBoundingClientRect();
  const rectCarrito = carrito.getBoundingClientRect();

  clon.style.left = rectBoton.left + "px";
  clon.style.top = rectBoton.top + "px";

  // Forzar reflow
  clon.offsetWidth;

  // Calcular traslación
  const x = rectCarrito.left - rectBoton.left;
  const y = rectCarrito.top - rectBoton.top;

  clon.style.transform = `translate(${x}px, ${y}px) scale(0.2)`;
  clon.style.opacity = "0.2";

  // Cuando termine la animación → sumar al contador
  clon.addEventListener('transitionend', (e) => {
    if (e.propertyName === "transform") {
      clon.remove();
      contador++;
      contadorCarrito.textContent = contador;
    }
  });
}

// Evento para los botones
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.btn-agregar').forEach(boton => {
    boton.addEventListener('click', () => animarAlCarrito(boton));
  });
});





// Función para cargar un componente HTML
async function cargarComponente(contenedorId, rutaArchivo) {
    try {
        const respuesta = await fetch(rutaArchivo);
        if (!respuesta.ok) {
            throw new Error(`Error al cargar ${rutaArchivo}: ${respuesta.status}`);
        }
        const html = await respuesta.text();
        const contenedor = document.getElementById(contenedorId);
        if (contenedor) {
            contenedor.innerHTML = html;
        }
    } catch (error) {
        console.error('Error cargando componente:', error);
    }
}

// Función para cargar todos los componentes
async function cargarTodosLosComponentes() {
    await Promise.all([
        cargarComponente('contenedor-navegacion', 'Navegacion.html'),
        cargarComponente('contenedor-pie', 'pie-pagina.html')
    ]);
    
    // Después de cargar, inicializar funcionalidades
    inicializarNavegacion();
    resaltarPaginaActual();
}


{
    
    // Funcionalidad del menú desplegable
    const menuDesplegable = document.querySelector('.menu-desplegable')
    if (menuDesplegable) {
        menuDesplegable.addEventListener('mouseenter', () => {
            const submenu = menuDesplegable.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'block';
            }
        });
        
        menuDesplegable.addEventListener('mouseleave', () => {
            const submenu = menuDesplegable.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'none';
            }
        });
    }
}
// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarTodosLosComponentes);

