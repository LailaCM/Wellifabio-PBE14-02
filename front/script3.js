function msg3(mensagem) {
    msg = document.getElementById('msg')
    msg.innerHTML = mensagem;
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}
const cadastro = document.getElementById('cadastro');
cadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        data_hora: cadastro.data_hora.value,
        id_medico: cadastro.id_medico.value,
        id_paciente: cadastro.id_paciente.value,
        motivo: cadastro.motivo.value

        
    }
    fetch('http://localhost:4000/consultas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('Consulta cadastrado com sucesso');
            } else {
                msg3('Erro ao cadastrar consulta');
            }
        });
});

fetch('http://localhost:4000/consultas')
    .then(response => response.json())
    .then(consultas => {
        const tabela = document.getElementById('consultas');
        consultas.forEach(consultas => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td>${consultas.id_consulta}</td>
            <td contenteditable="true">${consultas.data_hora}</td>
            <td contenteditable="true">${consultas.nome_medico}</td>
            <td contenteditable="true">${consultas.nome_paciente}</td> 
            <td contenteditable="true">${consultas.motivo}</td> 
            <td>
                <button onclick="deletarConsulta(${consultas.id_consulta})">Deletar</button>
            </td>
        `;
            tabela.appendChild(linha);
        });
    });

function deletarConsulta(id) {
    fetch(`http://localhost:4000/consultas/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.status)
    .then(status => {
        if (status === 201) {
            msg3('Consulta deletado com sucesso');
        } else {
            msg3('Erro ao deletar consulta');
        }
    });
}
function update(btn) {
    let linha = btn.closest('tr'); 
    let celulas = linha.cells;
    let id = celulas[0].textContent.trim(); 

    let data = {
        data_hora: celulas[1].textContent.trim(),
        id_medico: celulas[2].textContent.trim(),
        id_paciente: celulas[3].textContent.trim(),
        motivo: celulas[4].textContent.trim()
    };

    if (!data.data_hora || !data.id_medico || !data.id_paciente) {
        msg3('Erro: Data, médico e paciente são obrigatórios!');
        return;
    }
     {
        msg3('Erro: Data, medico e paciente são obrigatórios!');
        return;
    }

    fetch(`http://localhost:4000/consultas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.sqlMessage === undefined) {
            celulas[1].removeAttribute('contenteditable');
            celulas[2].removeAttribute('contenteditable');
            celulas[3].removeAttribute('contenteditable');
            msg3('Consulta atualizado com sucesso');
        } else {
            console.error('Erro SQL:', res.sqlMessage);
            msg3('Erro ao atualizar consulta!');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        msg3('Erro ao conectar com o servidor!');
    });
}

