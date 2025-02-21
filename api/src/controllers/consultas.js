const con = require('../connect');

function create(req, res) {
    const {data_hora, id_medico, id_paciente, motivo} = req.body;
    const sql = `INSERT INTO consultas (data_hora, id_medico, id_paciente, motivo) VALUES ('${data_hora}', '${id_medico}', '${id_paciente}', '${motivo}')`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao cadastrar consulta');
        } else {
            res.status(201).json('Consulta cadastrado com sucesso');
        }
    });
};

function read(req, res) {
    const sql = `
        SELECT c.id_consulta, c.data_hora, m.nome AS nome_medico, p.nome AS nome_paciente, c.motivo
        FROM consultas c
        JOIN medicos m ON c.id_medico = m.id_medico
        JOIN clientes p ON c.id_paciente = p.id_cliente;
    `;
    
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao consultar as consultas');
        } else {
            res.status(200).json(result);
        }
    });
}



const update = (req, res) => {
    const id = req.params.id;
    let data_hora = req.body.data_hora;
    let id_medico = req.body.id_medico;
    let id_paciente = req.body.id_paciente;
    let motivo = req.body.motivo;

    let query = `UPDATE consultas SET data_hora ='${data_hora}', id_medico = '${id_medico}', id_paciente = '${id_paciente}', motivo = '${motivo}'  WHERE id_consulta = '${id}'`
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(201).json(result)
        }
    })

}

const del = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM consultas WHERE id_consulta = ?';
    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(201).json(result)
        }
    })
}

module.exports = { create, read, update, del };
