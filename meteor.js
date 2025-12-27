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
        const speed = isMobile ? 6 + Math.random() * 2 : 3 + Math.random() * 2;
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