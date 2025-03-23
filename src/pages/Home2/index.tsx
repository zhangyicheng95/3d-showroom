import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import livingRoom from '@/assets/image/livingRoom.jpg';
import kitchen from '@/assets/image/kitchen.jpg';
import tipIcon from '@/assets/image/tip.png';
import styles from './index.less';

interface TipContent {
  title: string;
  text: string;
  image?: number;
  showTip: boolean;
  showTitle: boolean;
}

const HomePage2: React.FC = () => {
  const threeDBoxRef = useRef<any>(null);
  const tooltipBoxRef = useRef<any>(null);
  const titleBoxRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const tipsSpriteListRef = useRef<THREE.Sprite[]>([]);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<any>({
    top: '-100%',
    left: '-100%'
  });
  const [titlePosition, setTitlePosition] = useState<any>({
    top: '-100%',
    left: '-100%'
  });
  const [tooltipContent, setTooltipContent] = useState<any>({});
  const [time, setTime] = useState({ value: 0 });

  const dataList = [
    {
      image: livingRoom,
      tipsList: [
        {
          position: { x: -200, y: -4, z: -147 },
          content: {
            title: "进入厨房",
            text: "",
            image: 1,
            showTip: false,
            showTitle: true,
          },
        },
        {
          position: { x: -100, y: 0, z: -231 },
          content: {
            title: "信息点2",
            text: "77989",
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 150, y: -50, z: -198 },
          content: {
            title: "信息点3",
            text: "qwdcz",
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 210, y: 11, z: -140 },
          content: {
            title: "信息点4",
            text: "大豆食心虫侦察十大大苏打大大大大大大大",
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 208, y: -12, z: 140 },
          content: {
            title: "信息点5",
            text: "eq",
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 86, y: -9, z: 236 },
          content: {
            title: "进入房间",
            text: "",
            image: 2,
            showTip: false,
            showTitle: true,
          },
        },
      ],
    },
    {
      image: kitchen,
      tipsList: [
        {
          position: { x: -199, y: -24, z: 145 },
          content: {
            title: "进入大厅",
            text: "",
            image: 0,
            showTip: false,
            showTitle: true,
          },
        },
      ],
    },
    // ... 其他场景数据保持不变
  ];

  const initScene = () => {
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x101010);
    sceneRef.current = newScene;
    return newScene;
  };

  const initCamera = (element: HTMLElement) => {
    const newCamera = new THREE.PerspectiveCamera(
      45,
      element.clientWidth / element.clientHeight,
      0.1,
      1000
    );
    newCamera.position.set(50, 0, 40);
    cameraRef.current = newCamera;
    return newCamera;
  };

  const initControls = (element: HTMLElement, camera: THREE.PerspectiveCamera) => {
    const newControls = new OrbitControls(camera, element);
    newControls.minDistance = 1;
    newControls.maxDistance = 100;
    newControls.enablePan = false;
    controlsRef.current = newControls;
    return newControls;
  };

  const initRenderer = (element: HTMLElement) => {
    const newRenderer = new THREE.WebGLRenderer();
    newRenderer.setSize(element.offsetWidth, element.offsetHeight);
    element.appendChild(newRenderer.domElement);
    rendererRef.current = newRenderer;
    return newRenderer;
  };

  const addTipsSprite = (scene: THREE.Scene, index = 0) => {
    const tipTexture = new THREE.TextureLoader().load(tipIcon);
    const material = new THREE.SpriteMaterial({ map: tipTexture });
    const newTipsSpriteList: THREE.Sprite[] = [];

    dataList[index].tipsList.forEach((item: any) => {
      const sprite: any = new THREE.Sprite(material);
      sprite.scale.set(10, 10, 10);
      sprite.position.set(item.position.x, item.position.y, item.position.z);
      sprite.content = item.content;
      newTipsSpriteList.push(sprite);
      scene.add(sprite);
    });

    tipsSpriteListRef.current = newTipsSpriteList;
  };

  const initContent = (scene: THREE.Scene, index = 0) => {
    const sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    sphereGeometry.scale(16, 16, -16);
    const texture = new THREE.TextureLoader().load(dataList[index].image);
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const newSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(newSphere);
    sphereRef.current = newSphere;
    addTipsSprite(scene);
  };

  const changeContentAndtips = (index: number) => {
    if (!sceneRef.current || !sphereRef.current || !cameraRef.current) return;

    // 清除现有的 sprites
    sceneRef.current.children = sceneRef.current.children.filter(
      (item) => String(item.type) !== "Sprite"
    );
    tipsSpriteListRef.current = [];

    // 更新球体材质
    const texture = new THREE.TextureLoader().load(dataList[index].image);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
    });
    sphereRef.current.material = sphereMaterial;
    gsap.to(sphereMaterial, { transparent: true, opacity: 1, duration: 2 });

    // 更新相机和添加新的提示点
    cameraRef.current.updateProjectionMatrix();
    addTipsSprite(sceneRef.current, index);
  };

  const handleMouseClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!cameraRef.current || !sceneRef.current || !threeDBoxRef.current) return;
    const rect = threeDBoxRef.current.getBoundingClientRect();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouse.x = (x / rect.width) * 2 - 1;
    mouse.y = -(y / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraRef.current);
    const intersects = raycaster.intersectObjects(tipsSpriteListRef.current, true);

    if (intersects.length > 0) {
      const content = (intersects[0].object as any).content;
      setTooltipContent(content);

      // 如果是需要切换场景的点击
      if (content.showTitle && content.image !== undefined) {
        changeContentAndtips(content.image);
      }

      // 同时处理提示信息的显示
      if (content.showTip) {
        const left = Math.round(x);
        const top = Math.round(y);
        setTooltipPosition({
          left: `${left}px`,
          top: `${top}px`,
          opacity: '1',
          visibility: 'visible'
        });
      } else if (content.showTitle) {
        const left = Math.round(x);
        const top = Math.round(y - 20);

        setTitlePosition({
          left: `${left}px`,
          top: `${top}px`,
          opacity: '1',
          visibility: 'visible'
        });
      }
    } else {
      handleTooltipHide(e);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!cameraRef.current || !sceneRef.current || !threeDBoxRef.current || !tooltipBoxRef.current || !titleBoxRef.current) return;

    const element = threeDBoxRef.current;
    const rect = element.getBoundingClientRect();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 修正鼠标坐标计算
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouse.x = (x / rect.width) * 2 - 1;
    mouse.y = -(y / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraRef.current);
    // 使用 ref.current 替代 state
    const intersects = raycaster.intersectObjects(tipsSpriteListRef.current, true);

    if (intersects.length > 0) {
      const elementWidth = rect.width / 2;
      const elementHeight = rect.height / 2;
      const worldVector = new THREE.Vector3(
        intersects[0].object.position.x,
        intersects[0].object.position.y,
        intersects[0].object.position.z
      );
      const position = worldVector.project(cameraRef.current);
      const content = (intersects[0].object as any).content;
      setTooltipContent(content);

      if (content.showTip) {
        const left = Math.round(x); // 直接使用鼠标x坐标
        const top = Math.round(y); // 直接使用鼠标y坐标

        setTooltipPosition({
          left: `${left}px`,
          top: `${top}px`,
          opacity: '1',
          visibility: 'visible'
        });
      } else if (content.showTitle) {
        const left = Math.round(x);
        const top = Math.round(y - 20); // 标题显示在鼠标上方一点

        setTitlePosition({
          left: `${left}px`,
          top: `${top}px`,
          opacity: '1',
          visibility: 'visible'
        });
      }
    } else {
      handleTooltipHide(e);
    }
  };

  const handleTooltipHide = (e: MouseEvent) => {
    e.preventDefault();
    setTooltipPosition({
      top: '-100%',
      left: '-100%',
      opacity: '0',
      visibility: 'hidden'
    });
    setTitlePosition({
      top: '-100%',
      left: '-100%',
      opacity: '0',
      visibility: 'hidden'
    });
    setTooltipContent({});
  };

  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current || !threeDBoxRef.current) return;

    const element = threeDBoxRef.current;
    cameraRef.current.aspect = element.clientWidth / element.clientHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(element.clientWidth, element.clientHeight);
  };

  const render = () => {
    if (!controlsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    controlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    rendererRef.current.sortObjects = false;
    setTime(prev => ({ value: prev.value + 0.015 }));
  };

  useEffect(() => {
    const element = threeDBoxRef.current;
    if (!element) return;

    const newScene = initScene();
    const newCamera = initCamera(element);
    const newControls = initControls(element, newCamera);
    const newRenderer = initRenderer(element);

    initContent(newScene);

    let animationFrameId: number;
    const animate = () => {
      newControls.update();
      newRenderer.render(newScene, newCamera);
      newRenderer.sortObjects = false;
      setTime(prev => ({ value: prev.value + 0.015 }));
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleMouseClick);
    element.addEventListener('mousemove', handleMouseMove);
    tooltipBoxRef.current.addEventListener('mouseleave', handleTooltipHide);

    return () => {
      window?.removeEventListener?.('resize', handleResize);
      window?.removeEventListener?.('click', handleMouseClick);
      element?.removeEventListener?.('mousemove', handleMouseMove);
      tooltipBoxRef.current?.removeEventListener?.('mouseleave', handleTooltipHide);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current) {
        rendererRef.current.dispose?.();
      }
    };
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.viewContainer} ref={threeDBoxRef}></div>
      <div
        className={styles.tooltipBox}
        style={tooltipPosition}
        ref={tooltipBoxRef}
      >
        <div className={styles.container}>
          <div className={styles.title}>标题：{tooltipContent.title}</div>
          <div className={styles.explain}>说明：{tooltipContent.text}</div>
        </div>
      </div>
      <p
        className={styles.titleText}
        ref={titleBoxRef}
        style={titlePosition}
      >
        {tooltipContent.title}
      </p>
    </div>
  );
};

export default HomePage2; 