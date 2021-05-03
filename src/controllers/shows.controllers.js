import Show from "../models/Show";
import Character from '../models/Character';
import uploadImage from '../utils/aws-upload-image';
import { Op } from 'sequelize'

export async function createShow(req, res) {
    let image;

    if (req.file) {
        let file = req.file.originalname.split('.');
        const fileType = file[file.length - 1]
        image = await uploadImage(req.file.buffer, fileType, req.body.title.toLowerCase())
    }

    await Show.create({
        title: req.body.title.toLowerCase(),
        description: req.body.description,
        movie: req.body.movie,
        genre: req.body.genre.toLowerCase(),
        rating: req.body.rating,
        releaseDate: req.body.releaseDate,
        image
    }).then((result) => {
        res.json(result)
    });
}

export async function allShows(req, res) {
    await Show.findAll({
        attributes: ["title", "image", "releaseDate"],
    }).then((result) => res.json(result));
}

export async function readShow(req, res) {
    await Show.findByPk(req.params.id, { include: { model: Character, attributes: ['name'] } }).then((result) =>
        res.json(result)
    );

}

export async function modifyShow(req, res) {

    let image;
    if (req.file) {
        let show;
        let file = req.file.originalname.split(".");
        const fileType = file[file.length - 1];

        if (!req.body.name) {
            show = await Show.findByPk(req.params.id)
        }

        image = await uploadImage(
            req.file.buffer,
            fileType,
            req.body.name ? req.body.name.toLowerCase() : show.name
        );
    }

    await Show.update({
        title: req.body.title ? req.body.title.toLowerCase() : req.body.name,
        description: req.body.description,
        movie: req.body.movie,
        genre: req.body.genre ? req.body.genre.toLowerCase() : req.body.genre,
        rating: req.body.rating,
        releaseDate: req.body.releaseDate,
        image
    }, { where: { id: req.params.id } }).then(
        (result) => {
            res.json(result);
        }
    );
}

export async function deleteShow(req, res) {
    await Show.destroy({ where: { id: req.params.id } }).then(
        (result) => {
            res.json(result);
        }
    );
}

export async function searchShow(req, res) {
    let { search, asc, genres } = req.body
    if (typeof asc == "undefined") asc = 'DESC'
    else asc ? asc = 'ASC' : asc = 'DESC'
    if (!search) search = ""
    if (!genres) genres = ""

    await Show.findAll({
        attributes: ["title", "image", "releaseDate"],
        where: {
            "genre": {
                [Op.like]: '%' + genres + '%'
            },
            "title": {
                [Op.like]: '%' + search + '%'
            }
        },
        order: [
            ['releaseDate', asc]
        ]
    }).then((result) => res.json(result))


}