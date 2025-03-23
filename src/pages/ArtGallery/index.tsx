import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './index.less';

const ArtGallery: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);
    const clockRef = useRef<THREE.Clock>(new THREE.Clock());
    const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
    const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
    const [artworkInfo, setArtworkInfo] = useState<{ title: string; artist: string; description: string; visible: boolean }>({
        title: '',
        artist: '',
        description: '',
        visible: false
    });

    // 初始化场景
    const initScene = () => {
        if (!canvasRef.current) return;

        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111111);
        sceneRef.current = scene;

        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            60,
            canvasRef.current.clientWidth / canvasRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1.6, 5);
        cameraRef.current = camera;

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        canvasRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // 创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2 - 0.1;
        controls.target.set(0, 1, 0);
        controlsRef.current = controls;

        // 添加灯光
        addLights(scene);

        // 创建展馆环境
        createGalleryEnvironment();

        // 添加艺术品
        addArtworks(scene);

        // 添加事件监听
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);

            if (controlsRef.current) {
                controlsRef.current.update();
            }

            if (mixerRef.current) {
                const delta = clockRef.current.getDelta();
                mixerRef.current.update(delta);
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };

        animate();
    };

    // 添加灯光
    const addLights = (scene: THREE.Scene) => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 1, 10);
        pointLight1.position.set(0, 3, 0);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1, 10);
        pointLight2.position.set(-5, 3, 0);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0xffffff, 1, 10);
        pointLight3.position.set(5, 3, 0);
        scene.add(pointLight3);
    };

    // 创建展馆环境
    const createGalleryEnvironment = () => {
        if (!sceneRef.current) return;

        // 创建地板
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 0.7
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        sceneRef.current.add(floor);

        // 创建墙壁
        // 后墙
        const backWallGeometry = new THREE.PlaneGeometry(20, 5);
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0xf5f5f5,
            roughness: 0.9
        });
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(0, 2.5, -10);
        backWall.receiveShadow = true;
        sceneRef.current.add(backWall);

        // 左墙
        const leftWallGeometry = new THREE.PlaneGeometry(20, 5);
        const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
        leftWall.position.set(-10, 2.5, 0);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.receiveShadow = true;
        sceneRef.current.add(leftWall);

        // 右墙
        const rightWallGeometry = new THREE.PlaneGeometry(20, 5);
        const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
        rightWall.position.set(10, 2.5, 0);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.receiveShadow = true;
        sceneRef.current.add(rightWall);

        // 添加天花板
        const ceilingGeometry = new THREE.PlaneGeometry(20, 20);
        const ceilingMaterial = new THREE.MeshStandardMaterial({
            color: 0xfafafa,
            roughness: 0.8
        });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.position.set(0, 5, 0);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.receiveShadow = true;
        sceneRef.current.add(ceiling);

        // 添加展示台
        for (let i = -1; i <= 1; i++) {
            const pedestalGeometry = new THREE.BoxGeometry(1, 1, 1);
            const pedestalMaterial = new THREE.MeshStandardMaterial({
                color: 0x444444,
                roughness: 0.6
            });
            const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
            pedestal.position.set(i * 3, 0.5, -5);
            pedestal.castShadow = true;
            pedestal.receiveShadow = true;
            sceneRef.current.add(pedestal);
        }
    };

    // 添加艺术品
    const addArtworks = (scene: THREE.Scene) => {
        const artworks = [
            {
                url: '/images/artwork1.jpg',
                position: [2, 1.5, -3],
                rotation: [0, 0, 0],
                scale: [1.5, 1.5, 0.05],
                info: {
                    title: '星空',
                    artist: '文森特·梵高',
                    description: '《星空》是荷兰后印象派画家文森特·梵高于1889年6月在法国圣雷米的一家精神病院里创作的一幅油画。这幅画描绘了日出前充满漩涡的夜空。'
                }
            },
            {
                url: '/images/artwork2.jpg',
                position: [-2, 1.5, -3],
                rotation: [0, 0, 0],
                scale: [1.5, 1.5, 0.05],
                info: {
                    title: '蒙娜丽莎',
                    artist: '列奥纳多·达·芬奇',
                    description: '《蒙娜丽莎》是文艺复兴时期意大利艺术家列奥纳多·达·芬奇创作的一幅肖像画，约作于1503年至1506年之间。'
                }
            },
            {
                url: '/images/artwork3.jpg',
                position: [0, 1.5, -3.5],
                rotation: [0, 0, 0],
                scale: [2, 1.5, 0.05],
                info: {
                    title: '向日葵',
                    artist: '文森特·梵高',
                    description: '《向日葵》是荷兰后印象派画家文森特·梵高于1888年8月在法国阿尔勒创作的一系列静物油画。'
                }
            },
            {
                url: '/images/artwork4.jpg',
                position: [3, 1.5, 0],
                rotation: [0, -Math.PI / 2, 0],
                scale: [1.5, 1.5, 0.05],
                info: {
                    title: '睡莲',
                    artist: '克劳德·莫奈',
                    description: '《睡莲》是法国印象派画家克劳德·莫奈晚年创作的一系列油画，描绘了他位于吉维尼家中花园的睡莲池塘。'
                }
            },
            {
                url: '/images/artwork5.jpg',
                position: [-3, 1.5, 0],
                rotation: [0, Math.PI / 2, 0],
                scale: [1.5, 1.5, 0.05],
                info: {
                    title: '呐喊',
                    artist: '爱德华·蒙克',
                    description: '《呐喊》是挪威表现主义画家爱德华·蒙克于1893年创作的一幅油画，表达了现代人的焦虑和孤独。'
                }
            }
        ];

        const textureLoader = new THREE.TextureLoader();
        const artworkObjects: THREE.Mesh[] = [];

        artworks.forEach((artwork) => {
            textureLoader.load(artwork.url, (texture) => {
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshStandardMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                });

                const artworkMesh = new THREE.Mesh(geometry, material);
                artworkMesh.position.set(artwork.position[0], artwork.position[1], artwork.position[2]);
                artworkMesh.rotation.set(artwork.rotation[0], artwork.rotation[1], artwork.rotation[2]);
                artworkMesh.scale.set(artwork.scale[0], artwork.scale[1], artwork.scale[2]);
                artworkMesh.castShadow = true;
                artworkMesh.receiveShadow = true;

                // 存储艺术品信息
                (artworkMesh as any).artworkInfo = artwork.info;

                scene.add(artworkMesh);
                artworkObjects.push(artworkMesh);
            });

            // 添加画框
            const frameGeometry = new THREE.BoxGeometry(1.02, 1.02, 0.1);
            const frameMaterial = new THREE.MeshStandardMaterial({
                color: 0x8b4513,
                metalness: 0.5,
                roughness: 0.3
            });

            const frame = new THREE.Mesh(frameGeometry, frameMaterial);
            frame.position.set(artwork.position[0], artwork.position[1], artwork.position[2] - 0.03);
            frame.rotation.set(artwork.rotation[0], artwork.rotation[1], artwork.rotation[2]);
            frame.scale.set(artwork.scale[0], artwork.scale[1], 0.1);
            frame.castShadow = true;
            frame.receiveShadow = true;

            scene.add(frame);
        });

        // 保存对艺术品的引用以便射线检测
        (scene as any).artworkObjects = artworkObjects;
    };

    // 处理窗口大小变化
    const handleResize = () => {
        if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return;

        cameraRef.current.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };

    // 处理鼠标移动事件
    const handleMouseMove = (event: MouseEvent) => {
        if (!canvasRef.current || !cameraRef.current || !sceneRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / canvasRef.current.clientWidth) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / canvasRef.current.clientHeight) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

        if ((sceneRef.current as any).artworkObjects) {
            const intersects = raycasterRef.current.intersectObjects((sceneRef.current as any).artworkObjects);

            if (intersects.length > 0) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        }
    };

    // 处理点击事件
    const handleClick = (event: MouseEvent) => {
        if (!canvasRef.current || !cameraRef.current || !sceneRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / canvasRef.current.clientWidth) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / canvasRef.current.clientHeight) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

        if ((sceneRef.current as any).artworkObjects) {
            const intersects = raycasterRef.current.intersectObjects((sceneRef.current as any).artworkObjects);

            if (intersects.length > 0) {
                const artwork = intersects[0].object;
                const info = (artwork as any).artworkInfo;

                setArtworkInfo({
                    title: info.title,
                    artist: info.artist,
                    description: info.description,
                    visible: true
                });
            } else {
                setArtworkInfo(prev => ({ ...prev, visible: false }));
            }
        }
    };

    // 组件挂载时初始化场景
    useEffect(() => {
        initScene();

        return () => {
            // 清理
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }

            if (canvasRef.current && rendererRef.current) {
                canvasRef.current.removeChild(rendererRef.current.domElement);
            }

            if (controlsRef.current) {
                controlsRef.current.dispose();
            }
        };
    }, []);

    return (
        <div className={styles.artGallery}>
            <div className={styles.canvasContainer} ref={canvasRef}></div>

            {artworkInfo.visible && (
                <div className={styles.artworkInfo}>
                    <div className={styles.infoContainer}>
                        <h3>{artworkInfo.title}</h3>
                        <h4>{artworkInfo.artist}</h4>
                        <p>{artworkInfo.description}</p>
                        <button onClick={() => setArtworkInfo(prev => ({ ...prev, visible: false }))}>
                            关闭
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.galleryControls}>
                <h2>3D 艺术展馆</h2>
                <p>使用鼠标拖动查看展馆</p>
                <p>点击艺术品查看详情</p>
            </div>
        </div>
    );
};

export default ArtGallery; 