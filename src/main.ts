import { DisplayMode, Engine } from "excalibur";
import { Menu, calculateExPixelConversion } from "./ui";

const game = new Engine({
    canvasElementId: 'game',
    width: 800,
    height: 600,
    displayMode: DisplayMode.FitScreen
});

game.screen.events.on('resize', () => calculateExPixelConversion(game.screen));

game.start().then(() => {
    calculateExPixelConversion(game.screen);
    const menu = new Menu(game.currentScene);
});