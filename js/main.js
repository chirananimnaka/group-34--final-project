/**
 * SportSphere Elite Performance Engine
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("SportSphere Core System Online...");

    // 1. Hero Seamless Crossfade Slider
    const heroSlides = Array.from(document.querySelectorAll('.hero-bg'));
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideTimer;

    const preloadAll = () => {
        heroSlides.forEach(slide => {
            const url = slide.style.backgroundImage.slice(5, -2);
            const img = new Image();
            img.src = url;
        });
    };
    preloadAll();

    if (dotsContainer && heroSlides.length > 0) {
        dotsContainer.innerHTML = '';
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);
        });
    }

    function updateSlider(nextIndex) {
        const dots = document.querySelectorAll('.dot');
        heroSlides.forEach((s, i) => {
            s.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        heroSlides[nextIndex].classList.add('active');
        if (dots[nextIndex]) dots[nextIndex].classList.add('active');
        currentSlide = nextIndex;
    }

    function goToSlide(index) {
        if (index === currentSlide) return;
        updateSlider(index);
        resetTimer();
    }

    window.nextSlideManual = function () {
        let next = (currentSlide + 1) % heroSlides.length;
        goToSlide(next);
    };

    window.prevSlide = function () {
        let prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        goToSlide(prev);
    };

    function startTimer() {
        slideTimer = setInterval(() => {
            let next = (currentSlide + 1) % heroSlides.length;
            updateSlider(next);
        }, 5000);
    }

    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    if (heroSlides.length > 0) startTimer();

    // 2. Intersection Observer (Fade Animations) — exported for booking.js to reuse
    window.fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. ROI Calculator
    window.calculateROI = function () {
        const courts = document.getElementById('courts').value || 1;
        const price  = document.getElementById('price').value  || 1;
        const hours  = document.getElementById('hours').value  || 1;
        const yieldValue = (courts * price * hours * 365) / 1000000;
        const resultEl = document.getElementById('roi-result');
        if (resultEl) resultEl.innerText = `LKR ${yieldValue.toFixed(1)}M`;
    };

    // 5. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Click for dark
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Click for light
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});

/**
 * SportSphere Dashboard Controller
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Dashboard Intelligence Module Active...");

    // Chart.js
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        const getStyle = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Revenue (LKR)',
                    data: [65000, 59000, 80000, 81000, 56000, 95000, 120000],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#8b5cf6',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        grid: { color: 'rgba(128,128,128,0.1)' }, 
                        ticks: { color: getStyle('--text-secondary') } 
                    },
                    x: { 
                        grid: { display: false }, 
                        ticks: { color: getStyle('--text-secondary') } 
                    }
                }
            }
        });

        // Update chart when theme changes
        document.getElementById('theme-toggle').addEventListener('click', () => {
            setTimeout(() => {
                chart.options.scales.y.ticks.color = getStyle('--text-secondary');
                chart.options.scales.x.ticks.color = getStyle('--text-secondary');
                chart.update();
            }, 100);
        });
    }

    // Count-Up Animations
    const animateCount = (id, end, suffix = '', prefix = '') => {
        const el = document.getElementById(id);
        if (!el) return;
        let start = 0;
        const duration = 1500;
        const stepTime = 20;
        const increment = end / (duration / stepTime);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                el.innerText = prefix + Math.floor(end).toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                el.innerText = prefix + Math.floor(start).toLocaleString() + suffix;
            }
        }, stepTime);
    };
    animateCount('count-bookings', 1560);
    animateCount('count-revenue', 450000, '', 'LKR ');
    animateCount('count-util', 82, '%');

    // Dynamic Arena Grid (dashboard)
    const slotGrid = document.getElementById('slot-grid');
    if (slotGrid) {
        const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
        const arenas = ['Alpha', 'Nexus', 'Elite'];
        let html = '';
        arenas.forEach(arena => {
            times.forEach(time => {
                const isBooked = Math.random() < 0.3;
                html += `
                    <div class="glass slot-item ${isBooked ? 'locked' : ''}" style="border: 1px solid ${isBooked ? '#ef4444' : 'var(--glass-border)'}">
                        <p style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">${arena}</p>
                        <p style="font-weight:700;font-size:1.1rem;color:${isBooked ? '#ef4444' : 'white'}">${time}</p>
                        <p style="font-size:0.65rem;margin-top:8px;">${isBooked ? 'OCCUPIED' : 'OPERATIONAL'}</p>
                    </div>`;
            });
        });
        slotGrid.innerHTML = html;
    }

    window.rapidBooking  = () => alert("SportSphere Intelligence: Opening Rapid Booking Interface...");
    window.systemLockdown = () => {
        if (confirm("Institutional Warning: Trigger System Lockdown?")) {
            document.body.style.filter = "grayscale(1) contrast(1.2)";
            alert("Lockdown Protocol Active.");
        }
    };
    window.exportData = () => alert("Downloading Revenue Yield Analysis (PDF)...");

    // 5. Intelligent Device Detection & Highlighting
    const highlightDeviceBtn = () => {
        const ua = navigator.userAgent.toLowerCase();
        const andBtn = document.getElementById('and-dl-btn');
        const iosBtn = document.getElementById('ios-dl-btn');
        const winBtn = document.getElementById('win-dl-btn');

        if (!andBtn || !iosBtn || !winBtn) return;

        const activeStyle = "background: #0078d4; border: 1px solid #00a2ed; color: white;";
        const isAndroid = /android/.test(ua);
        const isIOS     = /iphone|ipad|ipod/.test(ua);
        const isWindows = /windows/.test(ua);

        if (isAndroid) {
            andBtn.setAttribute('style', andBtn.getAttribute('style') + activeStyle);
            andBtn.classList.replace('btn-outline', 'btn-primary');
        } else if (isIOS) {
            iosBtn.setAttribute('style', iosBtn.getAttribute('style') + activeStyle);
            iosBtn.classList.replace('btn-outline', 'btn-primary');
        } else if (isWindows) {
            winBtn.setAttribute('style', winBtn.getAttribute('style') + activeStyle);
            winBtn.classList.replace('btn-outline', 'btn-primary');
        }
    };
    highlightDeviceBtn();
});
