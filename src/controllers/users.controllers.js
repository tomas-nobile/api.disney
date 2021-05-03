import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require('dotenv').config();

export async function signin(req, res) {
    const { email, password } = req.body;

    User.findOne({
        where: {
            email,
        },
    }).then((user) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const { id, name, email } = user;
                const userFinal = { id, name, email };

                let token = jwt.sign({ userFinal }, process.env.SECRET_KEY, {
                    expiresIn: process.env.EXPIRESIN,
                });

                res.json({ userFinal, token });
            } else {
                res.status(401).send("Contraseña incorrecta");
            }
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    });
}

export async function signup(req, res) {
    let { name, email, password } = req.body;

    password = bcrypt.hashSync(password, 10);

    User.create({ name, email, password })
        .then((user) => {
            let { id, name, email } = user;
            let userFinal = { id, name, email };

            let token = jwt.sign({ userFinal }, process.env.SECRET_KEY, {
                expiresIn: process.env.EXPIRESIN,
            });

            res.json({ userFinal, token });
        })
        .catch((err) => console.log(err));
}