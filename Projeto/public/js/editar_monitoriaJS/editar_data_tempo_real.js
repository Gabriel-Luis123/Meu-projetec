document.getElementById("inputData").addEventListener("change", function () {
  const dataSelecionada = this.value;

  fetch("../src/controllers/verificar_data.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "data=" + encodeURIComponent(dataSelecionada),
  })
    .then((response) => response.json())
    .then((retorno) => {
      const validacao = retorno.validacao_data;
      const ocupacao = retorno.ocupacao;

      const icone = document.getElementById("iconeStatus");
      const input = document.getElementById("inputData");

      if (validacao?.disponivel === true) {
        input.style.borderColor = "green";
        icone.style.color = "green";
        icone.innerHTML = "✔";
      } else {
        input.style.borderColor = "red";
        icone.style.color = "red";
        icone.innerHTML = "✖";
      }

      const selectHorario = document.getElementById("inputHorario");
      const opcoes = selectHorario.querySelectorAll("option");

      const disponiveis = ocupacao.horarios_disponiveis || [];
      const indisponiveis = ocupacao.horarios_indisponiveis || [];

      opcoes.forEach((op) => {
        const valor = op.value;

        if (valor === "") return;

        op.style.backgroundColor = "";
        op.disabled = false;

        if (disponiveis.includes(valor)) {
          op.style.backgroundColor = "#5CE65C";
        }

        if (indisponiveis.includes(valor)) {
          op.style.backgroundColor = "#FF7081";
          op.disabled = true;
        }
      });
    })
    .catch((error) => console.error("Erro:", error));
});
