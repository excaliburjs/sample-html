import { DisplayMode, Engine } from "excalibur";
import { Menu, calculateExPixelConversion } from "./ui";
import { loader } from "./resources";

const game = new Engine({
    canvasElementId: 'game',
    width: 800,
    height: 600,
    pixelArt: true,
    displayMode: DisplayMode.FitScreen
});

game.screen.events.on('resize', () => calculateExPixelConversion(game.screen));

game.start(loader).then(() => {
    calculateExPixelConversion(game.screen);
    const menu = new Menu(game.currentScene);
});