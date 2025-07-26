import { randomBetween } from "./utils.js";
import { Polygon, Star } from "./shapes.js";

export class Node {
    minSize = 4;
    maxSize = 6;
    rotationMultiplier = this.maxSize * 0.1;
    shapes = [Polygon, Star];

    constructor(ctx, colorController) {
        this.ctx = ctx;
        this.colorController = colorController;
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

        this.color = Math.random();
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation);

        const colors = this.colorController.getCurrentColors();

        if (this.color < 0.3) {
            this.ctx.fillStyle = colors.primary;
        } else if (this.color < 0.6) {
            this.ctx.fillStyle = colors.secondary;
        } else if (this.color < 0.8) {
            this.ctx.fillStyle = colors.border;
        } else {
            this.ctx.fillStyle = colors.highlight;
        }

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
