import_JS("./ui/ui-utils.js");

class TouchButton {
	
		constructor(config, emit) {
				this.config = config;
				this.emit = emit;

				this.element = document.createElement("div");
				this.element.className = "touch-button";

				this.applyStyle();
				this.addEvents();
		}
		
		


		applyStyle() {
				UI_Utils.applyPositionStyles(this.config, this.element);
				this.element.style.background = "rgba(255,255,255,0.3)";
				this.element.style.borderRadius = "50%";
				this.element.style.touchAction = "none";
		}
		
		touchStart(e)
		{
			this.emit(this.config.id, { pressed: true });		
		}

		touchEnd(e)
		{
			this.emit(this.config.id, { pressed: false });	
		}
		
		addEvents() {
				this.element.addEventListener("touchstart", e => { this.touchStart(e) } );
				this.element.addEventListener("touchend", e => { this.touchEnd(e) } );

				this.element.addEventListener("mousedown", e => { this.touchStart(e) } );
				this.element.addEventListener("mouseup", e => { this.touchEnd(e) } );
		}
}
