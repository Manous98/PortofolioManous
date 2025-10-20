// ========== PORTFOLIO CYBERSECURITY - MAIN JAVASCRIPT ==========

// ========== CONFIGURATION ==========
const CONFIG = {
    typewriterTexts: [
        "Full Stack Developer",
        "Security Student", 
        "C|CT EC-Council Student",
        "Python Developer",
        "Web Developer",
        "Cybersecurity Enthusiast"
    ],
    themes: {
        default: {
            '--primary-color': '#5D5CDE',
            '--accent-color': '#ff0040',
            '--cyber-color': '#8b00ff',
            '--matrix-color': '#00ffff'
        },
        matrix: {
            '--primary-color': '#00ff41',
            '--accent-color': '#008f11',
            '--cyber-color': '#004f08',
            '--matrix-color': '#00ff41'
        },
        cyber: {
            '--primary-color': '#ff6600',
            '--accent-color': '#ffaa00',
            '--cyber-color': '#ff3300',
            '--matrix-color': '#ffff00'
        },
        neon: {
            '--primary-color': '#ff1493',
            '--accent-color': '#ff69b4',
            '--cyber-color': '#ff00ff',
            '--matrix-color': '#ffb6c1'
        }
    },
    skillDescriptions: {
        linux: {
            title: "Administration Linux/Windows",
            description: "Maîtrise de l'administration système sur Linux (Ubuntu, CentOS) et Windows Server. Configuration de serveurs, gestion des utilisateurs, automatisation avec scripts Bash/PowerShell, monitoring système et résolution de problèmes."
        },
        fullstack: {
            title: "Développement Web Full-Stack", 
            description: "Développement complet d'applications web avec Python (Django, Flask), JavaScript (React, Node.js), HTML/CSS, bases de données relationnelles. Expérience en architecture MVC, API REST, et déploiement d'applications."
        },
        cloud: {
            title: "Administration Cloud/Microsoft365",
            description: "Gestion d'environnements cloud Microsoft 365, Azure Active Directory, configuration des services Office 365, gestion des licences et sécurité. Automatisation des tâches d'administration avec PowerShell."
        },
        database: {
            title: "Bases de données (PostgreSQL, MySQL)",
            description: "Conception, développement et administration de bases de données relationnelles. Optimisation des requêtes SQL, gestion des performances, sauvegarde/restauration, et intégration avec applications web."
        },
        ceh: {
            title: "CEH Formation complète",
            description: "Formation en Ethical Hacking couvrant les phases de reconnaissance, scanning, énumération, exploitation des vulnérabilités, post-exploitation. Utilisation d'outils comme Metasploit, Nmap, Wireshark dans un cadre légal."
        },
        testing: {
            title: "Test logiciel",
            description: "Tests fonctionnels et techniques d'applications, création de cas de test, tests de régression, détection et documentation des bugs. Méthodologies Agile et outils de test automatisé."
        }
    }
};

// ========== EFFET TYPEWRITER ==========
class Typewriter {
    constructor(element, texts) {
        this.element = element;
        this.texts = texts;
        this.textIndex = 0;
        this.charIndex = 0;
    }

    type() {
        if (this.element && this.charIndex < this.texts[this.textIndex].length) {
            this.element.textContent += this.texts[this.textIndex].charAt(this.charIndex);
            this.charIndex++;
            setTimeout(() => this.type(), 100);
        } else if (this.element) {
            setTimeout(() => this.erase(), 2000);
        }
    }

    erase() {
        if (this.element && this.charIndex > 0) {
            this.element.textContent = this.texts[this.textIndex].substring(0, this.charIndex - 1);
            this.charIndex--;
            setTimeout(() => this.erase(), 50);
        } else {
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            setTimeout(() => this.type(), 500);
        }
    }

    start() {
        setTimeout(() => this.type(), 1000);
    }
}

// ========== PARTICULES MATRIX ==========
class MatrixParticles {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
    }

    init() {
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.cssText = 'position:absolute;top:0;left:0;z-index:1;opacity:0.1;pointer-events:none';
        
        this.container.appendChild(this.canvas);
        this.createParticles();
        this.animate();
        this.setupResize();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            const colors = this.getThemeColors();
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                colorIndex: Math.floor(Math.random() * colors.length),
                life: Math.random() * 100 + 50
            });
        }
    }

    getThemeColors() {
        const root = document.documentElement;
        return [
            getComputedStyle(root).getPropertyValue('--accent-color').trim() || '#ff0040',
            getComputedStyle(root).getPropertyValue('--cyber-color').trim() || '#8b00ff',
            getComputedStyle(root).getPropertyValue('--matrix-color').trim() || '#00ffff',
            getComputedStyle(root).getPropertyValue('--primary-color').trim() || '#5D5CDE'
        ];
    }

    animate() {
        const colors = this.getThemeColors();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.fillStyle = colors[particle.colorIndex] || colors[0];
            this.ctx.globalAlpha = particle.life / 100;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            if (particle.life <= 0) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = Math.random() * 100 + 50;
                particle.colorIndex = Math.floor(Math.random() * colors.length);
            }
        });
        
        this.drawConnections(colors);
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections(colors) {
        this.ctx.globalAlpha = 0.1;
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                if (distance < 100) {
                    this.ctx.strokeStyle = colors[2] || '#00ffff';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
}

// ========== GESTIONNAIRE DE THÈMES ==========
class ThemeManager {
    constructor(themes) {
        this.themes = themes;
        this.currentTheme = 'default';
    }

    init() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.applyTheme(btn.dataset.theme);
            });
        });

        const savedTheme = localStorage.getItem('cyberpunk-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.applyTheme(savedTheme);
        }
    }

    applyTheme(themeName) {
        if (!this.themes[themeName]) return;

        const root = document.documentElement;
        Object.entries(this.themes[themeName]).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        localStorage.setItem('cyberpunk-theme', themeName);
        this.currentTheme = themeName;
    }
}

