document.getElementById("inputSala").addEventListener("change", function () {
  const salaSelecionada = this.value;
  const horarioSelecionado = document.getElementById('inputHorario').value;

  fetch("../src/controllers/verificar_sala.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "sala=" + encodeURIComponent(salaSelecionada) + "&horario=" + encodeURIComponent(horarioSelecionado),
  })
    .then((response) => response.json())
    .then((retorno) => {
      const validacao = retorno.validacao_sala;

      const icone = document.getElementById("iconeStatus3");
      const input = document.getElementById("inputSala");

      if (validacao?.disponivel === true) {
        input.style.borderColor = "green";
        icone.style.color = "green";
        icone.innerHTML = "✔";
      } else {
        input.style.borderColor = "red";
        icone.style.color = "red";
        icone.innerHTML = "✖";
      }
    });
});
