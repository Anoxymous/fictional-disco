import_JS("./ui/inputs/touch-utils.js");

class TouchJoystick {
		constructor(config, emit) {
				TouchUtils.setupTouchControl(this, config, emit);
		}
		
		applyStyle() {
				this.element.style.background = "rgba(255,255,255,0.2)";
				this.element.style.borderRadius = "50%";
				this.element.style.touchAction = "none";

				// Knob
				this.knob = document.createElement("div");
				this.knob.className = "touch-joystick-knob";
				this.element.appendChild(this.knob);		
				
				this.knob.style.width = "40%";
				this.knob.style.height = "40%";
				this.knob.style.background = "rgba(255,255,255,0.6)";
				this.knob.style.borderRadius = "50%";
				this.knob.style.position = "absolute";
				this.knob.style.left = "30%";
				this.knob.style.top = "30%";
		}

		doTouchStart(event)
		{
			this.active = true;
			this.center = this.getCenter();
		}

		doTouchMove(event)
		{
			if (!this.active) return;

			var dx = 0;
			var dy = 0;
			
			if(event.type === "touchmove")
			{
				const touch = event.touches[0];
				const rect = this.element.getBoundingClientRect();

				dx = touch.clientX - this.center.x;
				dy = touch.clientY - this.center.y;
			}
			else
			{
				dx = event.clientX - this.center.x;
				dy = event.clientY - this.center.y;
			}

			const rect = this.element.getBoundingClientRect();

			const radius = rect.width / 2;
			const dist = Math.min(Math.sqrt(dx * dx + dy * dy), radius);
			const angle = Math.atan2(dy, dx);

			const nx = Math.cos(angle) * (dist / radius);
			const ny = Math.sin(angle) * (dist / radius);

			this.knob.style.left = (nx * 30 + 30) + "%";
			this.knob.style.top = (ny * 30 + 30) + "%";

			this.emit(this.config.id, { x: nx, y: ny });
		}
		
		doTouchEnd(event)
		{
			this.active = false;
			this.knob.style.left = "30%";
			this.knob.style.top = "30%";
			this.emit(this.config.id, { x: 0, y: 0 });
		}
		
		getCenter() {
				const rect = this.element.getBoundingClientRect();
				return {
						x: rect.left + rect.width / 2,
						y: rect.top + rect.height / 2
				};
		}
}
