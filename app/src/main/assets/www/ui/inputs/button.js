import_JS("./ui/inputs/touch-utils.js");

class TouchButton {
	
		constructor(config, emit) {
				TouchUtils.setupTouchControl(this, config, emit);
		}

		applyStyle() {
				this.element.style.background = "rgba(255,255,255,0.3)";
				this.element.style.borderRadius = "50%";
				this.element.style.touchAction = "none";
		}
		
		doTouchStart(event)
		{
			this.emit(this.config.id, { pressed: true });		
		}
		
		doTouchMove(event) { }

		doTouchEnd(event)
		{
			this.emit(this.config.id, { pressed: false });	
		}		
}
