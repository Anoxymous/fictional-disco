export class TouchButton {
    constructor(config, emit) {
        this.config = config;
        this.emit = emit;

        this.element = document.createElement("div");
        this.element.className = "touch-button";
        this.applyStyle();

        this.element.addEventListener("touchstart", () => {
            this.emit(this.config.id, { pressed: true });
        });

        this.element.addEventListener("touchend", () => {
            this.emit(this.config.id, { pressed: false });
        });
    }

    applyStyle() {
        const [x, y, unit] = this.config.coord.split(" ");
        const [w, h, unit2] = this.config.size.split(" ");

        this.element.style.position = "absolute";
        this.element.style.left = x + unit;
        this.element.style.top = y + unit;
        this.element.style.width = w + unit2;
        this.element.style.height = h + unit2;
        this.element.style.background = "rgba(255,255,255,0.3)";
        this.element.style.borderRadius = "50%";
        this.element.style.touchAction = "none";
    }
}
