import Character from "../models/Character";
import Show from "../models/Show";
import uploadImage from "../utils/aws-upload-image";
import { Op } from 'sequelize'

export async function createCharacter(req, res) {
    const arr = [];
    let image;
    console.log(req.body.shows);
    if (req.file) {
        let file = req.file.originalname.split(".");
        const fileType = file[file.length - 1];
        image = await uploadImage(
            req.file.buffer,
            fileType,
            req.body.name.toLowerCase()
        );
    }

    let character = await Character.create({
        name: req.body.name.toLowerCase(),
        description: req.body.description,
        age: req.body.age,
        weight: req.body.weight,
        image,
    });

    if (req.body.shows.isArray) {
        for (let e of req.body.shows) {
            let show = await Show.findByPk(e);
            arr.push(show);
            console.log(e);
        }
        await character.addShows(arr)
    } else await character.addShows(req.body.shows)


    res.send(character);
}

export async function allCharacters(req, res) {
    await Character.findAll({ attributes: ["image", "name"] }).then((result) =>
        res.json(result)
    );
}

export async function readCharacter(req, res) {
    await Character.findByPk(req.params.id, {
        include: { model: Show, attributes: ["title"] },
    }).then((result) => res.json(result));
    res.json(Character);
}

export async function modifyCharacter(req, res) {
    let image;

    if (req.file) {
        let character;
        let file = req.file.originalname.split(".");
        const fileType = file[file.length - 1];

        if (!req.body.name) {
            character = await Character.findByPk(req.params.id);
        }

        image = await uploadImage(
            req.file.buffer,
            fileType,
            req.body.name ? req.body.name.toLowerCase() : character.name
        );
    }

    await Character.update({
        name: req.body.name ? req.body.name.toLowerCase() : req.body.name,
        description: req.body.description,
        age: req.body.age,
        weight: req.body.weight,
        image,
    }, {
        where: { id: req.params.id },
    }).then((result) => {
        res.json(result);
    });
}

export async function deleteCharacter(req, res) {
    await Character.destroy({ where: { id: req.params.id } }).then((result) => {
        res.json(result);
    });
}

export async function searchCharacters(req, res) {
    let { search, minWeight, maxWeight, minAge, maxAge, appearances } = req.body;
    if (!search) search = "";
    if (!appearances) appearances = "";
    !minWeight ? (minWeight = 0) : minWeight;
    !maxWeight ? (maxWeight = 100000) : maxWeight;
    !minAge ? (minAge = 0) : minAge;
    !maxAge ? (maxAge = 10000) : maxAge;


    await Character.findAll({
        attributes: ["name", "image"],
        where: {
            name: {
                [Op.like]: "%" + search + "%",
            },
            age: {
                [Op.between]: [minAge, maxAge],
            },
            weight: {
                [Op.between]: [minWeight, maxWeight],
            },
        },

        include: {
            model: Show,
            where: {
                title: {
                    [Op.like]: "%" + appearances + "%",
                },
            },
        },
    }).then((result) => res.json(result));

}