document.getElementById("inputHorario").addEventListener("change", function () {
  const horarioSelecionado = this.value;
  const inputData = document.getElementById('inputData').value;

  fetch("../src/controllers/verificar_horario.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "horario=" + encodeURIComponent(horarioSelecionado) + "&data=" + encodeURIComponent(inputData),
  })
    .then((response) => response.json())
    .then((retorno) => {
      const validacao = retorno.validacao_horario;
      const ocupacao = retorno.ocupacao;

      const icone = document.getElementById("iconeStatus2");
      const input = document.getElementById("inputHorario");

      if (validacao?.disponivel === true) {
        input.style.borderColor = "green";
        icone.style.color = "green";
        icone.innerHTML = "✔";
      } else {
        input.style.borderColor = "red";
        icone.style.color = "red";
        icone.innerHTML = "✖";
      }

      const selectSalas = document.getElementById("inputSala");
      const opcoes = selectSalas.querySelectorAll("option");

      const disponiveis = ocupacao.salas_disponiveis || [];
      const indisponiveis = ocupacao.salas_indisponiveis || [];


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
    });
});
