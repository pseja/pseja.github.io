import { randomBetween } from "./utils.js";

class Shape {
    draw(ctx, radius) {
        throw new Error("Method 'draw()' must be implemented.");
    }
}

export class Polygon extends Shape {
    constructor() {
        super();
        this.sides = Math.floor(randomBetween(3, 6));
    }

    draw(ctx, radius) {
        ctx.beginPath();

        for (let i = 0; i < this.sides; i++) {
            const angle = (i * Math.PI * 2) / this.sides - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();
        ctx.fill();
    }
}

export class Star extends Shape {
    constructor() {
        super();
        this.spikes = Math.floor(randomBetween(4, 7));
    }

    draw(ctx, radius) {
        const outerRadius = radius;
        const innerRadius = radius * 0.4;

        ctx.beginPath();
        for (let i = 0; i < this.spikes * 2; i++) {
            const angle = (i * Math.PI) / this.spikes;
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fill();
    }
}
