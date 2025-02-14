
const cadastro = document.getElementById('cadastro');
cadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        nome: cadastro.nome.value,
        crm: cadastro.crm.value,
        especialidade: cadastro.especialidade.value,
        telefone: cadastro.telefone.value,
        email: cadastro.email.value,
    }
    fetch('http://localhost:4000/medicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('Médico cadastrado com sucesso');
            } else {
                msg3('Erro ao cadastrar médico');
            }
        });
});

fetch('http://localhost:4000/medicos')
    .then(response => response.json())
    .then(medicos => {
        const tabela = document.getElementById('medicos');
        medicos.forEach(medico => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td>${medico.id_medico}</td>
            <td contenteditable="true">${medico.nome}</td>
            <td contenteditable="true">${medico.crm}</td>
            <td contenteditable="true">${medico.especialidade}</td> 
            <td contenteditable="true">${medico.telefone}</td> 
            <td contenteditable="true">${medico.email}</td> 
            <td>
                <button onclick="update(this)">Atualizar</button>
                <button onclick="deletarMedico(${medico.id_medico})">Deletar</button>
            </td>
        `;
            tabela.appendChild(linha);
        });
    });

function deletarMedico(id) {
    fetch(`http://localhost:4000/medicos/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.status)
    .then(status => {
        if (status === 201) {
            msg3('Médico deletado com sucesso');
        } else {
            msg3('Erro ao deletar médico');
        }
    });
}

function update(btn) {
    let linha = btn.closest('tr'); 
    let celulas = linha.cells;
    let id = celulas[0].textContent.trim(); 

    let data = {
        nome: celulas[1].textContent.trim(),
        crm: celulas[2].textContent.trim(),
        especialidade: celulas[3].textContent.trim(),
        telefone: celulas[4].textContent.trim(),
        email: celulas[5].textContent.trim()
    };

    if (!data.nome || !data.crm || !data.especialidade || !data.telefone || !data.email) {
        msg3('Erro: Todas as informações são obrigatórios!');
        return;
    }

    fetch(`http://localhost:4000/medicos/${id}`, {
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
            celulas[4].removeAttribute('contenteditable');
            celulas[5].removeAttribute('contenteditable');
            msg3('Médico atualizado com sucesso');
        } else {
            console.error('Erro SQL:', res.sqlMessage);
            msg3('Erro ao atualizar médico!');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        msg3('Erro ao conectar com o servidor!');
    });
}

function msg3(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}