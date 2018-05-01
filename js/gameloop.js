// scene size
const WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight

//camera attributes
const VIEW_ANGLE = 45,
      ASPECT = WIDTH/HEIGHT,
      NEAR = 0.1,
      FAR = 10000

//create a WebGL renderer
var renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(WIDTH, HEIGHT)

document.body.appendChild(renderer.domElement)

//create scene
var scene = new THREE.Scene()

//create camera
var camera = new THREE.PerspectiveCamera(
                  VIEW_ANGLE,
                  ASPECT,
                  NEAR,
                  FAR )

//back dat camera up
camera.position.y = 260
camera.position.z = 500

scene.add(camera)
//create cube
var cubeGeometry = new THREE.CubeGeometry(100, 100, 100)
var cubeMaterial = new THREE.MeshLambertMaterial({color:0x1ec876})
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

cube.rotation.y = Math.PI * 45/180
scene.add(cube)

camera.lookAt(cube.position)

//create skybox
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000)
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.BackSide })
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)
scene.add(skybox)



//create a floor
var planeGeometry = new THREE.PlaneGeometry( 10000, 10000, 32 );
//import plane texture
var texture = new THREE.TextureLoader().load('http://4.bp.blogspot.com/-Mz94fzjf9DM/UmpLfICutiI/AAAAAAAAEk8/8Uid3yVbuzc/s1600/Dirt+00+seamless.jpg');
var planeMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
let plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotateX( Math.PI / 2 )
plane.position.y = -100
scene.add(plane)

//light it up
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);

scene.add(pointLight);

var clock = new THREE.Clock


//render loop
function render(){
    renderer.render(scene, camera)

    cube.rotation.y -= clock.getDelta()

    requestAnimationFrame(render)
}

render()
