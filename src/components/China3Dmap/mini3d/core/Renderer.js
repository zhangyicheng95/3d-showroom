import { WebGLRenderer } from 'three';
import { scaleSize } from '../../config';

export class Renderer {
  constructor({ canvas, sizes, scene, camera, postprocessing, composer }) {
    this.canvas = canvas;
    this.sizes = sizes;
    this.scene = scene;
    this.camera = camera;
    this.postprocessing = postprocessing;
    this.composer = composer;
    this.setInstance();
  }
  setInstance() {
    this.instance = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: this.canvas,
    });

    this.instance.setSize(this?.sizes?.width, this?.sizes?.height * scaleSize);
    this.instance.setPixelRatio(this.sizes?.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes?.width, this.sizes?.height * scaleSize);
    this.instance.setPixelRatio(this.sizes?.pixelRatio);
  }
  update() {
    if (this.postprocessing && this.composer) {
      this.composer.render();
    } else {
      this.instance.render(this.scene, this.camera.instance);
    }
  }
  destroy() {
    this.instance.dispose();
    this.instance.forceContextLoss();
  }
}
