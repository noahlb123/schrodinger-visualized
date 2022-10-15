//global vars
var cameraPosition = [0, 0, 0];
var origin = [-3, 0, -14];
resolution = 25;
stepSize = 6 / resolution;

//function to add vectors
function vAdd(v1, v2) {
  let v = [];
  if (v1.length != v2.length) {
    throw "vector lengths dont match"
  }
  for (let i = 0; i < v1.length; i++) {
    v.push(v1[i] + v2[i]);
  }
  return v;
}

document.addEventListener('DOMContentLoaded', function(event) {
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame;
    })();

    function animateScene() {
        requestAnimationFrame(animateScene);

        //cube.rotation.y += 0.5;
        //cube.rotation.x += 0.5;
        //cameraPosition[1] += 0.01;
        //camera.rotation.y += 0.001;
        camera.position.set(
          cameraPosition[0],
          cameraPosition[1],
          cameraPosition[2]
        );

        renderScene();
    }

    function createCube() {
        var cubeMaterials = [
            new THREE.MeshBasicMaterial({color:0x2173fd}),
            new THREE.MeshBasicMaterial({color:0xd5d918}),
            new THREE.MeshBasicMaterial({color:0xd2dbeb}),
            new THREE.MeshBasicMaterial({color:0xa3a3c6}),
            new THREE.MeshBasicMaterial({color:0xfe6b9f}),
            new THREE.MeshDepthMaterial({color:0x856af9})
        ];

        var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
        var cubeGeometry = new THREE.BoxGeometry(stepSize, stepSize, stepSize);

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        return cube;
    }

    function startScene(cube) {
        var canvas = document.getElementById('canvas');
        render = new THREE.WebGLRenderer();

        render.setClearColor(0x000000, 1);

        var canvasWidth = canvas.getAttribute('width');
        var canvasHeight = canvas.getAttribute('height');
        render.setSize(canvasWidth, canvasHeight);

        canvas.appendChild(render.domElement);

        scene = new THREE.Scene();
        var aspect = canvasWidth / canvasHeight;

        camera = new THREE.PerspectiveCamera(45, aspect);
        camera.position.set(0, 0, 0);
        camera.lookAt(scene.position);
        scene.add(camera);

        //[0] axis is real domain
        //[1] axis is real range
        //[2] axis is imaginary range
        for (let i = 0; i < cubes.length; i++) {
          let x = i * stepSize;
          let cube = cubes[i];
          //y = cos(x) - isin(x)
          let reComp = Math.cos(x);
          let imComp = -Math.sin(x);
          let position = vAdd([x, reComp, imComp], origin);
          cube.position.set(
            position[0],
            position[1],
            position[2]
          );
          scene.add(cube);
        }
    }

    function renderScene() {
        render.render(scene, camera);
    }

    //create the pixles
    cubes = [];
    for (let i = 0; i < resolution; i++) {
      cubes.push(createCube());
    }
    startScene(cubes);
    animateScene();
    renderScene();

});
