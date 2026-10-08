// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Hamburguesa Móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Indicador de Página Activa
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        // Extraemos el nombre del archivo del href
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 3. Acordeón de Preguntas Frecuentes (FAQ)
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            
            // Cerrar todos los demás
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                    item.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });

            // Alternar el actual
            currentItem.classList.toggle('active');
            const icon = question.querySelector('i');
            if (currentItem.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
                icon.style.transition = 'transform 0.3s ease';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // 4. Validación Básica Formulario Contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const contactStatus = document.getElementById('contact-status');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (contactForm.action.includes('TU_ID_DE_FORMULARIO')) {
                contactStatus.textContent = 'Configura la URL de tu formulario de Formspree antes de enviar solicitudes.';
                return;
            }

            submitButton.disabled = true;
            contactStatus.textContent = 'Enviando tu solicitud...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) {
                    contactStatus.textContent = 'No se pudo enviar la solicitud. Revisa la configuración de Formspree e inténtalo de nuevo.';
                    return;
                }

                contactForm.reset();
                contactStatus.textContent = '¡Gracias! Recibimos tu solicitud y nos pondremos en contacto pronto.';
            } catch (error) {
                contactStatus.textContent = 'Ocurrió un error de conexión al enviar la solicitud. Inténtalo de nuevo.';
            } finally {
                submitButton.disabled = false;
            }
        });
    }
});