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

