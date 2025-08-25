import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import ArtGallery from '../ArtGallery';
import { GetQueryObj } from '@/utils/utils';

const HomePage: React.FC<any> = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const targetProgressRef = useRef<number>(0);
  const progressTimerRef = useRef<number | null>(null);
  const loadingCompleteRef = useRef<boolean>(false);
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const loadedObjectRef = useRef<THREE.Object3D | null>(null);

  const frameCameraToObject = (object: THREE.Object3D) => {
    if (!cameraRef.current || !rendererRef.current) return;
    const camera = cameraRef.current;

    // Compute bounds and sphere
    const box = new THREE.Box3().setFromObject(object);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const center = sphere.center;
    const radius = Math.max(sphere.radius, 0.0001);

    // Compute needed distance to fit vertically and horizontally
    const fovY = THREE.MathUtils.degToRad(camera.fov);
    const fovX = 2 * Math.atan(Math.tan(fovY / 2) * camera.aspect);
    const distanceY = radius / Math.tan(fovY / 2);
    const distanceX = radius / Math.tan(fovX / 2);
    const distance = Math.max(distanceX, distanceY) * 1.15; // margin

    // Position camera along its current forward axis
    const dir = new THREE.Vector3(0, 0, 1);
    dir.applyQuaternion(camera.quaternion); // current view direction
    const newPos = center.clone().add(dir.multiplyScalar(distance));
    camera.position.copy(newPos);

    // Update near/far to encompass model comfortably
    camera.near = Math.max(distance / 100, 0.01);
    camera.far = Math.max(distance * 5, 10);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
  };

  const generateArtBackgroundTexture = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(2, Math.floor(width));
    canvas.height = Math.max(2, Math.floor(height));
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Base gradient: gallery off-white (top) to warm parchment (bottom)
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, '#f7f5f0');
    g.addColorStop(1, '#eee9e0');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle vignette with warm tint (edges slightly darker)
    const vignette = ctx.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.55,
      Math.min(canvas.width, canvas.height) * 0.2,
      canvas.width * 0.5,
      canvas.height * 0.55,
      Math.max(canvas.width, canvas.height) * 0.75
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(120,100,80,0.18)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Warm accent glow (top-left), enhanced
    const glow = ctx.createRadialGradient(
      canvas.width * 0.18,
      canvas.height * 0.22,
      0,
      canvas.width * 0.18,
      canvas.height * 0.22,
      Math.max(canvas.width, canvas.height) * 0.50
    );
    glow.addColorStop(0, 'rgba(255, 210, 140, 0.14)');
    glow.addColorStop(0.4, 'rgba(255, 210, 140, 0.06)');
    glow.addColorStop(1, 'rgba(255, 210, 140, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cool counter-glow (bottom-right), enhanced for balance
    const coolGlow = ctx.createRadialGradient(
      canvas.width * 0.82,
      canvas.height * 0.78,
      0,
      canvas.width * 0.82,
      canvas.height * 0.78,
      Math.max(canvas.width, canvas.height) * 0.40
    );
    coolGlow.addColorStop(0, 'rgba(160, 190, 220, 0.10)');
    coolGlow.addColorStop(0.35, 'rgba(160, 190, 220, 0.045)');
    coolGlow.addColorStop(1, 'rgba(160, 190, 220, 0)');
    ctx.fillStyle = coolGlow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Neutral overhead spotlight (upper-center)
    const neutralSpot = ctx.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.18,
      0,
      canvas.width * 0.5,
      canvas.height * 0.18,
      Math.max(canvas.width, canvas.height) * 0.42
    );
    neutralSpot.addColorStop(0, 'rgba(255, 245, 230, 0.12)');
    neutralSpot.addColorStop(0.45, 'rgba(255, 245, 230, 0.05)');
    neutralSpot.addColorStop(1, 'rgba(255, 245, 230, 0)');
    ctx.fillStyle = neutralSpot;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Soft ring glow around center: two concentric fades
    const centerX = canvas.width * 0.5;
    const centerY = canvas.height * 0.5;
    const maxDim = Math.max(canvas.width, canvas.height);
    const ring1 = ctx.createRadialGradient(centerX, centerY, maxDim * 0.12, centerX, centerY, maxDim * 0.48);
    ring1.addColorStop(0, 'rgba(240, 225, 200, 0.08)');
    ring1.addColorStop(0.6, 'rgba(240, 225, 200, 0.03)');
    ring1.addColorStop(1, 'rgba(240, 225, 200, 0)');
    ctx.fillStyle = ring1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const ring2 = ctx.createRadialGradient(centerX, centerY, maxDim * 0.22, centerX, centerY, maxDim * 0.65);
    ring2.addColorStop(0, 'rgba(210, 200, 185, 0.06)');
    ring2.addColorStop(0.7, 'rgba(210, 200, 185, 0.02)');
    ring2.addColorStop(1, 'rgba(210, 200, 185, 0)');
    ctx.fillStyle = ring2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Paper-like grain for light background
    const grainDensity = Math.max(250, Math.min(1400, Math.floor((canvas.width * canvas.height) / 4500)));
    for (let i = 0; i < grainDensity; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const alpha = Math.random() * 0.02 + 0.008; // 0.8% - 2.8%
      const shade = 120 + Math.floor(Math.random() * 50); // 120-170 (warm gray specks)
      ctx.fillStyle = `rgba(${shade}, ${shade - 6}, ${shade - 12}, ${alpha})`;
      ctx.fillRect(x, y, 1, 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    // @ts-ignore - colorSpace property exists in newer three versions
    (texture as any).colorSpace = (THREE as any).SRGBColorSpace || (THREE as any).sRGBEncoding;
    texture.needsUpdate = true;
    backgroundCanvasRef.current = canvas;
    return texture;
  };

  const cleanup = () => {
    // Cancel RAF loop
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Dispose scene objects and textures
    if (sceneRef.current) {
      try {
        sceneRef.current.traverse((obj: any) => {
          if (obj.geometry && typeof obj.geometry.dispose === 'function') {
            obj.geometry.dispose();
          }
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((material: any) => material && typeof material.dispose === 'function' && material.dispose());
            } else if (typeof obj.material.dispose === 'function') {
              obj.material.dispose();
            }
          }
          if (obj.texture && typeof obj.texture.dispose === 'function') {
            obj.texture.dispose();
          }
        });
        const bg = sceneRef.current.background as unknown as THREE.Texture | null;
        if (bg && typeof (bg as any).dispose === 'function') {
          (bg as any).dispose();
        }
      } catch (_) { }
    }

    if (rendererRef.current) {
      try {
        // Lose WebGL context to free GPU memory
        // @ts-ignore
        if (rendererRef.current.forceContextLoss) {
          // @ts-ignore
          rendererRef.current.forceContextLoss();
        }
      } catch (_) { }
      rendererRef.current.dispose();
    }
    if (controlsRef.current) {
      controlsRef.current.dispose();
    }
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (domRef.current && rendererRef.current) {
      try {
        domRef.current.removeChild(rendererRef.current.domElement);
      } catch (_) { }
    }
    backgroundCanvasRef.current = null;
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
    manager.onStart = () => {
      targetProgressRef.current = 0;
      setProgress(0);
    };
    manager.onProgress = (_url, itemsLoaded, itemsTotal) => {
      // Keep as a coarse fallback; detailed progress comes from per-byte onProgress below
      const percent = Math.round((itemsLoaded / Math.max(itemsTotal, 1)) * 100);
      targetProgressRef.current = Math.min(percent, 99);
    };
    manager.onLoad = () => {
      loadingCompleteRef.current = true;
      targetProgressRef.current = 100;
    };
    manager.onError = () => {
      // Keep whatever progress we had; optionally show error state in UI if desired
    };
    const mtlLoader = new MTLLoader(manager);
    mtlLoader.setCrossOrigin('anonymous');

    // 根据环境选择不同的基础URL
    const baseUrl = 'https://oss.allintrip.cn/shanwentou/3D/';
    const params = GetQueryObj(window.location.href);
    const title = params.title || '李世南_齐白石_箭筒_500件';
    try {
      const materials = await new Promise<MTLLoader.MaterialCreator>((resolve, reject) => {
        mtlLoader.load(
          `${baseUrl}${title}.mtl`,
          (m: MTLLoader.MaterialCreator) => resolve(m),
          (event) => {
            if (event.lengthComputable) {
              const p = event.total > 0 ? event.loaded / event.total : 0;
              const mapped = Math.min(99, Math.floor(p * 20)); // 0% - 20%
              targetProgressRef.current = mapped;
            } else {
              // If not computable, gently move towards 15%
              targetProgressRef.current = Math.max(targetProgressRef.current, 15);
            }
          },
          (err) => reject(err)
        );
      });
      materials.preload();

      const objLoader = new OBJLoader(manager);
      objLoader.setCrossOrigin('anonymous');
      objLoader.setMaterials(materials);

      const object = await new Promise<THREE.Object3D>((resolve, reject) => {
        objLoader.load(
          `${baseUrl}${title}.obj`,
          (obj) => resolve(obj),
          (event) => {
            if (event.lengthComputable) {
              const p = event.total > 0 ? event.loaded / event.total : 0;
              // Map to 20% - 99%
              const mapped = 20 + Math.floor(p * 79);
              targetProgressRef.current = Math.min(mapped, 99);
            } else {
              // If not computable, nudge forward but cap at 90%
              targetProgressRef.current = Math.min(90, targetProgressRef.current + 1);
            }
          },
          (err) => reject(err)
        );
      });
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
      loadedObjectRef.current = object;
      frameCameraToObject(object);
    } catch (error) {
      console.error('Error loading model:', error);
    }
  };

  function init() {
    if (!domRef.current) return;

    sceneRef.current = new THREE.Scene();
    if (domRef.current) {
      const tex = generateArtBackgroundTexture(
        domRef.current.clientWidth,
        domRef.current.clientHeight
      );
      if (tex) {
        sceneRef.current.background = tex;
      } else {
        sceneRef.current.background = new THREE.Color(0x0b1020);
      }
    }

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

    // Smoothly animate displayed progress towards target progress
    if (!progressTimerRef.current) {
      progressTimerRef.current = window.setInterval(() => {
        setProgress((current) => {
          const target = loadingCompleteRef.current
            ? 100
            : Math.min(targetProgressRef.current, 99);

          if (current >= target) return current;

          // Increase speed as target grows, but clamp steps for smoothness
          const distance = target - current;
          const step = Math.max(0.5, Math.min(3, distance * 0.1));
          const next = Math.min(target, +(current + step).toFixed(2));
          return next;
        });
      }, 100);
    }

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

    // Regenerate background texture to fit new size
    if (sceneRef.current) {
      const previous = sceneRef.current.background as unknown as THREE.Texture | null;
      const newTex = generateArtBackgroundTexture(width, height);
      if (newTex) {
        sceneRef.current.background = newTex;
        if (previous && typeof (previous as any).dispose === 'function') {
          (previous as any).dispose();
        }
      }
    }

    // Reframe camera to keep object maximized
    if (loadedObjectRef.current) {
      frameCameraToObject(loadedObjectRef.current);
    }
  }

  function animate() {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    animationFrameRef.current = requestAnimationFrame(animate);

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
      {progress < 100 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 10,
          }}
          aria-live="polite"
          aria-label={`Loading ${Math.floor(progress)} percent`}
        >
          {/* Animated backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: -40,
              background:
                'radial-gradient(1200px 600px at 20% 10%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(1000px 800px at 80% 80%, rgba(34,197,94,0.18), transparent 60%), radial-gradient(800px 900px at 50% 50%, rgba(236,72,153,0.12), transparent 60%), #0b1020',
              filter: 'saturate(1.1)',
              animation: 'gradientShift 12s ease-in-out infinite',
            }}
          />

          {/* Floating particles */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: `${(i * 137) % 100}%`,
                left: `${(i * 73) % 100}%`,
                width: 6 + ((i * 3) % 10),
                height: 6 + ((i * 3) % 10),
                borderRadius: '999px',
                background:
                  i % 3 === 0
                    ? 'rgba(59,130,246,0.45)'
                    : i % 3 === 1
                      ? 'rgba(16,185,129,0.38)'
                      : 'rgba(236,72,153,0.38)',
                boxShadow:
                  '0 0 12px rgba(255,255,255,0.15), 0 0 24px rgba(59,130,246,0.12)',
                filter: 'blur(0.3px)',
                animation: `float ${(8 + (i % 6))}s ${i * 233}ms ease-in-out infinite`,
                transform: 'translate3d(0,0,0)',
              }}
            />
          ))}

          {/* Center card */}
          <div
            style={{
              position: 'relative',
              width: 280,
              maxWidth: '80%',
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 24,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow:
                '0 8px 30px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            {/* Circular progress (conic gradient) */}
            <div
              style={{
                position: 'absolute',
                inset: 18,
                borderRadius: '50%',
                background: `conic-gradient(#60a5fa ${progress * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                boxShadow:
                  '0 0 40px rgba(96,165,250,0.25), 0 0 80px rgba(96,165,250,0.15)',
                filter: 'saturate(1.1)',
                transition: 'background 0.15s linear',
              }}
            />
            {/* Hollow center to make it a ring */}
            <div
              style={{
                position: 'absolute',
                inset: 42,
                borderRadius: '50%',
                background:
                  'radial-gradient(120px 120px at 50% 50%, rgba(15,23,42,0.65), rgba(15,23,42,0.45))',
                boxShadow: 'inset 0 6px 28px rgba(0,0,0,0.6)',
              }}
            />

            {/* Center content */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div
                style={{
                  color: '#e5efff',
                  fontSize: 34,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textShadow: '0 2px 14px rgba(96,165,250,0.45)',
                }}
              >
                {Math.floor(progress)}%
              </div>
              <div
                style={{
                  color: 'rgba(226,232,240,0.85)',
                  marginTop: 8,
                  fontSize: 13,
                  letterSpacing: 0.4,
                }}
              >
                正在加载模型…
              </div>

              {/* Pulse dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: -24,
                  transform: 'translateX(-50%)',
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: '#60a5fa',
                  boxShadow:
                    '0 0 0 0 rgba(96,165,250,0.6)',
                  animation: 'pulseGlow 2s ease-out infinite',
                }}
              />
            </div>
          </div>

          {/* Keyframes */}
          <style>
            {`
              @keyframes float {
                0% { transform: translateY(0px) translateZ(0); opacity: 0.9; }
                50% { transform: translateY(-18px) translateZ(0); opacity: 1; }
                100% { transform: translateY(0px) translateZ(0); opacity: 0.9; }
              }
              @keyframes gradientShift {
                0% { filter: hue-rotate(0deg) saturate(1.05); }
                50% { filter: hue-rotate(20deg) saturate(1.25); }
                100% { filter: hue-rotate(0deg) saturate(1.05); }
              }
              @keyframes pulseGlow {
                0% { box-shadow: 0 0 0 0 rgba(96,165,250,0.6); }
                70% { box-shadow: 0 0 0 24px rgba(96,165,250,0); }
                100% { box-shadow: 0 0 0 0 rgba(96,165,250,0); }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
};

export default HomePage;
