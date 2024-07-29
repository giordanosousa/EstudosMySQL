const Usuario = require('../models/usuarios');
const status = require('http-status');
const { parseAndFormatDate } = require('../utils/dateUtils'); // Importa a função utilitária

exports.Insert = (req, res, next) => {
    const { nome, salario, dataNascimento, ativo } = req.body;

    try {
        const formattedDate = parseAndFormatDate(dataNascimento);
        Usuario.create({
            nome,
            salario,
            dataNascimento: formattedDate,
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
    } catch (error) {
        res.status(status.BAD_REQUEST).send({ error: error.message });
    }
};

exports.SearchAll = (req, res, next) => {
    Usuario.findAll()
    .then(usuario => {
        if(usuario){
            res.status(status.OK).send(usuario);
        }
    })
    .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
    .then(usuario => {
        if(usuario){
            res.status(status.OK).send(usuario);
        }else{
            res.status(status.NOT_FOUND).send();
        }
    })
    .catch(error => next(error));
}

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const { nome, salario, dataNascimento, ativo } = req.body;

    try {
        const formattedDate = parseAndFormatDate(dataNascimento);

        Usuario.findByPk(id)
            .then(usuario => {
                if (usuario) {
                    return usuario.update({
                        nome,
                        salario,
                        dataNascimento: formattedDate,
                        ativo
                    },
                    {
                        where: {id: id} // se fizer Update sem usar o where apaga todos os registros.
                    })
                    .then(() => {
                        res.status(status.OK).send(); // Envia resposta de sucesso
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar usuário:', error); // Log do erro
                        next(error); // Passa o erro para o middleware de tratamento
                    });
                } else {
                    res.status(status.NOT_FOUND).send({ error: 'Usuário não encontrado' }); // Resposta mais detalhada
                }
            })
            .catch(error => {
                console.error('Erro ao buscar usuário:', error); // Log do erro
                next(error); // Passa o erro para o middleware de tratamento
            });
    } catch (error) {
        res.status(status.BAD_REQUEST).send({ error: error.message });
    }
};

exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
    .then(usuario => {
        if(usuario) {
            usuario.destroy({
                where: {id: id}
            })
            .then(() => {
                res.status(status.OK).send({msg:'usuario apagado'});
            })
            .catch(error => next(error));
        } else {
            res.status(status.NOT_FOUND).send({msg:'usuario não encontrado'});
        }
    })
    .catch(error => next(error));
}