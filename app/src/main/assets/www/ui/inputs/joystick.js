export class TouchJoystick {
    constructor(config, emit) {
        this.config = config;
        this.emit = emit;

        this.element = document.createElement("div");
        this.element.className = "touch-joystick";
        this.applyStyle();

        this.knob = document.createElement("div");
        this.knob.className = "touch-joystick-knob";
        this.element.appendChild(this.knob);

        this.center = { x: 0, y: 0 };
        this.active = false;

        this.addEvents();
    }

    applyStyle() {
        const [x, y, unit] = this.config.coord.split(" ");
        const [w, h, unit2] = this.config.size.split(" ");

        this.element.style.position = "absolute";
        this.element.style.left = x + unit;
        this.element.style.top = y + unit;
        this.element.style.width = w + unit2;
        this.element.style.height = h + unit2;
        this.element.style.background = "rgba(255,255,255,0.2)";
        this.element.style.borderRadius = "50%";
        this.element.style.touchAction = "none";

        this.knob.style.width = "40%";
        this.knob.style.height = "40%";
        this.knob.style.background = "rgba(255,255,255,0.6)";
        this.knob.style.borderRadius = "50%";
        this.knob.style.position = "absolute";
        this.knob.style.left = "30%";
        this.knob.style.top = "30%";
    }

    addEvents() {
        this.element.addEventListener("touchstart", e => {
            this.active = true;
            this.center = this.getCenter();
        });

        this.element.addEventListener("touchmove", e => {
            if (!this.active) return;

            const touch = e.touches[0];
            const rect = this.element.getBoundingClientRect();

            const dx = touch.clientX - this.center.x;
            const dy = touch.clientY - this.center.y;

            const radius = rect.width / 2;
            const dist = Math.min(Math.sqrt(dx*dx + dy*dy), radius);

            const angle = Math.atan2(dy, dx);

            const nx = Math.cos(angle) * (dist / radius);
            const ny = Math.sin(angle) * (dist / radius);

            this.knob.style.left = (nx * 30 + 30) + "%";
            this.knob.style.top = (ny * 30 + 30) + "%";

            this.emit(this.config.id, { x: nx, y: ny });
        });

        this.element.addEventListener("touchend", () => {
            this.active = false;
            this.knob.style.left = "30%";
            this.knob.style.top = "30%";
            this.emit(this.config.id, { x: 0, y: 0 });
        });
    }

    getCenter() {
        const rect = this.element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }
}
