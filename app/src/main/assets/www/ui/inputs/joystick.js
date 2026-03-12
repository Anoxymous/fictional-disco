import_JS("./ui/ui-utils.js");

class TouchJoystick {
		constructor(config, emit) {
				this.config = config;
				this.emit = emit;

				this.element = document.createElement("div");
				this.element.className = "touch-joystick";

				this.knob = document.createElement("div");
				this.knob.className = "touch-joystick-knob";
				this.element.appendChild(this.knob);

				this.applyStyle();
				this.addEvents();
		}

		applyStyle() {
				UI_Utils.applyPositionStyles(this.config, this.element);
				this.element.style.background = "rgba(255,255,255,0.2)";
				this.element.style.borderRadius = "50%";
				this.element.style.touchAction = "none";

				// Knob
				this.knob.style.width = "40%";
				this.knob.style.height = "40%";
				this.knob.style.background = "rgba(255,255,255,0.6)";
				this.knob.style.borderRadius = "50%";
				this.knob.style.position = "absolute";
				this.knob.style.left = "30%";
				this.knob.style.top = "30%";
		}

		touchStart()
		{
			this.active = true;
			this.center = this.getCenter();			
		}

		touchMove(e)
		{
			if (!this.active) return;

			var dx = 0;
			var dy = 0;
			
			if(event.type === "touchmove")
			{
				const touch = e.touches[0];
				const rect = this.element.getBoundingClientRect();

				dx = e.touch - this.center.x;
				dy = e.touch - this.center.y;
			}
			else
			{
				dx = e.clientX - this.center.x;
				dy = e.clientY - this.center.y;
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
		
		touchEnd(e)
		{
			this.active = false;
			this.knob.style.left = "30%";
			this.knob.style.top = "30%";
			this.emit(this.config.id, { x: 0, y: 0 });
		}
		
		addEvents(e) {
				this.element.addEventListener("touchstart", e => { this.touchStart(e) } );
				this.element.addEventListener("touchmove",  e => { this.touchMove(e) } );
				this.element.addEventListener("touchend",   e => { this.touchEnd(e) } );

				this.element.addEventListener("mousedown", e => { this.touchStart(e) } );
				this.element.addEventListener("mousemove", e => { this.touchMove(e) } );
				this.element.addEventListener("mouseup",   e => { this.touchEnd(e) } );

		}

		getCenter() {
				const rect = this.element.getBoundingClientRect();
				return {
						x: rect.left + rect.width / 2,
						y: rect.top + rect.height / 2
				};
		}
}
