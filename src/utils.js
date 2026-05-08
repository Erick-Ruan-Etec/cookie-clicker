let notifyTimeout;

function notify(text, time = 3000, type = "info") {
    const container = document.getElementById("notifyContainer");

    if (!container) return;

    clearTimeout(notifyTimeout);

    container.innerHTML = "";

    const notifyEl = document.createElement("div");

    notifyEl.className = `notify ${type}`;

    let seconds = Math.ceil(time / 1000);

    notifyEl.innerHTML = `
        <p>${text}</p>
        <p class="notifyTime">(${seconds})</p>
    `;

    container.appendChild(notifyEl);

    const timeEl = notifyEl.querySelector(".notifyTime");

    const interval = setInterval(() => {
        seconds--;

        if (seconds <= 0) {
            clearInterval(interval);
            return;
        }

        timeEl.textContent = `(${seconds})`;
    }, 1000);

    notifyTimeout = setTimeout(() => {
        clearInterval(interval);

        notifyEl.remove();
    }, time);
}

async function checkVersion() {
    try {
        const actualVersion = localStorage.getItem("actualVersion");
        const actualBugFix = localStorage.getItem("actualBugFix");

        const res = await fetch(`versions.json?t=${Date.now()}`);
        const version = await res.json();
        document.getElementById("version").innerHTML =
            `Versão: ${version.game}`;
        if (!actualVersion || !actualBugFix) {
            localStorage.setItem("actualVersion", version.game);
            localStorage.setItem("actualBugFix", version.bugFix);
            return;
        }

        // Nova versão do jogo
        if (version.game !== actualVersion) {
            notify("Uma nova versão está disponível!", 3000, "info");

            setTimeout(() => {
                notify("Atualizando jogo...", 2000, "warn");

                localStorage.setItem("actualVersion", version.game);
                localStorage.setItem("actualBugFix", version.bugFix);

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }, 3000);

            return;
        }

        if (version.bugFix !== actualBugFix) {
            notify("Correção de bugs forçada...", 3000, "info");

            setTimeout(() => {
                notify("Aplicando correções...", 2000, "warn");
                localStorage.removeItem("data");
                localStorage.setItem("actualBugFix", version.bugFix);

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }, 3000);
        }
    } catch (err) {
        console.error("Erro ao verificar versão:", err);
    }
}

setInterval(checkVersion, 60000);

checkVersion();
