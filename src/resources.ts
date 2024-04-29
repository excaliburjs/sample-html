import { ImageSource, SpriteSheet, Animation, Loader, FontSource } from "excalibur";

import CalImage from './cal.png'; 
import SilkscreenFont from './Silkscreen-Regular.ttf';

export const Resources = {
    CalSpriteSheet: new ImageSource(CalImage),
    PixelFont: new FontSource(SilkscreenFont, 'silkscreen')
} as const;

export const CalSpriteSheet = SpriteSheet.fromImageSource({
    image: Resources.CalSpriteSheet,
    grid: {
        rows: 1,
        columns: 9,
        spriteHeight: 32,
        spriteWidth: 32
    }
})

export const IdleAnimation = Animation.fromSpriteSheetCoordinates({
    spriteSheet: CalSpriteSheet,
    frameCoordinates: [
        { x: 2, y: 0},
        { x: 3, y: 0},
    ],
    durationPerFrameMs: 300
});

export const loader = new Loader();
for (let res of Object.values(Resources)) {
    loader.addResource(res);
}