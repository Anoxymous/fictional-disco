import_JS("./ui/inputs/button.js");
import_JS("./ui/inputs/joystick.js");

class TouchControls {
	
	constructor()
	{
		this.inputs = {};
    this.callback = null;
	}
	
  onInput(callback)
	{
    this.callback = callback;
  }

  emit(id, data)
	{
		if (this.callback) { this.callback(id, data) };
  }

  init(parent, config)
	{
		config.forEach(item =>
		{
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