import * as THREE from 'three';

export function initScene() {
  /**
   * 场景
   */
  const scene = new THREE.Scene();
  // 加载背景纹理
  // const loader = new THREE.TextureLoader();
  // loader.load('/images/home-bg-4.png', function (texture) {
  //   scene.background = texture;
  // });

  return scene;
}
