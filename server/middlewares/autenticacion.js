const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();

    });


};



let verificaRole = (req, res, next) => {

    let usuario = req.usuario;
    let role = usuario.role;


    if (role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Solo los ADMIN_ROLE pueden modificar los datos"
            }

        });
    }



}


let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    res.json({
        token
    })
}

module.exports = {
    verificaToken,
    verificaRole,
    verificaTokenImg
}