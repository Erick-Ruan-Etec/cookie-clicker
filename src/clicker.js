function initClicker() {
    const clicker = document.getElementById("cookie");
    const cookiesEl = document.getElementById("cookies");

    const data = JSON.parse(localStorage.getItem("data")) || {
        cookies: 0,
        cps: 0,
        bakeyname: "Padaria sem nome",
    };
    const bakeyNameEl = document.getElementById("bakeyName");

    bakeyNameEl.textContent = data.bakeyname;

    let displayCookies = 0;
    let animationFrame = null;

    clicker.addEventListener("click", () => {
        addCookies(1);
    });

    function addCookies(amount) {
        data.cookies += amount;
        save();
    }

    setInterval(() => {
        if (data.cps > 0) {
            data.cookies += data.cps / 10;
        }
    }, 100);

    function animate() {
        displayCookies += (data.cookies - displayCookies) * 0.1;

        if (Math.abs(data.cookies - displayCookies) < 0.01) {
            displayCookies = data.cookies;
        }

        cookiesEl.textContent = `${displayCookies.toFixed(1)} cookies`;

        animationFrame = requestAnimationFrame(animate);
    }

    setTimeout(() => {
        animate();
    }, 300);

    function save() {
        const finalData = JSON.stringify(data);
        localStorage.setItem("data", finalData);
    }
}
