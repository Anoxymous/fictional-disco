import_JS("./libs/three-r81.min.js");

// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;


class SS3DEng
{
	renderer = null;
	camera = null;
	scene = null;

	constructor() {}
	
	init(container)
	{
		this._update = this.update.bind(this);
						
		this.renderer = new THREE.WebGLRenderer();

		this.camera =
			new THREE.PerspectiveCamera(
					VIEW_ANGLE,
					ASPECT,
					NEAR,
					FAR
			);
			
		this.scene = new THREE.Scene();

		// Add the camera to the scene.
		this.scene.add(this.camera);

		// Start the renderer.
		this.renderer.setSize(WIDTH, HEIGHT);
		
		// Attach the renderer-supplied
		// DOM element.
		container.appendChild(this.renderer.domElement);
		
				// create a point light
		const pointLight =
			new THREE.PointLight(0xFFFFFF);

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// add to the scene
		this.scene.add(pointLight);
		
			// create the sphere's material
	const sphereMaterial =
		new THREE.MeshLambertMaterial(
			{
				color: 0xCC0000
			});

	// Set up the sphere vars
	const RADIUS = 50;
	const SEGMENTS = 16;
	const RINGS = 16;

	// Create a new mesh with
	// sphere geometry - we will cover
	// the sphereMaterial next!
	const sphere = new THREE.Mesh(

		new THREE.SphereGeometry(
			RADIUS,
			SEGMENTS,
			RINGS),

		sphereMaterial);

	// Move the Sphere back in Z so we
	// can see it.
	sphere.position.z = -300;

	// Finally, add the sphere to the scene.
	this.scene.add(sphere);
	
	requestAnimationFrame(this._update);
	}
	
	update ()
	{
		// Draw!
		this.renderer.render(this.scene, this.camera);

		// Schedule the next frame.
		requestAnimationFrame(this._update);
	}
}
