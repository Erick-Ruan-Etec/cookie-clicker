const root = document.getElementById("root");
let lastAcess = localStorage.getItem("lastpage") || "/inicio";
const routes = {
    "/inicio": "pages/inicio.html",
    "/sobre": "pages/sobre.html",
    "/projetos": "pages/projetos.html",
    "/consultoria": "pages/consultoria.html",
    "/artigos": "pages/artigos.html",
    "/contato": "pages/contato.html",
    "/404": "pages/404.html",
};

const linkBtns = document.querySelectorAll(".nav button[data-page]");
linkBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let page = btn.dataset.page;
        loadPage(page);
        closeMenu();
    });
});

async function loadPage(path) {
    const res = (await fetch(routes[path])) || routes["/404"];
    const response = await res.text();
    root.innerHTML = response;
    localStorage.setItem("lastpage", path);
    //history.pushState({}, "", path);
    document.title = "• " + path.slice(1).replaceAll("/", " | ");
    applyImageFallback(root);
}

loadPage(lastAcess);








//y =====================================
//*    Função p/detectar a main e fazer
//*    o botão de back-to-top funcionar
//y =====================================

let main = document.getElementById("root");
let backToTop = document.getElementById("back-to-top");

if (main)
    main.addEventListener("scroll", () => {
        if (!backToTop || !main) return;
        if (main.scrollTop > 300) {
            backToTop.classList.add("active");
        } else {
            backToTop.classList.remove("active");
        }
    });

if (backToTop)
    backToTop.addEventListener("click", () => {
        main.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

//y =====================================
//*    Função para modo claro e escuro
//*    c/detecção de modo do sistema
//y =====================================

const systemThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");

function getSystemTheme() {
    return systemThemeMedia.matches ? "dark" : "light";
}

function applyTheme(theme) {
    const finalTheme = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.setAttribute("data-theme", finalTheme);
}

systemThemeMedia.addEventListener("change", () => {
    if ((localStorage.getItem("theme") || "system") === "system") {
        applyTheme("system");
    }
});

const themeBtns = document.querySelectorAll(".theme button");
themeBtns.forEach((el) => {
    if (el.value)
        el.addEventListener("click", () => {
            const theme = el.value; // light | dark | system
            localStorage.setItem("theme", theme);
            applyTheme(theme);
        });
});

applyTheme(localStorage.getItem("theme") || "system");

//y =====================================
//* Funções para o menu lateral & mobile
//* com salvamento de posição
//y =====================================

const menu = document.getElementById("menu");
const overflow = document.getElementById("overflow");
const nav = document.getElementById("nav");
const resizer = document.getElementById("resizer");
const colapse = document.getElementById("colapse");
const windowWidth = window.matchMedia("(min-width: 800px)");
let isColapsed = false;

const menuBtn = document.getElementById("menuBtn");
if (menuBtn)
    menuBtn.addEventListener("click", () => {
        toggleMenu();
    });

if (overflow)
    overflow.addEventListener("click", () => {
        toggleMenu();
    });

function toggleMenu() {
    menu.classList.toggle("active");
    overflow.classList.toggle("active");
    if (menu.classList.contains("active")) {
        menu.style.width = "70vw";
        menuBtn.innerText = "X";
    } else {
        menuBtn.innerText = "☰";
    }
}

if (colapse)
    colapse.addEventListener("click", () => {
        isColapsed = isColapsed ? false : true;
        console.log(isColapsed);

        if (isColapsed) {
            menu.classList.add("colapsed");
            menu.style.width = "70px";
            menu.style.transition = "all 0.3s ease";
            colapse.innerHTML = `<img src="assets/images/menu_open.png">`;
        } else {
            menu.classList.remove("colapsed");
            colapse.innerHTML = `<img src="assets/images/menu_collapse.png">`;

            menu.addEventListener("transitionend", (e) => {
                if (e.propertyName === "width") {
                    menu.style.transition = "none";
                    console.log("transição acabou");
                }
            });

            menu.style.width = getW() + "px";
        }
    });

let isResize = false;

if (resizer)
    resizer.addEventListener("pointerdown", () => {
        if (isColapsed) return;
        isResize = true;
    });

document.addEventListener("pointerup", () => {
    if (!isResize || isColapsed) return;
    isResize = false;
    saveW(getComputedStyle(menu).width);
});

document.addEventListener("pointermove", (e) => {
    if (!isResize || isColapsed) return;

    let size = e.clientX < 250 ? 250 : e.clientX > 350 ? 350 : e.clientX;
    menu.style.width = size + "px";
});

function saveW(size) {
    localStorage.setItem("menuWidth", size);
}

if (menu)
    function loadW() {
        menu.style.width = localStorage.getItem("menuWidth") || "300px";
    }

function getW() {
    return parseInt(localStorage.getItem("menuWidth")) || 300;
}

if (menu) loadW();

windowWidth.addEventListener("change", () => {
    if (windowWidth.matches) {
        closeMenu();
    }
});

if (menu) closeMenu();

function closeMenu() {
    if (isColapsed) return;

    if (menu) menu.classList.remove("active");
    menu.style.width = getW() + "px";

    if (overflow) overflow.classList.remove("active");

    if (menuBtn) menuBtn.innerHTML = "☰";
}

closeMenu();

//y =====================================
//*    Função para substituir imagens
//y =====================================

const images = document.querySelectorAll("img");

function applyImageFallback(container = document) {
    container.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", () => {
            if (img.dataset.fallback) return;

            img.dataset.fallback = "true";
            console.warn("Imagem não encontrada:", img.src);
            img.src = "assets/images/erro-404.png";
        });
    });
}

window.addEventListener("load", () => {
    if (main) applyImageFallback(main);
});