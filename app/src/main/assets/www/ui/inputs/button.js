import_JS("./ui/ui-utils.js");

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
				UI_Utils.applyPositionStyles(this.config, this.element);
				this.element.style.background = "rgba(255,255,255,0.3)";
				this.element.style.borderRadius = "50%";
				this.element.style.touchAction = "none";
		}
}
