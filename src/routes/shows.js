import { Router } from 'express';
import { allShows, createShow, readShow, modifyShow, deleteShow, searchShow } from '../controllers/shows.controllers'
const router = Router();

router.post('/add', createShow);

router.get('/', allShows);

router.get('/:id', readShow);

router.patch('/:id', modifyShow);

router.delete('/:id', deleteShow);

router.post('/search', searchShow);

export default router;