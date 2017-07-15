import { World, Bodies } from 'matter-js';

import { Store } from './Store';

export class Screw {

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} r
     *
     */
    constructor(x, y, r) {

        this.x = x;
        this.y = y;
        this.r = r;

        this.body = Bodies.circle(x, y, r, {
            restitution : 1,
            friction    : 0,
            isStatic    : true
        });

        this.body.label = "screw";

        World.add(Store.world, this.body);
    }

    show() {

        fill(255);

        push();
        translate(this.body.position.x, this.body.position.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}
