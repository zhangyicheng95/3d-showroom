import labelArrow from '@/assets/texture/label-arrow.png';
import eventBus from '@/hooks/eventBus';
import gsap from 'gsap';
import {
  AdditiveBlending,
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NearestFilter,
  PlaneGeometry,
  PointLight,
  PointsMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';
import { InteractionManager } from 'three.interactive';
import { initStatus } from './config';
import { ChildMap } from './map-china-child';
import { Assets } from './map/assets';
import badgesData from './map/badgesData';
import { DiffuseShader } from './map/DiffuseShader';
import { ExtrudeMap } from './map/extrudeMap';
import provincesData from './map/provincesData';
import { Reflector } from './map/Reflector.js';
import scatterData from './map/scatter';
import {
  FlyLine,
  GradientShader,
  Label3d,
  Mini3d,
  Particles,
  PathLine,
  Plane,
  ToastLoading,
  createHistory,
  getBoundBox,
} from './mini3d';

// 排序
function sortByValue(data) {
  data.sort((a, b) => b.value - a.value);
  return data;
}
// 资源加载
export class World extends Mini3d {
  constructor(canvas, config) {
    super(canvas, config);
    // 中心坐标
    this.pointCenter = [108.55, 34.32];
    // 飞线的中心坐标
    this.flyLineCenter = [108.948024, 34.263161];
    // 默认凸起的省份
    this.defaultUpCity = 610000;
    this.depth = 5;
    this.flyData = config?.flyData || [];
    // 创建雾化效果
    // this.scene.fog = new Fog('rgba(0, 150, 255, 1)', 1, 500);
    this.camera.instance.position.set(
      0.00002366776247217723,
      225.1025284992283,
      0.0002238648924037432,
    );
    this.camera.instance.near = 0.1;
    this.camera.instance.far = 100000;
    this.camera.instance.updateProjectionMatrix();
    // 交互管理器
    this.interactionManager = new InteractionManager(
      this?.renderer.instance,
      this?.camera.instance,
      this?.canvas,
    );
    this?.initSetting();
    this?.initEnvironment();
    this.toastLoading = new ToastLoading();
    this.history = new createHistory();
    this.history.push({ name: '中国' });
    this.returnBtn = document.querySelector('.return-btn');
    this.nanHaiImg = document.querySelector('.nanhai');
    this.clicked = false; // 是否已经点击
    this.currentScene = 'mainScene'; // 当前场景 mainScene | childScene
    this.assets = new Assets(() => {
      // 场景组
      this.sceneGroup = new Group();
      this.mainSceneGroup = new Group();
      this.childSceneGroup = new Group();
      this.labelGroup = new Group();
      this.labelGroup.visible = initStatus.bar;
      this.gqGroup = new Group(); // 光圈组
      this.provinceNameGroup = new Group();
      this.badgeGroup = new Group();
      this.label3d = new Label3d(this);
      this?.mainSceneGroup.rotateX(-Math.PI / 2);

      this?.mainSceneGroup.add(
        this?.labelGroup,
        this?.gqGroup,
        this?.provinceNameGroup,
        this?.badgeGroup,
      );
      this?.sceneGroup.add(this?.mainSceneGroup, this?.childSceneGroup);
      this?.scene.add(this?.sceneGroup);
      // 创建底图 局部亮光
      // this?.createFloor();
      // 背景 旋转边框
      this?.createRotateBorder();
      // 处理地图
      this?.createModel();
      // 添加事件
      this?.addEvent();
      // 创建柱状图
      this?.createBar();
      // 创建粒子
      this?.createParticles();
      // 创建飞线
      this?.createFlyLine();
      // 创建散点图
      this?.createScatter();
      // 创建标牌
      this?.createBadgeLabel();
      // 创建路径动画
      this?.createPathAnimate();
      // 创建描边动画
      this?.createStorke();
      // if (import.meta.env.MODE === "staging") {
      // this?.createWatermark()
      // }
      // 创建时间线
      let tl = gsap.timeline();
      // 相机动画
      tl.addLabel('focusMap', 3.5);
      tl.addLabel('focusMapOpacity', 4.0);
      tl.addLabel('bar', 5.0);
      tl.add(
        gsap.to(this?.camera.instance.position, {
          duration: 2.5,
          delay: 2,
          x: 3.134497983573052,
          y: 126.8312346165316,
          z: 78.77649752477839,
          ease: 'circ.out',
          onComplete: () => {
            this?.camera.controls.saveState();
          },
        }),
      );

      tl.add(
        gsap.to(this?.quan?.rotation, {
          duration: 5,
          z: -2 * Math.PI,
        }),
        '-=2',
      );

      tl.add(
        gsap.to(this?.focusMapGroup.position, {
          duration: 1,
          x: 0,
          y: 0,
          z: 0,
        }),
        'focusMap',
      );
      tl.add(
        gsap.to(this?.focusMapGroup.scale, {
          duration: 1,
          x: 1,
          y: 1,
          z: 1,
          ease: 'circ.out',
        }),
        'focusMap',
      );

      this?.provinceMesh.mapGroup.traverse((obj) => {
        if (obj.isMesh) {
          tl.add(
            gsap.to(obj.material[0], {
              duration: 1,
              opacity: 1,
              ease: 'circ.out',
            }),
            'focusMapOpacity',
          );
          tl.add(
            gsap.to(obj.position, {
              duration: 1,
              x: 0,
              y: 0,
              z: 0,
              ease: 'circ.out',
            }),
            'focusMapOpacity',
          );
        }
      });
      tl.add(
        gsap.to(this?.focusMapSideMaterial, {
          duration: 1,
          opacity: 1,
          ease: 'circ.out',
          onComplete: () => {
            this?.createMirror();
            // 添加网格
            this?.createGridRipple();
          },
        }),
        'focusMapOpacity',
      );

      tl.add(
        gsap.to(this?.provinceLineMaterial, {
          duration: 0.5,
          delay: 0.3,
          opacity: 1,
        }),
        'focusMapOpacity',
      );

      tl.add(
        gsap.to(this?.rotateBorder1?.scale, {
          delay: 0.3,
          duration: 1,
          x: 1,
          y: 1,
          z: 1,
          ease: 'circ.out',
        }),
        'focusMapOpacity',
      );
      tl.add(
        gsap.to(this?.rotateBorder2?.scale, {
          duration: 1,
          delay: 0.5,
          x: 1,
          y: 1,
          z: 1,
          ease: 'circ.out',
        }),
        'focusMapOpacity',
      );
      this?.allBar.map((item, index) => {
        tl.add(
          gsap.to(item.scale, {
            duration: 1,
            delay: 0.05 * index,
            x: 1,
            y: 1,
            z: 1,
            ease: 'circ.out',
          }),
          'bar',
        );
      });
      this?.allBarMaterial.map((item, index) => {
        tl.add(
          gsap.to(item, {
            duration: 0.5,
            delay: 0.05 * index,
            opacity: 1,
            ease: 'circ.out',
          }),
          'bar',
        );
      });
      this?.allProvinceLabel.map((item, index) => {
        let element = item.element.querySelector(
          '.provinces-label-style02-wrap',
        );
        let number = item.element.querySelector('.number .value');
        let numberVal = Number(number.innerText);
        let numberAnimate = {
          score: 0,
        };
        tl.add(
          gsap.to(element, {
            duration: 0.5,
            delay: 0.05 * index,
            translateY: 0,
            opacity: 1,
            ease: 'circ.out',
          }),
          'bar',
        );
        let text = gsap.to(numberAnimate, {
          duration: 0.5,
          delay: 0.05 * index,
          score: numberVal,
          onUpdate: showScore,
        });
        function showScore() {
          number.innerText = numberAnimate.score.toFixed(0);
        }
        tl.add(text, 'bar');
      });
      this?.allProvinceNameLabel.map((item, index) => {
        let element = item.element.querySelector('.provinces-name-label-wrap');

        tl.add(
          gsap.to(element, {
            duration: 0.5,
            delay: 0.05 * index,
            translateY: 0,
            opacity: 1,
            ease: 'circ.out',
          }),
          'bar',
        );
      });
      this?.allGuangquan.map((item, index) => {
        tl.add(
          gsap.to(item.children[0].scale, {
            duration: 0.5,
            delay: 0.05 * index,
            x: 1,
            y: 1,
            z: 1,
            ease: 'circ.out',
          }),
          'bar',
        );
        tl.add(
          gsap.to(item.children[1].scale, {
            duration: 0.5,
            delay: 0.05 * index,
            x: 1,
            y: 1,
            z: 1,
            ease: 'circ.out',
          }),
          'bar',
        );
      });
    });
  }
  // 初始化环境灯光
  initEnvironment() {
    // 自然光
    let sun = new AmbientLight('#00A2FF', 1);
    this?.scene.add(sun);
    // 方向光
    let directionalLight = new DirectionalLight(0xffffff, 4);
    directionalLight.intensity = 4;
    directionalLight.position.set(1000, 20, -20);
    directionalLight.target.position.set(72, 7, 0);
    // directionalLight.position.set(3000, 200, 20);
    // directionalLight.castShadow = true;
    // directionalLight.shadow.radius = 20;
    // directionalLight.shadow.mapSize.width = 1024;
    // directionalLight.shadow.mapSize.height = 1024;
    this?.scene.add(directionalLight);
    // 点光源1
    this?.createPointLight({
      intensity: 260,
      color: '#ffffff',
      distance: 1000,
      show: true,
      x: -54,
      y: 19,
      z: -24,
    });
    // 点光源2
    this?.createPointLight({
      intensity: 200,
      color: '#ffffff',
      distance: 1000,
      show: true,
      x: -60,
      y: 16,
      z: -3,
    });
    // 点光源3
    this?.createPointLight({
      intensity: 260,
      color: '#ffffff',
      distance: 1000,
      show: true,
      x: -17,
      y: 19,
      z: -16,
    });
    // 点光源4
    this?.createPointLight({
      intensity: 260,
      color: '#ffffff',
      distance: 1000,
      show: true,
      x: 20,
      y: 19,
      z: -40,
    });
  }
  // 创建灯光函数
  createPointLight(pointParams) {
    // 点光源
    const pointLight = new PointLight(
      pointParams.color,
      pointParams.intensity,
      pointParams.distance,
      1,
    );
    pointLight.position.set(pointParams.x, pointParams.y, pointParams.z);
    this?.scene.add(pointLight);
  }
  // 设置debug ,stats,axes
  initSetting() {
    this?.renderer.resize();
  }
  // 模型渲染
  createModel() {
    let mapGroup = new Group();
    mapGroup.name = 'chinaMapGroup';
    let focusMapGroup = new Group();
    this.focusMapGroup = focusMapGroup;
    // 地图
    let { province } = this?.createProvince();
    this.provinceMesh = province;
    province.setParent(focusMapGroup);

    focusMapGroup.position.set(0, 0, -5);
    focusMapGroup.scale.set(1, 1, 0);

    mapGroup.add(focusMapGroup);
    mapGroup.position.set(0, 0.2, 0);
    this?.mainSceneGroup.add(mapGroup);
  }
  // 创建省份
  createProvince() {
    let mapJsonData = this?.assets.instance.getResource('china');
    let topNormal = this?.assets.instance.getResource('topNormal4');

    topNormal.wrapS = topNormal.wrapT = RepeatWrapping;

    //省份边界
    this.provinceLineMaterial = new LineBasicMaterial({
      color: 0x2bc4dc,
      opacity: 1,
      transparent: true,
      fog: false,
    });
    let [topMaterial, sideMaterial] = this?.createProvinceMaterial();
    // let faceMaterial = new MeshStandardMaterial({
    //   // color: 'rgba(17, 62, 198, 1)',
    //   map: topNormal,
    //   transparent: true,
    //   normalMap: topNormal,
    //   opacity: 0,
    // });

    this.focusMapTopMaterial = topMaterial;
    this.focusMapSideMaterial = sideMaterial;
    let province = new ExtrudeMap(this, {
      center: this?.pointCenter,
      position: new Vector3(0, 0, 0.06),
      data: mapJsonData,
      depth: this?.depth,
      topFaceMaterial: topMaterial,
      sideMaterial: sideMaterial,
      lineMaterial: this?.provinceLineMaterial,
      renderOrder: 9,
    });
    this?.time.on('tick', () => {
      sideMaterial.map.offset.y += 0.002;
    });

    let { boxSize, box3 } = getBoundBox(province.mapGroup);

    this.eventElement = [];
    province.mapGroup.children.map((group, index) => {
      group.children.map((mesh) => {
        if (mesh.type === 'Mesh') {
          this?.eventElement.push(mesh);
          if (mesh?.userData?.adcode === this.defaultUpCity) {
            // 中心位置默认凸起
            gsap.to(mesh.scale, {
              duration: 0.3,
              z: 1.8,
            });
          }
          this?.calcUv2(
            mesh.geometry,
            boxSize.x,
            boxSize.y,
            box3.min.x,
            box3.min.y,
          );
        }
      });
    });

    return {
      province,
    };
  }
  // 添加事件
  addEvent() {
    let objectsHover = [];
    // 鼠标事件传递函数
    const handleMouseOver = (event) => {
      eventBus.emit('canvas-mouseover', event);
    };
    const reset = (mesh) => {
      gsap.to(mesh.scale, {
        duration: 0.3,
        z: 1,
        onComplete: () => {
          mesh.traverse((obj) => {
            if (obj.isMesh) {
              obj.material[0].emissive.setHex(
                mesh.userData.materialEmissiveHex,
              );
              obj.material[0].emissiveIntensity = 1;
              obj.renderOrder = 9;
            }
          });
        },
      });
      this?.setBarMove(mesh.userData.adcode, 'down');
      // this?.setGQMove(mesh.userData.adcode, 'down');
      // this?.setLabelMove(mesh.userData.adcode, 'down');
      this?.setScatterMove(mesh.userData.adcode, 'down');
    };
    const move = (mesh) => {
      gsap.to(mesh.scale, {
        duration: 0.3,
        z: 1.5,
      });
      this?.setBarMove(mesh.userData.adcode);
      // this?.setGQMove(mesh.userData.adcode);
      // this?.setLabelMove(mesh.userData.adcode);
      this?.setScatterMove(mesh.userData.adcode);

      mesh.traverse((obj) => {
        if (obj.isMesh) {
          obj.material[0].emissive.setHex(0x0b112d);
          obj.material[0].emissiveIntensity = 1.5;
          obj.renderOrder = 21;
        }
      });
    };

    // 循环添加事件
    this?.eventElement.map((mesh) => {
      this?.interactionManager.add(mesh);
      mesh.addEventListener('mousedown', (event) => {
        if (this?.clicked || !this?.mainSceneGroup.visible) return false;
        this.clicked = true;
        let userData = event.target.parent.userData;
        this?.history.push(userData);
        this?.loadChildMap(userData);
        handleMouseOver({
          type: 'mousedown',
          mesh,
        });
      });
      mesh.addEventListener('mouseup', (ev) => {
        this.clicked = false;
      });
      mesh.addEventListener('mouseover', (event) => {
        if (this?.mainSceneGroup.visible) {
          document.body.style.cursor = 'pointer';
        }
        handleMouseOver({
          type: 'mouseover',
          mesh,
        });
        if (mesh?.userData?.adcode === this.defaultUpCity) {
          return;
        }
        if (!objectsHover.includes(event.target.parent)) {
          objectsHover.push(event.target.parent);
        }
        move(event.target.parent);
      });
      mesh.addEventListener('mouseout', (event) => {
        document.body.style.cursor = 'default';
        handleMouseOver({
          type: 'mouseout',
          mesh,
        });
        if (mesh?.userData?.adcode === this.defaultUpCity) {
          return;
        }
        objectsHover = objectsHover.filter(
          (n) => n.userData.name !== event.target.parent.userData.name,
        );
        if (objectsHover.length > 0) {
          const mesh = objectsHover[objectsHover.length - 1];
        }
        reset(event.target.parent);
      });
    });
  }
  /**
   * 设置柱状图移动
   * @param {*} name
   * @param {*} type up-上移  down-下移
   */
  setBarMove(adcode, type = 'up') {
    this?.allBar.map((barGroup) => {
      if (barGroup.userData.adcode === adcode) {
        gsap.to(barGroup.position, {
          duration: 0.3,
          z:
            type === 'up'
              ? barGroup.userData.position[2] + this?.depth / 2 + 0.3
              : barGroup.userData.position[2],
        });
      }
    });
  }
  /**
   * 设置光圈移动
   * @param {*} name
   * @param {*} type up-上移  down-下移
   */
  setGQMove(adcode, type = 'up') {
    this?.allGuangquan.map((group) => {
      if (group?.userData?.adcode === adcode) {
        gsap.to(group.position, {
          duration: 0.3,
          z:
            this?.flyLineFocusGroup.userData.adcode === adcode
              ? group.userData.position[2] + this?.depth / 2 + 0.3
              : type === 'up'
              ? group.userData.position[2] + this?.depth / 2 + 0.3
              : group.userData.position[2],
        });
      }
    });
    if (this?.flyLineFocusGroup.userData.adcode === adcode) {
      gsap.to(this?.flyLineFocusGroup.position, {
        duration: 0.3,
        y: this?.flyLineFocusGroup.userData.position[1] + this?.depth / 2 + 0.3,
        // type === 'up'
        //   ? this?.flyLineFocusGroup.userData.position[1] +
        //     this?.depth / 2 +
        //     0.3
        //   : this?.flyLineFocusGroup.userData.position[1],
      });
    }
  }
  // 设置标签移动
  setLabelMove(adcode, type = 'up') {
    [...this?.allProvinceLabel, ...this?.allProvinceNameLabel].map((label) => {
      if (label.userData.adcode === adcode) {
        gsap.to(label.position, {
          duration: 0.3,
          z:
            type === 'up'
              ? label.userData.position[2] + this?.depth / 2 + 0.3
              : label.userData.position[2],
        });
      }
    });
  }
  /**
   * 设置散点图移动
   * @param {*} adcode
   * @param {*} type
   */
  setScatterMove(adcode, type = 'up') {
    this?.scatterGroup.children.map((sprite) => {
      if (sprite.userData.adcode === adcode) {
        gsap.to(sprite.position, {
          duration: 0.3,
          z:
            type === 'up'
              ? sprite.userData.position[2] + this?.depth / 2 + 0.3
              : sprite.userData.position[2],
        });
      }
    });
  }
  // 加载子地图
  loadChildMap(userData) {
    if (userData.childrenNum === 0) {
      return;
    }
    this?.toastLoading.show();
    this?.getChildMapData(userData, (data) => {
      this.returnBtn.style.display = 'block';
      this.nanHaiImg.style.display = 'none';
      this?.childMap && this?.childMap.destroy();
      this.childMap = new ChildMap(this, {
        adcode: userData.adcode,
        center: userData.center,
        centroid: userData.centroid,
        childrenNum: userData.childrenNum,
        mapData: data,
        parentBoxSize: [129.00074005126953, (126.23402404785156 * 3) / 4],
      });
      this?.childSceneGroup.add(this?.childMap.instance);
      this?.setMainMapVisible(false);
      this?.toastLoading.hide();

      this?.camera.controls.reset();
      this.currentScene = 'childScene';
      this?.config?.setEnable?.(false);
    });
  }
  // 获取子地图数据
  getChildMapData(userData, callback) {
    if (userData.childrenNum === 0) {
      return;
    }
    let url = `/m10/geoJson/${userData.adcode}.json`;
    fetch(url)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        callback && callback(res);
      });
  }
  // 隐藏显示主地图及标签
  setMainMapVisible(bool) {
    this.scene.getObjectByName('chinaMapGroup').visible = bool;
    this.mainSceneGroup.visible = bool;
    this?.setLabelVisible('provinceNameGroup', bool);
    //this?.setLabelVisible("labelGroup", bool)
    if (bool === false) {
      this?.setLabelVisible('badgeGroup', bool);
    }
  }
  // 返回上一级
  goBack() {
    this?.history.undo();
    if (!this?.history.getIndex()) {
      this.currentScene = 'mainScene';
      this.returnBtn.style.display = 'none';
      this.nanHaiImg.style.display = 'block';
      this?.childMap && this?.childMap.destroy();
      this.childMap = null;
      this?.setMainMapVisible(true);
      //this?.setLabelVisible("labelGroup", true)
    } else {
      let userData = this?.history.present;
      this?.loadChildMap(userData);
    }
    this?.camera.controls.reset();
  }
  calcUv2(geometry, width, height, minX, minY) {
    const positionAttribute = geometry.attributes.position;
    const uvAttribute = geometry.attributes.uv;

    const count = geometry.groups[0].count;
    for (let i = 0; i < count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      const u = (x - minX) / width;
      const v = (y - minY) / height;

      uvAttribute.setXY(i, u, v);
    }

    uvAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  }
  // 创建每个省份的纹理材质
  createProvinceMaterial() {
    let topNormal = this?.assets.instance.getResource('topNormal');
    let chinaMap = this?.assets.instance.getResource('chinaMap');
    topNormal.wrapS = topNormal.wrapT = RepeatWrapping;
    let topMaterial = new MeshStandardMaterial({
      // color: 'rgba(17, 62, 198, 1)',
      // color: 0x061e47,
      color: '#0062FF',
      // color: '#0099dd',
      emissive: '#000000',
      // intensity:1,
      // alphaMap: chinaMap,
      map: topNormal,
      transparent: true,
      normalMap: topNormal,
      opacity: 0,
    });
    let sideMap = this?.assets.instance.getResource('side');
    sideMap.wrapS = RepeatWrapping;
    sideMap.wrapT = RepeatWrapping;
    sideMap.repeat.set(1, 0.2);
    sideMap.offset.y += 0.01;
    let sideMaterial = new MeshStandardMaterial({
      color: 0x62c3d1,
      // color: 0xffffff,
      map: sideMap,
      fog: false,
      transparent: true,
      opacity: 0,
      side: DoubleSide,
    });

    sideMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        uColor1: { value: new Color(0x30b3ff) },
        uColor2: { value: new Color(0x30b3ff) },
      };
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `
        attribute float alpha;
        varying vec3 vPosition;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vPosition = position;
      `,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        varying vec3 vPosition;
        varying float vAlpha;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
      
        void main() {
      `,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        /* glsl */ `
      #ifdef OPAQUE
      diffuseColor.a = 1.0;
      #endif
      
      // https://github.com/mrdoob/three.js/pull/22425
      #ifdef USE_TRANSMISSION
      diffuseColor.a *= transmissionAlpha + 0.1;
      #endif
      vec3 gradient = mix(uColor1, uColor2, vPosition.z/1.2);
      
      outgoingLight = outgoingLight*gradient;
      
      
      gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
      `,
      );
    };
    return [topMaterial, sideMaterial];
  }
  // 创建柱状图
  createBar() {
    let self = this;
    let data = sortByValue(provincesData); //.filter((item, index) => index < 15);
    const barGroup = new Group();
    barGroup.visible = initStatus.bar;
    this.barGroup = barGroup;

    const factor = 7;
    const height = 4.0 * factor;
    const max = data[0].value;

    this.allBar = [];
    this.allBarMaterial = [];
    this.allGuangquan = [];
    this.allProvinceLabel = [];
    this.allProvinceNameLabel = [];
    data.map((item, index) => {
      // 网格
      let geoHeight = height * (item.value / max);
      // 材质
      let material = new MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthTest: false,
        fog: false,
      });
      // 设置渐变材质

      new GradientShader(material, {
        uColor1: index < 3 ? 0xfbdf88 : 0x50bbfe,
        uColor2: index < 3 ? 0xfbdf88 : 0x50bbfe,
        size: geoHeight,
        dir: 'y',
      });
      const geo = new BoxGeometry(0.05 * factor, 0.05 * factor, geoHeight);
      // 上移
      geo.translate(0, 0, geoHeight / 2);
      const mesh = new Mesh(geo, material);
      mesh.renderOrder = 22;
      let areaBar = mesh;
      let [x, y] = this?.geoProjection(item.centroid);
      areaBar.position.set(x, -y, this?.depth + 0.46);
      areaBar.scale.set(1, 1, 0);
      areaBar.userData.name = item.name;
      areaBar.userData.adcode = item.adcode;
      areaBar.userData.position = [x, -y, this?.depth + 0.46];

      let guangQuan = this?.createQuan();
      guangQuan.position.set(x, -y, this?.depth + 0.46);
      guangQuan.userData.name = item.name;
      guangQuan.userData.adcode = item.adcode;
      guangQuan.userData.position = [x, -y, this?.depth + 0.46];
      this?.gqGroup.add(guangQuan);
      let hg = this?.createHUIGUANG(geoHeight, index < 3 ? 0xfffef4 : 0x77fbf5);
      areaBar.add(...hg);

      barGroup.add(areaBar);
      let barLabel = labelStyle04(
        item,
        index,
        new Vector3(x, -y, this?.depth + 0.9 + geoHeight),
      );
      let nameLabel = labelNameStyle(
        item,
        index,
        new Vector3(x, -y - 1.5, this?.depth + 0.4),
      );
      this?.allBar.push(areaBar);
      this?.allBarMaterial.push(material);
      this?.allGuangquan.push(guangQuan);
      this?.allProvinceLabel.push(barLabel);
      this?.allProvinceNameLabel.push(nameLabel);
    });

    this?.mainSceneGroup.add(barGroup);
    // 人口标签
    function labelStyle04(data, index, position) {
      let label = self.label3d.create('', 'provinces-label-style02', true);
      label.init(
        `<div class="provinces-label-style02 ${index < 3 ? 'yellow' : ''}">
      <div class="provinces-label-style02-wrap">
        <div class="number"><span class="value">${
          data.value
        }</span><span class="unit">万人</span></div>
        <div class="no">${index + 1}</div>
      </div>
    </div>`,
        position,
      );
      self.label3d.setLabelStyle(label, 0.05, 'x');
      label.setParent(self.labelGroup);
      label.userData.adcode = data.adcode;
      label.userData.position = [position.x, position.y, position.z];
      return label;
    }
    // 省份城市标签
    function labelNameStyle(data, index, position) {
      let label = self.label3d.create('', 'provinces-name-label', true);
      label.init(
        `<div class="provinces-name-label"><div class="provinces-name-label-wrap">${data.name}</div></div>`,
        position,
      );
      self.label3d.setLabelStyle(label, 0.08, 'x');
      label.setParent(self.provinceNameGroup);
      label.userData.adcode = data.adcode;
      label.userData.position = [position.x, position.y, position.z];
      return label;
    }
  }
  createHUIGUANG(h, color) {
    let geometry = new PlaneGeometry(1.5, h);
    geometry.translate(0, h / 2, 0);
    const texture = this?.assets.instance.getResource('huiguang');
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    let material = new MeshBasicMaterial({
      color: color,
      map: texture,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,

      side: DoubleSide,
      blending: AdditiveBlending,
    });
    let mesh = new Mesh(geometry, material);
    mesh.renderOrder = 23;
    mesh.rotateX(Math.PI / 2);
    let mesh2 = mesh.clone();
    let mesh3 = mesh.clone();
    mesh2.rotateY((Math.PI / 180) * 60);
    mesh3.rotateY((Math.PI / 180) * 120);
    return [mesh, mesh2, mesh3];
  }
  createQuan() {
    const guangquan1 = this?.assets.instance.getResource('guangquan1');
    const guangquan2 = this?.assets.instance.getResource('guangquan2');
    let geometry = new PlaneGeometry(2, 2);

    let material1 = new MeshBasicMaterial({
      color: 0xffffff,
      map: guangquan1,
      alphaMap: guangquan1,
      opacity: 1,
      transparent: true,
      depthTest: false,
      fog: false,
      blending: AdditiveBlending,
    });
    let material2 = new MeshBasicMaterial({
      color: 0xffffff,
      map: guangquan2,
      alphaMap: guangquan2,
      opacity: 1,
      transparent: true,
      depthTest: false,
      fog: false,
      blending: AdditiveBlending,
    });
    let mesh1 = new Mesh(geometry, material1);
    let mesh2 = new Mesh(geometry, material2);
    mesh1.renderOrder = 24;
    mesh2.renderOrder = 24;

    mesh2.position.z -= 0.001;
    mesh1.scale.set(0, 0, 0);
    mesh2.scale.set(0, 0, 0);
    this.quanGroup = new Group();
    this?.quanGroup.add(mesh1, mesh2);

    this?.time.on('tick', (delta) => {
      mesh1.rotation.z += delta * 2;
    });
    return this?.quanGroup;
  }
  /**
   * 设置css3d标签的隐藏显示
   * @param {*} labelGroup
   * @param {*} bool
   */
  setLabelVisible(labelGroup = 'labelGroup', bool) {
    this[labelGroup].visible = bool;
    this[labelGroup].children.map((label) => {
      bool ? label.show() : label.hide();
    });
  }
  // 每个地点的圆圈
  createFloor() {
    let geometry = new PlaneGeometry(200, 200);
    const texture = this?.assets.instance.getResource('gaoguang1');
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, 1);
    let material = new MeshBasicMaterial({
      map: texture,
      opacity: 1,
      transparent: true,
      blending: AdditiveBlending,
    });
    let mesh = new Mesh(geometry, material);
    mesh.rotateX(-Math.PI / 2);
    mesh.position.set(0, 0.05, 0);
    this?.scene.add(mesh);

    const quanTexture = this?.assets.instance.getResource('quan');

    let quan = new Mesh(
      new PlaneGeometry(250, 250),
      new MeshBasicMaterial({
        map: quanTexture,
        opacity: 1,
        transparent: true,
        blending: AdditiveBlending,
        depthTest: false,
      }),
    );
    quan.rotateX(-Math.PI / 2);
    quan.position.set(0, this?.depth + 2.05, 0);
    this.quan = quan;
    this?.scene.add(quan);
  }
  // 背景网格图
  createGridRipple() {
    let geometry = new PlaneGeometry(300, 300);
    const texture = this?.assets.instance.getResource('grid');
    const alphaMap = this?.assets.instance.getResource('gridBlack');
    texture.wrapS =
      texture.wrapT =
      alphaMap.wrapS =
      alphaMap.wrapT =
        RepeatWrapping;
    texture.repeat.set(40, 40);
    alphaMap.repeat.set(40, 40);
    let material = new MeshBasicMaterial({
      map: texture,
      alphaMap: alphaMap,
      blending: AdditiveBlending,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });

    let mesh = new Mesh(geometry, material);
    mesh.rotateX(-Math.PI / 2);
    let [x, y] = this?.geoProjection(this?.pointCenter);
    mesh.position.set(x, -y, 0.01);
    const mesh2 = mesh.clone();
    mesh2.material = material.clone();
    mesh2.material.opacity = 0.1;
    this?.scene.add(mesh, mesh2);
    new DiffuseShader({
      material,
      time: this?.time,
      size: 300,
      diffuseColor: 0x079fe6,
      diffuseSpeed: 30,
      diffuseWidth: 20,
      diffuseDir: 2.0,
    });
  }
  // 粒子雪花
  createMirror() {
    const geometry = new PlaneGeometry(200, 200);
    const groundMirror = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: this?.sizes.width,
      textureHeight: this?.sizes.height,
      color: 0xb5b5b5,
      multisample: 1,
    });
    groundMirror.material.transparent = true;
    groundMirror.material.opacity = 0.2;
    groundMirror.position.y = -0.01;
    groundMirror.rotateX(-Math.PI / 2);
    this.groundMirror = groundMirror;
    this.groundMirror.visible = initStatus.mirror;
    this?.scene.add(groundMirror);
  }
  // 背景图的旋转框
  createRotateBorder() {
    let max = 75;
    let rotationBorder1 = this?.assets.instance.getResource('rotationBorder1');
    let rotationBorder2 = this?.assets.instance.getResource('rotationBorder2');
    let plane01 = new Plane(this, {
      width: max * 1.178,
      needRotate: true,
      rotateSpeed: 0.001,
      material: new MeshBasicMaterial({
        map: rotationBorder1,
        color: 0x48afff,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
      position: new Vector3(0, 0.07, 0),
    });
    plane01.instance.renderOrder = 6;
    plane01.instance.scale.set(0, 0, 0);
    plane01.setParent(this?.scene);
    //
    let plane02 = new Plane(this, {
      width: max * 1.116,
      needRotate: true,
      rotateSpeed: -0.004,
      material: new MeshBasicMaterial({
        map: rotationBorder2,
        color: 0x48afff,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
      position: new Vector3(0, 0.06, 0),
    });
    plane02.instance.renderOrder = 6;
    plane02.instance.scale.set(0, 0, 0);
    plane02.setParent(this?.scene);
    this.rotateBorder1 = plane01.instance;
    this.rotateBorder2 = plane02.instance;
  }
  // 创建粒子
  createParticles() {
    this.particles = new Particles(this, {
      num: 50, // 粒子数量
      range: 200, // 范围
      dir: 'up',
      speed: 0.1,
      material: new PointsMaterial({
        map: Particles.createTexture(),
        size: 4,
        color: 0x00eeee,
        transparent: true,
        opacity: 0.3,
        depthTest: false,
        depthWrite: false,
        vertexColors: true,
        blending: AdditiveBlending,
        sizeAttenuation: true,
      }),
    });
    this?.particles.instance.position.set(0, 0, 0);
    this.particles.instance.rotation.x = -Math.PI / 2;
    this?.particles.setParent(this?.scene);
    // 停用,隐藏
    this.particles.enable = false;
    this.particles.instance.visible = initStatus.particle;
  }
  // 创建散点图
  createScatter() {
    this.scatterGroup = new Group();
    this.scatterGroup.visible = initStatus.scatter;

    this?.mainSceneGroup.add(this?.scatterGroup);
    // 贴图
    const texture = this?.assets.instance.getResource('arrow');
    const material = new SpriteMaterial({
      map: texture,
      color: 0xffff00,
      transparent: true,
      depthTest: false,
    });

    let scatterAllData = sortByValue(scatterData);
    let max = scatterAllData[0].value;
    scatterAllData.map((data) => {
      const sprite = new Sprite(material);
      sprite.renderOrder = 23;
      let scale = 2 + (data.value / max) * 1;
      sprite.scale.set(scale, scale, scale);
      let [x, y] = this?.geoProjection([data.lng, data.lat]);
      sprite.position.set(x, -y, this?.depth + 0.41);
      sprite.userData.adcode = data.adcode;
      sprite.userData.position = [x, -y, this?.depth + 0.41];
      this?.scatterGroup.add(sprite);
    });
  }
  // 创建标牌
  createBadgeLabel() {
    const self = this;
    self.badgeGroup.visible = false;
    badgesData.map((data) => {
      const [x, y] = this?.geoProjection(data.geometry.coordinates);
      labelNameStyle(data, new Vector3(x, -y, this?.depth + 0.92));
    });
    function labelNameStyle(data, position) {
      let label = self.label3d.create('', 'badges-label', true);
      label.init(
        `<div class="badges-label-wrap">
        旅游人次：<span>${data.value}人</span>
        <img class="icon" src="${labelArrow}" alt="" />
      </div>`,
        position,
      );
      self.label3d.setLabelStyle(label, 0.1, 'x');
      label.setParent(self.badgeGroup);
      label.hide();
      label.userData.adcode = data.adcode;
      label.userData.position = [position.x, position.y, position.z];
      return label;
    }
  }
  // 创建飞线
  createFlyLine() {
    let mapJsonData = JSON.parse(this?.assets.instance.getResource('china'));
    // 贴图
    const texture = this?.assets.instance.getResource('flyLine');
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.generateMipmaps = false;
    texture.magFilter = NearestFilter;
    texture.repeat.set(0.5, 1);
    let flyList = this.flyData;
    this.flyLineGroup = flyList
      ?.map((item) => {
        const centerPoint = mapJsonData?.features?.filter(
          (i) => i?.properties?.name?.indexOf(item.centerPoint) > -1,
        )?.[0]?.properties?.center;
        if (!centerPoint) {
          return null;
        }
        const data = item?.data?.map((data1, index) => {
          const res = mapJsonData?.features?.filter(
            (i) => i?.properties?.name?.indexOf(data1?.name || data1) > -1,
          )?.[0]?.properties;
          return {
            name: res?.name,
            center: res?.center,
            centroid: res?.centroid || res?.center,
            adcode: res?.adcode,
            enName: '',
            value: 10 * index,
            ...data1,
          };
        });
        let flyLine = new FlyLine(this, {
          centerPoint: centerPoint,
          data: data,
          texture: texture,
          material: new MeshBasicMaterial({
            map: texture,
            alphaMap: texture,
            color: 0xfbdf88,
            transparent: true,
            fog: false,
            depthTest: false,
            blending: AdditiveBlending,
          }),
        });
        flyLine.setParent(this?.mainSceneGroup);
        flyLine.visible = initStatus.flyLine;
        flyLine.instance.position.z = this?.depth + 0.4;
        return flyLine;
      })
      ?.filter(Boolean);

    this?.createFlyLineFocus();
  }
  // 地图名称 光圈
  createFlyLineFocus() {
    this.flyLineFocusGroup = new Group();
    this.flyLineFocusGroup.visible = false;

    let [x, y] = this?.geoProjection(this?.flyLineCenter);
    this?.flyLineFocusGroup.position.set(x, -y, this?.depth + 0.47);
    this.flyLineFocusGroup.userData.name = '陕西市'; // 设置光圈的名字
    this.flyLineFocusGroup.userData.adcode = 610000; //设置光圈的adcode
    this.flyLineFocusGroup.userData.position = [x, -y, this?.depth + 0.47]; //设置光圈的位置
    this?.mainSceneGroup.add(this?.flyLineFocusGroup);
    const flyLineFocus = this?.assets.instance.getResource('guangquan1');
    const geometry = new PlaneGeometry(5, 5);
    const material = new MeshBasicMaterial({
      color: 0xfbdf88,
      map: flyLineFocus,
      alphaMap: flyLineFocus,
      transparent: true,
      fog: false,
      depthTest: false,
      blending: AdditiveBlending,
    });
    const mesh = new Mesh(geometry, material);
    mesh.renderOrder = 30;
    mesh.scale.set(0, 0, 0);
    const mesh2 = mesh.clone();
    mesh2.material = material.clone();
    this?.flyLineFocusGroup.add(mesh, mesh2);
    gsap.to(mesh.material, {
      opacity: 0,
      repeat: -1,
      yoyo: false,
      duration: 1,
    });
    gsap.to(mesh.scale, {
      x: 2,
      y: 2,
      z: 2,
      repeat: -1,
      yoyo: false,
      duration: 1,
    });
    gsap.to(mesh2.material, {
      delay: 0.5,
      opacity: 0,
      repeat: -1,
      yoyo: false,
      duration: 1,
    });
    gsap.to(mesh2.scale, {
      delay: 0.5,
      x: 2,
      y: 2,
      z: 2,
      repeat: -1,
      yoyo: false,
      duration: 1,
    });
  }
  // 创建路径动画
  createPathAnimate() {
    // 贴图
    const texture = this?.assets.instance.getResource('pathLine');
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(8, 1);
    // 路径
    let transportPath = this?.assets.instance.getResource('transportPath');
    transportPath = JSON.parse(transportPath);
    for (let i = 0; i < transportPath.features.length; i++) {
      const element = transportPath.features[i];
      element.geometry.coordinates = [[element.geometry.coordinates]];
    }
    // 数据
    // 格式 [{geometry: {type: 'LineString', coordinates: [[[x,y]]] }}]
    let data = transportPath.features.map((path) => {
      return {
        geometry: path.geometry,
      };
    });
    let pathLine = new PathLine(this, {
      data: data,
      texture: texture,
      renderOrder: 21,
      speed: 0.5,
      material: new MeshBasicMaterial({
        map: texture,
        color: 0xffffff,
        transparent: true,
        fog: false,
        opacity: 1,
        depthTest: false,
        blending: AdditiveBlending,
      }),
    });
    // 设置父级
    pathLine.setParent(this?.mainSceneGroup);
    // 隐藏
    pathLine.visible = initStatus.path;
    // 位置
    pathLine.instance.position.z = this?.depth + 0.42;

    this.pathLineGroup = pathLine;
  }
  // 创建轮廓
  createStorke() {
    // 贴图
    const texture = this?.assets.instance.getResource('pathLine2');
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, 1);
    // 路径
    let mapJsonData = this?.assets.instance.getResource('chinaStorke');
    mapJsonData = JSON.parse(mapJsonData);

    // 数据
    // 格式 [{geometry: {type: '', coordinates: [[[x,y]]] }}]
    let data = mapJsonData.features.map((path) => {
      return {
        geometry: path.geometry,
      };
    });

    let pathLine = new PathLine(this, {
      data: data,
      texture: texture,
      renderOrder: 21,
      speed: 0.2,
      radius: 0.2,
      segments: 256 * 10,
      radialSegments: 4,
      material: new MeshBasicMaterial({
        color: 0x2bc4dc,
        map: texture,
        alphaMap: texture,
        fog: false,
        transparent: true,
        opacity: 1,
        blending: AdditiveBlending,
      }),
    });
    // 设置父级
    pathLine.setParent(this?.mainSceneGroup);

    // 位置]
    pathLine.instance.position.z = this?.depth + 0.38;
  }
  createWatermark() {
    let watermark = this?.assets.instance.getResource('watermark');
    watermark.wrapS = RepeatWrapping;
    watermark.wrapT = RepeatWrapping;
    watermark.repeat.set(50, 50);
    watermark.rotation = Math.PI / 5;
    let geometry = new PlaneGeometry(100, 100, 1);
    let material = new MeshBasicMaterial({
      // color: 0xffffff,
      map: watermark,
      // side: DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    let mesh = new Mesh(geometry, material);
    mesh.position.x -= 10;
    mesh.position.y -= 10;
    mesh.position.z -= 10;
    mesh.renderOrder = 999;
    this?.camera.instance.add(mesh);
  }
  // 更新
  update() {
    super.update();
    this?.stats && this?.stats.update();
    this?.interactionManager && this?.interactionManager.update();
  }
  // 销毁
  destroy() {
    super.destroy();
    this?.label3d && this?.label3d.destroy();
    this?.stats &&
      this?.stats.dom &&
      document.body.removeChild(this?.stats.dom);
    this?.groundMirror && this?.groundMirror.dispose();
    this?.toastLoading && this?.toastLoading.destroy();
    this?.childMap && this?.childMap.destroy();
  }
}
