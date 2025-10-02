
        // Hamburger menu
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Scroll animations with multiple effects
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });

        // Enhanced particle system with colors
        function createParticles() {
            const particleCount = 60;
            const particleTypes = ['particle-1', 'particle-2', 'particle-3'];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = `particle ${particleTypes[Math.floor(Math.random() * particleTypes.length)]}`;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                
                const keyframes = `
                    @keyframes float-${i} {
                        0%, 100% { 
                            transform: translate(0, 0) scale(1); 
                            opacity: 0;
                        }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { 
                            transform: translate(${Math.random() * 200 - 100}px, -100vh) scale(${Math.random() * 0.5 + 0.5}); 
                            opacity: 0;
                        }
                    }
                `;
                
                const style = document.createElement('style');
                style.textContent = keyframes;
                document.head.appendChild(style);
                
                particle.style.animation = `float-${i} ${Math.random() * 4 + 4}s infinite ease-in-out`;
                document.body.appendChild(particle);
            }
        }

        createParticles();

        // Cursor trail effect
        let lastTrailTime = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTrailTime > 50) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
                document.body.appendChild(trail);
                
                setTimeout(() => trail.remove(), 1000);
                lastTrailTime = now;
            }
        });

        // Smooth scroll
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

        // Active nav link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = 'rgba(255, 255, 255, 0.8)';
                if (link.getAttribute('href').slice(1) === current) {
                    link.style.color = 'white';
                }
            });
        });

        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.profile-pic-container, .card-icon');
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });