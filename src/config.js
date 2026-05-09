function initConfig() {
    const bakeyNameInput = document.getElementById("bakeyNameInput");
    const savenameBtn = document.getElementById("saveName");
    const deleteBtn = document.getElementById("delete");

    const bakeyNameEl = document.getElementById("bakeyName");

    savenameBtn.addEventListener("click", () => {
        if (bakeyNameInput.value === "") {
            notify("Erro, o nome não pode estar vazio", 3000, "error");
            return;
        }

        let length = bakeyNameInput.value.length;
        if (length > 40) {
            notify(
                "Erro, o nome não pode ser maior que 40 caracteres",
                3000,
                "error",
            );
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
            deleteBtn.textContent = "Confirmar";

            setTimeout(() => {
                clicks = 0;

                deleteBtn.style.background = "";
                deleteBtn.textContent = "Deletar dados";
            }, 3000);
        } else if (clicks === 2) {
            localStorage.removeItem("data");
            localStorage.removeItem("shop");
            deleteBtn.textContent = "Dados apagados";
        }
    });
}
