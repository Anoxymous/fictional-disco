class UI_Utils {
	
		static applyPositionStyles(config, el)
		{
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
}
