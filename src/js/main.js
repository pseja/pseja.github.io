import { Node } from "./Node.js";

const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const nodes = [];
const nodeCount = 100;

function init() {
    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node(ctx));
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    nodes.forEach((node) => node.update(width, height));
    requestAnimationFrame(animate);
}

init();
animate();
