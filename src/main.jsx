import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({alpha:true});
const loader = new GLTFLoader();
const dirLight = new THREE.DirectionalLight(0xffffff, 1);

//renderer.setClearColor(0x000000, 0);
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

camera.position.set(0.5, 0, 0);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

loader.load("/GitBrain/brain.glb", function (gltf) {
  const model = gltf.scene;

  model.scale.set(0.008, 0.008, 0.008);

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  let brainMesh;

  model.traverse((child) => {
    if (child.isMesh) {
      brainMesh = child;
      child.material = new THREE.MeshStandardMaterial({
        color: 0xC8BBC9,
        wireframe: true
      });
    }
  });

  const positions = brainMesh.geometry.attributes.position;
  const nodeGeometry = new THREE.SphereGeometry(10, 10, 10);
  const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4});
  const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh.position.set(-50, 150, 250);
  model.add(nodeMesh);

  const nodeMesh2 = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh2.position.set(0.05, 100, 0.04);
  model.add(nodeMesh2);

  const nodeMesh3 = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh3.position.set(-20, 200, 20);
  model.add(nodeMesh3);

  const nodeMesh4 = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh4.position.set(-100, 300, 100);
  model.add(nodeMesh4);
  
  const nodeMesh5 = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh5.position.set(-150, 200, 200);
  model.add(nodeMesh5);

  const nodeMesh6 = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh6.position.set(-150, 200, 50);
  model.add(nodeMesh6);

  const nodeMesh7 = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh7.position.set(-150, 200, -100);
  model.add(nodeMesh7);

  const nodeMesh8 = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh8.position.set(60, 230, -50);
  model.add(nodeMesh8);
  
   const nodeMesh9 = new THREE.Mesh(nodeGeometry, nodeMaterial);
  nodeMesh9.position.set(60, 200, 150);
  model.add(nodeMesh9);
  


  scene.add(model);

  function motion() {
    model.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(motion);
});
