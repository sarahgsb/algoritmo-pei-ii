const servicos = ["Leve", "Médio", "Pesado"];

// lista com horarios disponiveis para agendamento
const agenda = {
  leve: ["08:00", "09:00", "10:00"],
  medio: ["10:00", "11:00", "12:00"],
  pesado: ["13:00", "14:00", "15:00"],
};

// lista de serviços ja agendados
const servicosAgendados = {
  leve: [],
  medio: [],
  pesado: [],
};

// escolhe um serviço
function escolherServico(servico) {
  if (verificarDisponibilidade(servico)) {
    classificarServico(servico);
  } else {
    console.log("Serviço não disponível.");
  }
}

// verifica disponibilidade dos serviços
function verificarDisponibilidade(servico) {
  return servicos.includes(servico);
}

// Classifica o serviço (leve, médio, pesado)
function classificarServico(servico) {
  if (servico === "Leve") {
    agendarServicoLeve(servico, "Leve");
  } else if (servico === "Medio") {
    agendarServicoMedio(servico);
  } else if (servico === "Pesado") {
    montarAgendaComRestricoes(servico, "Pesado");
  }
}

// agenda serviço leve
function agendarServicoLeve(servico, tipo) {
  const horarioDisponivel = verificarDisponibilidade(tipo);
  if (horarioDisponivel) {
    servicosAgendados.leve.push(servico);
    agendarServico(servico, 'leve');
    console.log("Agendamento concluído.");
  } else {
    console.log("Cancelar agendamento.", servico);
  }
}

// agenda serviço médio
function agendarServicoMedio(servico) {
  if ( servicosAgendados.medio.length >= 2 || servicosAgendados.pesado.length >= 1) {
    console.log("Data bloqueada. Verificar novo dia.");
    montarAgendaComRestricoes(servico);
    return;
  }

  if (!servicosAgendados.medio.includes(servico)) {
    const horarioDisponivel = verificarDisponibilidade('medio');
    if (horarioDisponivel) {
      servicosAgendados.medio.push(servico);
      agendarServico(servico, "Medio");
    } else {
      console.log("Data bloqueada. Verificar novo dia.");
    }
  } else {
    console.log("Serviço médio já agendado.");
  }
}

// agenda servico pesado
function agendarServicoPesado(servico) {
    const horarioDisponivelPesado = verificarDisponibilidade('pesado');
    if (horarioDisponivelPesado) {
        if (servicosAgendados.pesado.length > 0) {
            console.log('Data bloqueada. Verificar novo dia.');
            return;
        }

        if (servicosAgendados.medio.length === 0) {
            servicosAgendados.medio.push(servico); //armazena dia e horario disponivel
            montarAgendaComRestricoes(servico, 'pesado');
        } else {
            const horarioMedio = verificarDisponibilidadeMedio(servico);
            if (horarioMedio) {
                console.log('Data bloqueada. Verificar novo dia.');
            } else {
                montarAgendaComRestricoes(servico, 'pesado');
            }
        }
    } else {
        console.log('Data bloqueada. Verificar novo dia.');
    }
}



// monta agenda com restrições
function montarAgendaComRestricoes(servico, tipo) {
  const validacao = visualizarAgendaConformeValidacao(tipo);

  if (validacao) {
    console.log("Agendamento concluído.");
    if (verificarDisponibilidade(tipo)) {
      agendarServico(servico, tipo);
    } else {
      console.log("Cancelar agendamento", servico);
    }
  } else {
    console.log(
      "Agenda não validada."
    );
    if (verificarDisponibilidade(tipo)) {
      agendarServico(servico, tipo);
    } else {
      cancelarAgendamento(servico);
    }
  }
}

// Visualiza agenda conforme validação
function visualizarAgendaConformeValidacao(tipo) {
  // aqui mostra a agenda.
  // é preciso validar os horarios compativeis de acordo com as restrições de cada serviço
  // retorna true se validado, false caso contrário
  return true;
}

// cancela agendamento
function cancelarAgendamento(servico) {
  console.log("Cancelando: " , servico);
}

// disponibilidade de horários
function verificarDisponibilidade(tipo) {
  return agenda[tipo].shift(); // remove e retorna o primeiro horário disponível
}
