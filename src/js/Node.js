import { randomBetween } from "./utils.js";

export class Node {
    minSize = 1;
    maxSize = 5;
    rotationMultiplier = this.maxSize * 0.1;

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
            (this.rotationMultiplier / this.radius);
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation);

        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#888";
        this.ctx.fillRect(
            -this.radius,
            -this.radius,
            this.radius * 2,
            this.radius * 2
        );
        // this.ctx.fill();

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
