    const moreBtn = document.querySelector('.more-btn');
    const projects = document.querySelectorAll('.project');
    const VISIBLE_COUNT = 3;

    projects.forEach((p, i) => {
    if (i >= VISIBLE_COUNT) p.style.display = 'none';
    });
    let expanded = false;
    moreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    expanded = !expanded;
    projects.forEach((p, i) => {
        if (i >= VISIBLE_COUNT) {
        p.style.display = expanded ? 'flex' : 'none';
        }
    });
    moreBtn.textContent = expanded ? 'SHOW LESS' : 'SEE MORE';
    });

    
    (() => {
    const canvas = document.getElementById("stars");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height;
    let meteors = [];

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const MaxMeteors = isMobile ? 500 : 1000;
    const MaxDistance = isMobile ? 1000 : 500;
    const SpawnInterval = isMobile ? 500 : 250;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * DPR;
        canvas.height = height * DPR;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();
    function isFarEnough(x, y) {
        for (const m of meteors) {
        const dx = m.x - x;
        const dy = m.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < MaxDistance) {
            return false;
        }
        }
        return true;
    }
    function createMeteor() {
        const baseAngle = Math.PI * 0.2;
        const spread = Math.PI * 0.05;
        const angle = baseAngle + (Math.random() - 1) * spread;
        const speed = isMobile ? 4 + Math.random() * 2 : 3 + Math.random() * 2;
        const LifeMin = isMobile ? 40 : 100;
        const LifeRange = isMobile ? 40 : 100;
        const SizeMin = isMobile ? 0.5 : 0.7;
        const SizeRange = isMobile ? 1.5 : 1.7;

        let x, y, attempts = 0;
        do {
        x = Math.random() * width;
        y = Math.random() * height * 0.35;
        attempts++;
        } while (!isFarEnough(x, y) && attempts < 10);
        return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: LifeMin + Math.random() * LifeRange,
        size: SizeMin + Math.random() * SizeRange
        };
    }
    function spawnMeteor() {
        if (reducedMotion) return;
        if (meteors.length >= MaxMeteors) return;
        meteors.push(createMeteor());
    }
    function animate() {
    const tailMultiplier = isMobile ? 2.5 : 10;
    ctx.clearRect(0, 0, width, height);
    meteors = meteors.filter(m => {
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const alpha = 1 - m.life / m.maxLife;
        ctx.strokeStyle = `rgba(200,230,255,${alpha})`;
        ctx.lineWidth = m.size;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
        m.x - m.vx * tailMultiplier,
        m.y - m.vy * tailMultiplier
        );
        ctx.stroke();
        return m.life < m.maxLife;
    });
    requestAnimationFrame(animate);
    }
    if (!reducedMotion) {
        const initial = isMobile ? 10 : 25;
        for (let i = 0; i < initial; i++) spawnMeteor();
        setInterval(spawnMeteor, SpawnInterval);
    }
    requestAnimationFrame(animate);
    })();


    const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
        });
    },
    { threshold: 0.25 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    const header = document.getElementById("main-logo");
    window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 0.25) {
        header.classList.add("zoom-in");
    } else {
        header.classList.remove("zoom-in");
    }
    });


    let lastScrollY = window.scrollY;
    const desktopNavbar = document.querySelector('.desk-nav');
    const mobileNavbar = document.querySelector('.final-container .res-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
            if (desktopNavbar) desktopNavbar.classList.add('hide-navbar');
            if (mobileNavbar) mobileNavbar.classList.add('hide-navbar');
        } else {
            if (desktopNavbar) desktopNavbar.classList.remove('hide-navbar');
            if (mobileNavbar) mobileNavbar.classList.remove('hide-navbar');
        }
        lastScrollY = window.scrollY;
    });


    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");
    function opentab(tabname) {
        for (tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }
    const mobileBar = document.querySelector('.pop-up');
    const body = document.body;
    const menuIcon = document.querySelector('.menu-icon');
    function toggleSideBar() {
        mobileBar.classList.toggle('active');
        body.classList.toggle('menu-active');
        menuIcon.classList.toggle('active');
    }
    function closeSideBar() {
        mobileBar.classList.remove('active');
        body.classList.remove('menu-active');
        menuIcon.classList.remove('active');
    }


    const scriptURL = 'https://script.google.com/macros/s/AKfycbwISyHKK9d4qaAhPENts88I9Z9-CjUbbf9k8t53NLCJ7UOLnnViUUCjagOQUyUAppSaCA/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
    form.addEventListener('submit', e => {
    e.preventDefault()
    const now = new Date()
    const date = now.toLocaleDateString()
    const time = now.toTimeString().slice(0, 8)
    document.getElementById('submitDate').value = now.toLocaleDateString()
    document.getElementById('submitTime').value = now.toLocaleTimeString()
    msg.innerHTML = "Sending..."
    msg.classList.add('show')
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Your message has been sent successfully!!"
            msg.classList.add('show')
            setTimeout(function () {
                msg.classList.remove('show')
                setTimeout(function () {
                    msg.innerHTML = ""
                }, 300)
            }, 3000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const isTablet = window.innerWidth >= 769 && window.innerWidth <= 1024;
            const offset = isTablet ? 50 : 0;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: "smooth"
            });
        }
    });
});