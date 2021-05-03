import { Router } from 'express';
import { allCharacters, createCharacter, readCharacter, modifyCharacter, deleteCharacter, searchCharacters } from '../controllers/characters.controllers'
const router = Router();

router.post('/add', createCharacter);

router.get('/', allCharacters);

router.get('/:id', readCharacter);

router.patch('/:id', modifyCharacter);

router.delete('/:id', deleteCharacter);

router.post('/search', searchCharacters);

export default router;