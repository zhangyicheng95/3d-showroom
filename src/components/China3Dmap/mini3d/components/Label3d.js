import {
  CSS3DObject,
  CSS3DRenderer,
  CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer';
import { scaleSize } from '../../config';
import { uuid } from '../utils';

export class Label3d {
  constructor({ scene, camera, time, sizes, canvas }) {
    this.scene = scene;
    this.camera = camera;
    this.time = time;
    this.sizes = sizes;
    this.canvas = canvas;
    this.parent = null;
    let { width, height } = this.sizes;
    let css3dRender = new CSS3DRenderer(); // 实例化css3d渲染器
    css3dRender.setSize(width, height); // 设置渲染器的尺寸
    css3dRender.domElement.style.position = 'absolute'; // 设置定位位置
    css3dRender.domElement.style.left = '0px';
    css3dRender.domElement.style.top = '0px';
    css3dRender.domElement.style.pointerEvents = 'none'; // 设置不能被选中
    css3dRender.domElement.className = 'label3d-' + uuid();
    this.canvas.parentNode.appendChild(css3dRender.domElement); // 插入到容器当中
    this.css3dRender = css3dRender;
    this.time.on('tick', () => {
      this.update();
    });
    this.sizes.on('resize', () => {
      this.resize();
    });
  }
  /**
   * 创建3d标签，默认用CSS3DObject，
   * @param {*} name  标签内容
   * @param {*} className 标签class
   * @param {*} isSprite  是否是CSS3DSprite   fasle|true
   * @returns
   */
  create(name = '', className = '', isSprite = false) {
    let tag = document.createElement('div');
    tag.innerHTML = name;
    tag.className = className;
    tag.style.visibility = 'hidden';
    tag.style.position = 'absolute';
    // 如果className不存在，用以下样式
    if (!className) {
      tag.style.padding = '1rem';
      tag.style.color = '#fff';
      tag.style.fontSize = '1.2rem';
      tag.style.textAlign = 'center';
      tag.style.background = 'rgba(0,0,0,0.6)';
      tag.style.borderRadius = '0.4rem';
    }
    let label = null;
    if (!isSprite) {
      label = new CSS3DObject(tag);
    } else {
      label = new CSS3DSprite(tag);
    }

    /**
     * 标签初始化并显示，
     * @param {*} name 显示内容
     * @param {*} point 显示坐标
     */
    label.init = (name, point) => {
      const name1 = name?.split('特别行政区');
      label.element.innerHTML =
        name?.indexOf('特别行政区') > -1 ? name1[0] + name1[1] : name;
      label.element.style.visibility = 'visible';
      label.position.copy({
        ...point,
        y:
          point.y *
          (scaleSize +
            0.05 +
            (point.y < 0
              ? Math.abs(point.y) > 17.8
                ? 0.13
                : 0.4
              : Math.abs(point.y) > 5
              ? -0.3
              : -1.5)),
        ...(name.indexOf('香港特别行政区') > -1 ? { x: point.x * 1.1 } : {}),
      });
    };
    /**
     * 隐藏
     */
    label.hide = () => {
      label.element.style.visibility = 'hidden';
    };
    /**
     * 隐藏
     */
    label.show = () => {
      label.element.style.visibility = 'visible';
    };
    label.setParent = (parent) => {
      this.parent = parent;
      parent.add(label);
    };
    label.remove = () => {
      this.parent.remove(label);
      // console.log(this.css3dRender.domElement, label.element);
      // this.css3dRender.domElement.parentNode.remove(label.element);
    };
    return label;
  }
  /**
   * 设置label的样式，
   * @param {*} label 标签对象
   * @param {*} scale 缩放值
   * @param {*} axis 旋转轴
   * @param {*} pointerEvents 鼠标事件控制 none | auto
   */
  setLabelStyle(label, scale = 0.1, axis = 'x', pointerEvents = 'none') {
    label.element.style.pointerEvents = pointerEvents;
    label.scale.set(scale, scale, scale); // 根据相机渲染范围控制HTML 3D标签尺寸
    label.rotation[axis] = Math.PI / 2; //控制HTML标签CSS3对象角度,
  }
  update() {
    this.css3dRender.render(this.scene, this.camera.instance);
  }
  destroy() {
    if (this.css3dRender) {
      let domElement = this.css3dRender.domElement;
      domElement.parentNode.removeChild(domElement);
    }
  }
  resize() {
    let { width, height } = this.sizes;
    this.css3dRender.setSize(width, height);
  }
}
