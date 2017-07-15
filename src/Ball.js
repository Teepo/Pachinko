import { World, Bodies } from 'matter-js';

import { Store } from './Store';

export class Ball {

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} r
     *
     */
    constructor(x, y, r) {

        this.fill = {
            r : random(255),
            g : random(255),
            b : random(255)
        };

        this.x = x += random(-1, 1);
        this.y = y;
        this.r = r;

        this.body = Bodies.circle(x, y, r, {
            restitution : .5,
            friction    : 0,
            density     : 5
        });

        this.body.label = "ball";

        World.add(Store.world, this.body);
    }

    /**
     *
     * @return {Boolean}
     */
    isOffScreen() {

        const x = this.body.position.x;
        const y = this.body.position.y;

        return (x < -50 || x > width + 50 || y > height);
    }

    show() {

        fill(this.fill.r, this.fill.g, this.fill.b);

        push();
        translate(this.body.position.x, this.body.position.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}
