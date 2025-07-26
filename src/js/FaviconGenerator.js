import { Polygon, Star } from "./shapes.js";

export class FaviconGenerator {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 32;
        this.canvas.height = 32;
        this.shape = null;
        this.rotation = 0;
        this.generateRandomShape();
    }

    generateRandomShape() {
        const shapes = [Polygon, Star];
        const ShapeClass = shapes[Math.floor(Math.random() * shapes.length)];
        this.shape = new ShapeClass();
        this.rotation = Math.random() * Math.PI * 2;
    }

    generateFavicon(color) {
        const ctx = this.ctx;
        const size = 32;
        const radius = size * 0.4;

        ctx.clearRect(0, 0, size, size);

        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.rotate(this.rotation);
        ctx.fillStyle = color;

        this.shape.draw(ctx, radius);

        ctx.restore();

        return this.canvas.toDataURL("image/png");
    }

    updateFavicon(color) {
        const existingFavicon = document.querySelector('link[rel="icon"]');
        if (existingFavicon) {
            existingFavicon.remove();
        }

        const favicon = document.createElement("link");
        const faviconUrl = this.generateFavicon(color);
        favicon.rel = "icon";
        favicon.type = "image/png";
        favicon.href = faviconUrl;
        document.head.appendChild(favicon);
    }
}
