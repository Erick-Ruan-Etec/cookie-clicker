function initShop() {
    window.shop = JSON.parse(localStorage.getItem("shop")) || [
        {
            name: "Cursor",
            price: 15,
            quanty: 0,
            clicks: 1,
        },
        {
            name: "Vovó",
            price: 100,
            quanty: 0,
            clicks: 2,
        },
    ];

    const shopEl = document.getElementById("shop");

    shopEl.innerHTML = "";

    shop.forEach((item, index) => {
        const el = document.createElement("div");

        el.classList.add("shop-item");

        let ty;
        if (item.quanty == 0) {
            ty = 1;
        } else {
            ty = item.quanty;
        }
        const price = ((item.price + 7) * ty * 1.3556).toFixed(0);

        el.innerHTML = `
            <h3>${item.name}</h3>

            <p>Preço: ${price}</p>
            <p>Quantidade: ${item.quanty}</p>
            <p>Clicks: +${item.clicks}</p>

            <button>
                Comprar
            </button>
        `;

        const btn = el.querySelector("button");

        btn.addEventListener("click", () => {
            buyItem(index);
        });

        shopEl.appendChild(el);
    });

    function buyItem(index) {
        const item = shop[index];
        let ty;
        if (item.quanty == 0) {
            ty = 1;
        } else {
            ty = item.quanty;
        }
        const price = (item.price + 7) * ty * 1.35;

        if (data.cookies >= price.toFixed(0)) {
            data.cookies -= price.toFixed(0);

            item.quanty += 1;

            notify("Item comprado com sucesso", 3000, "success");

            localStorage.setItem("shop", JSON.stringify(shop));
            localStorage.setItem("data", JSON.stringify(data));

            initShop();
            calculateCPS();
        } else {
            notify("Você não possui cookies para comprar isso", 3000, "error");
        }
    }

    const cookiesEl = document.getElementById("cookies");
    function updateCookies() {
        cookiesEl.innerText = `Cookies: ${formatNumber(data.cookies)}`;
    }

    setInterval(() => {
        updateCookies();
    }, 1000);
}

window.interval = null;
window.cps = 0;

function calculateCPS() {
    window.cps = 0;

    const shop = JSON.parse(localStorage.getItem("shop")) || [
        {
            name: "Cursor",
            price: 15,
            quanty: 0,
            clicks: 1,
        },
        {
            name: "Vovó",
            price: 100,
            quanty: 0,
            clicks: 2,
        },
    ];

    shop.forEach((item, index) => {
        cps += item.quanty * item.clicks;
    });

    addCPS();

    const cookiesPSEl = document.getElementById("cps");
    cookiesPSEl.innerText = `Cookies p/s: ${cps}`;
}

function addCookies(amount) {
    data.cookies += amount;
}

function addCPS() {
    if (interval) clearInterval(interval);

    interval = setInterval(() => {
        addCookies(cps / 10);
    }, 100);
}
