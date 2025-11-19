const inputPesquisa = document.querySelector(".barra-pesquisa-input");
const filtroSelect = document.querySelector(".filtro_horario");

function aplicarPesquisa() {
    const termo = inputPesquisa.value.toLowerCase();
    const filtro = filtroSelect.value;

    document.querySelectorAll('.disciplina-secao').forEach(section => {
        const container = section.querySelector('.cards-container');
        const toggleBtn = section.querySelector('.toggle-btn');
        if (!container) return;

        let algumVisivel = false;

        container.querySelectorAll('.card-monitoria').forEach(card => {

            // Campos do card
            const monitorNome = card.querySelector(".monitor-nome")?.textContent.toLowerCase() || "";
            const horario = card.querySelector(".monitoria-horario")?.textContent.toLowerCase() || "";
            const data = card.querySelector(".monitoria-data")?.textContent.toLowerCase() || "";
            const sala = card.querySelector(".monitoria-sala")?.textContent.toLowerCase() || "";

            // Conteúdos dentro da lista (Matéria)
            const conteudos = Array.from(card.querySelectorAll(".monitoria-observacoes li"))
                .map(li => li.textContent.toLowerCase())
                .join(" ");

            let deveMostrar = false;

            // 🟦 LÓGICA DOS FILTROS (ATUALIZADA)
            switch (filtro) {
                case "data":
                    deveMostrar = data.includes(termo);
                    break;
                case "sala":
                    deveMostrar = sala.includes(termo);
                    break;
                case "materia":
                    deveMostrar = conteudos.includes(termo);
                    break;
                case "horario":
                    deveMostrar = horario.includes(termo);
                    break;
                case "monitor": // NOVO FILTRO
                    deveMostrar = monitorNome.includes(termo);
                    break;
                default:
                    // Busca geral (sem filtro selecionado)
                    deveMostrar = (
                        monitorNome.includes(termo) ||
                        horario.includes(termo) ||
                        data.includes(termo) ||
                        sala.includes(termo) ||
                        conteudos.includes(termo)
                    );
            }

            // Aplica ação
            if (deveMostrar) {
                card.style.display = "block";
                algumVisivel = true;
            } else {
                card.style.display = "none";
            }
        });

        // Abre seção automaticamente se houver resultados
        if (algumVisivel && container.dataset.closed === 'true') {
            container.style.maxHeight = '2000px';
            container.style.opacity = '1';
            container.style.marginTop = '20px';
            container.dataset.closed = 'false';
            toggleBtn?.classList.add('rotate');
        }
    });
}

// Eventos
inputPesquisa.addEventListener("input", aplicarPesquisa);
filtroSelect.addEventListener("change", aplicarPesquisa);
