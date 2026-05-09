function initClicker() {
    const clicker = document.getElementById("cookie");
    const cookiesEl = document.getElementById("cookies");

    try {
        window.data = JSON.parse(localStorage.getItem("data")) || {
            cookies: 0,
            cps: 0,
            bakeyname: "Padaria sem nome",
        };
    } catch {
        window.data = {
            cookies: 0,
            cps: 0,
            bakeyname: "Padaria sem nome",
        };
    }

    const bakeyNameEl = document.getElementById("bakeyName");
    if (!bakeyNameEl) {
        notify("Erro", 2000, "error");
        return;
    }
    bakeyNameEl.textContent = data.bakeyname;

    let displayCookies = 0;
    let animationFrame = null;

    clicker.addEventListener("click", () => {
        addCookies(1);
    });

    function addCookies(amount) {
        data.cookies += amount;
    }

    function animate() {
        displayCookies += (data.cookies - displayCookies) * 0.1;

        if (Math.abs(data.cookies - displayCookies) < 0.01) {
            displayCookies = data.cookies;
        }

        cookiesEl.textContent = `${formatNumber(displayCookies, 2)}`;

        animationFrame = requestAnimationFrame(animate);
    }

    setTimeout(() => {
        animate();
    }, 300);

    function save(silent = false) {
        if (!silent) notify("Dados salvos", 1000, "info");
        const finalData = JSON.stringify(data);
        localStorage.setItem("data", finalData);
    }

    window.addEventListener("beforeunload", () => {
        save(true);
    });

    setInterval(() => {
        save();
    }, 60000);
}
