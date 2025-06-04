import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ArtGallery from '../ArtGallery';

const HomePage: React.FC<any> = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const cleanup = () => {
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
    if (controlsRef.current) {
      controlsRef.current.dispose();
    }
    window.removeEventListener('resize', onWindowResize);
  };

  useEffect(() => {
    if (!domRef.current) return;
    init();
    return cleanup;
  }, []);

  const loadModel = async () => {
    if (!sceneRef.current) return;

    const manager = new THREE.LoadingManager();
    const mtlLoader = new MTLLoader(manager);
    mtlLoader.setCrossOrigin('anonymous');
    
    // 根据环境选择不同的基础URL
    const baseUrl = 'https://lwyc-1252013544.cos.ap-beijing.myqcloud.com/3D/wgn/';

    try {
      const materials = await mtlLoader.loadAsync(`${baseUrl}吴冠南_牵幽上九霄_梅瓶_300件合格.mtl`);
      materials.preload();

      const objLoader = new OBJLoader(manager);
      objLoader.setCrossOrigin('anonymous');
      objLoader.setMaterials(materials);

      const object = await objLoader.loadAsync(`${baseUrl}吴冠南_牵幽上九霄_梅瓶_300件合格.obj`);
      object.position.y = 0;
      object.scale.setScalar(0.01);

      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeVertexNormals();
          child.frustumCulled = true;
          if (child.material) {
            child.material.side = THREE.DoubleSide;
          }
        }
      });

      sceneRef.current.add(object);
    } catch (error) {
      console.error('Error loading model:', error);
    }
  };

  function init() {
    if (!domRef.current) return;

    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(0xaaaaaa);

    const aspect = domRef.current.clientWidth / domRef.current.clientHeight;
    cameraRef.current = new THREE.PerspectiveCamera(45, aspect, 0.01, 40);
    cameraRef.current.position.z = 8.33;

    const ambientLight = new THREE.AmbientLight(0xffffff, 3.0);
    const pointLight = new THREE.PointLight(0xffffff, 20);
    pointLight.position.set(0, 0, 8.33);

    const pointLight2 = new THREE.PointLight(0xffffff, 10);
    pointLight2.position.set(8.33, 0, 0);

    sceneRef.current.add(ambientLight, pointLight, pointLight2);

    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    rendererRef.current.setSize(domRef.current.clientWidth, domRef.current.clientHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    domRef.current.appendChild(rendererRef.current.domElement);

    if (cameraRef.current && rendererRef.current) {
      controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
      controlsRef.current.minDistance = 0.05;
      controlsRef.current.maxDistance = 50;
      controlsRef.current.enableDamping = true;
    }

    loadModel();

    window.addEventListener('resize', onWindowResize);
    animate();
  }

  function onWindowResize() {
    if (!domRef.current || !cameraRef.current || !rendererRef.current) return;

    const width = domRef.current.clientWidth;
    const height = domRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }

  function animate() {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    requestAnimationFrame(animate);

    if (sceneRef.current) {
      sceneRef.current.rotation.y += 0.005;
    }

    if (controlsRef.current) {
      controlsRef.current.update();
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }

  return (
    <div className={`flex-box-column ${styles.homePage}`} ref={domRef}>

    </div>
  );
};

export default HomePage;
