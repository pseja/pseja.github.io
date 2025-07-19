import { randomBetween } from "./utils.js";
import { Polygon, Star } from "./shapes.js";

export class Node {
    minSize = 4;
    maxSize = 6;
    rotationMultiplier = this.maxSize * 0.1;
    shapes = [Polygon, Star];

    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = randomBetween(this.minSize, this.maxSize);
        this.rotation = 0;
        this.rotationSpeed =
            Math.sqrt(this.vx ** 2 + this.vy ** 2) *
            (this.rotationMultiplier / this.radius) *
            (Math.random() < 0.5 ? 1 : -1);

        const ShapeClass =
            this.shapes[Math.floor(Math.random() * this.shapes.length)];
        this.shape = new ShapeClass();
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation);

        this.ctx.fillStyle = "#444";
        this.shape.draw(this.ctx, this.radius);

        this.ctx.restore();
    }

    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x < 0) {
            this.x = width;
        } else if (this.x > width) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = height;
        } else if (this.y > height) {
            this.y = 0;
        }

        this.draw();
    }
}
