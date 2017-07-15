import { Engine, World, Render } from 'matter-js';

import { Store } from './Store';

import { Ball  } from './Ball';
import { Screw } from './Screw';

export class Pachinko {

    setup() {

        this.columns = 12;
        this.rows    = 12;

        createCanvas(window.innerWidth, window.innerHeight);

        Store.balls  = [];
        Store.screws = [];

        Store.engine = Engine.create();

        Store.world = Store.engine.world;

        Store.render = Render.create({
            engine : Store.engine,
            element : document.body
        });

        this.createBall();
        this.buildScrews();
    }

    buildScrews() {

        const spacing = width / this.columns;

        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.columns + 1; i++) {

                let x = i * spacing;

                if (j % 2 === 0) {
                    x += spacing / 2;
                }

                let y = spacing + j * spacing;
                let s = new Screw(x, y, 8);

                Store.screws.push(s);
            }
        }
    }

    createBall() {

        Store.balls.push(new Ball(width / random(1, 4), 0, 10))
    }

    draw() {

        background(51, 51, 51);

        if (frameCount % 20 === 0) {
            this.createBall();
        }

        Engine.update(Store.engine);

        for (let i = 0; i < Store.balls.length; i++) {

            Store.balls[i].show();

            if (Store.balls[i].isOffScreen()) {

                World.remove(Store.world, Store.balls[i].body);
                Store.balls.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < Store.screws.length; i++) {
            Store.screws[i].show();
        }
    }
}
