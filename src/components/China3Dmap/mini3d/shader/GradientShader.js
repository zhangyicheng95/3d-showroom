import { Color } from "three"
export class GradientShader {
  constructor(material, config) {
    this.shader = null
    this.config = Object.assign(
      {
        uColor1: 0x2a6f72,
        uColor2: 0x0d2025,
        size: 15.0,
        dir: "x",
      },
      config
    )
    this.init(material)
  }
  init(material) {
    let { uColor1, uColor2, dir, size } = this.config
    let dirMap = { x: 1.0, y: 2.0, z: 3.0 }

    material.onBeforeCompile = (shader) => {
      this.shader = shader
      shader.uniforms = {
        ...shader.uniforms,
        uColor1: { value: new Color(uColor1) },
        uColor2: { value: new Color(uColor2) },
        uDir: { value: dirMap[dir] },
        uSize: { value: size },
      }
      shader.vertexShader = shader.vertexShader.replace(
        "void main() {",
        `
                attribute float alpha;
                varying vec3 vPosition;
                varying float vAlpha;
                void main() {
                  vAlpha = alpha;
                  vPosition = position;
              `
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        `
                varying vec3 vPosition;
                varying float vAlpha;
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform float uDir;
                uniform float uSize;
              
                void main() {
              `
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        /* glsl */ `
              #ifdef OPAQUE
              diffuseColor.a = 1.0;
              #endif
              
              // https://github.com/mrdoob/three.js/pull/22425
              #ifdef USE_TRANSMISSION
              diffuseColor.a *= transmissionAlpha + 0.1;
              #endif
              // vec3 gradient = mix(uColor1, uColor2, vPosition.x / 15.0); 
              vec3 gradient = vec3(0.0,0.0,0.0);
              if(uDir==1.0){
                gradient = mix(uColor1, uColor2, vPosition.x/ uSize); 
              }else if(uDir==2.0){
                gradient = mix(uColor1, uColor2, vPosition.z/ uSize); 
              }else if(uDir==3.0){
                gradient = mix(uColor1, uColor2, vPosition.y/ uSize); 
              }
              outgoingLight = outgoingLight*gradient;
              
              
              gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
              `
      )
    }
  }
}
