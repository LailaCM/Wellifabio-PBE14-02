const con = require('../connect');

function create(req, res) {
    const {nome, crm, especialidade, telefone, email} = req.body;
    const sql = `INSERT INTO medicos (nome, crm, especialidade, telefone, email) VALUES ('${nome}', '${crm}', '${especialidade}', '${telefone}', '${email}')`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao cadastrar medico');
        } else {
            res.status(201).json('Médico cadastrado com sucesso');
        }
    });
};

function read(req, res) {
    const sql = 'SELECT * FROM medicos';
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao consultar medico');
        } else {
            res.status(200).json(result);
        }
    });
}
const update = (req, res) => {
    const id = req.params.id;
    let nome = req.body.nome;
    let crm = req.body.crm;
    let especialidade = req.body.especialidade;
    let telefone = req.body.telefone;
    let email = req.body.email;

    let query = `UPDATE medicos SET nome ='${nome}', crm = '${crm}', especialidade = '${especialidade}', telefone = '${telefone}', email = '${email}'  WHERE id_medico = '${id}'`
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
    const query = 'DELETE FROM medicos WHERE id_medico = ?';
    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(201).json(result)
        }
    })
}

module.exports = { create, read, update, del };