// ========== GESTIONNAIRE MODE SOMBRE ==========
class DarkModeManager {
    constructor() {
        this.isDark = false;
    }

    init() {
        // Détecter préférence système
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            this.isDark = true;
        }

        // Charger préférence sauvegardée
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.isDark = savedTheme === 'dark';
            document.documentElement.classList.toggle('dark', this.isDark);
        }

        // Bouton toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }

        // Écouter changements système
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                this.isDark = e.matches;
                document.documentElement.classList.toggle('dark', this.isDark);
            }
        });
    }

    toggle() {
        this.isDark = !this.isDark;
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    }
}

// ========== ANIMATIONS AU SCROLL ==========
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.group, .skill-item, .bg-white, .bg-gray-50').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });

        this.initCounterAnimation();
        this.initSkillBarsAnimation();
    }

    initCounterAnimation() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
        if (statsSection) counterObserver.observe(statsSection);
    }

    animateCounters() {
        const counters = document.querySelectorAll('.text-2xl.font-bold, .text-3xl.font-bold');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (number > 0) {
                let current = 0;
                const increment = number / 60;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        counter.textContent = text;
                        clearInterval(timer);
                    } else {
                        counter.textContent = text.replace(/[0-9]+/, Math.floor(current));
                    }
                }, 50);
            }
        });
    }

    initSkillBarsAnimation() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => this.animateSkillBars(), 500);
                    skillObserver.unobserve(entry.target);
                }
            });
        });

        const competencesSection = document.getElementById('competences');
        if (competencesSection) skillObserver.observe(competencesSection);
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('[style*="width:"]');
        
        skillBars.forEach(bar => {
            if (bar.style.width) {
                const width = bar.style.width;
                bar.style.setProperty('--progress-width', width);
                bar.style.width = '0%';
                bar.classList.add('skill-progress');
            }
        });
    }
}

// ========== NAVIGATION ==========
class Navigation {
    init() {
        this.initMobileMenu();
        this.initSmoothScroll();
    }

    initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('menu');
        
        if (mobileMenuButton && menu) {
            mobileMenuButton.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
            
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.add('hidden');
                });
            });
            
            document.addEventListener('click', (event) => {
                if (!mobileMenuButton.contains(event.target) && !menu.contains(event.target)) {
                    menu.classList.add('hidden');
                }
            });
        }
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ========== SCROLL TO TOP ==========
class ScrollToTop {
    init() {
        const btn = document.getElementById('scrollToTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                btn.style.transform = 'scale(1) rotate(45deg)';
            } else {
                btn.style.opacity = '0';
                btn.style.pointerEvents = 'none';
                btn.style.transform = 'scale(0.8) rotate(45deg)';
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            btn.style.animation = 'rocket 0.5s ease-out';
            setTimeout(() => { btn.style.animation = ''; }, 500);
        });
    }
}

// ========== GESTIONNAIRE DE COMPÉTENCES ==========
class SkillsManager {
    constructor(descriptions) {
        this.descriptions = descriptions;
    }

    init() {
        const descriptionBox = document.getElementById('skill-description');
        if (!descriptionBox) return;

        document.querySelectorAll('.skill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const skillKey = btn.getAttribute('data-skill');
                const titleElement = descriptionBox.querySelector('h5');
                const textElement = descriptionBox.querySelector('p');
                
                titleElement.textContent = this.descriptions[skillKey].title;
                textElement.textContent = this.descriptions[skillKey].description;
                
                descriptionBox.classList.remove('hidden');
                descriptionBox.style.opacity = '0';
                setTimeout(() => { descriptionBox.style.opacity = '1'; }, 10);
                
                document.querySelectorAll('.skill-btn').forEach(b => 
                    b.classList.remove('ring-2', 'ring-primary')
                );
                btn.classList.add('ring-2', 'ring-primary');
            });
        });
    }
}

// ========== GESTIONNAIRE CERTIFICATIONS ==========
class CertificationsManager {
    init() {
        const btn = document.getElementById('certifications-btn');
        const details = document.getElementById('certifications-details');
        const closeBtn = document.getElementById('close-certifications');

        if (btn && details) {
            btn.addEventListener('click', () => {
                details.classList.remove('hidden');
                details.style.opacity = '0';
                setTimeout(() => { details.style.opacity = '1'; }, 10);
                details.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    details.style.opacity = '0';
                    setTimeout(() => { details.classList.add('hidden'); }, 300);
                });
            }
        }
    }
}

// ========== FORMULAIRE CONTACT ==========
class ContactForm {
    init() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
                form.reset();
            });
        }
    }
}

// ========== INITIALISATION PRINCIPALE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Typewriter
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const typewriter = new Typewriter(typewriterElement, CONFIG.typewriterTexts);
        typewriter.start();
    }

    // Particules Matrix
    const cyberBg = document.getElementById('cyber-bg');
    if (cyberBg) {
        const particles = new MatrixParticles(cyberBg);
        particles.init();
    }

    // Gestionnaires
    const themeManager = new ThemeManager(CONFIG.themes);
    themeManager.init();

    const darkModeManager = new DarkModeManager();
    darkModeManager.init();

    const scrollAnimations = new ScrollAnimations();
    scrollAnimations.init();

    const navigation = new Navigation();
    navigation.init();

    const scrollToTop = new ScrollToTop();
    scrollToTop.init();

    const skillsManager = new SkillsManager(CONFIG.skillDescriptions);
    skillsManager.init();

    const certificationsManager = new CertificationsManager();
    certificationsManager.init();

    const contactForm = new ContactForm();
    contactForm.init();
});
