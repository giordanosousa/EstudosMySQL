const Usuario = require('../models/usuarios');
const status = require('http-status');

// Inserir os dados no banco
exports.Insert = (req, res, next) => {
    const { nome, salario, dataNascimento, ativo } = req.body;

    Usuario.create({
        nome,
        salario,
        dataNascimento,
        ativo,
    })
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
