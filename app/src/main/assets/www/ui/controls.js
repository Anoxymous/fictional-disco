(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory); // AMD
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(); // Node / CommonJS
    } else {
        root.TouchControls = factory(); // Browser global
    }
}(typeof self !== "undefined" ? self : this, function () {

		function applyPositionStyles(config, el) {
				// Parse values
				const [x, y, posUnit] = config.coord.split(",").map(v => v.trim()).filter(Boolean);
				const [w, h, sizeUnit] = config.size.split(",").map(v => v.trim()).filter(Boolean);

				// Size units
				const sizeSuffix = sizeUnit === "percent" ? "vmin" : "px";
				el.style.width = w + sizeSuffix;
				el.style.height = h + sizeSuffix;

				// Position units
				const posXUnit = posUnit === "percent" ? "vw" : "px";
				const posYUnit = posUnit === "percent" ? "vh" : "px";

				el.style.position = "absolute";

				// X positioning
				if (x.startsWith("-")) {
						el.style.right = (-parseFloat(x)) + posXUnit;
				} else if (x.startsWith("+")) {
						el.style.left = parseFloat(x) + posXUnit;
						el.style.transform += "translateX(-50%) ";
				} else {
						el.style.left = parseFloat(x) + posXUnit;
				}

				// Y positioning
				if (y.startsWith("-")) {
						el.style.bottom = (-parseFloat(y)) + posYUnit;
				} else if (y.startsWith("+")) {
						el.style.top = parseFloat(y) + posYUnit;
						el.style.transform += "translateY(-50%) ";
				} else {
						el.style.top = parseFloat(y) + posYUnit;
				}
		}

    // ---------------------------------------------------------
    // BUTTON INPUT
    // ---------------------------------------------------------
    class TouchButton {
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
						applyPositionStyles(this.config, this.element);
            this.element.style.background = "rgba(255,255,255,0.3)";
            this.element.style.borderRadius = "50%";
            this.element.style.touchAction = "none";
        }
    }

    // ---------------------------------------------------------
    // JOYSTICK INPUT
    // ---------------------------------------------------------
    class TouchJoystick {
        constructor(config, emit) {
            this.config = config;
            this.emit = emit;

            this.element = document.createElement("div");
            this.element.className = "touch-joystick";

            this.knob = document.createElement("div");
            this.knob.className = "touch-joystick-knob";
            this.element.appendChild(this.knob);

            this.center = { x: 0, y: 0 };
            this.active = false;
            this.applyStyle();

            this.addEvents();
        }

        applyStyle() {
						applyPositionStyles(this.config, this.element);
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

    // ---------------------------------------------------------
    // MAIN CONTROLLER
    // ---------------------------------------------------------
    class TouchControls {
        constructor() {
            this.inputs = {};
            this.callback = null;
        }

        onInput(callback) {
            this.callback = callback;
        }

        emit(id, data) {
            if (this.callback) this.callback(id, data);
        }

        init(parent, config) {
            config.forEach(item => {
                let control = null;
								
                if (item.type === "button") {
                    control = new TouchButton(item, this.emit.bind(this));
                } else if (item.type === "joystick") {
                    control = new TouchJoystick(item, this.emit.bind(this));
                }

                if (control) {
                    this.inputs[item.id] = control;
                    parent.appendChild(control.element);
                }
            });
        }
    }

    // Return public API
    return TouchControls;
}));