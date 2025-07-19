import { randomBetween } from "./utils.js";

export class Node {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = randomBetween(1, 5);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#888";
        this.ctx.fill();
    }

    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

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
