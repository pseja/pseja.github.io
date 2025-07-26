import { Node } from "./Node.js";

const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

let mouse = { x: -1000, y: -1000 };
document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const nodes = [];
const nodeCount = 100;
const maxConnectionDistance = 150;

function init() {
    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node(ctx));
    }
}

function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        // mouse connections
        const mDx = nodes[i].x - mouse.x;
        const mDy = nodes[i].y - mouse.y;
        const mDistance = Math.sqrt(mDx * mDx + mDy * mDy);

        if (mDistance < maxConnectionDistance) {
            const mOpacity = 1 - mDistance / maxConnectionDistance;

            ctx.strokeStyle = `rgba(203, 166, 247, ${mOpacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        for (let j = i + 1; j < nodes.length; j++) {
            // node to node connections
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxConnectionDistance) {
                const opacity = 1 - distance / maxConnectionDistance;

                ctx.strokeStyle = `rgba(68, 68, 68, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    drawConnections();
    nodes.forEach((node) => node.update(width, height));
    requestAnimationFrame(animate);
}

init();
animate();
