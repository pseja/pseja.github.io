import { FaviconGenerator } from "./FaviconGenerator.js";

export class ColorController {
    constructor() {
        this.hueSlider = document.getElementById("hue-slider");
        this.hueValue = document.getElementById("hue-value");
        this.chromaSlider = document.getElementById("chroma-slider");
        this.chromaValue = document.getElementById("chroma-value");

        this.faviconGenerator = new FaviconGenerator();

        this.init();
    }

    init() {
        this.hueSlider.addEventListener("input", (e) =>
            this.updateHue(e.target.value)
        );
        this.chromaSlider.addEventListener("input", (e) =>
            this.updateChroma(e.target.value)
        );

        this.updateHue(this.hueSlider.value);
        this.updateChroma(this.chromaSlider.value);

        this.faviconGenerator.updateFavicon(this.getCurrentColors().primary);
    }

    updateHue(value) {
        document.documentElement.style.setProperty("--hue", value);
        this.hueValue.textContent = value;
        this.updateColors();
    }

    updateChroma(value) {
        document.documentElement.style.setProperty("--chroma", value);
        this.chromaValue.textContent = parseFloat(value)
            .toFixed(2)
            .substring(1);
        this.updateColors();
    }

    updateColors() {
        const hue = parseInt(this.hueSlider.value);
        const chroma = parseFloat(this.chromaSlider.value);

        const root = document.documentElement;

        const chromaBg = chroma * 0.5;
        const chromaText = Math.min(chroma, 0.1);
        const chromaAction = Math.max(chroma, 0.1);
        const chromaAlert = Math.max(chroma, 0.05);

        root.style.setProperty("--hue", hue);
        root.style.setProperty("--hue-secondary", (hue + 180) % 360);
        root.style.setProperty("--chroma", chroma);
        root.style.setProperty("--chroma-bg", chromaBg);
        root.style.setProperty("--chroma-text", chromaText);
        root.style.setProperty("--chroma-action", chromaAction);
        root.style.setProperty("--chroma-alert", chromaAlert);

        root.style.setProperty("--bg-dark", `oklch(0.1 ${chromaBg} ${hue})`);
        root.style.setProperty("--bg", `oklch(0.15 ${chromaBg} ${hue})`);
        root.style.setProperty("--bg-light", `oklch(0.2 ${chromaBg} ${hue})`);

        root.style.setProperty("--text", `oklch(0.96 ${chromaText} ${hue})`);
        root.style.setProperty(
            "--text-muted",
            `oklch(0.76 ${chromaText} ${hue})`
        );

        root.style.setProperty("--highlight", `oklch(0.5 ${chroma} ${hue})`);
        root.style.setProperty("--border", `oklch(0.4 ${chroma} ${hue})`);
        root.style.setProperty("--border-muted", `oklch(0.3 ${chroma} ${hue})`);

        root.style.setProperty(
            "--primary",
            `oklch(0.76 ${chromaAction} ${hue})`
        );
        root.style.setProperty(
            "--secondary",
            `oklch(0.76 ${chromaAction} ${(hue + 180) % 360})`
        );
        root.style.setProperty("--danger", `oklch(0.7 ${chromaAlert} 30)`);
        root.style.setProperty("--warning", `oklch(0.7 ${chromaAlert} 100)`);
        root.style.setProperty("--success", `oklch(0.7 ${chromaAlert} 160)`);
        root.style.setProperty("--info", `oklch(0.7 ${chromaAlert} 260)`);

        this.faviconGenerator.updateFavicon(this.getCurrentColors().primary);
    }

    getCurrentColors() {
        const hue = parseInt(this.hueSlider.value);
        const chroma = parseFloat(this.chromaSlider.value);

        return {
            primary: `oklch(0.76 ${Math.max(chroma, 0.1)} ${hue})`,
            secondary: `oklch(0.76 ${Math.max(chroma, 0.1)} ${
                (hue + 180) % 360
            })`,
            border: `oklch(0.4 ${chroma} ${hue})`,
            borderMuted: `oklch(0.3 ${chroma} ${hue})`,
            text: `oklch(0.96 ${Math.min(chroma, 0.1)} ${hue})`,
            highlight: `oklch(0.5 ${chroma} ${hue})`,
        };
    }
}
