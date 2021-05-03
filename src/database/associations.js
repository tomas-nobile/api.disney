import Character from '../models/Character';
import Show from '../models/Show';
import User from '../models/User';



Show.belongsToMany(Character, { through: "show_character" });
Character.belongsToMany(Show, { through: "show_character" });