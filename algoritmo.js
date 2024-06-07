function agendarServico(servico) {
  data = console.log("Informe a data do agendamento:");
  hora = console.log("Informe a hora do agendamento:");
}

function verificarDisponibilidade() {
  let servicoLeve = "Leve";
  let servicoMedio = "Medio";
  let servicoPesado = "Pesado";

  let data;
  let hova;

  // verifica serviço leve
  if (servicoLeve) {
    agendarServico(servicoLeve);
    console.log("Agendamento concluído!");
    return;
  }

  // verifica serviço médio
  if (!servicoMedio || servicoMedio >= 1) {
    if (verificarServicoMedio()) {
      console.log("Já tem serviço médio agendado");
      console.log("Data indisponível");
      return;
    }

    if (servicoMedio >= 2) {
      console.log("Data indisponível");
    }

    agendarServico(servicoMedio);
    console.log("Agendamento concluído!");
    return;
  }

  console.log(
    "Data indisponível para serviço médio (máximo de 2 agendamentos)"
  );

  // verifica serviço pesado
  if (!servicoPesado) {
    if (!servicoMedio || verificarServicoMedio()) {
      agendarServico(servicoPesado);
      console.log("Agendamento concluído!");
      return;
    }

    console.log(
      "Data indisponível para serviço pesado (serviço médio agendado)"
    );
    return;
  }

  console.log("Data indisponível para serviço pesado");
}

function verificarServicoMedio() {
  return true;
}
