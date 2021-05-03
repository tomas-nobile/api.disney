import jwt from "jsonwebtoken";
import User from "../models/User";
require('dotenv').config()


module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send("Acceso denegado");
    } else {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, async(err, decoded) => {
            if (err) {
                res
                    .status(500)
                    .send("Ha ocurrido un problema al decodificar el token", err);
            } else {
                await User.findByPk(decoded.userFinal.id).then((user) => {
                    if (!user || user.dataValues.email != decoded.userFinal.email) {
                        res.status(401).send("Token incorrecto");
                    } else {
                        next();
                    }
                });
            }
        });
    }
};