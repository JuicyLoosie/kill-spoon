// scene size
const WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight

//camera attributes
const VIEW_ANGLE = 45,
      ASPECT = WIDTH/HEIGHT,
      NEAR = 0.1,
      FAR = 10000

//create a WebGL renderer
let renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(WIDTH, HEIGHT)

document.body.appendChild(renderer.domElement)

//create scene
let scene = new THREE.Scene()

//create camera
let camera = new THREE.PerspectiveCamera(
                  VIEW_ANGLE,
                  ASPECT,
                  NEAR,
                  FAR )

//back dat camera up
camera.position.y = 260
camera.position.z = 500

scene.add(camera)
//create cube
let cubeGeometry = new THREE.CubeGeometry(100, 100, 100)
let cubeMaterial = new THREE.MeshLambertMaterial({color:0x1ec876})
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)



//create skybox
let skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000)
let skyboxTexture = new THREE.TextureLoader().load('http://i1351.photobucket.com/albums/p794/takabuschik/sky_sunset_04_showoff_zpsf1fd4879.jpg')
let skyboxMaterial = new THREE.MeshBasicMaterial({ map: skyboxTexture, side: THREE.BackSide })
let skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)
scene.add(skybox)



//create a floor
let planeGeometry = new THREE.PlaneGeometry( 10000, 10000, 32 )
let planeTexture = new THREE.TextureLoader().load('http://4.bp.blogspot.com/-Mz94fzjf9DM/UmpLfICutiI/AAAAAAAAEk8/8Uid3yVbuzc/s1600/Dirt+00+seamless.jpg')
let planeMaterial = new THREE.MeshBasicMaterial({map: planeTexture, side: THREE.DoubleSide })
let plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotateX( Math.PI / 2 )
plane.position.y = -100
scene.add(plane)

//light it up
let pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);

scene.add(pointLight);

let clock = new THREE.Clock

// movement - please calibrate these values
let xSpeed = 10;
let ySpeed = 10;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    let keyCode = event.which
    if (keyCode == 87) {
        cube.position.z += ySpeed;
    } else if (keyCode == 83) {
        cube.position.z -= ySpeed;
    } else if (keyCode == 68) {
        cube.position.x -= xSpeed;
    } else if (keyCode == 65) {
        cube.position.x += xSpeed;
    } else if (keyCode == 32) {
        cube.position.set(0, 0, 0);
    }
}

//render loop
function render(){
    renderer.render(scene, camera)

    //follow player
    camera.position.z = cube.position.z - 1000
    camera.position.x = cube.position.x
    camera.lookAt(cube.position)

    cube.rotation.y -= clock.getDelta()

    requestAnimationFrame(render)
}

render()
