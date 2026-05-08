function initConfig() {
    const bakeyNameInput = document.getElementById("bakeyNameInput");
    const savenameBtn = document.getElementById("saveName");
    const deleteBtn = document.getElementById("delete");

    const data = JSON.parse(localStorage.getItem("data")) || {
        cookies: 0,
        cps: 0,
        bakeyname: "Padaria sem nome",
    };
    const bakeyNameEl = document.getElementById("bakeyName");

    console.log(bakeyNameInput);
    savenameBtn.addEventListener("click", () => {
        if (bakeyNameInput.value === "") {
            notify("Erro, valor não pode estar vazio", 3000, "error");
            return;
        }

        data.bakeyname = bakeyNameInput.value;
        save();
        notify("Nome alterado com sucesso", 3000, "success");
    });

    function save() {
        const finalData = JSON.stringify(data);
        localStorage.setItem("data", finalData);
    }

    let clicks = 0;

    deleteBtn.addEventListener("click", () => {
        clicks++;

        if (clicks === 1) {
            deleteBtn.style.background = "orangered";
            deleteBtn.textContent = "Clique novamente para confirmar";

            setTimeout(() => {
                clicks = 0;

                deleteBtn.style.background = "";
                deleteBtn.textContent = "Deletar dados";
            }, 3000);
        } else if (clicks === 2) {
            localStorage.removeItem("data");

            deleteBtn.textContent = "Dados apagados";
        }
    });
}
