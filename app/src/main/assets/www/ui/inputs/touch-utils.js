import_JS("./ui/ui-utils.js");

class TouchUtils {
	
		static setupTouchControl(control, config, emit)
		{
				control.config = config;
				control.emit = emit;
				control.element = document.createElement("div");
				control.element.className = config.style;
				control.element.id = config.id;
				
				// Prevent Drag shadows
				control.element.style.userSelect = "none";
				control.element.style.webkitUserSelect = "none";
				control.element.style.MozUserSelect = "none";
				control.element.style.msUserSelect = "none";

				control.element.style.webkitUserDrag = "none";
				control.element.draggable = false;

				control._touchStart = TouchUtils.handleTouchStart.bind(control);
				control._touchMove = TouchUtils.handleTouchMove.bind(control);
				control._touchEnd  = TouchUtils.handleTouchEnd.bind(control);

				UI_Utils.applyPositionStyles(control.config, control.element);
				control.applyStyle();
				
				TouchUtils.configureEvents_init(control);
		}

		static handleTouchStart(event)
		{
			event.preventDefault();
			this.doTouchStart(event);			
			TouchUtils.configureEvents_TouchStart(this);
		}

		static handleTouchMove(event)
		{
			event.preventDefault();
			this.doTouchMove(event);
		}
		
		static handleTouchEnd(event)
		{
			event.preventDefault();
			this.doTouchEnd(event);
			TouchUtils.configureEvents_TouchEnd(this);
		}
		
		static configureEvents_init(control) {
			
				control.element.addEventListener("dragstart", e => e.preventDefault());
				control.element.addEventListener("pointerdown", control._touchStart );
		}
		
		static configureEvents_TouchStart(control) {
				window.addEventListener("pointermove", control._touchMove);

				window.addEventListener("pointerup", control._touchEnd);
				window.addEventListener("pointercancel",  control._touchEnd);
		}

		static configureEvents_TouchEnd(control) {
				window.removeEventListener("pointermove", control._touchMove);

				window.removeEventListener("pointerup", control._touchEnd);
				window.removeEventListener("pointercancel",  control._touchEnd);
		}
}
