import Character from '../models/Character';
import Show from '../models/Show';
import User from '../models/User';
import Show_Character from '../models/Show_Cha';


Show.belongsToMany(Character, { through: Show_Character });
Character.belongsToMany(Show, { through: Show_Character });