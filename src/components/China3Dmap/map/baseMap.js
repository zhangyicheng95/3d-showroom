import {
  Mesh,
  Vector2,
  Color,
  Group,
  Object3D,
  BufferAttribute,
  Shape,
  ExtrudeGeometry,
  MeshBasicMaterial,
  DoubleSide,
  ShapeGeometry,
} from "three";
import { transfromMapGeoJSON, getBoundBox } from "../mini3d";
import { Vector3 } from "yuka";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
export class BaseMap {
  constructor({ geoProjection }, config = {}) {
    this.geoProjection = geoProjection;
    this.mapGroup = new Group();
    this.coordinates = [];
    this.config = Object.assign(
      {
        position: new Vector3(0, 0, 0),
        center: new Vector2(0, 0),
        data: "",
        renderOrder: 1,
        merge: false,
        material: new MeshBasicMaterial({
          color: 0x18263b,
          transparent: true,
          opacity: 1,
        }),
      },
      config
    );
    this.mapGroup.position.copy(this.config.position);
    let mapData = transfromMapGeoJSON(this.config.data);
    this.create(mapData);
  }

  create(mapData) {
    // let proviceInfos = []
    let { merge } = this.config;
    let shapes = [];
    mapData.features.forEach((feature) => {
      const group = new Object3D();
      // 获取属性中的名称，中心点，质心
      let { name, center = [], centroid = [] } = feature.properties;
      this.coordinates.push({ name, center, centroid });

      // proviceInfos.push({ name, center, centroid, value: "" })
      feature.geometry.coordinates.forEach((multiPolygon) => {
        multiPolygon.forEach((polygon) => {
          // 绘制shape
          const shape = new Shape();
          for (let i = 0; i < polygon.length; i++) {
            if (!polygon[i][0] || !polygon[i][1]) {
              return false;
            }
            const [x, y] = this.geoProjection(polygon[i]);
            if (i === 0) {
              shape.moveTo(x, -y);
            }
            shape.lineTo(x, -y);
          }

          const geometry = new ShapeGeometry(shape);
          if (merge) {
            shapes.push(geometry);
          } else {
            const mesh = new Mesh(geometry, this.config.material);
            mesh.renderOrder = this.config.renderOrder;
            group.add(mesh);
          }
        });
      });
      if (!merge) {
        this.mapGroup.add(group);
      }
    });
    if (merge) {
      let geometry = mergeGeometries(shapes);
      const mesh = new Mesh(geometry, this.config.material);
      mesh.renderOrder = this.config.renderOrder;
      this.mapGroup.add(mesh);
    }
  }

  getCoordinates() {
    return this.coordinates;
  }
  setParent(parent) {
    parent.add(this.mapGroup);
  }
}
