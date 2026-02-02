// Основной скрипт с анимациями
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const spans = this.querySelectorAll('span');
            
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            });
        });
    }
    
    // Анимация заголовка при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Анимация статистики
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            let value = Math.floor(easeProgress * (end - start) + start);
            
            // Убедимся, что значение не превышает максимум
            value = Math.min(value, end);
            
            element.textContent = value;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Добавляем знак + если нужно
                if (element.dataset.count && element.dataset.count.includes('+')) {
                    element.textContent = value + '+';
                }
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Анимация элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Анимация для статистики
                if (entry.target.classList.contains('stat-number')) {
                    const target = parseInt(entry.target.dataset.count);
                    if (!entry.target.classList.contains('animated')) {
                        animateValue(entry.target, 0, target, 2000);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.animate-on-scroll, .stat-number, .mission-card, .teacher-card, .discipline-card, .program-card, .stat-card, .info-card').forEach(el => {
        observer.observe(el);
    });
    
    // Фильтр таблицы
    const filterInput = document.querySelector('.table-filter');
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll('.data-table tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(filter)) {
                    row.style.display = '';
                    setTimeout(() => {
                        row.style.opacity = '1';
                        row.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    row.style.opacity = '0';
                    row.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        row.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // Фильтр по категориям
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const rows = document.querySelectorAll('.data-table tbody tr');
            
            rows.forEach(row => {
                if (filter === 'all' || row.dataset.category === filter) {
                    row.style.display = 'table-row';
                    setTimeout(() => {
                        row.style.opacity = '1';
                        row.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    row.style.opacity = '0';
                    row.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        row.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Кнопка "Наверх"
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Анимация плавающих элементов
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Проверяем сохраненную тему
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Обновляем иконку
    if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Обработчик переключения темы
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Меняем иконку
        if (newTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Анимация переключения
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 500);
    });
    
    // Запускаем анимацию статистики сразу при загрузке
    setTimeout(() => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            animateValue(stat, 0, target, 1500);
        });
    }, 500);
    
    // Предзагрузка
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
});