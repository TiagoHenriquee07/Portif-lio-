// ============================================
// SITE.JS - Funcionalidades Interativas
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initIntersectionObserver();
    initScrollAnimations();
});

// ============================================
// NAVBAR INTERATIVA
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Adicionar classe 'scrolled' ao fazer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fechar navbar ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80; // Offset para navbar fixa

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INTERSECTION OBSERVER PARA ANIMAÇÕES
// ============================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementsToObserve = document.querySelectorAll(
        '.project-card, .skill-category, .info-card, .about-cards, .contact-info'
    );

    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// ANIMAÇÕES AO SCROLL
// ============================================
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition + window.innerHeight > sectionTop + 100) {
                section.style.opacity = '1';
            }
        });
    });
}

// ============================================
// EFEITO PARALLAX (Opcional)
// ============================================
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        });
    }
}

// ============================================
// ANIMAÇÃO DE CONTADORES (Se houver)
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIO (Se houver)
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

// ============================================
// MODO ESCURO/CLARO (Opcional)
// ============================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });

        // Carregar tema salvo
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }
}

// ============================================
// COPIAR EMAIL PARA CLIPBOARD
// ============================================
function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.getAttribute('data-copy');
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copiado!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
}

// ============================================
// LAZY LOADING DE IMAGENS
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ANALYTICS (Opcional)
// ============================================
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            'page_path': window.location.pathname
        });
    }
}

// ============================================
// INICIALIZAR TUDO
// ============================================
function initAll() {
    initNavbar();
    initSmoothScroll();
    initIntersectionObserver();
    initScrollAnimations();
    initParallax();
    initFormValidation();
    initThemeToggle();
    initCopyToClipboard();
    initLazyLoading();
    trackPageView();
}

// Chamar inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function para otimizar event listeners
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function para limitar execução de funções
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Adicionar classe quando elemento entra na viewport
 */
function onElementInView(selector, className = 'in-view') {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/**
 * Scroll suave para elemento específico
 */
function scrollToElement(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

/**
 * Verificar se elemento está visível
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// CONSOLE LOG PARA DEBUG
// ============================================
console.log('%cPortfólio Tiago Oliveira', 'font-size: 20px; color: #0066cc; font-weight: bold;');
console.log('%cDesenvolvedor Front-end | Especialista em Segurança Digital', 'font-size: 14px; color: #0080ff;');
console.log('%cGitHub: https://github.com/TiagoHenriquee07', 'font-size: 12px; color: #999;');
console.log('%cLinkedIn: https://www.linkedin.com/in/tiago-oliveira0808/', 'font-size: 12px; color: #999;');
