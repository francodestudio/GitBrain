import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({alpha:true});
const loader = new GLTFLoader();
const dirLight = new THREE.DirectionalLight(0xffffff, 1);

renderer.setClearColor(0x000000, 0);
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );
camera.position.z = 5;


scene.add(new THREE.AmbientLight(0xffffff, 0.5));
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

loader.load ("/brain.glb", function(glft){
  const model = glft.scene
  model.scale.set(0.008, 0.008, 0.008);

  scene.add(model);

  function motion() {
  model.rotation.y += 0.01;
  renderer.render( scene, camera );

}
renderer.setAnimationLoop( motion);

},undefined, function (error){
  console.error(error);
});


