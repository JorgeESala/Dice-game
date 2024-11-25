import { Game } from "./Game.js";

const game = new Game();
game.start(process.argv.slice(2));