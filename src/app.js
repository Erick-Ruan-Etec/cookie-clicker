const root = document.getElementById("root");
const btns = document.querySelectorAll("#menu button");

const routes = {
    "/clicker": "pages/cookie.html",
    "/shop": "pages/shop.html",
    "/config": "pages/config.html",
};

async function loadPage(path, btno) {
    const res = (await fetch(routes[path])) || routes["/404"];
    const response = await res.text();
    root.innerHTML = response;
    btno.style.cssText = `
        background-color: orangered; 
        color: white;
        cursor: not-allowed;
    `;
    btno.disabled = true;
    btno.classList.add("active");

    initPage(path);
}

loadPage(
    "/clicker",
    (btno = document.querySelector("#menu button[data-page='/clicker']")),
);

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        let page = btn.dataset.page;
        loadPage(page, (btno = btn));

        btns.forEach((btn) => {
            btn.style.cssText = `background-color: orange; color: black;pointer-events: all; cursor: pointer`;
            btn.disabled = false;
            btn.classList.remove("active");
        });
    });
});

function initPage(path) {
    if (path === "/clicker") {
        initClicker();
        calculateCPS();
    }

    if (path === "/config") {
        initConfig();
    }
    if (path === "/shop") {
        initShop();
    }
}
