import {
  AdditiveBlending,
  Group,
  Mesh,
  MeshBasicMaterial,
  QuadraticBezierCurve3,
  TubeGeometry,
  Vector3,
} from 'three';
export class FlyLine {
  constructor({ time, geoProjection }, options) {
    this.time = time;
    this.geoProjection = geoProjection;
    this.instance = new Group();
    let defaultOptions = {
      centerPoint: [0, 0],
      middleHeight: 15,
      speed: 0.0015,
      texture: null,
      radius: 0.1,
      segments: 32,
      radialSegments: 8,
      data: [],
      material: new MeshBasicMaterial({
        color: 0xfbdf88,
        transparent: true,
        fog: false,
        opacity: 1,
        depthTest: false,
        blending: AdditiveBlending,
      }),
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.init();
  }
  // 初始化
  init() {
    const {
      centerPoint,
      material,
      texture,
      segments,
      radius,
      radialSegments,
      data,
      speed,
      middleHeight,
    } = this.options;

    let [centerX, centerY] = this.geoProjection(centerPoint);
    let centerPointVec = new Vector3(centerX, -centerY, 0);

    data.map((city) => {
      let [x, y] = this.geoProjection(city.centroid);
      let point = new Vector3(x, -y, 0);
      const center = new Vector3();
      center.addVectors(point, centerPointVec).multiplyScalar(0.5);
      center.setZ(middleHeight);
      const curve = new QuadraticBezierCurve3(point, center, centerPointVec);
      const tubeGeometry = new TubeGeometry(
        curve,
        segments,
        radius,
        radialSegments,
        false,
      );
      const mesh = new Mesh(tubeGeometry, material);

      mesh.position.set(0, 0, 0);
      mesh.renderOrder = 21;
      this.instance.add(mesh);
    });

    this.time.on('tick', () => {
      if (this.run) {
        texture.offset.x -= speed;
      }
    });
  }

  // 获取实例
  getInstance() {
    return this.instance;
  }
  // 设置父级
  setParent(parent) {
    parent.add(this.instance);
  }
  // 设置隐藏显示
  set visible(bool) {
    this.instance.visible = bool;
    this.run = bool;
  }
}
