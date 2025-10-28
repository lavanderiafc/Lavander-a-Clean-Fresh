document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // LÓGICA DEL MENÚ DE HAMBURGUESA
    // =========================================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        // Alterna la clase 'active' para mostrar/ocultar el menú
        navMenu.classList.toggle('active');
        
        // Opcional: Cambia el icono de hamburguesa a una 'X'
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cierra el menú si se hace clic en un enlace (útil en móviles)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });


    // =========================================================
    // LÓGICA DE NAVEGACIÓN ACTIVA (ScrollSpy)
    // =========================================================
    const navLinks = document.querySelectorAll('.nav-menu a');
    // Todas las secciones del body (hero, services, why-us, testimonials, cta)
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = '';
        
        // Define un margen superior (offset) para que el link cambie ANTES de que la sección toque el borde superior (considera la altura del navbar)
        const offset = 100;

        // Itera las secciones en orden inverso
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop - offset;
            
            // Si el desplazamiento actual es mayor o igual a la parte superior de la sección
            if (window.scrollY >= sectionTop) {
                // Obtenemos el ID de la sección actual (e.g., 'cta')
                current = section.getAttribute('id');
                break; // Rompemos el bucle, ya que encontramos la sección más relevante
            }
        }

        // Remueve 'active' de todos los enlaces y lo añade al enlace de la sección actual
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Buscamos un enlace cuyo 'href' contenga el ID de la sección actual
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            } else if (!current && link.getAttribute('href').includes('hero')) {
                 // Si no hay 'current' (estamos en la parte superior), asegura que 'Inicio' esté activo.
                 link.classList.add('active');
            }
        });
    }

    // Escucha el evento de desplazamiento para cambiar el enlace activo
    window.addEventListener('scroll', setActiveLink);

    // Llama a la función una vez al cargar la página para establecer el estado inicial
    setActiveLink();

});