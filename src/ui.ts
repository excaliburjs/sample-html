import { Actor, Color, Scene, Vector, vec } from "excalibur";

export const calculateExPixelConversion = (screen: ex.Screen) => {
    const origin = screen.worldToPageCoordinates(Vector.Zero);
    const singlePixel = screen.worldToPageCoordinates(vec(1, 0)).sub(origin);
    const pixelConversion = singlePixel.x;
    document.documentElement.style.setProperty('--pixel-conversion', pixelConversion.toString());
}

export class Menu {
    rootElement: HTMLElement;
    addUnitButton: HTMLElement;
    removeUnitButton: HTMLElement;
    currentWorldPos: Vector = vec(0, 0);
    constructor(public scene: Scene) {
        scene.input.pointers.on('down', (evt) => {
            this.show();
            this.currentWorldPos = scene.engine.screen.pageToWorldCoordinates(vec(evt.pagePos.x, evt.pagePos.y));
            document.documentElement.style.setProperty('--pointer-x', evt.pagePos.x.toString() + 'px');
            document.documentElement.style.setProperty('--pointer-y', evt.pagePos.y.toString() + 'px');
        });

        const rootElement = document.getElementById('menu');
        const addUnitButton = document.getElementById('add-unit');
        const removeUnitButton = document.getElementById('remove-unit');

        if (rootElement && addUnitButton && removeUnitButton) {
            this.rootElement = rootElement;
            this.addUnitButton = addUnitButton;
            this.removeUnitButton = removeUnitButton;

            this.addUnitButton.addEventListener('click', evt => {
                this.addUnit();
            });

            this.removeUnitButton.addEventListener('click', evt => {
                this.removeUnit();
            });
        } else {
            throw Error("Could not initialize menu, element with id='menu'");
        }
    }

    addUnit() {
        const actor = new Actor({
            pos: this.currentWorldPos,
            width: 100,
            height: 100,
            color: Color.Red
        });
        this.scene.add(actor);
        this.hide();
    }
    
    removeUnit() {
        for (let actor of this.scene.actors) {
            if (actor.graphics.bounds.contains(this.currentWorldPos)) {
                actor.kill();
            }
        }
        this.hide();
    }

    show() {
        this.rootElement.classList.remove('hide');
        this.rootElement.classList.add('show');
    }

    hide() {
        this.rootElement.classList.remove('show');
        this.rootElement.classList.add('hide');
    }
}